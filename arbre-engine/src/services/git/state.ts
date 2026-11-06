/**
 * Reads the confirmed state of a repository straight from Git.
 * The 2D tree must be driven by this snapshot — never by what a command "should" have done.
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execGit } from './exec';

export type StatusCode = ' ' | 'M' | 'T' | 'A' | 'D' | 'R' | 'C' | 'U' | '?' | '!';
export interface FileInfo { path: string; index: StatusCode; worktree: StatusCode; conflicted: boolean; untracked: boolean }
export interface BranchInfo { name: string; sha: string; isHead: boolean }
export interface TagInfo { name: string; sha: string; annotated: boolean }
export interface RemoteInfo { name: string; url: string }
export interface CommitInfo { sha: string; parents: string[]; author: string; timestamp: number; subject: string }
export type Operation = 'merge' | 'cherry-pick' | 'revert' | 'rebase' | null;

export interface RepoState {
  initialized: boolean;
  head: { branch: string | null; sha: string | null; detached: boolean };
  branches: BranchInfo[];
  remotes: RemoteInfo[];
  publishedBranches: BranchInfo[];
  publishedCommits: string[];
  tags: TagInfo[];
  commits: CommitInfo[];
  files: FileInfo[];
  stashCount: number;
  operation: Operation;
  conflicts: string[];
}

export const EMPTY_STATE: RepoState = Object.freeze({
  initialized: false, head: { branch: null, sha: null, detached: false }, branches: [], remotes: [], publishedBranches: [], publishedCommits: [], tags: [], commits: [], files: [], stashCount: 0, operation: null, conflicts: [],
}) as RepoState;

const code = (c: string | undefined): StatusCode => (c === '.' || c === undefined ? ' ' : (c as StatusCode));

export function parseStatusV2(raw: string): FileInfo[] {
  const parts = raw.split('\0');
  const files: FileInfo[] = [];
  for (let i = 0; i < parts.length; i++) {
    const line = parts[i] as string;
    if (!line || line.startsWith('#')) continue;
    const f = line.split(' ');
    const kind = f[0];
    if (kind === '1') files.push({ path: f.slice(8).join(' '), index: code(f[1]?.[0]), worktree: code(f[1]?.[1]), conflicted: false, untracked: false });
    else if (kind === '2') { files.push({ path: f.slice(9).join(' '), index: code(f[1]?.[0]), worktree: code(f[1]?.[1]), conflicted: false, untracked: false }); i++; }
    else if (kind === 'u') files.push({ path: f.slice(10).join(' '), index: code(f[1]?.[0]), worktree: code(f[1]?.[1]), conflicted: true, untracked: false });
    else if (kind === '?') files.push({ path: line.slice(2), index: '?', worktree: '?', conflicted: false, untracked: true });
  }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

export async function readState(work: string, home: string): Promise<RepoState> {
  if (!existsSync(path.join(work, '.git'))) return { ...EMPTY_STATE };
  const g = (argv: string[]) => execGit(argv, work, home, { timeoutMs: 5000 });

  const [headSym, headSha, st, refs, tagRefs, stash, remoteUrl] = await Promise.all([
    g(['symbolic-ref', '-q', '--short', 'HEAD']),
    g(['rev-parse', '-q', '--verify', 'HEAD']),
    g(['status', '--porcelain=v2', '-z', '--untracked-files=all']),
    g(['for-each-ref', '--format=%(refname:short)%00%(objectname)%00%(HEAD)', 'refs/heads']),
    g(['for-each-ref', '--format=%(refname:short)%00%(objectname)%00%(*objectname)', 'refs/tags']),
    g(['stash', 'list']),
    g(['config', '--local', '--get', 'remote.origin.url']),
  ]);

  const branch = headSym.exitCode === 0 ? headSym.stdout.trim() : null;
  const sha = headSha.exitCode === 0 ? headSha.stdout.trim() : null;
  const branches: BranchInfo[] = refs.stdout.split('\n').filter(Boolean).map((l) => {
    const [name = '', oid = '', mark = ''] = l.split('\0');
    return { name, sha: oid, isHead: mark === '*' };
  });
  const tags: TagInfo[] = tagRefs.stdout.split('\n').filter(Boolean).map((l) => {
    const [name = '', oid = '', peeled = ''] = l.split('\0');
    return { name, sha: peeled || oid, annotated: Boolean(peeled) };
  });

  const remotePath = path.join(path.dirname(work), 'remote.git');
  const remotes = remoteUrl.exitCode === 0 && existsSync(remotePath)
    ? [{ name: 'origin', url: 'arbor-demo' }]
    : [];
  let publishedBranches: BranchInfo[] = [];
  let publishedCommits: string[] = [];
  if (remotes.length) {
    const [remoteRefs, remoteLog] = await Promise.all([
      g(['--git-dir', remotePath, 'for-each-ref', '--format=%(refname:short)%00%(objectname)', 'refs/heads']),
      g(['--git-dir', remotePath, 'log', '--all', '--format=%H']),
    ]);
    publishedBranches = remoteRefs.stdout.split('\n').filter(Boolean).map((line) => {
      const [name = '', oid = ''] = line.split('\0');
      return { name, sha: oid, isHead: name === branch };
    });
    publishedCommits = [...new Set(remoteLog.stdout.split('\n').filter(Boolean))];
  }

  let commits: CommitInfo[] = [];
  if (branches.length || tags.length || sha) {
    const revs = ['--branches', '--tags', ...(sha ? ['HEAD'] : [])];
    const log = await g(['log', ...revs, '--topo-order', '-n', '2000', '--format=%H%x1f%P%x1f%an%x1f%at%x1f%s%x1e']);
    if (log.exitCode === 0) {
      commits = log.stdout.split('\x1e').map((r) => r.trim()).filter(Boolean).map((r) => {
        const [h = '', p = '', author = '', at = '0', subject = ''] = r.split('\x1f');
        return { sha: h, parents: p ? p.split(' ') : [], author, timestamp: Number(at), subject };
      });
    }
  }

  const files = parseStatusV2(st.stdout);
  const gd = path.join(work, '.git');
  const operation: Operation = existsSync(path.join(gd, 'MERGE_HEAD')) ? 'merge'
    : existsSync(path.join(gd, 'CHERRY_PICK_HEAD')) ? 'cherry-pick'
    : existsSync(path.join(gd, 'REVERT_HEAD')) ? 'revert'
    : existsSync(path.join(gd, 'rebase-merge')) || existsSync(path.join(gd, 'rebase-apply')) ? 'rebase' : null;

  return {
    initialized: true,
    head: { branch, sha, detached: branch === null && sha !== null },
    branches, remotes, publishedBranches, publishedCommits, tags, commits, files,
    stashCount: stash.stdout.split('\n').filter(Boolean).length,
    operation,
    conflicts: files.filter((f) => f.conflicted).map((f) => f.path),
  };
}
