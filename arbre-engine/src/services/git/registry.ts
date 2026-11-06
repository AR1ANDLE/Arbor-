/**
 * Command registry — the single source of truth for every Git command ARBOR supports.
 * The parser, autocomplete, risk labels, reference pages and tests all read from here,
 * so a command can never be documented without working (or work without being documented).
 */
export type Risk = 'informational' | 'safe' | 'history' | 'destructive';
export type ValueKind = 'text' | 'ref' | 'int';

export interface FlagSpec { canon: string; value?: ValueKind }

export interface Parsed {
  command: string;
  sub: string | null;
  /** Canonical flag name -> value (or true for switches). */
  flags: Map<string, string | true>;
  positional: string[];
  dashdash: string[];
  sawDashDash: boolean;
}

export interface CommandSpec {
  name: string;
  summary: string;
  /** Curriculum module (1-10) where the command is first taught. */
  module: number;
  risk: Risk;
  flags: Record<string, FlagSpec>;
  positional: 'none' | 'any';
  maxPositional?: number;
  /** Only NUL/newline checks on positionals (used by `config`, whose values are free text). */
  loose?: boolean;
  subcommands?: string[];
  defaultSub?: string;
  /** Accept `-<number>` (e.g. `git log -3`). */
  numericFlag?: boolean;
  requires?: (p: Parsed) => string | null;
  classify?: (p: Parsed) => Risk;
  /** Extra argv inserted right after the command name. */
  inject?: (p: Parsed) => string[];
  /** Valid example lines. Used as documentation AND as parser tests. */
  examples: string[];
}

/** Declare a flag with several spellings; the longest becomes the canonical name. */
const fl = (spellings: string, value?: ValueKind): Record<string, FlagSpec> => {
  const names = spellings.split(' ');
  const canon = names.reduce((a, b) => (b.length > a.length ? b : a));
  return Object.fromEntries(names.map((n) => [n, { canon, value }]));
};
const merge = (...parts: Record<string, FlagSpec>[]) => Object.assign({}, ...parts) as Record<string, FlagSpec>;
const has = (p: Parsed, ...names: string[]) => names.some((n) => p.flags.has(n));

const CONFIG_KEYS = new Set(['user.name', 'user.email', 'init.defaultbranch']);

const defs: CommandSpec[] = [
  { name: 'init', module: 2, risk: 'safe', positional: 'none',
    summary: 'Create a new, empty repository in the current folder.',
    flags: merge(fl('-b --initial-branch', 'ref'), fl('-q --quiet')),
    examples: ['git init', 'git init -b main'] },
  { name: 'status', module: 2, risk: 'informational', positional: 'any',
    summary: 'Show which files are untracked, modified or staged.',
    flags: merge(fl('-s --short'), fl('-b --branch'), fl('--porcelain')),
    examples: ['git status', 'git status -s'] },
  { name: 'config', module: 2, risk: 'safe', positional: 'any', maxPositional: 2, loose: true,
    summary: 'Read or set your identity (user.name, user.email) in this repository.',
    flags: merge(fl('--get'), fl('-l --list'), fl('--local')),
    inject: () => ['--local'],
    requires: (p) => {
      if (has(p, '--list')) return p.positional.length ? '--list takes no arguments.' : null;
      const [key, value] = p.positional;
      if (!key) return 'Usage: git config user.name "Your Name"';
      if (!CONFIG_KEYS.has(key.toLowerCase())) return 'The playground only lets you change user.name, user.email and init.defaultBranch.';
      if (has(p, '--get') && value !== undefined) return '--get reads a value; it does not take one.';
      if (value !== undefined && value.length > 100) return 'That value is too long.';
      return null;
    },
    classify: (p) => (has(p, '--list', '--get') || p.positional.length < 2 ? 'informational' : 'safe'),
    examples: ['git config user.name "Ada Lovelace"', 'git config user.email ada@example.com', 'git config --list'] },
  { name: 'add', module: 4, risk: 'safe', positional: 'any',
    summary: 'Stage changes so they are included in the next commit.',
    flags: merge(fl('-A --all'), fl('-u --update'), fl('-n --dry-run'), fl('-v --verbose')),
    requires: (p) => (!has(p, '--all', '--update') && !p.positional.length && !p.dashdash.length ? 'Tell Git what to add, for example: git add index.html or git add .' : null),
    examples: ['git add index.html', 'git add .', 'git add -A'] },
  { name: 'commit', module: 4, risk: 'safe', positional: 'none',
    summary: 'Record the staged snapshot in the repository history.',
    flags: merge(fl('-m --message', 'text'), fl('-a --all'), fl('--amend'), fl('--allow-empty'), fl('--no-edit'), fl('-q --quiet')),
    requires: (p) => (!has(p, '--message', '--no-edit') ? 'The playground has no text editor, so give a message: git commit -m "Describe the change"' : null),
    classify: (p) => (has(p, '--amend') ? 'history' : 'safe'),
    examples: ['git commit -m "Initial commit"', 'git commit -am "Fix typo"'] },
  { name: 'diff', module: 4, risk: 'informational', positional: 'any',
    summary: 'Show changes between the working tree, the staging area and commits.',
    flags: merge(fl('--staged --cached'), fl('--stat'), fl('--name-only'), fl('--name-status')),
    examples: ['git diff', 'git diff --staged', 'git diff main..feature/x'] },
  { name: 'log', module: 4, risk: 'informational', positional: 'any', numericFlag: true,
    summary: 'Show the commit history.',
    flags: merge(fl('--oneline'), fl('--graph'), fl('--all'), fl('--decorate'), fl('--stat'), fl('--name-only'), fl('-n --max-count', 'int')),
    examples: ['git log', 'git log --oneline --graph --all', 'git log -3'] },
  { name: 'show', module: 4, risk: 'informational', positional: 'any',
    summary: 'Show one commit: its message and what it changed.',
    flags: merge(fl('--stat'), fl('--name-only'), fl('-s --no-patch'), fl('--oneline')),
    examples: ['git show', 'git show HEAD~1', 'git show --stat HEAD'] },
  { name: 'branch', module: 5, risk: 'safe', positional: 'any',
    summary: 'List, create, rename or delete branches (movable references to commits).',
    flags: merge(fl('-a --all'), fl('-r --remotes'), fl('-v --verbose'), fl('-vv'), fl('-d --delete'), fl('-D'), fl('-m --move'), fl('-M'), fl('-l --list'), fl('--show-current')),
    classify: (p) => {
      if (has(p, '-D')) return 'destructive';
      if (has(p, '--delete', '--move', '-M')) return 'history';
      return p.positional.length && !has(p, '--list') ? 'safe' : 'informational';
    },
    examples: ['git branch', 'git branch feature/header', 'git branch -d feature/header'] },
  { name: 'switch', module: 5, risk: 'safe', positional: 'any', maxPositional: 2,
    summary: 'Move HEAD to another branch (optionally creating it).',
    flags: merge(fl('-c --create', 'ref'), fl('-C --force-create', 'ref'), fl('-d --detach')),
    classify: (p) => (has(p, '-C', '--force-create') ? 'history' : 'safe'),
    examples: ['git switch main', 'git switch -c feature/navbar'] },
  { name: 'checkout', module: 5, risk: 'safe', positional: 'any',
    summary: 'Older command to switch branches or restore files.',
    flags: merge(fl('-b', 'ref'), fl('-B', 'ref'), fl('--detach')),
    classify: (p) => (p.sawDashDash ? 'destructive' : has(p, '-B') ? 'history' : 'safe'),
    examples: ['git checkout main', 'git checkout -b feature/login', 'git checkout -- index.html'] },
  { name: 'merge', module: 6, risk: 'safe', positional: 'any', maxPositional: 1,
    summary: 'Join another branch’s history into the current branch.',
    flags: merge(fl('--no-ff'), fl('--ff-only'), fl('--ff'), fl('--abort'), fl('--continue'), fl('--squash'), fl('--no-commit'), fl('--no-edit'), fl('-m --message', 'text'), fl('-q --quiet')),
    classify: (p) => (has(p, '--abort') ? 'destructive' : 'safe'),
    examples: ['git merge feature/header', 'git merge --no-ff feature/header', 'git merge --abort'] },
  { name: 'restore', module: 8, risk: 'destructive', positional: 'any',
    summary: 'Restore files in the working tree or unstage them.',
    flags: merge(fl('-S --staged'), fl('-W --worktree'), fl('-s --source', 'ref')),
    requires: (p) => (!p.positional.length && !p.dashdash.length ? 'Name the file(s) to restore, for example: git restore index.html' : null),
    classify: (p) => (has(p, '--staged') && !has(p, '--worktree') ? 'safe' : 'destructive'),
    examples: ['git restore index.html', 'git restore --staged index.html'] },
  { name: 'reset', module: 8, risk: 'history', positional: 'any',
    summary: 'Move the current branch to another commit, optionally changing staging and files.',
    flags: merge(fl('--soft'), fl('--mixed'), fl('--hard'), fl('-q --quiet')),
    classify: (p) => (has(p, '--hard') ? 'destructive' : p.sawDashDash ? 'safe' : 'history'),
    examples: ['git reset HEAD~1', 'git reset --soft HEAD~1', 'git reset --hard HEAD~1'] },
  { name: 'revert', module: 8, risk: 'safe', positional: 'any', maxPositional: 1,
    summary: 'Create a new commit that undoes an earlier commit.',
    flags: merge(fl('--no-edit'), fl('-n --no-commit'), fl('--abort'), fl('--continue'), fl('-m --mainline', 'int')),
    examples: ['git revert HEAD', 'git revert --no-edit HEAD~2'] },
  { name: 'stash', module: 8, risk: 'safe', positional: 'any', maxPositional: 1,
    subcommands: ['push', 'pop', 'apply', 'list', 'show', 'drop', 'clear'], defaultSub: 'push',
    summary: 'Set uncommitted work aside and bring it back later.',
    flags: merge(fl('-u --include-untracked'), fl('-m --message', 'text'), fl('-k --keep-index')),
    classify: (p) => (p.sub === 'drop' || p.sub === 'clear' ? 'destructive' : p.sub === 'list' || p.sub === 'show' ? 'informational' : 'safe'),
    examples: ['git stash', 'git stash push -m "wip"', 'git stash list', 'git stash pop'] },
  { name: 'tag', module: 9, risk: 'safe', positional: 'any', maxPositional: 2,
    summary: 'Mark a commit with a permanent, human-readable name.',
    flags: merge(fl('-a --annotate'), fl('-m --message', 'text'), fl('-d --delete'), fl('-l --list')),
    requires: (p) => (has(p, '--annotate') && !has(p, '--message') ? 'Annotated tags need a message: git tag -a v1.0 -m "First release"' : null),
    classify: (p) => (has(p, '--delete') ? 'history' : !p.positional.length || has(p, '--list') ? 'informational' : 'safe'),
    examples: ['git tag', 'git tag v1.0', 'git tag -a v1.0 -m "First release"'] },
  { name: 'rm', module: 9, risk: 'destructive', positional: 'any',
    summary: 'Remove files from the working tree and the index.',
    flags: merge(fl('--cached'), fl('-r'), fl('-f --force'), fl('-n --dry-run'), fl('-q --quiet')),
    requires: (p) => (!p.positional.length && !p.dashdash.length ? 'Name the file(s) to remove, for example: git rm old.txt' : null),
    classify: (p) => (has(p, '--cached', '--dry-run') ? 'safe' : 'destructive'),
    examples: ['git rm old.txt', 'git rm --cached secrets.txt'] },
  { name: 'mv', module: 9, risk: 'safe', positional: 'any', maxPositional: 2,
    summary: 'Rename or move a file and stage the change.',
    flags: merge(fl('-n --dry-run'), fl('-v --verbose')),
    requires: (p) => (p.positional.length !== 2 ? 'Usage: git mv <old-name> <new-name>' : null),
    examples: ['git mv old.txt new.txt'] },
  { name: 'reflog', module: 8, risk: 'informational', positional: 'any', maxPositional: 2,
    summary: 'Show where HEAD has been — your safety net for recovering lost commits.',
    flags: merge(fl('-n --max-count', 'int')),
    examples: ['git reflog', 'git reflog -n 5'] },
  { name: 'cherry-pick', module: 8, risk: 'safe', positional: 'any', maxPositional: 1,
    summary: 'Copy one commit from elsewhere onto the current branch.',
    flags: merge(fl('-x'), fl('-n --no-commit'), fl('--continue'), fl('--abort'), fl('--no-edit')),
    classify: (p) => (has(p, '--abort') ? 'destructive' : 'safe'),
    examples: ['git cherry-pick a1b2c3d'] },
  { name: 'remote', module: 10, risk: 'safe', positional: 'any', maxPositional: 2,
    subcommands: ['add'],
    summary: 'Connect this playground to its private local practice remote.',
    flags: merge(fl('-v --verbose')),
    requires: (p) => p.sub === 'add'
      ? p.positional[0] !== 'origin' || p.positional[1] !== 'arbor-demo' || p.positional.length !== 2
        ? 'Use the private practice remote: git remote add origin arbor-demo.' : null
      : p.positional.length ? 'The playground exposes only its private origin remote.' : null,
    examples: ['git remote', 'git remote add origin arbor-demo'] },
  { name: 'push', module: 10, risk: 'safe', positional: 'any', maxPositional: 2,
    summary: 'Publish commits to the sandbox’s private bare Git remote.',
    flags: merge(fl('-u --set-upstream'), fl('--all'), fl('--tags'), fl('--dry-run'), fl('--porcelain')),
    requires: (p) => p.positional.length && p.positional[0] !== 'origin'
      ? 'The playground can push only to its private origin remote.' : null,
    examples: ['git push', 'git push -u origin feature/login'] },
];

export const COMMANDS: Readonly<Record<string, CommandSpec>> = Object.freeze(
  Object.fromEntries(defs.map((d) => [d.name, Object.freeze(d)])),
);
export const COMMAND_NAMES = defs.map((d) => d.name);
export const isCommand = (name: string): boolean => Object.hasOwn(COMMANDS, name);
