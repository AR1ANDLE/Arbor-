/** Runs the real git binary: argv arrays only, no shell, sanitized env, hard limits. */
import { spawn } from 'node:child_process';
import path from 'node:path';

export interface ExecResult { exitCode: number | null; stdout: string; stderr: string; truncated: boolean; timedOut: boolean; durationMs: number }
export interface ExecOptions {
  timeoutMs?: number;
  maxBytes?: number;
  /** Test-only seam (never populated from user input): lets tests exercise the limits with a slow process. */
  bin?: string;
}

/** Config injected through the environment so no user-controlled file can override it. */
const FORCED_CONFIG: [string, string][] = [
  // The per-session home is private and outside the worktree. A nonexistent
  // hooks directory disables hooks on both Windows and POSIX hosts.
  ['core.fsmonitor', 'false'],
  ['protocol.allow', 'never'],      // no network transports in the sandbox
  ['protocol.file.allow', 'always'], // the only remote is a generated bare repo inside the session folder
  ['user.useConfigOnly', 'true'],   // never guess an identity from the host
  ['init.defaultBranch', 'main'],
  ['color.ui', 'never'],
  ['core.quotepath', 'false'],
  ['commit.gpgsign', 'false'],
  ['tag.gpgsign', 'false'],
  ['gc.auto', '0'],
];

export function gitEnv(home: string, cwd: string): NodeJS.ProcessEnv {
  const config: [string, string][] = [
    ['core.hooksPath', path.join(home, 'hooks-disabled')], // hooks are arbitrary code: never run them
    ...FORCED_CONFIG,
  ];
  const env: NodeJS.ProcessEnv = {
    PATH: process.env.PATH ?? process.env.Path ?? '/usr/bin:/bin',
    HOME: home,
    NODE_ENV: 'production',
    LC_ALL: 'C',
    GIT_CONFIG_NOSYSTEM: '1',
    // An empty per-session file is portable; Windows Git does not consistently
    // accept the Win32 null device as a config file.
    GIT_CONFIG_GLOBAL: path.join(home, 'gitconfig.global'),
    GIT_ATTR_NOSYSTEM: '1',
    GIT_TERMINAL_PROMPT: '0',
    GIT_EDITOR: process.platform === 'win32' ? 'cmd /c exit 0' : 'true',
    GIT_SEQUENCE_EDITOR: process.platform === 'win32' ? 'cmd /c exit 0' : 'true',
    GIT_PAGER: 'cat',
    GIT_OPTIONAL_LOCKS: '0',
    // Never discover a repository above the sandbox folder.
    GIT_CEILING_DIRECTORIES: path.dirname(cwd),
    GIT_CONFIG_COUNT: String(config.length),
  };
  config.forEach(([k, v], i) => { env[`GIT_CONFIG_KEY_${i}`] = k; env[`GIT_CONFIG_VALUE_${i}`] = v; });
  return env;
}

export function execGit(argv: string[], cwd: string, home: string, opts: ExecOptions = {}): Promise<ExecResult> {
  const timeoutMs = opts.timeoutMs ?? 10_000;
  const maxBytes = opts.maxBytes ?? 256 * 1024;
  return new Promise((resolve) => {
    const start = Date.now();
    let truncated = false;
    let timedOut = false;
    let size = 0;
    const out: Buffer[] = [];
    const err: Buffer[] = [];
    const finish = (exitCode: number | null, extra = '') => {
      clearTimeout(timer);
      resolve({ exitCode, stdout: Buffer.concat(out).toString('utf8'), stderr: Buffer.concat(err).toString('utf8') + extra, truncated, timedOut, durationMs: Date.now() - start });
    };
    const child = spawn(opts.bin ?? 'git', argv, { cwd, env: gitEnv(home, cwd), shell: false, stdio: ['ignore', 'pipe', 'pipe'] });
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, timeoutMs);
    const collect = (bucket: Buffer[]) => (chunk: Buffer) => {
      if (size >= maxBytes) return;
      const room = maxBytes - size;
      bucket.push(chunk.length > room ? chunk.subarray(0, room) : chunk);
      size += Math.min(chunk.length, room);
      if (size >= maxBytes) { truncated = true; child.kill('SIGKILL'); }
    };
    child.stdout.on('data', collect(out));
    child.stderr.on('data', collect(err));
    child.on('error', (e) => finish(null, `Could not start git: ${e.message}`));
    child.on('close', (code) => finish(code, timedOut ? '\n[stopped: the command took too long]' : truncated ? '\n[output truncated]' : ''));
  });
}
