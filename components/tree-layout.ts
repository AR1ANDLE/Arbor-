import type { GitBranch, GitCommit, GitTag } from "../types/git";

export type Point = { x: number; y: number };
export type Segment = { id: string; from: Point; to: Point; branch: string; commitHash: string | null; kind: "trunk" | "branch" };
export type BranchLayout = { side: number; angle: number; stemLength: number };
export type BranchPath = { branch: GitBranch; segments: Segment[]; tip: Point; side: number; label: { x: number; y: number; width: number }; layoutKey: string; layout: BranchLayout };
export type Forest = {
  positions: Map<string, Point>;
  trunk: Segment[];
  branches: BranchPath[];
  grafts: { id: string; d: string; commitHash: string }[];
  tagPositions: Map<string, Point>;
  viewBox: { x: number; y: number; width: number; height: number };
  collisions: number;
};

const ground = { x: 360, y: 232 };

export function curveBetween(from: Point, to: Point, side: number) {
  const rise = from.y - to.y;
  const reach = to.x - from.x;
  const sweep = Math.abs(reach) > 3 ? Math.sign(reach) : side;
  return `M ${from.x} ${from.y} C ${from.x + sweep * Math.max(8, Math.abs(reach) * 0.22)} ${from.y - Math.max(2, rise * 0.32)}, ${to.x - sweep * Math.max(6, Math.abs(reach) * 0.18)} ${to.y + Math.max(2, rise * 0.3)}, ${to.x} ${to.y}`;
}

function hashNumber(value: string) {
  let result = 0;
  for (const char of value) result = (result * 33 + char.charCodeAt(0)) >>> 0;
  return result;
}

function firstParentPath(tip: string | null, byHash: Map<string, GitCommit>) {
  const path: GitCommit[] = [];
  const seen = new Set<string>();
  let commit = tip ? byHash.get(tip) : undefined;
  while (commit && !seen.has(commit.hash)) {
    seen.add(commit.hash);
    path.push(commit);
    commit = commit.parents[0] ? byHash.get(commit.parents[0]) : undefined;
  }
  return path.reverse();
}

function overlap(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) {
  return Math.abs(a.x - b.x) < (a.width + b.width) / 2 + 8
    && Math.abs(a.y - b.y) < (a.height + b.height) / 2 + 5;
}

function distanceToSegment(point: Point, a: Point, b: Point) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSq = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSq));
  return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy));
}

function branchCandidates(name: string) {
  const seed = hashNumber(name);
  const side = seed & 1 ? 1 : -1;
  const start = 18 + (seed % 64);
  return Array.from({ length: 23 }, (_, index) => {
    const step = index === 0 ? 0 : Math.ceil(index / 2) * 9 * (index % 2 ? 1 : -1);
    const angle = 18 + ((((start - 18 + step) % 64) + 64) % 64);
    return { side: index > 11 ? -side : side, angle: angle * Math.PI / 180 };
  });
}

export function layoutForest(commits: GitCommit[], branches: GitBranch[], tags: GitTag[] = [], savedLayouts: Record<string, BranchLayout> = {}): Forest {
  const byHash = new Map(commits.map((commit) => [commit.hash, commit]));
  const positions = new Map<string, Point>();
  const trunk: Segment[] = [];
  const primary = branches.find((branch) => branch.name === "main")
    ?? branches.find((branch) => branch.name === "master")
    ?? branches.find((branch) => branch.current)
    ?? branches[0];

  if (primary) {
    const path = firstParentPath(primary.commit, byHash);
    let previous = ground;
    path.forEach((commit, index) => {
      // Fixed commit coordinates keep existing trunk history still as new commits arrive.
      const point = { x: 360 + Math.sin(index * 0.19) * 2.4, y: 210 - index * 15 };
      positions.set(commit.hash, point);
      trunk.push({ id: `trunk-${commit.hash}`, from: previous, to: point, branch: primary.name, commitHash: commit.hash, kind: "trunk" });
      previous = point;
    });
  }

  const candidates = [...branches]
    .filter((branch) => branch.name !== primary?.name && branch.commit)
    .sort((a, b) => a.name.localeCompare(b.name));
  const placedBranches = new Map<string, BranchPath>();
  const occupied: Segment[] = [];
  const occupiedMarkers: Point[] = [...positions.values()];
  const labels: { x: number; y: number; width: number; height: number }[] = [];
  let collisions = 0;

  // Resolve a ref's nearest parent ref first, so nested branches attach to their real fork.
  const placeBranch = (branch: GitBranch, trail = new Set<string>()): BranchPath | undefined => {
    const cached = placedBranches.get(branch.name);
    if (cached) return cached;
    if (!branch.commit || trail.has(branch.name)) return undefined;
    const nextTrail = new Set(trail).add(branch.name);
    const ancestors = firstParentPath(branch.commit, byHash).slice(0, -1).reverse();
    const parentRef = candidates
      .filter((other) => other.name !== branch.name && !positions.has(other.commit!) && ancestors.some((commit) => commit.hash === other.commit))
      .map((other) => ({ other, distance: ancestors.findIndex((commit) => commit.hash === other.commit) }))
      .sort((a, b) => a.distance - b.distance)[0]?.other;
    if (parentRef) placeBranch(parentRef, nextTrail);

    const chain: GitCommit[] = [];
    const seen = new Set<string>();
    let commit = byHash.get(branch.commit);
    while (commit && !positions.has(commit.hash) && !seen.has(commit.hash)) {
      seen.add(commit.hash);
      chain.push(commit);
      commit = commit.parents[0] ? byHash.get(commit.parents[0]) : undefined;
    }
    const base = commit ? positions.get(commit.hash) : undefined;
    if (!base) return undefined;

    const width = Math.max(48, branch.name.length * 5.4 + (branch.current ? 36 : 16));
    const branchesForCollision = occupied;
    const layoutKey = `${branch.name}@${commit?.hash ?? "root"}`;
    const savedLayout = savedLayouts[layoutKey];
    const directions = savedLayout ? [savedLayout] : branchCandidates(branch.name);
    const stemLength = savedLayout?.stemLength ?? 34 + (hashNumber(branch.name) % 31) * 1.5;
    let selected: { side: number; angle: number; points: Point[]; penalty: number } | undefined;
    for (const direction of directions) {
      const chainLength = Math.max(1, chain.length);
      const points = chainLength === 1 && chain.length === 0
        ? [{ x: base.x + direction.side * Math.sin(direction.angle) * stemLength, y: base.y - Math.cos(direction.angle) * stemLength }]
        : chain.slice().reverse().map((_, index) => {
            const length = stemLength + index * 22;
            return {
              x: base.x + direction.side * Math.sin(direction.angle) * length + direction.side * Math.sin(index * 0.63) * 2.2,
              y: base.y - Math.cos(direction.angle) * length - Math.sin(index * 0.46) * 2,
            };
          });
      const samples = [base, ...points];
      let penalty = 0;
      for (const segment of branchesForCollision) {
        for (let i = 1; i < samples.length; i++) {
          const from = samples[i - 1]!;
          const to = samples[i]!;
          for (const t of [0.2, 0.4, 0.6, 0.8, 1]) {
            if (i === 1 && t < 0.6 && segment.from.x === base.x && segment.from.y === base.y) continue;
            const sample = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
            const distance = distanceToSegment(sample, segment.from, segment.to);
            if (distance < 12) penalty += (12 - distance) * 4;
          }
        }
      }
      for (const point of points) for (const marker of occupiedMarkers) {
        const distance = Math.hypot(point.x - marker.x, point.y - marker.y);
        if (distance < 12) penalty += 100000;
        else if (distance < 24) penalty += (24 - distance) * 100;
      }
      const tip = points[points.length - 1]!;
      const labelCandidates = [
        { x: tip.x + direction.side * (width / 2 + 14), y: tip.y - 10 },
        { x: tip.x - direction.side * (width / 2 + 14), y: tip.y - 10 },
        { x: tip.x, y: tip.y - 28 },
        { x: tip.x, y: tip.y + 25 },
      ];
      const label = labelCandidates.map((pos) => ({ ...pos, width, height: 20 })).sort((a, b) => {
        const pa = labels.reduce((sum, box) => sum + (overlap(a, box) ? 1000 : 0), 0)
          + occupiedMarkers.reduce((sum, marker) => sum + (Math.hypot(a.x - marker.x, a.y - marker.y) < width / 2 + 16 ? 90 : 0), 0);
        const pb = labels.reduce((sum, box) => sum + (overlap(b, box) ? 1000 : 0), 0)
          + occupiedMarkers.reduce((sum, marker) => sum + (Math.hypot(b.x - marker.x, b.y - marker.y) < width / 2 + 16 ? 90 : 0), 0);
        return pa - pb;
      })[0]!;
      penalty += labels.reduce((sum, box) => sum + (overlap(label, box) ? 1000 : 0), 0);
      if (!selected || penalty < selected.penalty) selected = { ...direction, points, penalty };
      if (penalty === 0) break;
    }
    const direction = selected!;
    if (direction.penalty > 0) collisions++;
    const segments: Segment[] = [];
    let previous = base;
    if (!chain.length) {
      const point = direction.points[0]!;
      segments.push({ id: `branch-${branch.name}-bud`, from: previous, to: point, branch: branch.name, commitHash: null, kind: "branch" });
      occupiedMarkers.push(point);
      previous = point;
    } else {
      chain.slice().reverse().forEach((item, index) => {
        const point = direction.points[index]!;
        positions.set(item.hash, point);
        segments.push({ id: `branch-${branch.name}-${item.hash}`, from: previous, to: point, branch: branch.name, commitHash: item.hash, kind: "branch" });
        occupiedMarkers.push(point);
        previous = point;
      });
    }
    const labelSpots = Array.from({ length: 13 * 16 }, (_, index) => {
      const radius = Math.floor(index / 16) * 28 + 1;
      const angle = (index % 16) * Math.PI / 8;
      const radiusX = width / 2 + 20 + radius;
      return { x: previous.x + Math.cos(angle) * radiusX, y: previous.y + Math.sin(angle) * (30 + radius), width, height: 20 };
    });
    const labelPenalty = (box: { x: number; y: number; width: number; height: number }) =>
      labels.reduce((sum, existing) => sum + (overlap(box, existing) ? 1000 : 0), 0)
      + occupiedMarkers.reduce((sum, marker) => sum + (Math.hypot(box.x - marker.x, box.y - marker.y) < width / 2 + 15 ? 150 : 0), 0);
    const label = labelSpots.sort((a, b) => labelPenalty(a) - labelPenalty(b))[0]!;
    if (labelPenalty(label) > 0) collisions++;
    labels.push({ ...label, height: 20 });
    occupied.push(...segments);
    const placed = { branch, segments, tip: previous, side: direction.side, label, layoutKey, layout: { side: direction.side, angle: direction.angle, stemLength } };
    placedBranches.set(branch.name, placed);
    return placed;
  };

  for (const branch of candidates) placeBranch(branch);
  const branchPaths = [...placedBranches.values()].sort((a, b) => a.branch.name.localeCompare(b.branch.name));

  const tagPositions = new Map<string, Point>();
  const tagBoxes: { x: number; y: number; width: number; height: number }[] = [];
  for (const tag of tags) {
    const commitPoint = positions.get(tag.commit);
    if (!commitPoint) continue;
    const placements = [
      { x: commitPoint.x + 15, y: commitPoint.y - 8 },
      { x: commitPoint.x - 48, y: commitPoint.y - 8 },
      { x: commitPoint.x + 15, y: commitPoint.y - 29 },
      { x: commitPoint.x - 48, y: commitPoint.y + 20 },
    ];
    const boxFor = (point: Point) => ({ x: point.x + 18, y: point.y, width: Math.max(34, tag.name.length * 5 + 14), height: 16 });
    const penalty = (point: Point) => {
      const box = boxFor(point);
      return tagBoxes.reduce((sum, existing) => sum + (overlap(box, existing) ? 1000 : 0), 0)
        + labels.reduce((sum, label) => sum + (overlap(box, label) ? 1000 : 0), 0)
        + [...occupiedMarkers].filter((marker) => marker !== commitPoint).reduce((sum, marker) => sum + (Math.hypot(box.x - marker.x, box.y - marker.y) < box.width / 2 + 12 ? 100 : 0), 0);
    };
    const point = placements.sort((a, b) => penalty(a) - penalty(b))[0]!;
    tagPositions.set(tag.name, point);
    tagBoxes.push(boxFor(point));
    occupiedMarkers.push({ x: point.x + 18, y: point.y });
  }

  const grafts: Forest["grafts"] = [];
  for (const item of commits) {
    if (item.parents.length < 2) continue;
    const child = positions.get(item.hash);
    const secondParent = positions.get(item.parents[1]!);
    if (!child || !secondParent) continue;
    const direction = child.x >= secondParent.x ? 1 : -1;
    const d = `M ${secondParent.x} ${secondParent.y} C ${secondParent.x + direction * 26} ${secondParent.y - 4}, ${child.x - direction * 24} ${child.y + 7}, ${child.x} ${child.y}`;
    grafts.push({ id: `graft-${item.hash}`, d, commitHash: item.hash });
  }

  const points = [ground, ...positions.values(), ...tagPositions.values(), ...tagBoxes.flatMap((box) => [{ x: box.x - box.width / 2, y: box.y - box.height / 2 }, { x: box.x + box.width / 2, y: box.y + box.height / 2 }]), ...branchPaths.flatMap((branch) => [branch.tip, { x: branch.label.x - branch.label.width / 2, y: branch.label.y - 10 }, { x: branch.label.x + branch.label.width / 2, y: branch.label.y + 10 }])];
  const minX = Math.min(...points.map((point) => point.x));
  const maxX = Math.max(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxY = Math.max(ground.y + 34, ...points.map((point) => point.y));
  const width = Math.max(720, maxX - minX + 72);
  const height = Math.max(270, maxY - minY + 52);
  const viewBox = { x: (minX + maxX) / 2 - width / 2, y: maxY - height, width, height };
  return { positions, trunk, branches: branchPaths, grafts, tagPositions, viewBox, collisions };
}
