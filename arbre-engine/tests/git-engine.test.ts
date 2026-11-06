import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import os from 'node:os';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { COMMANDS, COMMAND_NAMES, SandboxManager, execGit, parseCommand, resolveInside, type RepoState, type Sandbox } from '../src/services/git';
const tip = (st: RepoState) => st.commits.find((c) => c.sha === st.head.sha)!;

const ok = (line: string) => { const r = parseCommand(line); if (!r.ok) throw new Error(`${line} -> ${r.error}`); return r; };

describe('registry <-> parser stay in sync', () => {
  it('every documented example parses', () => {
    for (const name of COMMAND_NAMES) for (const ex of COMMANDS[name]!.examples) expect(ok(ex).parsed.command).toBe(name);
  });
  it('every command has a summary, module and at least one example', () => {
    for (const c of Object.values(COMMANDS)) { expect(c.summary.length).toBeGreaterThan(10); expect(c.module).toBeGreaterThan(0); expect(c.examples.length).toBeGreaterThan(0); }
  });
});

describe('parser: accepts', () => {
  it('splits quoted messages and clusters', () => {
    expect(ok('git commit -am "two words"').argv).toEqual(['commit', '-a', '-m', 'two words']);
    expect(ok("git commit --message='x y'").argv).toEqual(['commit', '--message', 'x y']);
    expect(ok('git log -3 --oneline').argv).toEqual(['log', '-3', '--oneline']);
    expect(ok('git stash').argv).toEqual(['stash', 'push']);
    expect(ok('git config user.name "Ada L."').argv).toEqual(['config', '--local', 'user.name', 'Ada L.']);
    expect(ok('git show HEAD@{1}').argv).toEqual(['show', 'HEAD@{1}']);
    expect(ok('git restore --staged -- a.txt').argv).toEqual(['restore', '--staged', '--', 'a.txt']);
  });
  it('classifies risk', () => {
    const risk = (l: string) => ok(l).risk;
    expect(risk('git status')).toBe('informational');
    expect(risk('git add .')).toBe('safe');
    expect(risk('git commit --amend -m x')).toBe('history');
    expect(risk('git reset --hard HEAD~1')).toBe('destructive');
    expect(risk('git reset --soft HEAD~1')).toBe('history');
    expect(risk('git branch -D x')).toBe('destructive');
    expect(risk('git branch')).toBe('informational');
    expect(risk('git restore a.txt')).toBe('destructive');
    expect(risk('git restore --staged a.txt')).toBe('safe');
    expect(risk('git stash drop')).toBe('destructive');
    expect(risk('git checkout -- a.txt')).toBe('destructive');
  });
});

describe('parser: rejects', () => {
  const bad = [
    'ls', 'git', 'git -c core.editor=vim status', 'git -C /etc status', 'git --exec-path',
    'git status; ls', 'git status && rm -rf /', 'git log | cat', 'git log > out.txt', 'git commit -m "$(whoami)"x$(id)',
    'git status `id`', 'git clone /etc', 'git rebase -i HEAD~3', 'git clean -fdx', 'git daemon',
    'git add ../secret', 'git add /etc/passwd', 'git add .git/config', 'git add a/../../b', 'git diff :(top)x', 'git show HEAD:../../etc/passwd',
    'git log --output=/tmp/x', 'git diff --ext-diff', 'git commit -F /etc/passwd', 'git commit', 'git add', 'git tag -a v1', 'git mv a',
    'git config core.hooksPath /tmp', 'git config alias.x !ls', 'git config --global user.name x', 'git config --file /tmp/x user.name y',
    'git init /tmp/elsewhere', 'git commit -m', 'git stash evil', 'git log -n abc', 'git status\ngit log', 'git commit -m "unterminated',
    'git constructor', 'git __proto__',
  ];
  for (const line of bad) it(`rejects: ${JSON.stringify(line)}`, () => { expect(parseCommand(line).ok).toBe(false); });
});

describe('file path guard', () => {
  it('blocks traversal, .git and absolute paths', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'arbor-path-'));
    for (const p of ['../x', 'a/../../x', '/etc/passwd', '.git/config', 'a/.GIT/hooks/pre-commit', 'a//b', '', 'a\\b']) await expect(resolveInside(root, p)).rejects.toThrow();
    await expect(resolveInside(root, 'src/app.js')).resolves.toBe(path.join(root, 'src', 'app.js'));
    await fs.rm(root, { recursive: true });
  });
  it('blocks symlinks pointing out of the sandbox', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'arbor-link-'));
    const outside = await fs.mkdtemp(path.join(os.tmpdir(), 'arbor-outside-'));
    await fs.symlink(outside, path.join(root, 'escape'), process.platform === 'win32' ? 'junction' : 'dir');
    await expect(resolveInside(root, 'escape/passwd')).rejects.toThrow(/Symbolic/);
    await fs.rm(root, { recursive: true });
    await fs.rm(outside, { recursive: true });
  });
});

describe('executor limits', () => {
  it('truncates huge output and enforces timeouts', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'arbor-exec-'));
    const big = await execGit(['help', '-a'], dir, dir, { maxBytes: 100 });
    expect(big.truncated).toBe(true);
    expect(big.stdout.length).toBeLessThanOrEqual(100);
    const slow = await execGit(['-e', 'setTimeout(() => {}, 5000)'], dir, dir, { timeoutMs: 250, bin: process.execPath });
    expect(slow.timedOut).toBe(true);
    expect(slow.durationMs).toBeLessThan(2000);
    expect(slow.stderr).toContain('took too long');
    await fs.rm(dir, { recursive: true });
  });
});

describe('real git workflows in a sandbox', () => {
  let mgr: SandboxManager; let s: Sandbox;
  beforeAll(async () => { mgr = new SandboxManager({ root: await fs.mkdtemp(path.join(os.tmpdir(), 'arbor-sb-')) }); });
  afterAll(async () => { await mgr.shutdown(); await fs.rm(mgr.root, { recursive: true, force: true }); });

  const run = async (line: string) => s.run(line);
  const must = async (line: string) => { const r = await run(line); if (!r.ok) throw new Error(`${line}\n${r.stderr}`); return r; };

  it('starts with no repository, then init creates one on main', async () => {
    s = await mgr.create();
    expect((await s.state()).initialized).toBe(false);
    const r = await must('git init');
    expect(r.stdout).toContain('Initialized empty Git repository');
    expect(r.state.initialized).toBe(true);
    expect(r.state.head).toEqual({ branch: 'main', sha: null, detached: false });
  });

  it('refuses to commit without an identity (never guesses one)', async () => {
    await s.write('index.html', '<h1>Hello</h1>\n');
    await must('git add index.html');
    const r = await run('git commit -m "First"');
    expect(r.ok).toBe(false);
    expect(r.exitCode).not.toBe(0);
  });

  it('shows the three areas: untracked -> staged -> committed', async () => {
    await must('git config user.name "Ada Lovelace"');
    await must('git config user.email ada@example.com');
    await s.write('notes.txt', 'one\n');
    let st = (await s.state()).files;
    expect(st.find((f) => f.path === 'notes.txt')?.untracked).toBe(true);
    expect(st.find((f) => f.path === 'index.html')).toMatchObject({ index: 'A', worktree: ' ' });
    await must('git add notes.txt');
    await s.write('notes.txt', 'one\ntwo\n'); // modified again after staging
    st = (await s.state()).files;
    expect(st.find((f) => f.path === 'notes.txt')).toMatchObject({ index: 'A', worktree: 'M' });
    const diff = await must('git diff');
    expect(diff.stdout).toContain('+two');
    const staged = await must('git diff --staged');
    expect(staged.stdout).toContain('+one');
    await must('git add notes.txt');
    const c = await must('git commit -m "Initial commit"');
    expect(c.state.commits).toHaveLength(1);
    expect(c.state.commits[0]).toMatchObject({ subject: 'Initial commit', author: 'Ada Lovelace', parents: [] });
    expect(c.state.files).toHaveLength(0);
    expect(c.state.head.sha).toBe(tip(c.state).sha);
  });

  it('branches are movable references; switch moves HEAD', async () => {
    const root = (await s.state()).head.sha;
    const b = await must('git branch feature/header');
    expect(b.state.branches.map((x) => x.name).sort()).toEqual(['feature/header', 'main']);
    expect(b.state.branches.find((x) => x.name === 'feature/header')?.sha).toBe(root);
    await must('git switch feature/header');
    await s.write('header.css', 'h1{color:green}\n');
    await must('git add .');
    const c = await must('git commit -m "Add header styles"');
    expect(c.state.head.branch).toBe('feature/header');
    expect(c.state.commits).toHaveLength(2);
    expect(c.state.branches.find((x) => x.name === 'main')?.sha).toBe(root);
    expect(tip(c.state).parents).toEqual([root]);
  });

  it('fast-forward merge moves main without a merge commit', async () => {
    await must('git switch main');
    const r = await must('git merge feature/header');
    expect(r.stdout).toContain('Fast-forward');
    expect(r.state.commits).toHaveLength(2);
    expect(r.state.branches.find((x) => x.name === 'main')?.sha).toBe(r.state.branches.find((x) => x.name === 'feature/header')?.sha);
  });

  it('produces a REAL merge conflict that can be resolved', async () => {
    await must('git switch -c left');
    await s.write('notes.txt', 'one\nleft\n');
    await must('git commit -am "left edit"');
    await must('git switch main');
    await must('git switch -c right');
    await s.write('notes.txt', 'one\nright\n');
    await must('git commit -am "right edit"');
    const m = await run('git merge left');
    expect(m.ok).toBe(false);
    expect(m.stdout + m.stderr).toContain('CONFLICT');
    expect(m.state.operation).toBe('merge');
    expect(m.state.conflicts).toEqual(['notes.txt']);
    const content = await s.read('notes.txt');
    expect(content).toContain('<<<<<<<');
    expect(content).toContain('>>>>>>> left');
    await s.write('notes.txt', 'one\nleft and right\n');
    await must('git add notes.txt');
    const done = await must('git commit --no-edit');
    expect(done.state.operation).toBeNull();
    expect(done.state.conflicts).toEqual([]);
    expect(tip(done.state).parents).toHaveLength(2); // true merge commit, real parents preserved
  });

  it('merge --abort restores the pre-merge state', async () => {
    await must('git switch -c a1'); await s.write('x.txt', 'a\n'); await must('git add x.txt'); await must('git commit -m "a"');
    await must('git switch main'); await must('git switch -c b1'); await s.write('x.txt', 'b\n'); await must('git add x.txt'); await must('git commit -m "b"');
    const m = await run('git merge a1');
    expect(m.state.operation).toBe('merge');
    const a = await must('git merge --abort');
    expect(a.state.operation).toBeNull();
    expect(a.state.files).toHaveLength(0);
  });

  it('undo tools: reset --soft/--hard, revert, stash, restore, tag, reflog', async () => {
    await must('git switch main');
    await s.write('u.txt', 'v1\n'); await must('git add u.txt'); await must('git commit -m "u1"');
    await s.write('u.txt', 'v2\n'); await must('git commit -am "u2"');
    const before = (await s.state()).commits.length;

    const soft = await must('git reset --soft HEAD~1');
    expect(soft.state.commits.find((c) => c.subject === 'u2')).toBeUndefined(); // no longer reachable from a branch
    expect(soft.state.files[0]).toMatchObject({ path: 'u.txt', index: 'M' });   // change kept, staged
    await must('git commit -m "u2 again"');

    await s.write('u.txt', 'oops\n');
    const rs = await must('git restore u.txt');
    expect(rs.state.files).toHaveLength(0);
    expect(await s.read('u.txt')).toBe('v2\n');

    await s.write('u.txt', 'stash me\n');
    const st = await must('git stash');
    expect(st.state.stashCount).toBe(1);
    expect(st.state.files).toHaveLength(0);
    const pop = await must('git stash pop');
    expect(pop.state.stashCount).toBe(0);
    expect(pop.state.files[0]).toMatchObject({ path: 'u.txt', worktree: 'M' });
    await must('git restore u.txt');

    const rv = await must('git revert --no-edit HEAD');
    expect(tip(rv.state).subject).toMatch(/^Revert/);
    expect(rv.state.commits.length).toBe(before + 1); // the old "u2" is unreachable after reset --soft, so only the revert adds one

    const hard = await must('git reset --hard HEAD~1');
    expect(tip(hard.state).subject).toBe('u2 again');
    const reflog = await must('git reflog -n 3');
    expect(reflog.stdout).toContain('reset');

    const tag = await must('git tag -a v1.0 -m "First release"');
    expect(tag.state.tags).toEqual([{ name: 'v1.0', sha: hard.state.head.sha, annotated: true }]);
  });

  it('can require confirmation for destructive commands', async () => {
    const r = await s.run('git reset --hard HEAD~1', { requireConfirm: true });
    expect(r.needsConfirmation).toBe(true);
    expect(r.exitCode).toBeNull(); // never executed
    const sha = (await s.state()).head.sha;
    expect(sha).toBe(r.state.head.sha);
  });

  it('detached HEAD is reported honestly', async () => {
    const r = await must('git switch --detach HEAD~1');
    expect(r.state.head.detached).toBe(true);
    expect(r.state.head.branch).toBeNull();
    await must('git switch main');
  });

  it('serializes concurrent commands on one session', async () => {
    await s.write('c1.txt', '1'); await s.write('c2.txt', '2');
    const [a, b] = await Promise.all([run('git add c1.txt'), run('git add c2.txt')]);
    expect(a.ok && b.ok).toBe(true);
    const st = await s.state();
    expect(st.files.filter((f) => f.index === 'A')).toHaveLength(2);
  });

  it('tracks roots, commits, branch refs, tags, stashes and only published remote commits', async () => {
    const tree = await mgr.create();
    const runTree = (line: string) => tree.run(line);
    const mustTree = async (line: string) => {
      const result = await runTree(line);
      if (!result.ok) throw new Error(`${line}\n${result.stderr}`);
      return result;
    };
    expect((await tree.state()).initialized).toBe(false);
    const unconfiguredPush = await runTree('git push');
    expect(unconfiguredPush.ok).toBe(false);
    expect(unconfiguredPush.state.publishedCommits).toHaveLength(0);
    const initialized = await mustTree('git init');
    expect(initialized.state.initialized).toBe(true);
    expect(initialized.state.commits).toHaveLength(0);
    await mustTree('git config user.name "ARBOR Test"');
    await mustTree('git config user.email arbor@example.test');
    await tree.write('journey.txt', 'first\n');
    await mustTree('git add .');
    const first = await mustTree('git commit -m "First growth"');
    expect(first.state.commits).toHaveLength(1);
    await tree.write('journey.txt', 'second\n');
    await mustTree('git commit -am "Extend main"');
    await mustTree('git switch -c feature/login');
    await tree.write('feature.txt', 'feature one\n');
    await mustTree('git add .');
    await mustTree('git commit -m "Feature one"');
    await tree.write('feature.txt', 'feature two\n');
    await mustTree('git commit -am "Feature two"');
    const featureState = await tree.state();
    expect(featureState.head.branch).toBe('feature/login');
    expect(featureState.commits).toHaveLength(4);
    await mustTree('git switch main');
    const switched = await tree.state();
    expect(switched.head.branch).toBe('main');
    expect(switched.branches).toHaveLength(2);
    await mustTree('git branch feature/draft');
    expect((await tree.state()).head.branch).toBe('main');
    expect((await tree.state()).branches).toHaveLength(3);
    const deleted = await mustTree('git branch -D feature/draft');
    expect(deleted.state.branches.map((branch) => branch.name)).toEqual(['feature/login', 'main']);
    await mustTree('git remote add origin arbor-demo');
    expect((await tree.state()).remotes).toEqual([{ name: 'origin', url: 'arbor-demo' }]);
    const firstPush = await mustTree('git push');
    expect(firstPush.state.publishedBranches.map((ref) => ref.name)).toContain('main');
    expect(firstPush.state.publishedCommits).toHaveLength(2);
    await tree.write('journey.txt', 'third\n');
    await mustTree('git commit -am "Unpublished extension"');
    expect((await tree.state()).publishedCommits).toHaveLength(2);
    const secondPush = await mustTree('git push');
    expect(secondPush.state.publishedCommits).toHaveLength(3);
    await mustTree('git tag v1.0');
    expect((await tree.state()).tags.map((tag) => tag.name)).toContain('v1.0');
    await tree.write('stashed.txt', 'save this\n');
    await mustTree('git add stashed.txt');
    const stash = await mustTree('git stash');
    expect(stash.state.stashCount).toBe(1);
  }, 20000);

  it('hooks planted by the user never run', async () => {
    await expect(s.write('.git/hooks/pre-commit', '#!/bin/sh\ntouch /tmp/pwned\n')).rejects.toThrow();
  });
});

describe('isolation, reset and cleanup', () => {
  it('sessions cannot see each other; reset needs confirmation; destroy and TTL clean up', async () => {
    const mgr = new SandboxManager({ root: await fs.mkdtemp(path.join(os.tmpdir(), 'arbor-iso-')), ttlMs: 1000 });
    const a = await mgr.create(); const b = await mgr.create();
    await a.write('secret.txt', 'A'); await a.run('git init');
    expect((await b.list()).length).toBe(0);
    expect((await b.state()).initialized).toBe(false);
    await expect(mgr.reset(a.id, false)).rejects.toThrow(/Confirm/);
    expect((await mgr.reset(a.id, true)).initialized).toBe(false);
    expect(await a.list()).toEqual([]);
    expect(mgr.get('../etc')).toBeUndefined();
    await mgr.destroy(b.id);
    await expect(fs.stat(b.dir)).rejects.toThrow();
    expect(await mgr.sweep(Date.now() + 5000)).toBe(1);
    expect(mgr.size).toBe(0);
    await fs.rm(mgr.root, { recursive: true, force: true });
  });
  it('limits file size and count', async () => {
    const mgr = new SandboxManager({ root: await fs.mkdtemp(path.join(os.tmpdir(), 'arbor-lim-')) });
    const s = await mgr.create();
    await expect(s.write('big.txt', 'x'.repeat(300 * 1024))).rejects.toThrow(/too large/);
    await s.write('bin.dat', 'a\0b');
    await expect(s.read('bin.dat')).rejects.toThrow(/Binary/);
    await mgr.shutdown(); await fs.rm(mgr.root, { recursive: true, force: true });
  });
});
