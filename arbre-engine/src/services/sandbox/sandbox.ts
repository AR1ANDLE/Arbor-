/**
 * Isolated, disposable learning sessions. Each session owns a private folder with a
 * working tree and a HOME; every operation is serialized so commands never race.
 */
import { randomBytes } from 'node:crypto';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execGit, type ExecResult } from '../git/exec';
import { parseCommand } from '../git/parser';
import type { Risk } from '../git/registry';
import { EMPTY_STATE, readState, type RepoState } from '../git/state';

export const LIMITS = { maxFileBytes: 256 * 1024, maxFiles: 200, maxPathLength: 200, maxListEntries: 500 };
export class SandboxError extends Error {}

export interface RunOptions { requireConfirm?: boolean; confirmed?: boolean; capturePreviousState?: boolean }
export interface RunResult {
  line: string; ok: boolean; rejected: boolean; needsConfirmation: boolean;
  command: string | null; argv: string[] | null; risk: Risk | null;
  exitCode: number | null; stdout: string; stderr: string; truncated: boolean; timedOut: boolean; durationMs: number;
  /** Repository state re-read from Git after the command finished. */
  state: RepoState;
  previousState: RepoState;
}
export interface FileEntry { path: string; size: number }

/** Resolve a user-supplied relative path strictly inside `root` (no escapes, no .git, no symlinks). */
export async function resolveInside(root: string, rel: string): Promise<string> {
  if (!rel || rel.length > LIMITS.maxPathLength || /[\0\r\n\\]/.test(rel)) throw new SandboxError('Invalid file path.');
  if (path.isAbsolute(rel)) throw new SandboxError('Use a path inside the project.');
  const parts = rel.split('/');
  if (parts.some((p) => p === '' || p === '.' || p === '..')) throw new SandboxError('Paths can’t contain empty, “.” or “..” parts.');
  if (parts.some((p) => p.toLowerCase() === '.git')) throw new SandboxError('The .git folder is managed by Git.');
  let cur = root;
  for (const p of parts) {
    cur = path.join(cur, p);
    try { if ((await fs.lstat(cur)).isSymbolicLink()) throw new SandboxError('Symbolic links aren’t allowed.'); }
    catch (e) { if (e instanceof SandboxError) throw e; break; }
  }
  const abs = path.join(root, ...parts);
  if (!abs.startsWith(root + path.sep)) throw new SandboxError('Path escapes the project.');
  return abs;
}

export class Sandbox {
  lastUsed = Date.now();
  private queue: Promise<unknown> = Promise.resolve();
  readonly work: string;
  readonly home: string;
  readonly remote: string;
  constructor(readonly id: string, readonly dir: string) {
    this.work = path.join(dir, 'work');
    this.home = path.join(dir, 'home');
    this.remote = path.join(dir, 'remote.git');
  }

  async prepareRemote(): Promise<void> {
    const result = await execGit(['init', '--bare', '--initial-branch=main', this.remote], this.work, this.home);
    if (result.exitCode !== 0) throw new SandboxError(result.stderr || 'Could not create the private practice remote.');
  }

  touch(): void { this.lastUsed = Date.now(); }
  private enqueue<T>(fn: () => Promise<T>): Promise<T> {
    const p = this.queue.then(fn, fn);
    this.queue = p.catch(() => undefined);
    return p;
  }

  state(): Promise<RepoState> { return this.enqueue(() => readState(this.work, this.home)); }

  run(line: string, opts: RunOptions = {}): Promise<RunResult> {
    return this.enqueue(async () => {
      this.touch();
      const previousState = opts.capturePreviousState ? await readState(this.work, this.home) : EMPTY_STATE;
      const base = { line, command: null, argv: null, risk: null, exitCode: null, stdout: '', stderr: '', truncated: false, timedOut: false, durationMs: 0, previousState };
      const parsed = parseCommand(line);
      if (!parsed.ok) return { ...base, ok: false, rejected: true, needsConfirmation: false, stderr: parsed.error, state: previousState };
      const meta = { ...base, command: parsed.parsed.command, argv: parsed.argv, risk: parsed.risk };
      if (parsed.risk === 'destructive' && opts.requireConfirm && !opts.confirmed) {
        return { ...meta, ok: false, rejected: true, needsConfirmation: true, stderr: 'This command can permanently discard work. Confirm to run it.', state: opts.capturePreviousState ? previousState : await readState(this.work, this.home) };
      }
      let r: ExecResult;
      if (parsed.parsed.command === 'remote' && parsed.parsed.sub === 'add') {
        if (!await fs.stat(this.remote).then(() => true, () => false)) await this.prepareRemote();
        const privateUrl = this.remote.replace(/\\/g, '/');
        r = await execGit(['remote', 'add', 'origin', privateUrl], this.work, this.home);
        if (r.exitCode === 0) {
          const remoteConfig: [string, string][] = [
            ['remote.pushDefault', 'origin'],
            ['push.default', 'current'],
            ['branch.main.remote', 'origin'],
            ['branch.main.merge', 'refs/heads/main'],
          ];
          for (const [key, value] of remoteConfig) {
            const configured = await execGit(['config', '--local', key, value], this.work, this.home);
            if (configured.exitCode !== 0) { r = configured; break; }
          }
        }
      } else if (parsed.parsed.command === 'push') {
        const remote = await execGit(['config', '--local', '--get', 'remote.origin.url'], this.work, this.home);
        if (remote.exitCode !== 0 || path.resolve(remote.stdout.trim()) !== path.resolve(this.remote)) {
          r = { exitCode: 1, stdout: '', stderr: 'No private remote is configured. Add it with `git remote add origin arbor-demo` first.', truncated: false, timedOut: false, durationMs: 0 };
        } else {
          r = await execGit(parsed.argv, this.work, this.home);
        }
      } else {
        r = await execGit(parsed.argv, this.work, this.home);
      }
      return { ...meta, ok: r.exitCode === 0, rejected: false, needsConfirmation: false, exitCode: r.exitCode, stdout: r.stdout, stderr: r.stderr, truncated: r.truncated, timedOut: r.timedOut, durationMs: r.durationMs, state: await readState(this.work, this.home) };
    });
  }

  /* ---- file explorer API ---- */
  list(): Promise<FileEntry[]> {
    return this.enqueue(async () => {
      const out: FileEntry[] = [];
      const walk = async (dir: string, prefix: string): Promise<void> => {
        for (const e of await fs.readdir(dir, { withFileTypes: true })) {
          if (e.name === '.git' || out.length >= LIMITS.maxListEntries) continue;
          const rel = prefix ? `${prefix}/${e.name}` : e.name;
          if (e.isDirectory()) await walk(path.join(dir, e.name), rel);
          else if (e.isFile()) out.push({ path: rel, size: (await fs.stat(path.join(dir, e.name))).size });
        }
      };
      await walk(this.work, '');
      return out.sort((a, b) => a.path.localeCompare(b.path));
    });
  }
  read(rel: string): Promise<string> {
    return this.enqueue(async () => {
      const abs = await resolveInside(this.work, rel);
      const st = await fs.stat(abs).catch(() => null);
      if (!st?.isFile()) throw new SandboxError('File not found.');
      if (st.size > LIMITS.maxFileBytes) throw new SandboxError('File is too large to open.');
      const buf = await fs.readFile(abs);
      if (buf.includes(0)) throw new SandboxError('Binary files can’t be opened in the editor.');
      return buf.toString('utf8');
    });
  }
  write(rel: string, content: string): Promise<void> {
    return this.enqueue(async () => {
      this.touch();
      if (Buffer.byteLength(content) > LIMITS.maxFileBytes) throw new SandboxError('File is too large (256 KB max).');
      const abs = await resolveInside(this.work, rel);
      const exists = await fs.stat(abs).then(() => true, () => false);
      if (!exists && (await this.countFiles()) >= LIMITS.maxFiles) throw new SandboxError(`A session can hold ${LIMITS.maxFiles} files at most.`);
      await fs.mkdir(path.dirname(abs), { recursive: true });
      await fs.writeFile(abs, content, 'utf8');
    });
  }
  remove(rel: string): Promise<void> {
    return this.enqueue(async () => { await fs.rm(await resolveInside(this.work, rel), { force: true }); });
  }
  rename(from: string, to: string): Promise<void> {
    return this.enqueue(async () => {
      const a = await resolveInside(this.work, from);
      const b = await resolveInside(this.work, to);
      if (await fs.stat(b).then(() => true, () => false)) throw new SandboxError('A file with that name already exists.');
      await fs.mkdir(path.dirname(b), { recursive: true });
      await fs.rename(a, b);
    });
  }
  private async countFiles(): Promise<number> {
    let n = 0;
    const walk = async (d: string): Promise<void> => { for (const e of await fs.readdir(d, { withFileTypes: true })) { if (e.name === '.git') continue; if (e.isDirectory()) await walk(path.join(d, e.name)); else n++; } };
    await walk(this.work);
    return n;
  }
  /** Wipe the working folder (including .git) and start empty. */
  wipe(): Promise<void> {
    return this.enqueue(async () => {
      await fs.rm(this.work, { recursive: true, force: true });
      await fs.mkdir(this.work, { recursive: true });
      await fs.rm(this.remote, { recursive: true, force: true });
      this.touch();
    });
  }
}

export interface ManagerOptions { root?: string; ttlMs?: number; maxSessions?: number }
const ID_RE = /^[a-f0-9]{32}$/;

export class SandboxManager {
  readonly root: string;
  private ttlMs: number;
  private maxSessions: number;
  private sessions = new Map<string, Sandbox>();
  private timer: NodeJS.Timeout | null = null;

  constructor(opts: ManagerOptions = {}) {
    this.root = path.resolve(opts.root ?? path.join(os.tmpdir(), 'arbor-sandboxes'));
    this.ttlMs = opts.ttlMs ?? 30 * 60_000;
    this.maxSessions = opts.maxSessions ?? 200;
  }

  async create(): Promise<Sandbox> {
    if (this.sessions.size >= this.maxSessions) { await this.sweep(); if (this.sessions.size >= this.maxSessions) throw new SandboxError('The playground is busy. Try again in a moment.'); }
    const id = randomBytes(16).toString('hex');
    const dir = path.join(this.root, id);
    await fs.mkdir(path.join(dir, 'work'), { recursive: true, mode: 0o700 });
    await fs.mkdir(path.join(dir, 'home'), { recursive: true, mode: 0o700 });
    const s = new Sandbox(id, dir);
    this.sessions.set(id, s);
    return s;
  }
  get(id: string): Sandbox | undefined { const s = ID_RE.test(id) ? this.sessions.get(id) : undefined; s?.touch(); return s; }
  /** Resetting wipes the session, so the caller must pass an explicit confirmation. */
  async reset(id: string, confirm: boolean): Promise<RepoState> {
    if (confirm !== true) throw new SandboxError('Resetting deletes everything in this session. Confirm to continue.');
    const s = this.get(id);
    if (!s) throw new SandboxError('Session not found.');
    await s.wipe();
    return EMPTY_STATE;
  }
  async destroy(id: string): Promise<void> {
    if (!ID_RE.test(id)) return;
    this.sessions.delete(id);
    const dir = path.join(this.root, id);
    if (dir.startsWith(this.root + path.sep)) await fs.rm(dir, { recursive: true, force: true });
  }
  async sweep(now = Date.now()): Promise<number> {
    const expired = [...this.sessions.values()].filter((s) => now - s.lastUsed > this.ttlMs);
    await Promise.all(expired.map((s) => this.destroy(s.id)));
    return expired.length;
  }
  startSweeper(everyMs = 60_000): void { this.timer ??= setInterval(() => void this.sweep(), everyMs).unref(); }
  async shutdown(): Promise<void> { if (this.timer) clearInterval(this.timer); this.timer = null; await Promise.all([...this.sessions.keys()].map((id) => this.destroy(id))); }
  get size(): number { return this.sessions.size; }
}
