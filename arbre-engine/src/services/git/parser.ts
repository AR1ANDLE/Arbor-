/**
 * Validated Git command parser. A learner types a line like `git commit -m "x"`;
 * we tokenize it WITHOUT a shell, check every token against the registry allowlist,
 * and return an argv array. Nothing here ever builds a shell string.
 */
import { COMMANDS, COMMAND_NAMES, isCommand, type CommandSpec, type Parsed, type Risk, type ValueKind } from './registry';

export type ParseResult =
  | { ok: true; argv: string[]; parsed: Parsed; spec: CommandSpec; risk: Risk }
  | { ok: false; error: string };

const MAX_LINE = 2000;
const MAX_TOKENS = 64;
const SHELL_META = new Set([';', '&', '|', '<', '>', '`', '$', '(', ')']);
const fail = (error: string): { ok: false; error: string } => ({ ok: false, error });

export function tokenize(line: string): { ok: true; tokens: string[] } | { ok: false; error: string } {
  if (/[\0\r\n]/.test(line)) return fail('Enter one command on a single line.');
  if (line.length > MAX_LINE) return fail('That command is too long.');
  const tokens: string[] = [];
  let cur = '';
  let started = false;
  let quote: '"' | "'" | null = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i] as string;
    if (quote === "'") { if (c === "'") quote = null; else cur += c; continue; }
    if (quote === '"') {
      const next = line[i + 1];
      if (c === '"') quote = null;
      else if (c === '\\' && (next === '"' || next === '\\')) { cur += next; i++; }
      else cur += c;
      continue;
    }
    if (c === "'" || c === '"') { quote = c; started = true; continue; }
    if (c === '\\') { if (i + 1 < line.length) { cur += line[++i]; started = true; } continue; }
    if (/\s/.test(c)) { if (started) { tokens.push(cur); cur = ''; started = false; } continue; }
    if (SHELL_META.has(c)) return fail(`Shell characters such as ; & | < > $ ( ) aren’t supported — ARBOR runs one Git command at a time, without a shell.`);
    cur += c; started = true;
  }
  if (quote) return fail('A quotation mark was opened but never closed.');
  if (started) tokens.push(cur);
  if (tokens.length > MAX_TOKENS) return fail('That command has too many arguments.');
  return { ok: true, tokens };
}

/** Reject anything that could point outside the repository or at Git's own internals. */
export function badToken(t: string, loose = false): string | null {
  if (t.length > 255) return 'An argument is too long.';
  if (/[\0\r\n]/.test(t)) return 'An argument contains invalid characters.';
  if (loose) return null;
  if (t.startsWith('/') || /^[A-Za-z]:/.test(t)) return `“${t}” is an absolute path; use paths inside the project.`;
  if (t.startsWith(':')) return `“${t}” uses pathspec magic, which isn’t supported.`;
  if (t.includes('\\')) return 'Backslashes aren’t supported in paths.';
  const parts = t.split('/');
  if (parts.some((p) => p === '..')) return `“${t}” leaves the project folder.`;
  if (parts.some((p) => p.toLowerCase() === '.git')) return 'The .git folder is managed by Git itself and can’t be named directly.';
  return null;
}

function badValue(kind: ValueKind, v: string, flag: string): string | null {
  if (/[\0]/.test(v)) return `Invalid value for ${flag}.`;
  if (kind === 'int') return /^\d{1,4}$/.test(v) ? null : `${flag} needs a number.`;
  if (kind === 'ref') return v.startsWith('-') ? `${flag} needs a name, not an option.` : badToken(v);
  return v.length > 500 ? 'That message is too long (500 characters max).' : null;
}

export function parseCommand(line: string): ParseResult {
  const tk = tokenize(line);
  if (!tk.ok) return tk;
  const [first, name, ...rest] = tk.tokens;
  if (!first) return fail('Type a Git command, for example: git status');
  if (first !== 'git') return fail('Commands must start with “git”, for example: git status');
  if (!name) return fail('Type a Git command after “git”, for example: git status');
  if (name.startsWith('-')) return fail('Global options such as -c or -C aren’t available in the playground.');
  if (!isCommand(name)) return fail(`“git ${name}” isn’t available in ARBOR yet. Available: ${COMMAND_NAMES.join(', ')}.`);
  const spec = COMMANDS[name] as CommandSpec;

  let i = 0;
  let sub: string | null = null;
  if (spec.subcommands) {
    const head = rest[0];
    if (head && !head.startsWith('-')) {
      if (!spec.subcommands.includes(head)) return fail(`“git ${name} ${head}” isn’t a ${name} action. Try: ${spec.subcommands.join(', ')}.`);
      sub = head; i = 1;
    } else sub = spec.defaultSub ?? null;
  }

  const flags = new Map<string, string | true>();
  const emitted: string[] = [];
  const positional: string[] = [];
  const dashdash: string[] = [];
  let sawDashDash = false;

  const takeValue = (key: string, canon: string, kind: ValueKind, inline: string | undefined): string | null => {
    let v = inline;
    if (v === undefined) { if (i + 1 >= rest.length) return `${key} needs a value.`; v = rest[++i] as string; }
    const err = badValue(kind, v, key);
    if (err) return err;
    flags.set(canon, v);
    emitted.push(key, v);
    return null;
  };

  for (; i < rest.length; i++) {
    const tok = rest[i] as string;
    if (sawDashDash) { dashdash.push(tok); continue; }
    if (tok === '--') { sawDashDash = true; continue; }
    if (!tok.startsWith('-') || tok === '-') { positional.push(tok); continue; }

    if (tok.startsWith('--')) {
      const eq = tok.indexOf('=');
      const key = eq > 0 ? tok.slice(0, eq) : tok;
      const fs = Object.hasOwn(spec.flags, key) ? spec.flags[key] : undefined;
      if (!fs) return fail(`“${key}” isn’t a supported option for git ${name}.`);
      if (fs.value) { const e = takeValue(key, fs.canon, fs.value, eq > 0 ? tok.slice(eq + 1) : undefined); if (e) return fail(e); }
      else { if (eq > 0) return fail(`${key} doesn’t take a value.`); flags.set(fs.canon, true); emitted.push(tok); }
      continue;
    }
    // Single dash: exact spelling first (-vv, -m), then numeric (-3), then a cluster (-am).
    const whole = Object.hasOwn(spec.flags, tok) ? spec.flags[tok] : undefined;
    if (whole) {
      if (whole.value) { const e = takeValue(tok, whole.canon, whole.value, undefined); if (e) return fail(e); }
      else { flags.set(whole.canon, true); emitted.push(tok); }
      continue;
    }
    if (spec.numericFlag && /^-\d{1,4}$/.test(tok)) { flags.set('--max-count', tok.slice(1)); emitted.push(tok); continue; }
    for (let j = 1; j < tok.length; j++) {
      const key = `-${tok[j]}`;
      const fs = Object.hasOwn(spec.flags, key) ? spec.flags[key] : undefined;
      if (!fs) return fail(`“${key}” isn’t a supported option for git ${name}.`);
      if (fs.value) {
        const attached = tok.slice(j + 1);
        const e = takeValue(key, fs.canon, fs.value, attached || undefined);
        if (e) return fail(e);
        break;
      }
      flags.set(fs.canon, true); emitted.push(key);
    }
  }

  if (spec.positional === 'none' && (positional.length || dashdash.length)) return fail(`git ${name} doesn’t take file or branch arguments here.`);
  if (spec.maxPositional !== undefined && positional.length > spec.maxPositional) return fail(`git ${name} was given too many arguments.`);
  for (const t of [...positional, ...dashdash]) {
    const err = badToken(t, spec.loose);
    if (err) return fail(err);
  }

  const parsed: Parsed = { command: name, sub, flags, positional, dashdash, sawDashDash };
  const reqErr = spec.requires?.(parsed);
  if (reqErr) return fail(reqErr);

  const argv = [name, ...(sub ? [sub] : []), ...(spec.inject?.(parsed) ?? []), ...emitted, ...positional, ...(sawDashDash ? ['--', ...dashdash] : [])];
  return { ok: true, argv, parsed, spec, risk: spec.classify?.(parsed) ?? spec.risk };
}
