import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../../app/globals.css', import.meta.url), 'utf8');
const scene = readFileSync(new URL('../../components/tree-scene.tsx', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../../app/layout.tsx', import.meta.url), 'utf8');

describe('tree theme and responsive styling', () => {
  it('uses shared light and dark tree tokens with a transparent SVG surface', () => {
    expect(css).toMatch(/--tree-surface:\s*#fffdf5/);
    expect(css).toMatch(/:root\[data-theme="dark"\][\s\S]*?--tree-surface:\s*#302f28/);
    expect(css).toMatch(/\.tree-canvas\s*\{[^}]*background-color:\s*var\(--tree-surface\)/s);
    expect(scene).toContain('fill="url(#tree-paper-dots)"');
    expect(scene).not.toContain('fill="#fffdf5"');
  });

  it('retains a narrow-screen branch key and removes the minimum-width overflow', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*1120px\)[\s\S]*?\.tree-branch-key/);
    expect(css).toMatch(/\.tree-branch-key\s*\{[^}]*overflow-x:\s*auto/s);
    expect(css).toMatch(/html\s*\{\s*min-width:\s*0/s);
  });

  it('loads the existing appearance preference before the app renders', () => {
    expect(layout).toContain('localStorage.getItem("arbor-theme")');
    expect(layout).toContain('suppressHydrationWarning');
  });
});
