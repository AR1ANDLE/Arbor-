export type GitFile = {
  path: string;
  status: string;
  staged: boolean;
  modified: boolean;
  untracked: boolean;
};

export type GitCommit = {
  hash: string;
  shortHash: string;
  subject: string;
  parents: string[];
  author: string;
};

export type GitBranch = {
  name: string;
  current: boolean;
  commit: string | null;
};

export type GitTag = { name: string; commit: string; annotated: boolean };

export type TreeGrowthEvent = {
  id: string;
  command: string;
  kind: "roots" | "commit" | "branch" | "branch-removed" | "switch" | "merge" | "push" | "tag" | "stash";
  branch: string | null;
  targetBranch: string | null;
  commitHash: string | null;
  publishedCommits: string[];
  message: string;
};

export type RepositoryState = {
  initialized: boolean;
  branch: string | null;
  head: string | null;
  files: string[];
  staged: GitFile[];
  changed: GitFile[];
  commits: GitCommit[];
  branches: GitBranch[];
  tags: GitTag[];
  remotes: string[];
  publishedBranches: GitBranch[];
  publishedCommits: string[];
  stashCount: number;
};

export type CommandExplanation = {
  title: string;
  body: string;
  concept: string;
  workingTree: string;
  stagingArea: string;
  repository: string;
  head: string;
};
