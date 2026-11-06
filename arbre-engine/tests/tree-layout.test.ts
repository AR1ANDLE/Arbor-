import { describe, expect, it } from 'vitest';
import { layoutForest } from '../../components/tree-layout';
import type { GitBranch, GitCommit } from '../../types/git';

const commit = (hash: string, parents: string[] = []): GitCommit => ({ hash, shortHash: hash, subject: hash, author: 'test', parents });
const branch = (name: string, commitHash: string, current = false): GitBranch => ({ name, commit: commitHash, current });
const labelOverlaps = (a: { x: number; y: number; width: number; height?: number }, b: { x: number; y: number; width: number; height?: number }) =>
  Math.abs(a.x - b.x) < (a.width + b.width) / 2 + 8 && Math.abs(a.y - b.y) < ((a.height ?? 20) + (b.height ?? 20)) / 2 + 5;

describe('deterministic tree branch layout', () => {
  it.each([2, 3, 5, 10, 16])('separates %i sibling branch tips and labels', (count) => {
    const commits = [commit('root')];
    const branches = [branch('main', 'root', true), ...Array.from({ length: count }, (_, i) => branch(`feature/${String(i).padStart(2, '0')}`, 'root'))];
    const forest = layoutForest(commits, branches);
    if (count === 16) console.log(forest.branches.map(({ branch: item, tip }) => [item.name, tip.x, tip.y]));
    expect(forest.branches).toHaveLength(count);
    expect(new Set(forest.branches.map((item) => `${Math.round(item.tip.x)}:${Math.round(item.tip.y)}`)).size).toBe(count);
    for (let i = 0; i < forest.branches.length; i++) {
      for (let j = i + 1; j < forest.branches.length; j++) {
        expect(labelOverlaps(forest.branches[i]!.label, forest.branches[j]!.label)).toBe(false);
      }
    }
  });

  it('anchors nested branches to the parent branch commit and remains stable after adding a sibling', () => {
    const commits = [commit('root'), commit('feature-1', ['root']), commit('nested-1', ['feature-1'])];
    const baseBranches = [branch('main', 'root', true), branch('feature/parent', 'feature-1')];
    const original = layoutForest(commits, baseBranches);
    const saved = Object.fromEntries(original.branches.map((item) => [item.layoutKey, item.layout]));
    const expanded = layoutForest(commits, [...baseBranches, branch('feature/a-sibling', 'root')], [], saved);
    const nestedBranches = [...baseBranches, branch('feature/child', 'nested-1')];
    const nested = layoutForest(commits, nestedBranches);
    const parentPoint = nested.positions.get('feature-1')!;
    const childPath = nested.branches.find((item) => item.branch.name === 'feature/child')!;
    expect(childPath.segments[0]!.from).toEqual(parentPoint);
    expect(expanded.positions.get('feature-1')).toEqual(original.positions.get('feature-1'));
    expect(expanded.branches.find((item) => item.branch.name === 'feature/parent')!.tip).toEqual(original.branches[0]!.tip);
  });

  it('keeps long growth points distinct and represents true merge parents', () => {
    const commits = [commit('root')];
    let previous = 'root';
    for (let index = 1; index <= 30; index++) {
      const hash = `feature-${index}`;
      commits.push(commit(hash, [previous]));
      previous = hash;
    }
    commits.push(commit('main-merge', ['root', previous]));
    const forest = layoutForest(commits, [branch('main', 'main-merge', true), branch('feature/long', previous)]);
    const featurePoints = Array.from({ length: 30 }, (_, index) => forest.positions.get(`feature-${index + 1}`)!);
    expect(new Set(featurePoints.map((point) => `${point.x.toFixed(2)}:${point.y.toFixed(2)}`)).size).toBe(30);
    expect(forest.grafts).toHaveLength(1);
    expect(forest.grafts[0]!.commitHash).toBe('main-merge');
    expect(forest.viewBox.width).toBeGreaterThanOrEqual(720);
  });

  it('separates milestone markers from one another and branch labels', () => {
    const commits = [commit('root')];
    const branches = [branch('main', 'root', true), branch('feature/side', 'root')];
    const tags = ['v1', 'v1.1', 'release-candidate', 'v2'].map((name) => ({ name, commit: 'root', annotated: false }));
    const forest = layoutForest(commits, branches, tags);
    const boxes = tags.map((tag) => {
      const position = forest.tagPositions.get(tag.name)!;
      return { x: position.x + 18, y: position.y, width: Math.max(34, tag.name.length * 5 + 14), height: 16 };
    });
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      expect(labelOverlaps(boxes[i]!, boxes[j]!)).toBe(false);
    }
    expect(boxes.every((box) => forest.branches.every((item) => !labelOverlaps(box, item.label)))).toBe(true);
  });
});
