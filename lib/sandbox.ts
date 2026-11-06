import { randomUUID } from "node:crypto";
import { SandboxManager, SandboxError as EngineSandboxError } from "@/arbre-engine/src/services/sandbox/sandbox";
import { parseCommand } from "@/arbre-engine/src/services/git/parser";
import type { RepoState } from "@/arbre-engine/src/services/git/state";
import type { GitBranch, GitCommit, GitFile, GitTag, RepositoryState, TreeGrowthEvent } from "@/types/git";

const SESSION_TTL = 3 * 60 * 60 * 1000;
const MAX_VISIBLE_COMMITS = 40;
const globalForArbor = globalThis as typeof globalThis & {
  arborSandboxManager?: SandboxManager;
};
const manager = (globalForArbor.arborSandboxManager ??= new SandboxManager({
  ttlMs: SESSION_TTL,
  maxSessions: 32,
}));
manager.startSweeper();

export class SandboxError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
    this.name = "SandboxError";
  }
}

function asSandboxError(error: unknown): SandboxError {
  if (error instanceof SandboxError) return error;
  if (error instanceof EngineSandboxError) return new SandboxError(error.message, 400);
  return new SandboxError("The playground could not complete that request.", 500);
}

function requireSession(id: string) {
  const session = manager.get(id);
  if (!session) throw new SandboxError("This temporary playground has expired. Start a new one to continue.", 404);
  return session;
}

function toRepositoryState(state: RepoState, files: string[]): RepositoryState {
  const gitFiles: GitFile[] = state.files.map((file) => ({
    path: file.path,
    status: file.untracked ? "??" : `${file.index}${file.worktree}`.trim() || "??",
    staged: file.index !== " " && file.index !== "?",
    modified: file.worktree !== " " && file.worktree !== "?",
    untracked: file.untracked,
  }));
  const branches: GitBranch[] = state.branches.map((branch) => ({
    name: branch.name,
    current: branch.isHead,
    commit: branch.sha || null,
  }));
  const commitByHash = new Map(state.commits.map((commit) => [commit.sha, commit]));
  const prioritizedHashes = [state.head.sha, ...state.branches.slice(0, 8).map((branch) => branch.sha), ...state.commits.map((commit) => commit.sha)];
  const visibleHashesInOrder = [...new Set(prioritizedHashes.filter((hash): hash is string => Boolean(hash)))].slice(0, MAX_VISIBLE_COMMITS);
  const commits: GitCommit[] = visibleHashesInOrder.flatMap((hash) => {
    const commit = commitByHash.get(hash);
    return commit ? [{ hash: commit.sha, shortHash: commit.sha.slice(0, 7), subject: commit.subject, parents: commit.parents, author: commit.author }] : [];
  });
  const visibleHashes = new Set(commits.map((commit) => commit.hash));
  const branchesToUi = (items: RepoState["branches"]): GitBranch[] => items.map((branch) => ({
    name: branch.name,
    current: branch.isHead,
    commit: branch.sha || null,
  }));
  const tags: GitTag[] = state.tags
    .filter((tag) => visibleHashes.has(tag.sha))
    .map((tag) => ({ name: tag.name, commit: tag.sha, annotated: tag.annotated }));
  return {
    initialized: state.initialized,
    branch: state.head.branch,
    head: state.head.sha,
    files,
    staged: gitFiles.filter((file) => file.staged),
    changed: gitFiles.filter((file) => !file.staged || file.modified || file.untracked),
    commits,
    branches,
    tags,
    remotes: state.remotes.map((remote) => remote.name),
    publishedBranches: branchesToUi(state.publishedBranches),
    publishedCommits: state.publishedCommits.filter((hash) => visibleHashes.has(hash)),
    stashCount: state.stashCount,
  };
}

function describeGrowth(before: RepoState, after: RepoState, line: string, ok: boolean): TreeGrowthEvent | null {
  if (!ok) return null;
  const parsed = parseCommand(line);
  if (!parsed.ok) return null;
  const command = parsed.parsed.command;
  const branchNamesBefore = new Set(before.branches.map((branch) => branch.name));
  const branchNamesAfter = new Set(after.branches.map((branch) => branch.name));
  const newBranch = after.branches.find((branch) => !branchNamesBefore.has(branch.name));
  const removedBranch = before.branches.find((branch) => !branchNamesAfter.has(branch.name));
  const newPublished = after.publishedCommits.filter((hash) => !before.publishedCommits.includes(hash));
  let kind: TreeGrowthEvent["kind"] | null = null;
  let message = "";
  let targetBranch = after.head.branch;
  let commitHash = after.head.sha;

  if (command === "init" && !before.initialized && after.initialized) {
    kind = "roots";
    message = "Git initialized the repository. Roots emerge; the trunk waits for a commit.";
  } else if (command === "commit" && before.head.sha !== after.head.sha && after.head.sha) {
    kind = "commit";
    message = before.commits.length === 0
      ? "The first commit starts a small, leafless trunk."
      : `A new commit extends ${after.head.branch ?? "the active growth path"}.`;
  } else if ((command === "switch" || command === "checkout") && newBranch) {
    kind = "branch";
    targetBranch = newBranch.name;
    message = `A new leafless limb begins at ${newBranch.sha?.slice(0, 7) ?? "the current point"}.`;
  } else if ((command === "branch" || command === "switch" || command === "checkout") && removedBranch) {
    kind = "branch-removed";
    targetBranch = removedBranch.name;
    message = `The ${removedBranch.name} reference was removed; its commits remain in history.`;
  } else if (command === "branch" && newBranch) {
    kind = "branch";
    targetBranch = newBranch.name;
    message = `A leafless ${newBranch.name} limb starts here. ${after.head.branch ?? "The current branch"} remains active.`;
  } else if ((command === "switch" || command === "checkout") && before.head.branch !== after.head.branch) {
    kind = "switch";
    message = `The active growth path is now ${after.head.branch ?? "detached HEAD"}.`;
  } else if (command === "merge" && before.head.sha !== after.head.sha) {
    kind = "merge";
    message = after.commits[0]?.parents.length === 2
      ? "Git joined the histories at a real merge commit."
      : "Git fast-forwarded the active branch along existing growth.";
  } else if (command === "push" && newPublished.length) {
    kind = "push";
    message = `Git published ${newPublished.length} commit${newPublished.length === 1 ? "" : "s"}; new leaves appear on that path.`;
  } else if (command === "tag" && before.tags.length !== after.tags.length) {
    kind = "tag";
    const createdTag = after.tags.find((tag) => !before.tags.some((oldTag) => oldTag.name === tag.name));
    commitHash = createdTag?.sha ?? after.head.sha;
    message = "Git placed a milestone on the tagged commit.";
  } else if (command === "stash" && before.stashCount !== after.stashCount) {
    kind = "stash";
    message = after.stashCount > before.stashCount
      ? "Git tucked the working changes into a stash."
      : "Git restored or removed a stashed change.";
  }

  if (!kind) return null;
  return {
    id: randomUUID(),
    command: line,
    kind,
    branch: after.head.branch,
    targetBranch,
    commitHash,
    publishedCommits: newPublished,
    message,
  };
}

async function sessionState(id: string) {
  const session = requireSession(id);
  const [state, entries] = await Promise.all([session.state(), session.list()]);
  return toRepositoryState(state, entries.map((entry) => entry.path));
}

async function addStarterFiles(id: string) {
  const session = requireSession(id);
  await session.write("README.md", "# A little project\n\nThis temporary repository is yours to experiment with.\n");
  await session.write("src/hello.txt", "The best way to learn Git is to try it.\n");
}

export async function createSandbox() {
  try {
    const session = await manager.create();
    await addStarterFiles(session.id);
    return { id: session.id, state: await sessionState(session.id) };
  } catch (error) {
    throw asSandboxError(error);
  }
}

export async function readSandboxState(id: string) {
  try {
    return await sessionState(id);
  } catch (error) {
    throw asSandboxError(error);
  }
}

export async function readSandboxFile(id: string, relativePath: unknown) {
  try {
    if (typeof relativePath !== "string") throw new SandboxError("Choose a valid relative file path.");
    return await requireSession(id).read(relativePath);
  } catch (error) {
    throw asSandboxError(error);
  }
}

export async function writeSandboxFile(id: string, relativePath: unknown, content: unknown) {
  try {
    if (typeof relativePath !== "string" || typeof content !== "string") {
      throw new SandboxError("A valid file path and plain-text contents are required.");
    }
    const session = requireSession(id);
    await session.write(relativePath, content);
    return await sessionState(id);
  } catch (error) {
    throw asSandboxError(error);
  }
}

export async function resetSandbox(id: string) {
  try {
    await manager.reset(id, true);
    await addStarterFiles(id);
    return await sessionState(id);
  } catch (error) {
    throw asSandboxError(error);
  }
}

export async function executeSandboxCommand(id: string, line: unknown, confirmed = false) {
  try {
    if (typeof line !== "string") throw new SandboxError("Enter a Git command.");
    const session = requireSession(id);
    const result = await session.run(line, { requireConfirm: true, confirmed, capturePreviousState: true });
    if (result.ok && result.command === "init") {
      await session.run('git config user.name "ARBOR Learner"');
      await session.run('git config user.email "learner@arbor.local"');
    }
    const state = await sessionState(id);
    const growthEvent = describeGrowth(result.previousState, result.state, line, result.ok);
    return {
      ok: result.ok,
      rejected: result.rejected,
      needsConfirmation: result.needsConfirmation,
      risk: result.risk,
      output: [result.stdout, result.stderr].filter(Boolean).join("\n") || (result.ok ? "(Git completed with no output.)" : "Git could not complete that command."),
      explanation: result.ok
        ? growthEvent?.message ?? `Git confirmed ${result.command ? `git ${result.command}` : "the command"}. The tree changes only when repository history or publication changes.`
        : result.stderr,
      state,
      growthEvent,
    };
  } catch (error) {
    throw asSandboxError(error);
  }
}
