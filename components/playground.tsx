"use client";

import {
  BookOpen,
  BookText,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  House,
  MoreHorizontal,
  Moon,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  Sprout,
  Sun,
  Terminal as TerminalIcon,
  Trees,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gitCommandCatalog from "@/data/git-command-catalog.json";
import { COMMANDS } from "@/arbre-engine/src/services/git/registry";
import { TreeScene } from "@/components/tree-scene";
import type {
  CommandExplanation,
  RepositoryState,
  TreeGrowthEvent,
} from "@/types/git";

type View = "playground" | "learn" | "commands" | "settings";
type MobileDestination = "home" | "tree" | "playground" | "learn" | "documentation" | "more";
type ApiResult<T> = T & { error?: string; output?: string };
type GitCommandEntry = (typeof gitCommandCatalog.builtinCommands)[number];
const commandExamples = [...new Set(Object.values(COMMANDS).flatMap((spec) => spec.examples))];
const commandCategories = [...new Set(gitCommandCatalog.builtinCommands.map((command) => command.category))].sort();
const documentationSuggestions = [
  "undo my last commit",
  "find who changed this line",
  "list files tracked by Git",
  "inspect an object",
  "stage part of a file",
  "recover a lost commit",
  "compare two branches",
  "work with a remote",
];

const learningLessons = [
  {
    title: "Three places Git keeps track of",
    category: "FOUNDATIONS",
    duration: "5 min",
    description: "Understand your working tree, staging area, and repository.",
    question: "Where do changes wait after git add, before you commit?",
    options: ["Working tree", "Staging area", "Repository history"],
    answer: 1,
    explanation: "The staging area is your shortlist of changes for the next commit.",
    review: "Think about the three places: files you edit, changes selected for a snapshot, and recorded project history.",
    command: "git status",
  },
  {
    title: "Your first commit",
    category: "YOUR FIRST REPOSITORY",
    duration: "8 min",
    description: "Choose what belongs in a snapshot, then save it in history.",
    question: "What does a commit record?",
    options: ["A snapshot of staged changes", "A copy on a remote server", "A backup of every file"],
    answer: 0,
    explanation: "A commit records the staged snapshot and connects it to the repository's history.",
    review: "A commit is a local point in history; it does not upload anything to another server.",
    command: 'git commit -m "A thoughtful change"',
  },
  {
    title: "Branches are pointers",
    category: "BRANCHES",
    duration: "7 min",
    description: "Experiment on a side branch without losing your main line.",
    question: "What happens when you create a branch?",
    options: ["Git copies every project file", "HEAD switches immediately", "Git adds a name at the current commit"],
    answer: 2,
    explanation: "A branch is a lightweight movable name pointing to a commit. Creating it alone does not switch branches.",
    review: "Creating a branch adds a name at the current commit. Switching branches is a separate action.",
    command: "git branch feature/garden",
  },
];

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const body = (await response.json()) as ApiResult<T>;
  if (!response.ok) throw new Error(body.error ?? "The request could not be completed.");
  return body;
}

function errorText(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

function playWoodenTone(context: AudioContext) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(523, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(392, context.currentTime + 0.18);
  gain.gain.setValueAtTime(0.035, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.2);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.21);
}

export function Playground() {
  const [view, setViewState] = useState<View>("playground");
  const [activeMobileDestination, setActiveMobileDestination] = useState<MobileDestination>("home");
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileKeyboardOpen, setMobileKeyboardOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [repository, setRepository] = useState<RepositoryState | null>(null);
  const [output, setOutput] = useState<string[]>([
    "Welcome to your little Git garden.",
    "Try `git init` when you're ready. Type `help` to see supported commands.",
  ]);
  const [explanation, setExplanation] = useState<CommandExplanation | null>(null);
  const [selectedFile, setSelectedFile] = useState("README.md");
  const [fileContents, setFileContents] = useState("");
  const [fileName, setFileName] = useState("README.md");
  const [newFileName, setNewFileName] = useState("");
  const [command, setCommand] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [activeCommit, setActiveCommit] = useState<string | null>(null);
  const [growthEvent, setGrowthEvent] = useState<TreeGrowthEvent | null>(null);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [commandCategory, setCommandCategory] = useState("All categories");
  const [commandDifficulty, setCommandDifficulty] = useState("all");
  const [commandRisk, setCommandRisk] = useState("all");
  const [selectedDocCommand, setSelectedDocCommand] = useState("add");
  const [recentlyViewedCommands, setRecentlyViewedCommands] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([false, false, false]);
  const [lessonAnswers, setLessonAnswers] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);
  const commandInput = useRef<HTMLInputElement>(null);
  const documentationSearchInput = useRef<HTMLInputElement>(null);
  const treePanelRef = useRef<HTMLElement>(null);
  const terminalPanelRef = useRef<HTMLElement>(null);
  const manualFrameRef = useRef<HTMLIFrameElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const moreFirstItemRef = useRef<HTMLButtonElement>(null);
  const keyboardBaselineRef = useRef(0);
  const initializationRef = useRef<
    Promise<{
      id: string;
      state: RepositoryState;
      theme: string | null;
      progress: boolean[];
    }> | null
  >(null);
  const audioContext = useRef<AudioContext | null>(null);

  const navigateView = useCallback((next: View, destination?: MobileDestination) => {
    setViewState(next);
    setActiveMobileDestination(destination ?? (
      next === "learn" ? "learn" : next === "commands" ? "documentation" : next === "settings" ? "more" : "playground"
    ));
    setMoreOpen(false);
  }, []);

  const syncState = useCallback(async (id: string) => {
    const result = await requestJson<{ state: RepositoryState }>(
      `/api/playground/${id}`,
      { cache: "no-store" },
    );
    setRepository(result.state);
  }, []);

  useEffect(() => {
    let active = true;
    const start = async (): Promise<{
      id: string;
      state: RepositoryState;
      theme: string | null;
      progress: boolean[];
    }> => {
      const theme = window.localStorage.getItem("arbor-theme");
      const savedProgress = window.localStorage.getItem("arbor-lesson-progress") ?? "";
      const progress = learningLessons.map((_, index) => savedProgress[index] === "1");
      const storedId = window.localStorage.getItem("arbor-playground");
      if (storedId) {
        try {
          const existing = await requestJson<{ state: RepositoryState }>(
            `/api/playground/${storedId}`,
            { cache: "no-store" },
          );
          return { id: storedId, state: existing.state, theme, progress };
        } catch {
          window.localStorage.removeItem("arbor-playground");
        }
      }
      const created = await requestJson<{ id: string; state: RepositoryState }>(
        "/api/playground",
        { method: "POST" },
      );
      return { ...created, theme, progress };
    };
    if (!initializationRef.current) {
      initializationRef.current = start();
    }
    initializationRef.current
      .then(({ id, state, theme, progress }) => {
        if (!active) return;
        setSessionId(id);
        setRepository(state);
        setIsDark(theme === "dark");
        setPreferencesLoaded(true);
        setCompletedLessons(progress);
        window.localStorage.setItem("arbor-playground", id);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setPreferencesLoaded(true);
        setError(errorText(reason));
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    if (preferencesLoaded) window.localStorage.setItem("arbor-theme", isDark ? "dark" : "light");
  }, [isDark, preferencesLoaded]);

  useEffect(() => {
    const stored = window.localStorage.getItem("arbor-recent-git-docs");
    if (!stored) return;
    try {
      const names = JSON.parse(stored) as string[];
      setRecentlyViewedCommands(names.filter((name) => gitCommandCatalog.builtinCommands.some((entry) => entry.name === name)).slice(0, 6));
    } catch {
      window.localStorage.removeItem("arbor-recent-git-docs");
    }
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (view !== "playground") return;
      if (activeMobileDestination === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      if (activeMobileDestination === "tree") treePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (activeMobileDestination === "playground") {
        terminalPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        commandInput.current?.focus({ preventScroll: true });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeMobileDestination, view]);

  useEffect(() => {
    if (!moreOpen) return;
    moreFirstItemRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMoreOpen(false);
      moreButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [moreOpen]);

  useEffect(() => {
    keyboardBaselineRef.current = window.visualViewport?.height ?? window.innerHeight;
    const syncKeyboard = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const active = document.activeElement;
      const isEditing = active instanceof HTMLElement && (
        active.matches("input, textarea, select") || active.isContentEditable
      );
      const isSmallViewport = window.innerWidth <= 900;
      setMobileKeyboardOpen(isSmallViewport && isEditing && keyboardBaselineRef.current - viewportHeight > 120);
      if (!isEditing || !isSmallViewport) keyboardBaselineRef.current = viewportHeight;
    };
    window.addEventListener("resize", syncKeyboard);
    window.addEventListener("focusin", syncKeyboard);
    window.addEventListener("focusout", syncKeyboard);
    window.visualViewport?.addEventListener("resize", syncKeyboard);
    syncKeyboard();
    return () => {
      window.removeEventListener("resize", syncKeyboard);
      window.removeEventListener("focusin", syncKeyboard);
      window.removeEventListener("focusout", syncKeyboard);
      window.visualViewport?.removeEventListener("resize", syncKeyboard);
    };
  }, []);

  useEffect(() => {
    const documentBody = manualFrameRef.current?.contentDocument;
    if (!documentBody) return;
    let themeStyle = documentBody.getElementById("arbor-manual-theme") as HTMLStyleElement | null;
    if (!themeStyle) {
      themeStyle = documentBody.createElement("style");
      themeStyle.id = "arbor-manual-theme";
      documentBody.head.appendChild(themeStyle);
    }
    themeStyle.textContent = isDark
      ? "html, body, #header, #content, #footer { background: #302f28 !important; color: #fff9e9 !important; } a, a code { color: #efc43a !important; } pre, code, .listingblock, .literalblock { background-color: #25251f !important; color: #fff9e9 !important; } table, th, td { border-color: #5a5545 !important; }"
      : "html, body, #header, #content, #footer { background: #fffdf5 !important; color: #211f1b !important; } a, a code { color: #725500 !important; } pre, code, .listingblock, .literalblock { background-color: #f3f0e5 !important; color: #211f1b !important; } table, th, td { border-color: #d8d1bd !important; }";
  }, [isDark, selectedDocCommand]);

  const files = useMemo(() => {
    const known = new Set(repository?.files ?? ["README.md", "src/hello.txt"]);
    for (const file of repository?.staged ?? []) known.add(file.path);
    for (const file of repository?.changed ?? []) known.add(file.path);
    return Array.from(known).sort((a, b) => a.localeCompare(b));
  }, [repository]);

  useEffect(() => {
    if (!sessionId) return;
    let active = true;
    requestJson<{ content: string }>(
      `/api/playground/${sessionId}/file?path=${encodeURIComponent(selectedFile)}`,
      { cache: "no-store" },
    )
      .then(({ content }) => {
        if (!active) return;
        setFileContents(content);
        setFileName(selectedFile);
      })
      .catch(() => {
        if (!active) return;
        setFileContents("");
        setFileName(selectedFile);
      });
    return () => {
      active = false;
    };
  }, [selectedFile, sessionId]);

  const setLatestExplanation = useCallback((
    title: string,
    body: string,
    concept: string,
    state: RepositoryState,
  ) => {
    const changed = state.changed.length
      ? `${state.changed.length} file${state.changed.length === 1 ? "" : "s"} changed or untracked.`
      : "No unstaged changes.";
    const staged = state.staged.length
      ? `${state.staged.length} file${state.staged.length === 1 ? "" : "s"} prepared.`
      : "Nothing is staged.";
    setExplanation({
      title,
      body,
      concept,
      workingTree: changed,
      stagingArea: staged,
      repository: `${state.commits.length} commit${state.commits.length === 1 ? "" : "s"} in recent history.`,
      head: state.branch
        ? `HEAD follows ${state.branch}${state.head ? ` at ${state.head.slice(0, 7)}` : " (no commits yet)"}.`
        : "HEAD is not pointing to a branch yet.",
    });
  }, []);

  const answerLesson = (lessonIndex: number, answer: number) => {
    setLessonAnswers((current) =>
      current.map((selected, index) => (index === lessonIndex ? answer : selected)),
    );
    if (answer !== learningLessons[lessonIndex].answer) return;
    const updated = completedLessons.map(
      (complete, index) => complete || index === lessonIndex,
    );
    setCompletedLessons(updated);
    try {
      window.localStorage.setItem(
        "arbor-lesson-progress",
        updated.map((complete) => (complete ? "1" : "0")).join(""),
      );
    } catch {
      setError("This browser could not save learning progress. The rest of the playground is unaffected.");
    }
  };

  const runCommand = useCallback(
    async (rawCommand: string) => {
      const line = rawCommand.trim();
      if (!line || busy) return;
      setOutput((items) => [...items, `$ ${line}`]);
      setCommand("");
      setError("");
      setCommandHistory((items) => [line, ...items].slice(0, 40));
      setHistoryIndex(-1);
      if (line === "clear") {
        setOutput([]);
        return;
      }
      if (line === "help") {
        setOutput((items) => [
          ...items,
          "Try git init, status, add, commit, branch, switch, merge, diff, log, stash, tag,",
          "restore, reset, revert, rm, mv, reflog, or cherry-pick. Shell commands are blocked.",
        ]);
        return;
      }
      if (!sessionId) {
        setError("Your playground is still starting. Try again in a moment.");
        return;
      }
      setBusy(true);
      try {
        const result = await requestJson<{
          ok: boolean;
          rejected: boolean;
          needsConfirmation: boolean;
          risk: string | null;
          output: string;
          explanation: string;
          state: RepositoryState;
          growthEvent: TreeGrowthEvent | null;
        }>(`/api/playground/${sessionId}/action`, {
          method: "POST",
          body: JSON.stringify({ line }),
        });
        let completed = result;
        if (result.needsConfirmation) {
          if (!window.confirm("This Git command can permanently discard work. Run it in this temporary repository?")) {
            setOutput((items) => [...items, "Command cancelled. No changes were made."]);
            return;
          }
          completed = await requestJson<typeof result>(`/api/playground/${sessionId}/action`, {
            method: "POST",
            body: JSON.stringify({ line, confirmed: true }),
          });
        }
        setGrowthEvent(completed.growthEvent);
        setRepository(completed.state);
        setOutput((items) => [
          ...items,
          completed.output || "(Git completed with no output.)",
        ]);
        setLatestExplanation(
          line,
          completed.explanation,
          completed.risk ?? "Git",
          completed.state,
        );
        if (completed.rejected || !completed.ok) {
          setGrowthEvent(null);
          setError(completed.output || "Git could not complete that command.");
          return;
        }
        if (soundEnabled && audioContext.current?.state === "running") {
          playWoodenTone(audioContext.current);
        }
        setNotice("Git confirmed the change.");
      } catch (reason) {
        const message = errorText(reason);
        setError(message);
        setOutput((items) => [...items, message]);
        if (message.toLowerCase().includes("conflict")) {
          setNotice("Git stopped the merge so you can resolve the conflict.");
        }
        try {
          await syncState(sessionId);
        } catch (syncError) {
          setError(`${message} ${errorText(syncError)}`);
        }
      } finally {
        setBusy(false);
      }
    },
    [busy, sessionId, soundEnabled, syncState, setLatestExplanation],
  );

  const openFile = async (path: string) => {
    setSelectedFile(path);
    setError("");
    try {
      const result = await requestJson<{ content: string }>(
        `/api/playground/${sessionId}/file?path=${encodeURIComponent(path)}`,
        { cache: "no-store" },
      );
      setFileName(path);
      setFileContents(result.content);
    } catch (reason) {
      setError(errorText(reason));
    }
  };

  const saveFile = async () => {
    if (!sessionId) return;
    setBusy(true);
    setError("");
    try {
      const result = await requestJson<{ state: RepositoryState }>(
        `/api/playground/${sessionId}/file`,
        {
          method: "PUT",
          body: JSON.stringify({ path: fileName, content: fileContents }),
        },
      );
      setRepository(result.state);
      setSelectedFile(fileName);
      setNotice("File saved to the temporary repository.");
    } catch (reason) {
      setError(errorText(reason));
    } finally {
      setBusy(false);
    }
  };

  const createFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sessionId || !newFileName.trim()) return;
    const cleanName = newFileName.trim();
    setBusy(true);
    setError("");
    try {
      const result = await requestJson<{ state: RepositoryState }>(
        `/api/playground/${sessionId}/file`,
        {
          method: "PUT",
          body: JSON.stringify({
            path: cleanName,
            content: `# ${cleanName.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "New file"}\n\nStart writing here.\n`,
          }),
        },
      );
      setRepository(result.state);
      setNewFileName("");
      setSelectedFile(cleanName);
      setFileName(cleanName);
      setFileContents(`# ${cleanName.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "New file"}\n\nStart writing here.\n`);
      setNotice("New file created.");
    } catch (reason) {
      setError(errorText(reason));
    } finally {
      setBusy(false);
    }
  };

  const resetRepository = async () => {
    if (!sessionId || !window.confirm("Start over? This permanently removes this temporary playground and its Git history.")) return;
    setBusy(true);
    setError("");
    try {
      const result = await requestJson<{ state: RepositoryState }>(
        `/api/playground/${sessionId}`,
        { method: "DELETE" },
      );
      setRepository(result.state);
      setOutput(["Playground reset. Your starter files are ready again."]);
      setExplanation(null);
      setSelectedFile("README.md");
      setNotice("Fresh playground created.");
    } catch (reason) {
      setError(errorText(reason));
    } finally {
      setBusy(false);
    }
  };

  const handleTerminalKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" && commandHistory.length) {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(next);
      setCommand(commandHistory[next]);
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setCommand(next < 0 ? "" : commandHistory[next]);
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setOutput([]);
    }
  };

  const toggleSounds = () => {
    if (soundEnabled) {
      setSoundEnabled(false);
      return;
    }
    const AudioContextConstructor = window.AudioContext;
    if (!AudioContextConstructor) {
      setError("Sound effects are not supported by this browser.");
      return;
    }
    const context = audioContext.current ?? new AudioContextConstructor();
    audioContext.current = context;
    void context
      .resume()
      .then(() => {
        setSoundEnabled(true);
        playWoodenTone(context);
        setNotice("Sound is on. The soft tone was a preview.");
      })
      .catch(() => {
        setError("The browser could not enable audio. Check your sound permissions and try again.");
      });
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (view === "commands") documentationSearchInput.current?.focus();
        else commandInput.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [view]);

  useEffect(() => {
    if (view !== "playground" || !command) return;
    const frame = window.requestAnimationFrame(() => commandInput.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [command, view]);

  useEffect(
    () => () => {
      if (audioContext.current && audioContext.current.state !== "closed") {
        void audioContext.current.close();
      }
    },
    [],
  );

  const activeBranch =
    repository?.branches.find((branch) => branch.current)?.name ?? repository?.branch;
  const selectedCommandEntry = gitCommandCatalog.builtinCommands.find((entry) => entry.name === selectedDocCommand) ?? gitCommandCatalog.builtinCommands[0];
  const recentEntries = recentlyViewedCommands
    .map((name) => gitCommandCatalog.builtinCommands.find((entry) => entry.name === name))
    .filter((entry): entry is GitCommandEntry => Boolean(entry));
  const filteredCommandEntries = gitCommandCatalog.builtinCommands.filter((entry) => {
    const query = search.trim().toLowerCase();
    const searchableText = `${entry.name} git ${entry.category} ${entry.sourceCategory} ${entry.description} ${entry.overview} ${entry.searchTerms.join(" ")}`.toLowerCase();
    return (!query || searchableText.includes(query))
      && (commandCategory === "All categories" || entry.category === commandCategory)
      && (commandDifficulty === "all" || entry.difficulty === commandDifficulty)
      && (commandRisk === "all" || entry.risk === commandRisk);
  });
  const relatedEntries = gitCommandCatalog.builtinCommands
    .filter((entry) => entry.category === selectedCommandEntry.category && entry.name !== selectedCommandEntry.name)
    .slice(0, 5);
  const selectedPlaygroundExample = COMMANDS[selectedCommandEntry.name]?.examples[0];
  const openCommandEntry = (name: string) => {
    setSelectedDocCommand(name);
    setRecentlyViewedCommands((current) => {
      const updated = [name, ...current.filter((item) => item !== name)].slice(0, 6);
      window.localStorage.setItem("arbor-recent-git-docs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className={`app-shell${isDark ? " theme-dark" : ""}${mobileKeyboardOpen ? " mobile-keyboard-open" : ""}`}>
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Arbor home">
          <span className="brand-mark"><Trees size={18} strokeWidth={1.8} /></span>
          <span>arbor<span className="brand-period">.</span></span>
        </Link>
        <div className="workspace-label">YOUR WORKSPACE</div>
        <nav className="main-nav" aria-label="Workspace navigation">
          <button className={view === "playground" ? "nav-link active" : "nav-link"} aria-current={view === "playground" ? "page" : undefined} onClick={() => navigateView("playground")}>
            <Sprout size={17} /> Playground <span className="nav-current" />
          </button>
          <button className={view === "learn" ? "nav-link active" : "nav-link"} aria-current={view === "learn" ? "page" : undefined} onClick={() => navigateView("learn")}>
            <BookOpen size={17} /> Git academy
          </button>
          <button className={view === "commands" ? "nav-link active" : "nav-link"} aria-current={view === "commands" ? "page" : undefined} onClick={() => navigateView("commands")}>
            <BookText size={17} /> Git command encyclopedia
          </button>
        </nav>
        <div className="side-divider" />
        <div className="workspace-label">REPOSITORY</div>
        <div className="repository-switcher">
          <span className="repo-avatar"><Sprout size={15} /></span>
          <span className="repo-name">little-garden</span>
          <ChevronDown size={14} />
        </div>
        <div className="repo-detail">
          <span className={`status-dot ${repository?.initialized ? "is-ready" : ""}`} />
          {repository?.initialized ? "Git repository" : "Not initialized yet"}
        </div>
        <div className="sidebar-bottom">
          <button className={view === "settings" ? "nav-link active" : "nav-link"} onClick={() => navigateView("settings")}><Settings2 size={17} /> Preferences</button>
          <button className="nav-link" onClick={() => setIsDark((current) => !current)}>
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
            {isDark ? "Light appearance" : "Dark appearance"}
          </button>
          <div className="profile-card">
            <span className="profile-avatar">A</span>
            <span><strong>Garden guest</strong><small>Learning locally</small></span>
            <CircleHelp size={17} className="profile-help" aria-hidden="true" />
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Playground</span><ChevronRight size={14} />
            <strong>{view === "playground" ? "My first repository" : view === "learn" ? "Git academy" : view === "commands" ? "Git command encyclopedia" : "Preferences"}</strong>
          </div>
          <div className="topbar-actions">
            <span className="privacy-pill"><span /> Private sandbox</span>
            <button className="icon-button" aria-label="Toggle dark appearance" title="Toggle dark appearance" onClick={() => setIsDark((current) => !current)}>
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="help-button" onClick={() => navigateView("learn")}><CircleHelp size={15} /> Help</button>
          </div>
        </header>

        <div className="content">
          {view === "playground" && (
            <>
              <section className="page-intro">
                <div>
                  <div className="eyebrow"><span className="eyebrow-line" /> A PLACE TO PRACTICE</div>
                  <h1>Grow your Git <em>garden.</em></h1>
                  <p>Every commit is a little growth. Try things out — this garden is yours to experiment in.</p>
                </div>
                <div className="intro-actions">
                  <button className="subtle-button" onClick={() => navigateView("learn")}><BookOpen size={15} /> Learn Git</button>
                  <button className="reset-button" onClick={() => void resetRepository()} disabled={!sessionId || busy}>
                    <RotateCcw size={14} /> Start over
                  </button>
                </div>
              </section>

              {error && <div className="feedback error-feedback" role="alert"><X size={15} />{error}<button onClick={() => setError("")} aria-label="Dismiss error"><X size={14} /></button></div>}
              {notice && !error && <div className="feedback notice-feedback" role="status"><Check size={15} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={14} /></button></div>}

              <div className="workspace-grid">
                <section className="tree-card panel" id="tree-workspace" ref={treePanelRef} tabIndex={-1}>
                  <div className="panel-heading tree-heading">
                    <div><div className="section-title">Your growing tree</div><div className="section-caption">{!repository?.initialized ? "Empty ground, ready to plant" : !repository.commits.length ? "Roots are down; your first commit starts the trunk" : "Commits extend wood. A successful push grows leaves."}</div></div>
                    <div className="tree-controls">
                      <span className="growth-label"><span /> {repository?.commits.length ?? 0} growth points</span>
                    </div>
                  </div>
                  {repository ? (
                    <TreeScene
                      initialized={repository.initialized}
                      commits={repository.commits}
                      branches={repository.branches}
                      tags={repository.tags}
                      publishedCommits={repository.publishedCommits}
                      stashCount={repository.stashCount}
                      activeCommit={activeCommit}
                      headCommit={repository.head}
                      growthEvent={growthEvent}
                      layoutKey={sessionId}
                      onSelectCommit={(commit) => setActiveCommit(commit.hash)}
                    />
                  ) : <div className="tree-loading" aria-label="Loading tree"><div className="loading-tree">♧</div><span>Growing your garden…</span></div>}
                  <div className="tree-legend">
                    <span><i className="legend-trunk" /> commit growth</span>
                    <span><i className="legend-commit" /> published leaves</span>
                    <span><i className="legend-head" /> milestone</span>
                  </div>
                  <div className="tree-alt">
                    <span className="sr-only">Text alternative: </span>
                    {repository?.commits.length
                      ? `${repository.commits.length} recent commits on ${repository.branches.length} branch${repository.branches.length === 1 ? "" : "es"}. Current branch is ${activeBranch ?? "detached"}.`
                      : "A young tree rests in its garden. Initialize the repository to begin growing its history."}
                  </div>
                </section>

                <section className="inspector-card panel">
                  <div className="panel-heading">
                    <div><div className="section-title">Repository snapshot</div><div className="section-caption">The real state, right now</div></div>
                    <span className="live-badge"><span /> LIVE</span>
                  </div>
                  <div className="branch-summary">
                    <span className="branch-icon"><GitBranch size={16} /></span>
                    <span><small>CURRENT BRANCH</small><strong>{activeBranch ?? "Not created yet"}</strong></span>
                    <span className="head-tag">HEAD</span>
                  </div>
                  <div className="state-stack">
                    <div className="state-row">
                      <span className="state-icon working"><Trees size={15} /></span>
                      <span><strong>Working tree</strong><small>Changes in your files</small></span>
                      <span className="state-count">{repository?.changed.length ?? "—"}</span>
                    </div>
                    <div className="state-row">
                      <span className="state-icon staged"><Check size={15} /></span>
                      <span><strong>Staging area</strong><small>Ready for a commit</small></span>
                      <span className="state-count">{repository?.staged.length ?? "—"}</span>
                    </div>
                    <div className="state-row">
                      <span className="state-icon committed"><GitCommitHorizontal size={15} /></span>
                      <span><strong>Repository</strong><small>Saved project history</small></span>
                      <span className="state-count">{repository?.commits.length ?? "—"}</span>
                    </div>
                  </div>
                  <div className="recent-heading"><span>RECENT GROWTH</span><button onClick={() => navigateView("learn")}>How it works <ChevronRight size={13} /></button></div>
                  <div className="commit-list">
                    {repository?.commits.slice(0, 3).map((commit) => (
                      <button
                        key={commit.hash}
                        className={`commit-row${activeCommit === commit.hash ? " selected" : ""}`}
                        onClick={() => setActiveCommit(commit.hash)}
                      >
                        <span className="commit-dot" />
                        <span className="commit-subject">{commit.subject}</span>
                        <code>{commit.shortHash}</code>
                      </button>
                    ))}
                    {!repository?.commits.length && (
                      <div className="empty-history"><GitCommitHorizontal size={16} /><span>Your first commit will appear here.</span></div>
                    )}
                  </div>
                  <div className="branch-footer"><GitBranch size={14} /> {repository?.branches.length ?? 0} branch{repository?.branches.length === 1 ? "" : "es"} <span className="branch-separator">·</span> <button onClick={() => commandInput.current?.focus()}>Create a branch</button></div>
                </section>

                <section className="files-card panel">
                  <div className="panel-heading files-heading">
                    <div><div className="section-title">Project files</div><div className="section-caption">Your sandbox workspace</div></div>
                    <form className="new-file-form" onSubmit={(event) => void createFile(event)}>
                      <label className="sr-only" htmlFor="new-file-name">New file path</label>
                      <input id="new-file-name" value={newFileName} onChange={(event) => setNewFileName(event.target.value)} placeholder="new-file.txt" />
                      <button aria-label="Create file" title="Create file" disabled={busy || !newFileName.trim()}><Plus size={15} /></button>
                    </form>
                  </div>
                  <div className="file-browser">
                    {files.map((file) => {
                      const status = repository?.changed.find((item) => item.path === file) ?? repository?.staged.find((item) => item.path === file);
                      return (
                        <button key={file} className={`file-row${selectedFile === file ? " selected" : ""}`} onClick={() => void openFile(file)}>
                          <span className="file-glyph">{file.endsWith(".md") ? "M" : file.endsWith(".js") || file.endsWith(".ts") ? "JS" : "txt"}</span>
                          <span>{file}</span>
                          {status && <span className={`file-status ${status.staged ? "staged-status" : "changed-status"}`}>{status.staged ? "staged" : status.untracked ? "new" : "modified"}</span>}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="editor-card panel">
                  <div className="panel-heading editor-heading">
                    <div><div className="section-title">{fileName}</div><div className="section-caption">Edit, then save to your working tree</div></div>
                    <button className="small-primary" onClick={() => void saveFile()} disabled={busy || !sessionId}><Check size={13} /> Save file</button>
                  </div>
                  <label className="sr-only" htmlFor="file-editor">Contents of {fileName}</label>
                  <textarea id="file-editor" className="file-editor" value={fileContents} onChange={(event) => setFileContents(event.target.value)} spellCheck={false} />
                </section>

                <section className="terminal-card panel" id="git-playground" ref={terminalPanelRef} tabIndex={-1}>
                  <div className="panel-heading terminal-heading">
                    <div className="terminal-title"><span className="terminal-icon"><TerminalIcon size={15} /></span><span><strong>Git terminal</strong><small>Real Git · isolated playground</small></span></div>
                    <div className="terminal-tools"><span className="safe-label"><span /> SANDBOXED</span><button className="icon-button small-icon" onClick={() => setOutput([])} title="Clear terminal" aria-label="Clear terminal"><RotateCcw size={14} /></button></div>
                  </div>
                  <div className="terminal-output" role="log" aria-live="polite" aria-label="Git command output">
                    {output.map((line, index) => <div key={`${index}-${line}`} className={line.startsWith("$ ") ? "terminal-command" : "terminal-result"}>{line}</div>)}
                    {busy && <div className="terminal-result terminal-pending"><span className="spinner" /> Git is tending the garden…</div>}
                  </div>
                  <form
                    className="terminal-input-row"
                    onSubmit={(event) => {
                      event.preventDefault();
                      void runCommand(command);
                    }}
                  >
                    <span className="prompt-mark">$</span>
                    <label className="sr-only" htmlFor="terminal-command">Enter a supported Git command</label>
                    <input
                      id="terminal-command"
                      ref={commandInput}
                      list="command-suggestions"
                      value={command}
                      onChange={(event) => setCommand(event.target.value)}
                      onKeyDown={handleTerminalKey}
                      placeholder="Try git status"
                      autoComplete="off"
                      disabled={busy}
                    />
                    <datalist id="command-suggestions">{commandExamples.map((example) => <option key={example} value={example} />)}</datalist>
                    <span className="keyboard-hint">↵</span>
                  </form>
                  <div className="terminal-shortcuts"><span><kbd>↑</kbd><kbd>↓</kbd> history</span><span><kbd>Ctrl</kbd> <kbd>K</kbd> focus terminal</span><button onClick={() => void runCommand("help")}>Available commands <ChevronRight size={12} /></button></div>
                </section>

                <section className="explanation-card panel">
                  <div className="panel-heading">
                    <div><div className="section-title">A little context</div><div className="section-caption">Understand what Git just did</div></div>
                    <CircleHelp size={16} className="muted-icon" />
                  </div>
                  {explanation ? (
                    <>
                      <div className="explanation-concept">{explanation.concept}</div>
                      <h3>{explanation.title}</h3>
                      <p>{explanation.body}</p>
                      <div className="explanation-facts">
                        <span><strong>Working tree</strong>{explanation.workingTree}</span>
                        <span><strong>Staging area</strong>{explanation.stagingArea}</span>
                        <span><strong>Repository</strong>{explanation.repository}</span>
                        <span><strong>HEAD</strong>{explanation.head}</span>
                      </div>
                    </>
                  ) : (
                    <div className="context-empty">
                      <span className="leaf-symbol">✳</span>
                      <h3>Small steps make strong roots.</h3>
                      <p>Run a Git command and we’ll unpack what changed — from your files to your project history.</p>
                      <button onClick={() => void runCommand("git init")}>Start with git init <ChevronRight size={14} /></button>
                    </div>
                  )}
                  <div className="tip-box"><span>GIT NOTE</span><p>A branch is just a name that points to a commit — it is not a separate copy of your files.</p></div>
                </section>
              </div>
            </>
          )}

          {view === "learn" && (
            <section className="learning-page">
              <div className="eyebrow"><span className="eyebrow-line" /> LEARN AT YOUR OWN PACE</div>
              <h1>A calmer way to <em>learn Git.</em></h1>
              <p className="learning-lede">Git makes more sense when you can see what it changes. Start with a short concept, then try it in your playground.</p>
              <div className="learning-progress"><span className="progress-icon"><Sprout size={19} /></span><span><strong>Your learning path</strong><small>Three short lessons with a knowledge check in each.</small></span><span className="progress-track"><i style={{ width: `${(completedLessons.filter(Boolean).length / learningLessons.length) * 100}%` }} /></span><b>{completedLessons.filter(Boolean).length} / {learningLessons.length}</b></div>
              <div className="lesson-list">
                {learningLessons.map((lesson, index) => (
                  <article className="lesson-card" key={lesson.title}>
                    <span className="lesson-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="lesson-icon">{index === 0 ? <Trees size={19} /> : index === 1 ? <GitCommitHorizontal size={19} /> : <GitBranch size={19} />}</span>
                    <div className="lesson-copy"><span className="lesson-meta">{lesson.category} · {lesson.duration}</span><h2>{lesson.title}</h2><p>{lesson.description}</p></div>
                    <span className={`lesson-tag ${completedLessons[index] ? "lesson-current" : ""}`}>{completedLessons[index] ? "Completed" : "Knowledge check"}</span>
                    <div className="lesson-check">
                      <strong>{lesson.question}</strong>
                      <div className="lesson-options">
                        {lesson.options.map((option, answer) => (
                          <button
                            key={option}
                            aria-pressed={lessonAnswers[index] === answer}
                            className={lessonAnswers[index] === answer ? answer === lesson.answer ? "correct-answer" : "wrong-answer" : ""}
                            onClick={() => answerLesson(index, answer)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {lessonAnswers[index] !== null && (
                        <p className={lessonAnswers[index] === lesson.answer ? "answer-feedback correct" : "answer-feedback"}>
                          {lessonAnswers[index] === lesson.answer
                            ? lesson.explanation
                            : lesson.review}
                        </p>
                      )}
                      <button className="lesson-action" onClick={() => { navigateView("playground"); setCommand(lesson.command); }}>
                        Try a command <ChevronRight size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <div className="learning-footnote"><BookOpen size={15} /> Correct answers are saved in this browser. You can revisit each check at any time.</div>
            </section>
          )}

          {view === "commands" && (
            <section className="commands-page encyclopedia-page">
              <div className="eyebrow"><span className="eyebrow-line" /> THE GIT FIELD ENCYCLOPEDIA</div>
              <h1>Every command has <em>a place.</em></h1>
              <p className="learning-lede">Browse the installed Git {gitCommandCatalog.gitVersion} command set, its low-level tools, and version-matched manuals. Documentation never enables a command in the playground.</p>
              <div className="encyclopedia-stats" aria-label="Coverage summary">
                <span><strong>{gitCommandCatalog.builtinCommands.length}</strong> installed built-ins</span>
                <span><strong>{gitCommandCatalog.builtinCommands.filter((entry) => entry.manualAvailable).length}</strong> full manuals included</span>
                <span><strong>{gitCommandCatalog.externalHelpers.length}</strong> separate helpers</span>
              </div>
              <div className="encyclopedia-toolbar">
                <label className="command-search"><Search size={17} /><input ref={documentationSearchInput} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a command, task, concept, or error" list="encyclopedia-search-suggestions" aria-label="Search Git command documentation" /><datalist id="encyclopedia-search-suggestions">{documentationSuggestions.map((suggestion) => <option key={suggestion} value={suggestion} />)}</datalist><kbd>Ctrl K</kbd></label>
                <div className="encyclopedia-filters" aria-label="Filter commands">
                  <label><span>Category</span><select value={commandCategory} onChange={(event) => setCommandCategory(event.target.value)}><option>All categories</option>{commandCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
                  <label><span>Difficulty</span><select value={commandDifficulty} onChange={(event) => setCommandDifficulty(event.target.value)}><option value="all">Any level</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label>
                  <label><span>Risk</span><select value={commandRisk} onChange={(event) => setCommandRisk(event.target.value)}><option value="all">Any risk</option><option value="informational">Informational</option><option value="safe">Safe</option><option value="history-modifying">History modifying</option><option value="destructive">Destructive</option></select></label>
                </div>
              </div>

              <div className="encyclopedia-layout">
                <aside className="encyclopedia-browser panel" aria-label="Command directory">
                  <div className="encyclopedia-panel-heading"><div><span>COMMAND DIRECTORY</span><strong>Alphabetical index</strong></div><b>{filteredCommandEntries.length}</b></div>
                  {recentEntries.length > 0 && (
                    <div className="recent-commands"><span>RECENTLY VIEWED</span>{recentEntries.map((entry) => <button key={entry.name} onClick={() => openCommandEntry(entry.name)}>{entry.name}</button>)}</div>
                  )}
                  <div className="encyclopedia-command-list" id="all-command-list" role="listbox" aria-label="Alphabetical Git commands">
                    {filteredCommandEntries.map((entry) => (
                      <button key={entry.name} className={selectedCommandEntry.name === entry.name ? "encyclopedia-command active" : "encyclopedia-command"} role="option" aria-selected={selectedCommandEntry.name === entry.name} onClick={() => openCommandEntry(entry.name)}>
                        <code>git {entry.name}</code><span>{entry.description}</span>{!entry.manualAvailable && <small>internal</small>}
                      </button>
                    ))}
                    {filteredCommandEntries.length === 0 && <div className="no-results">No matching commands. Try “undo my last commit” or clear a filter.</div>}
                  </div>
                  <details className="external-helper-list"><summary>External helpers ({gitCommandCatalog.externalHelpers.length})</summary><p>These executables are discovered alongside Git but are not Git built-ins.</p>{gitCommandCatalog.externalHelpers.map((entry) => <div key={entry.name}><code>{entry.name}</code><span>{entry.description}</span></div>)}</details>
                </aside>

                <article className="encyclopedia-detail panel" aria-live="polite">
                  <div className="encyclopedia-detail-top"><span>{selectedCommandEntry.category}</span><span className={`risk-badge risk-${selectedCommandEntry.risk}`}>{selectedCommandEntry.risk.replaceAll("-", " ")}</span></div>
                  <h2><code>git {selectedCommandEntry.name}</code></h2>
                  <p className="encyclopedia-summary">{selectedCommandEntry.description}</p>
                  <div className="encyclopedia-pills"><span>{selectedCommandEntry.difficulty}</span><span>{selectedCommandEntry.sourceType}</span>{selectedCommandEntry.deprecated && <span className="deprecated-pill">deprecated</span>}{selectedCommandEntry.experimental && <span className="experimental-pill">experimental</span>}{selectedCommandEntry.internal && <span>internal helper</span>}{selectedCommandEntry.playgroundSupported && <span className="supported-pill">playground supported</span>}</div>
                  {selectedCommandEntry.synopsis && <section className="encyclopedia-section"><h3>Syntax</h3><pre className="encyclopedia-code"><code>{selectedCommandEntry.synopsis}</code></pre></section>}
                  {selectedCommandEntry.overview && <section className="encyclopedia-section"><h3>What it does</h3><p>{selectedCommandEntry.overview}</p></section>}
                  <div className="encyclopedia-manual-heading"><div><span>COMPLETE VERSION-MATCHED REFERENCE</span><strong>Git {selectedCommandEntry.gitVersion}</strong></div>{selectedCommandEntry.officialDocumentationUrl && <a href={selectedCommandEntry.officialDocumentationUrl} target="_blank" rel="noreferrer">Open official manual <ChevronRight size={13} /></a>}</div>
                  {selectedCommandEntry.manualAvailable ? (
                    <iframe ref={manualFrameRef} key={selectedCommandEntry.name} className="git-manual-frame" src={selectedCommandEntry.manualPath} title={`Complete Git ${selectedCommandEntry.gitVersion} manual for git ${selectedCommandEntry.name}`} loading="lazy" sandbox="allow-same-origin" onLoad={() => {
                      const manualDocument = manualFrameRef.current?.contentDocument;
                      if (!manualDocument) return;
                      let themeStyle = manualDocument.getElementById("arbor-manual-theme") as HTMLStyleElement | null;
                      if (!themeStyle) {
                        themeStyle = manualDocument.createElement("style");
                        themeStyle.id = "arbor-manual-theme";
                        manualDocument.head.appendChild(themeStyle);
                      }
                      themeStyle.textContent = isDark
                        ? "html, body, #header, #content, #footer { background: #302f28 !important; color: #fff9e9 !important; } a, a code { color: #efc43a !important; } pre, code, .listingblock, .literalblock { background-color: #25251f !important; color: #fff9e9 !important; } table, th, td { border-color: #5a5545 !important; }"
                        : "html, body, #header, #content, #footer { background: #fffdf5 !important; color: #211f1b !important; } a, a code { color: #725500 !important; } pre, code, .listingblock, .literalblock { background-color: #f3f0e5 !important; color: #211f1b !important; } table, th, td { border-color: #d8d1bd !important; }";
                    }} />
                  ) : (
                    <div className="manual-unavailable"><CircleHelp size={17} /><div><strong>No standalone command manual is installed.</strong><p>This internal helper is still present in the inventory. Its details are not expanded into user-facing options or examples here; see the coverage report for the remaining gaps.</p></div></div>
                  )}
                  <div className="encyclopedia-command-actions">
                    {selectedCommandEntry.playgroundSupported && selectedPlaygroundExample ? <button className="small-primary" onClick={() => { navigateView("playground"); setCommand(selectedPlaygroundExample); }}>Try an allowlisted example <ChevronRight size={13} /></button> : <span>Documentation only · not enabled in the playground</span>}
                  </div>
                </article>

                <aside className="encyclopedia-aside" aria-label="Command details and related references">
                  <section className="encyclopedia-info-card panel"><span>AT A GLANCE</span><dl><div><dt>Category</dt><dd>{selectedCommandEntry.category}</dd></div><div><dt>Difficulty</dt><dd>{selectedCommandEntry.difficulty}</dd></div><div><dt>Typical risk</dt><dd>{selectedCommandEntry.risk.replaceAll("-", " ")}</dd></div><div><dt>Remote required</dt><dd>{selectedCommandEntry.requiresRemoteInfrastructure ? "For its usual workflow" : "No"}</dd></div><div><dt>Playground</dt><dd>{selectedCommandEntry.playgroundSupported ? "Supported subset" : "Not enabled"}</dd></div></dl></section>
                  <section className="encyclopedia-info-card panel"><span>RELATED COMMANDS</span><div className="related-command-list">{relatedEntries.map((entry) => <button key={entry.name} onClick={() => openCommandEntry(entry.name)}><code>git {entry.name}</code><ChevronRight size={13} /></button>)}</div></section>
                  <section className="encyclopedia-info-card panel"><span>OFFICIAL GUIDES · {gitCommandCatalog.guides.length}</span><div className="guide-link-list">{gitCommandCatalog.guides.map((guide) => <a key={guide.name} href={guide.manualPath || guide.officialDocumentationUrl} target="_blank" rel="noreferrer">{guide.title}<ChevronRight size={12} /></a>)}</div></section>
                  <section className="encyclopedia-info-card panel"><span>CONCEPTS & FORMATS · {gitCommandCatalog.concepts.length}</span><div className="guide-link-list">{gitCommandCatalog.concepts.map((concept) => <a key={concept.name} href={concept.manualPath || concept.officialDocumentationUrl} target="_blank" rel="noreferrer">{concept.title}<ChevronRight size={12} /></a>)}</div></section>
                  <div className="command-safety"><CircleHelp size={16} /><span><strong>Read before running.</strong> The full documentation is broader than ARBOR&apos;s deliberately small, secured playground allowlist. An entry here never grants terminal access.</span></div>
                </aside>
              </div>
            </section>
          )}

          {view === "settings" && (
            <section className="settings-page">
              <div className="eyebrow"><span className="eyebrow-line" /> MAKE YOURSELF AT HOME</div>
              <h1>Your garden, <em>your way.</em></h1>
              <p className="learning-lede">A few quiet preferences for your workspace.</p>
              <div className="settings-list">
                <div className="setting-row"><span className="setting-icon"><Moon size={18} /></span><span><strong>Appearance</strong><small>Choose a light or dark garden.</small></span><button className="setting-toggle" onClick={() => setIsDark((current) => !current)} aria-pressed={isDark}>{isDark ? "Dark" : "Light"} <span className={isDark ? "toggle-knob on" : "toggle-knob"} /></button></div>
                <div className="setting-row"><span className="setting-icon"><GitPullRequest size={18} /></span><span><strong>Branch growth sounds</strong><small>Optional soft feedback after a Git action.</small></span><button className="setting-toggle" onClick={toggleSounds} aria-pressed={soundEnabled}>{soundEnabled ? "On" : "Off"} <span className={soundEnabled ? "toggle-knob on" : "toggle-knob"} /></button></div>
                <div className="setting-row"><span className="setting-icon"><RotateCcw size={18} /></span><span><strong>Temporary playground</strong><small>Your files are isolated and expire after three hours.</small></span><button className="setting-reset" onClick={() => { navigateView("playground"); void resetRepository(); }}>Reset playground</button></div>
              </div>
              <div className="settings-note"><CircleHelp size={16} /> Audio is opt-in. No sound plays unless you enable it and trigger an action.</div>
            </section>
          )}

          <footer className="page-footer"><span>Made for curious minds <span className="footer-leaf">✳</span></span><span><span className="footer-dot" /> A safe place to learn Git</span></footer>
        </div>
      </main>
      <nav className={`mobile-bottom-nav${mobileKeyboardOpen ? " keyboard-open" : ""}`} aria-label="Primary navigation">
        <button className={`mobile-nav-item${activeMobileDestination === "home" ? " active" : ""}`} aria-label="Home" aria-current={activeMobileDestination === "home" ? "page" : undefined} onClick={() => navigateView("playground", "home")}><House size={18} /><span>Home</span></button>
        <button className={`mobile-nav-item${activeMobileDestination === "tree" ? " active" : ""}`} aria-label="Tree workspace" aria-current={activeMobileDestination === "tree" ? "page" : undefined} onClick={() => navigateView("playground", "tree")}><GitBranch size={18} /><span>Tree</span></button>
        <button className={`mobile-nav-item${activeMobileDestination === "playground" ? " active" : ""}`} aria-label="Playground" aria-current={activeMobileDestination === "playground" ? "page" : undefined} onClick={() => navigateView("playground", "playground")}><TerminalIcon size={18} /><span>Play</span></button>
        <button className={`mobile-nav-item${activeMobileDestination === "learn" ? " active" : ""}`} aria-label="Learn Git" aria-current={activeMobileDestination === "learn" ? "page" : undefined} onClick={() => navigateView("learn", "learn")}><BookOpen size={18} /><span>Learn</span></button>
        <button className={`mobile-nav-item${activeMobileDestination === "documentation" ? " active" : ""}`} aria-label="Documentation: Git command encyclopedia" aria-current={activeMobileDestination === "documentation" ? "page" : undefined} onClick={() => navigateView("commands", "documentation")}><BookText size={18} /><span>Docs</span></button>
        <button ref={moreButtonRef} className={`mobile-nav-item mobile-more-button${moreOpen ? " is-open" : ""}${activeMobileDestination === "more" ? " active" : ""}`} aria-label="More destinations" aria-current={activeMobileDestination === "more" ? "page" : undefined} aria-expanded={moreOpen} aria-controls="mobile-more-sheet" onClick={() => setMoreOpen((current) => !current)}><MoreHorizontal size={19} /><span>More</span></button>
      </nav>
      {moreOpen && <>
        <button className="mobile-more-backdrop" aria-label="Close more destinations" tabIndex={-1} onClick={() => setMoreOpen(false)} />
        <section className="mobile-more-sheet" id="mobile-more-sheet" aria-labelledby="mobile-more-heading">
          <div className="mobile-more-heading"><div><span>YOUR WORKSPACE</span><h2 id="mobile-more-heading">More places</h2></div><button className="icon-button" aria-label="Close more destinations" onClick={() => { setMoreOpen(false); moreButtonRef.current?.focus(); }}><X size={17} /></button></div>
          <div className="mobile-more-repository"><span className="repo-avatar"><Sprout size={15} /></span><span><strong>little-garden</strong><small>{repository?.initialized ? `${repository.branches.length} branches · ${repository.commits.length} commits` : "Not initialized yet"}</small></span></div>
          <button ref={moreFirstItemRef} className="mobile-more-link" onClick={() => navigateView("playground", "tree")}><GitBranch size={17} /><span><strong>Branches & commits</strong><small>Open your repository tree</small></span><ChevronRight size={15} /></button>
          <button className="mobile-more-link" onClick={() => navigateView("settings", "more")}><Settings2 size={17} /><span><strong>Preferences</strong><small>Appearance and playground settings</small></span><ChevronRight size={15} /></button>
          <button className="mobile-more-link" onClick={() => setIsDark((current) => !current)}>{isDark ? <Sun size={17} /> : <Moon size={17} />}<span><strong>{isDark ? "Light appearance" : "Dark appearance"}</strong><small>Switch the workspace theme</small></span><ChevronRight size={15} /></button>
        </section>
      </>}
    </div>
  );
}
