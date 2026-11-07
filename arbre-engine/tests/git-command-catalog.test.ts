import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import catalog from '../../data/git-command-catalog.json';
import { COMMANDS, COMMAND_NAMES } from '../src/services/git';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

describe('versioned Git command catalog coverage', () => {
  it('matches every built-in name discovered by the target Git installation', () => {
    const targetVersion = execFileSync('git', ['--version'], { encoding: 'utf8' }).trim().replace(/^git version\s+/, '');
    const installedNames = execFileSync('git', ['--list-cmds=main'], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean).sort();
    const catalogNames = catalog.builtinCommands.map((entry) => entry.name).sort();
    expect(catalog.gitVersion).toBe(targetVersion);
    expect(catalogNames).toEqual(installedNames);
  });

  it('gives every built-in an entry and includes each available installed manual', () => {
    const uniqueNames = new Set(catalog.builtinCommands.map((entry) => entry.name));
    expect(uniqueNames.size).toBe(catalog.builtinCommands.length);
    for (const entry of catalog.builtinCommands) {
      expect(entry.documented).toBe(true);
      expect(existsSync(resolve(root, 'docs', 'git-command-entries', `${entry.slug}.md`))).toBe(true);
      if (entry.manualAvailable) {
        expect(existsSync(resolve(root, 'public', entry.manualPath.slice(1)))).toBe(true);
        expect(entry.officialDocumentationUrl).toContain(`/docs/git-${entry.name}/`);
      }
    }
  });

  it('keeps external helpers and concept guides outside the built-in command set', () => {
    const builtinNames = new Set(catalog.builtinCommands.map((entry) => entry.name));
    const installedHelpers = execFileSync('git', ['--list-cmds=others'], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean).sort();
    const installedGuides = execFileSync('git', ['help', '-g'], { encoding: 'utf8' }).split(/\r?\n/)
      .map((line) => line.match(/^\s{3}(\S+)\s{2,}.+$/)?.[1]).filter((name): name is string => Boolean(name)).sort();
    expect(catalog.externalHelpers.map((helper) => helper.name).sort()).toEqual(installedHelpers);
    expect(catalog.guides.map((guide) => guide.name).sort()).toEqual(installedGuides);
    for (const helper of catalog.externalHelpers) {
      expect(helper.externalHelper).toBe(true);
      expect(helper.playgroundSupported).toBe(false);
      expect(builtinNames.has(helper.name)).toBe(false);
    }
    for (const guide of catalog.guides) {
      expect(guide.type).toBe('guide');
      if (guide.manualAvailable) expect(existsSync(resolve(root, 'public', guide.manualPath.slice(1)))).toBe(true);
    }
    expect(new Set(catalog.guides.map((guide) => guide.name)).size).toBe(catalog.guides.length);
  });

  it('keeps documentation-only commands out of the playground allowlist', () => {
    for (const name of COMMAND_NAMES) {
      expect(catalog.builtinCommands.find((entry) => entry.name === name)?.playgroundSupported).toBe(true);
    }
    for (const entry of catalog.builtinCommands) {
      expect(entry.playgroundSupported).toBe(Object.hasOwn(COMMANDS, entry.name));
      if (!entry.playgroundSupported) expect(entry.safeForEducationalExecution).toBe(false);
    }
  });

  it('records its known command-manual gaps instead of claiming full manual coverage', () => {
    const report = readFileSync(resolve(root, 'docs', 'git-command-coverage.md'), 'utf8');
    const missingManuals = catalog.builtinCommands.filter((entry) => !entry.manualAvailable);
    expect(report).toContain(`| Built-ins without a standalone installed manual | ${missingManuals.length} |`);
    for (const entry of missingManuals) expect(report).toContain(`git ${entry.name}`);
    expect(report).toContain('does not meet the requested fully annotated 24-field template');
  });
});
