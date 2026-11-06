"use client";

import { animate, stagger } from "animejs";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { GitBranch, GitCommit, GitTag, TreeGrowthEvent } from "@/types/git";
import { curveBetween, layoutForest, type BranchLayout, type Point } from "@/components/tree-layout";

const animatedEvents = new Set<string>();

function hashNumber(value: string) {
  let result = 0;
  for (const char of value) result = (result * 33 + char.charCodeAt(0)) >>> 0;
  return result;
}

function CommitMark({
  commit,
  point,
  selected,
  onSelect,
}: {
  commit: GitCommit;
  point: Point;
  selected: boolean;
  onSelect?: (commit: GitCommit) => void;
}) {
  const activate = () => onSelect?.(commit);
  const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  };
  return (
    <g
      className={`tree-commit-mark${selected ? " is-selected" : ""}`}
      transform={`translate(${point.x} ${point.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${commit.subject}, commit ${commit.shortHash}${selected ? ", selected" : ""}`}
      aria-pressed={selected}
      onClick={activate}
      onKeyDown={onKeyDown}
    >
      <path className="commit-mark-hit" d="M-12 -10 H12 V10 H-12 Z" />
      <path className="commit-growth-ring" d={selected ? "M-6 -1 Q0 4 6 -1 M-5 -4 Q0 0 5 -4" : "M-5 -1 Q0 3 5 -1"} />
    </g>
  );
}

export function TreeScene({
  initialized,
  commits,
  branches,
  tags,
  publishedCommits,
  stashCount,
  activeCommit,
  headCommit,
  growthEvent,
  layoutKey,
  onSelectCommit,
}: {
  initialized: boolean;
  commits: GitCommit[];
  branches: GitBranch[];
  tags: GitTag[];
  publishedCommits: string[];
  stashCount: number;
  activeCommit: string | null;
  headCommit: string | null;
  growthEvent: TreeGrowthEvent | null;
  layoutKey?: string | null;
  onSelectCommit?: (commit: GitCommit) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [focusedBranch, setFocusedBranch] = useState<string | null>(null);
  const [savedLayouts, setSavedLayouts] = useState<Record<string, BranchLayout>>({});
  const [loadedLayoutKey, setLoadedLayoutKey] = useState<string | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const visibleBranches = useMemo(() => focusedBranch
    ? branches.filter((branch) => branch.current || branch.name === "main" || branch.name === "master" || branch.name === focusedBranch)
    : branches, [branches, focusedBranch]);
  const forest = useMemo(() => layoutForest(commits, visibleBranches, tags, loadedLayoutKey === layoutKey ? savedLayouts : {}), [commits, visibleBranches, tags, savedLayouts, loadedLayoutKey, layoutKey]);
  const viewBox = forest.viewBox;
  const camera = {
    x: viewBox.x + (viewBox.width - viewBox.width / zoom) / 2 + pan.x,
    y: viewBox.y + (viewBox.height - viewBox.height / zoom) / 2 + pan.y,
    width: viewBox.width / zoom,
    height: viewBox.height / zoom,
  };
  const published = useMemo(() => new Set(publishedCommits), [publishedCommits]);
  const eventLeaves = useMemo(() => new Set(growthEvent?.publishedCommits ?? []), [growthEvent]);
  const headPoint = headCommit ? forest.positions.get(headCommit) : undefined;

  const panStart = (event: PointerEvent<SVGSVGElement>) => {
    if ((event.target as Element).closest(".tree-commit-mark, .branch-label")) return;
    drag.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const panMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!drag.current || !svgRef.current) return;
    const previous = drag.current;
    drag.current = { x: event.clientX, y: event.clientY };
    const bounds = svgRef.current.getBoundingClientRect();
    setPan((current) => ({
      x: current.x - (event.clientX - previous.x) * camera.width / bounds.width,
      y: current.y - (event.clientY - previous.y) * camera.height / bounds.height,
    }));
  };
  const panEnd = () => { drag.current = null; };

  useLayoutEffect(() => {
    if (!layoutKey) {
      setSavedLayouts({});
      setLoadedLayoutKey(null);
      return;
    }
    try {
      const raw = window.localStorage.getItem(`arbor-tree-layout:${layoutKey}`);
      const parsed = raw ? JSON.parse(raw) as Record<string, Partial<BranchLayout>> : {};
      const valid = Object.fromEntries(Object.entries(parsed).flatMap(([key, item]) =>
        item && (item.side === 1 || item.side === -1)
          && typeof item.angle === "number" && Number.isFinite(item.angle)
          && typeof item.stemLength === "number" && Number.isFinite(item.stemLength)
          ? [[key, { side: item.side, angle: item.angle, stemLength: item.stemLength } as BranchLayout]]
          : [],
      ));
      setSavedLayouts(valid);
    } catch {
      setSavedLayouts({});
    }
    setLoadedLayoutKey(layoutKey);
  }, [layoutKey]);

  useEffect(() => {
    if (!layoutKey || loadedLayoutKey !== layoutKey) return;
    const current = Object.fromEntries(forest.branches.map((branch) => [branch.layoutKey, branch.layout]));
    const next = { ...savedLayouts, ...current };
    try { window.localStorage.setItem(`arbor-tree-layout:${layoutKey}`, JSON.stringify(next)); } catch { /* Browser storage can be unavailable. */ }
    if (Object.keys(current).some((key) => savedLayouts[key] === undefined)) setSavedLayouts(next);
  }, [forest.branches, layoutKey, loadedLayoutKey, savedLayouts]);

  useLayoutEffect(() => {
    if (!growthEvent || animatedEvents.has(growthEvent.id) || !svgRef.current) return;
    animatedEvents.add(growthEvent.id);
    const svg = svgRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-grow-path='true']"));
    const tweens = paths.map((path, index) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      return gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.9,
        delay: index * 0.09,
        ease: "power2.out",
        onComplete: () => {
          path.style.strokeDasharray = "";
          path.style.strokeDashoffset = "";
        },
      });
    });
    const leaves = Array.from(svg.querySelectorAll<SVGGElement>("[data-grow-leaf='true']"));
    const leafAnimation = leaves.length
      ? animate(leaves, { opacity: [0, 1], scale: [0.15, 1], duration: 850, delay: stagger(80), ease: "outElastic(1, .55)" })
      : null;
    const stashBadge = svg.querySelector<SVGGElement>("[data-grow-stash='true']");
    const stashAnimation = stashBadge
      ? animate(stashBadge, { scale: [0.75, 1.08, 1], duration: 550, ease: "out(3)" })
      : null;

    return () => {
      tweens.forEach((tween) => tween.kill());
      leafAnimation?.pause();
      stashAnimation?.pause();
    };
  }, [growthEvent]);

  const trunkActive = branches.find((branch) => branch.current)?.name;
  const growthCopy = growthEvent
    ? `${growthEvent.command} · ${growthEvent.message}`
    : !initialized
      ? "Empty ground · start with git init"
      : commits.length === 0
        ? "Roots are planted · your first commit starts the trunk"
        : "Commits extend wood · successful pushes grow leaves";

  return (
    <div className="tree-canvas">
      <div className="tree-view-controls" role="group" aria-label="Tree view controls">
        <button type="button" aria-label="Zoom out" title="Zoom out" onClick={() => setZoom((value) => Math.max(0.65, value / 1.2))}>−</button>
        <button type="button" aria-label="Zoom in" title="Zoom in" onClick={() => setZoom((value) => Math.min(3, value * 1.2))}>+</button>
        <button type="button" aria-label="Reset tree view" title="Reset tree view" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}>Fit</button>
        <button type="button" aria-pressed={focusedBranch !== null} aria-label={focusedBranch ? "Show all branches" : "Focus active branch"} title={focusedBranch ? "Show all branches" : "Focus active branch"} onClick={() => setFocusedBranch((value) => value ? null : branches.find((branch) => branch.current)?.name ?? null)}>{focusedBranch ? "All" : "Focus"}</button>
      </div>
      <svg
        ref={svgRef}
        className="tree-illustration"
        viewBox={`${camera.x} ${camera.y} ${camera.width} ${camera.height}`}
        role="group"
        aria-label="An event-driven 2D tree showing repository growth. Select a commit mark to inspect its message."
        preserveAspectRatio="xMidYMid meet"
        data-layout-collisions={forest.collisions}
        onPointerDown={panStart}
        onPointerMove={panMove}
        onPointerUp={panEnd}
        onPointerCancel={panEnd}
      >
        <defs>
          <pattern id="tree-paper-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="currentColor" opacity=".1" />
          </pattern>
        </defs>
        <rect x={viewBox.x} y={viewBox.y} width={viewBox.width} height={viewBox.height} fill="url(#tree-paper-dots)" pointerEvents="none" />
        <path className="tree-ground" d="M206 247 Q360 234 514 247" />

        {initialized && (
          <g className="tree-roots" aria-hidden="true">
            <path className="root-outline" d="M356 233 C342 239 324 246 304 254 M359 234 C355 242 351 249 349 257 M363 234 C376 241 397 247 416 255 M352 235 C338 237 329 241 322 246 M368 235 C383 237 394 241 402 246" data-grow-path={growthEvent?.kind === "roots" ? "true" : undefined} />
            <path className="root-highlight" d="M356 233 C342 239 324 246 304 254 M359 234 C355 242 351 249 349 257 M363 234 C376 241 397 247 416 255 M352 235 C338 237 329 241 322 246 M368 235 C383 237 394 241 402 246" />
          </g>
        )}

        {initialized && forest.trunk.length > 0 && (
          <g className={`trunk-growth${trunkActive === "main" || trunkActive === "master" ? " is-active" : ""}`} aria-label="Main trunk">
            {forest.trunk.map((segment, index) => {
              const path = curveBetween(segment.from, segment.to, 1);
              const newest = segment.commitHash === growthEvent?.commitHash
                && (growthEvent.kind === "commit" || growthEvent.kind === "merge");
              const width = Math.max(4, 15 - index * 0.27);
              return (
                <g key={segment.id}>
                  <path className="wood-outline" d={path} strokeWidth={width + 4} data-grow-path={newest ? "true" : undefined} />
                  <path className="wood-bark" d={path} strokeWidth={width} />
                  {segment.commitHash && <path className="bark-detail" d={`M ${segment.to.x - 3.5} ${segment.to.y + 1} Q ${segment.to.x} ${segment.to.y + 4} ${segment.to.x + 3.5} ${segment.to.y + 1}`} />}
                </g>
              );
            })}
          </g>
        )}

        {forest.branches.map(({ branch, segments }) => (
          <g key={branch.name} className={`tree-branch${branch.current ? " is-active" : ""}`} data-branch={branch.name} data-accent={hashNumber(branch.name) % 5}>
            {segments.map((segment) => {
              const path = curveBetween(segment.from, segment.to, segment.to.x >= segment.from.x ? 1 : -1);
              const isNewBranch = growthEvent?.kind === "branch" && growthEvent.targetBranch === branch.name;
              const isNewCommit = growthEvent?.kind === "commit" && growthEvent.commitHash === segment.commitHash;
              const isGraft = growthEvent?.kind === "merge" && growthEvent.commitHash === segment.commitHash;
              const grow = isNewBranch || isNewCommit || isGraft;
              return (
                <g key={segment.id}>
                  <path className="wood-outline branch-wood-outline" d={path} data-grow-path={grow ? "true" : undefined} />
                  <path className="wood-bark branch-wood" d={path} />
                  {segment.commitHash && <path className="bark-detail" d={`M ${segment.to.x - 3} ${segment.to.y + 1} Q ${segment.to.x} ${segment.to.y + 3} ${segment.to.x + 3} ${segment.to.y + 1}`} />}
                </g>
              );
            })}
          </g>
        ))}

        {forest.grafts.map((graft) => (
          <path
            key={graft.id}
            className="tree-graft"
            d={graft.d}
            data-grow-path={growthEvent?.kind === "merge" && growthEvent.commitHash === graft.commitHash ? "true" : undefined}
            aria-label="Git merge graft between parent histories"
          />
        ))}

        {forest.branches.map(({ branch, label }) => (
            <g
              key={`label-${branch.name}`}
              className={`branch-label${branch.current ? " is-active" : ""}`}
              data-accent={hashNumber(branch.name) % 5}
              transform={`translate(${label.x} ${label.y})`}
              role="button"
              tabIndex={0}
              aria-label={`Focus ${branch.name}${branch.current ? ", active branch" : ""}`}
              aria-pressed={focusedBranch === branch.name}
              onClick={() => setFocusedBranch((current) => current === branch.name ? null : branch.name)}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setFocusedBranch((current) => current === branch.name ? null : branch.name); } }}
            >
              <rect x={-label.width / 2} y="-9" width={label.width} height="18" rx="4" />
              <text x="0" y="3" textAnchor="middle">{branch.name}{branch.current ? " · active" : ""}</text>
            </g>
        ))}

        {publishedCommits.flatMap((hash) => {
          const point = forest.positions.get(hash);
          if (!point || !published.has(hash)) return [];
          const seed = hashNumber(hash);
          return [0, 1].map((index) => {
            const side = (seed + index) % 2 ? 1 : -1;
            const x = point.x + side * (10 + ((seed >>> (index * 3)) % 10));
            const y = point.y - 7 - ((seed >>> (index * 5)) % 7);
            const rotation = side * (18 + ((seed >>> (index * 4)) % 32));
            const newLeaf = growthEvent?.kind === "push" && eventLeaves.has(hash);
            return (
              <g key={`leaf-${hash}-${index}`} className="published-leaf" transform={`translate(${x} ${y}) rotate(${rotation})`} data-grow-leaf={newLeaf ? "true" : undefined}>
                <path className="leaf-stem" d="M0 6 Q-2 2 0 -1" />
                <path className="leaf-blade" d="M0 1 C-11 -2 -10 -11 -2 -10 C5 -9 6 -3 0 1 Z" />
                <path className="leaf-vein" d="M0 1 Q-1 -5 -5 -8" />
              </g>
            );
          });
        })}

        {commits.map((commit) => {
          const point = forest.positions.get(commit.hash);
          return point ? (
            <CommitMark
              key={commit.hash}
              commit={commit}
              point={point}
              selected={activeCommit === commit.hash}
              onSelect={onSelectCommit}
            />
          ) : null;
        })}

        {tags.map((tag) => {
          const point = forest.tagPositions.get(tag.name);
          if (!point) return null;
          const isNewTag = growthEvent?.kind === "tag" && growthEvent.commitHash === tag.commit;
          return (
            <g key={tag.name} className="milestone-marker" transform={`translate(${point.x} ${point.y})`} data-grow-tag={isNewTag ? "true" : undefined}>
              <path d="M0 0 V12 M1 1 H12 L9 5 L12 9 H1" />
              <text x="15" y="8">{tag.name}</text>
            </g>
          );
        })}

        {headPoint && (
          <g className="head-indicator" transform={`translate(${headPoint.x - 18} ${headPoint.y - 1})`} aria-label="HEAD points to this commit">
            <path d="M0 0 H12 M8 -4 L12 0 L8 4" />
            <text x="-4" y="-6" textAnchor="end">HEAD</text>
          </g>
        )}

        {stashCount > 0 && (
          <g className="stash-indicator" transform={`translate(${viewBox.x + viewBox.width - 120} ${viewBox.y + viewBox.height - 42})`} data-grow-stash={growthEvent?.kind === "stash" ? "true" : undefined}>
            <path d="M0 1 Q0 -2 4 -2 H13 Q16 -2 16 1 V12 H0 Z M4 3 H12" />
            <text x="22" y="8">{stashCount} stashed</text>
          </g>
        )}
      </svg>
      <div className="tree-branch-key" role="group" aria-label="Branch focus">
        {branches.map((branch) => (
          <button
            key={branch.name}
            type="button"
            className={branch.current ? "is-active" : ""}
            data-accent={hashNumber(branch.name) % 5}
            aria-pressed={focusedBranch === branch.name}
            onClick={() => setFocusedBranch((value) => value === branch.name ? null : branch.name)}
          >{branch.name}{branch.current ? " · active" : ""}</button>
        ))}
      </div>
      <span className="tree-caption" role="status" aria-live="polite" title={growthCopy}>{growthCopy}</span>
    </div>
  );
}
