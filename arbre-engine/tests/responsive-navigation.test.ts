import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const component = readFileSync(resolve(root, 'components', 'playground.tsx'), 'utf8');
const css = readFileSync(resolve(root, 'app', 'globals.css'), 'utf8');

describe('responsive primary navigation', () => {
  it('exposes the five primary mobile destinations and a secondary More sheet', () => {
    expect(component).toContain('aria-label="Primary navigation"');
    for (const label of ['aria-label="Home"', 'aria-label="Tree workspace"', 'aria-label="Playground"', 'aria-label="Learn Git"', 'aria-label="Documentation: Git command encyclopedia"']) {
      expect(component).toContain(label);
    }
    expect(component).toContain('aria-label="More destinations"');
    expect(component).toContain('id="mobile-more-sheet"');
  });

  it('replaces the sidebar with a fixed, safe-area-aware bar on tablet and mobile', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*?\.sidebar\s*\{\s*display:\s*none;/);
    expect(css).toMatch(/\.mobile-bottom-nav\s*\{[\s\S]*?position:\s*fixed;/);
    expect(css).toContain('env(safe-area-inset-bottom, 0px)');
    expect(css).toContain('.mobile-keyboard-open .mobile-bottom-nav');
    expect(component).toContain('aria-current={activeMobileDestination');
  });

  it('keeps the mobile documentation browser responsive and supports light/dark manual styling', () => {
    expect(css).toContain('.encyclopedia-layout');
    expect(css).toContain('@media (max-width: 620px)');
    expect(component).toContain('arbor-manual-theme');
    expect(component).toContain('aria-label="Filter commands"');
  });
});
