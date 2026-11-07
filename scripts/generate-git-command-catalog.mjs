import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outJson = join(root, "data", "git-command-catalog.json");
const manualOutput = join(root, "public", "git-docs");
const entriesOutput = join(root, "docs", "git-command-entries");
const git = (...args) => execFileSync("git", args, {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, GIT_PAGER: "cat", PAGER: "cat" },
}).trimEnd();

function parseGroupedHelp(text) {
  const records = new Map();
  let group = "";
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const item = line.match(/^\s{2,}(\S+)\s{2,}(.+)$/);
    if (item) {
      records.set(item[1], { sourceGroup: group, description: item[2].trim() });
      continue;
    }
    if (!/^\s/.test(line)) group = line.trim();
  }
  return records;
}

function parseNamedList(text) {
  return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function decodeHtml(value) {
  const named = {
    amp: "&", apos: "'", quot: '"', lt: "<", gt: ">", nbsp: " ",
    hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘",
    rdquo: "”", ldquo: "“", copy: "©", trade: "™",
  };
  return value
    .replace(/&#(\d+);/g, (_all, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([\da-f]+);/gi, (_all, number) => String.fromCodePoint(parseInt(number, 16)))
    .replace(/&([a-z]+);/gi, (all, name) => named[name.toLowerCase()] ?? all);
}

function htmlText(value) {
  return decodeHtml(value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|div|li|dt|dd|pre|h[1-6]|tr|blockquote)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/[\t ]+\n/g, "\n")
    .replace(/\n[\t ]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim());
}

function manualDetails(file) {
  const html = readFileSync(file, "utf8");
  const synopsisHeading = html.indexOf('id="_synopsis"');
  const nextHeading = html.indexOf("<h2", synopsisHeading + 1);
  const synopsisSection = synopsisHeading < 0 ? "" : html.slice(synopsisHeading, nextHeading < 0 ? undefined : nextHeading);
  const synopsis = [...synopsisSection.matchAll(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi)].map((match) => htmlText(match[1])).filter(Boolean).join("\n\n");
  const descriptionHeading = html.indexOf('id="_description"');
  const descriptionStart = descriptionHeading < 0 ? -1 : html.indexOf("</h2>", descriptionHeading) + 5;
  const afterDescription = descriptionStart < 0 ? -1 : html.indexOf("<h2", descriptionStart);
  const descriptionSection = descriptionStart < 0 ? "" : html.slice(descriptionStart, afterDescription < 0 ? undefined : afterDescription);
  const summary = html.match(/id="_name"[\s\S]*?<p>([\s\S]*?)<\/p>/i)?.[1] ?? "";
  return {
    summary: htmlText(summary).replace(/^git-[^\s]+\s+-\s+/, ""),
    synopsis: htmlText(synopsis),
    description: htmlText(descriptionSection).slice(0, 1200),
  };
}

const gitVersion = git("--version").replace(/^git version\s+/, "");
const versionMatch = gitVersion.match(/\d+\.\d+\.\d+/);
if (!versionMatch) throw new Error(`Could not parse installed Git version: ${gitVersion}`);
const docsVersion = versionMatch[0];
const installedDocs = git("--html-path").replace(/\\/g, "/");
if (!existsSync(installedDocs)) throw new Error(`Git HTML manuals were not found at ${installedDocs}`);

const helpRecords = parseGroupedHelp(git("help", "-a"));
const builtins = parseNamedList(git("--list-cmds=main"));
const externalHelpers = parseNamedList(git("--list-cmds=others"));
const aliases = parseNamedList(git("--list-cmds=alias"));
const docsFiles = new Set(readdirSync(installedDocs));

const playgroundSource = readFileSync(join(root, "arbre-engine", "src", "services", "git", "registry.ts"), "utf8");
const playgroundSupported = new Set([...playgroundSource.matchAll(/name:\s*'([a-z][a-z0-9-]*)'/g)].map((match) => match[1]));

const groups = {
  "Setup & configuration": new Set(["init", "clone", "config", "help", "version", "credential", "credential-cache", "credential-store", "credential-manager", "credential-wincred"]),
  "Basic snapshotting": new Set(["add", "status", "diff", "commit", "restore", "rm", "mv", "stage"]),
  "Branching & merging": new Set(["branch", "checkout", "switch", "merge", "merge-tree", "merge-base", "mergetool", "log", "range-diff", "replay"]),
  "Sharing & updating": new Set(["fetch", "pull", "push", "remote", "submodule", "archive", "bundle", "ls-remote", "fetch-pack", "send-pack", "receive-pack", "upload-pack", "upload-archive", "daemon", "http-backend", "worktree", "backfill"]),
  "Inspection & comparison": new Set(["show", "log", "diff", "grep", "blame", "annotate", "shortlog", "describe", "show-ref", "show-branch", "name-rev", "cherry", "for-each-ref", "for-each-repo", "rev-list", "rev-parse", "ls-files", "ls-tree", "diff-files", "diff-index", "diff-pairs", "diff-tree", "show-index", "get-tar-commit-id", "repo", "refs"]),
  "Patching & recovery": new Set(["apply", "am", "cherry-pick", "rebase", "revert", "reset", "stash", "reflog", "format-patch", "send-email", "imap-send", "request-pull", "rerere", "notes", "replace"]),
  "Debugging & analysis": new Set(["bisect", "fsck", "fsck-objects", "count-objects", "verify-pack", "verify-commit", "verify-tag", "bugreport", "diagnose", "survey"]),
  "Administration & maintenance": new Set(["gc", "maintenance", "prune", "prune-packed", "repack", "pack-refs", "multi-pack-index", "commit-graph", "clean", "sparse-checkout", "filter-branch"]),
  "Plumbing & object storage": new Set(["cat-file", "hash-object", "update-index", "write-tree", "read-tree", "commit-tree", "mktree", "mktag", "update-ref", "symbolic-ref", "unpack-objects", "pack-objects", "index-pack", "pack-redundant", "unpack-file", "var", "update-server-info", "fast-export", "fast-import", "merge-file", "merge-index", "mailinfo", "mailsplit", "interpret-trailers", "fmt-merge-msg", "patch-id", "stripspace", "column", "check-attr", "check-ignore", "check-mailmap", "check-ref-format", "hook"]),
  "Specialized & interoperability": new Set(["archimport", "cvsexportcommit", "cvsimport", "cvsserver", "p4", "quiltimport", "svn", "gitk", "gui", "send-email", "imap-send", "submodule", "notes", "tag"]),
};

const informational = new Set(["status", "diff", "log", "show", "grep", "blame", "annotate", "describe", "shortlog", "help", "version", "count-objects", "for-each-ref", "for-each-repo", "rev-parse", "rev-list", "ls-files", "ls-tree", "show-ref", "show-branch", "cat-file", "check-attr", "check-ignore", "check-mailmap", "check-ref-format", "var", "cherry", "merge-base", "get-tar-commit-id"]);
const destructive = new Set(["clean", "filter-branch", "prune", "prune-packed", "reset", "restore", "rm", "update-ref", "replace", "pack-redundant", "stash", "credential-store"]);
const historyChanging = new Set(["apply", "am", "commit", "branch", "checkout", "switch", "merge", "cherry-pick", "rebase", "revert", "tag", "stash", "reflog", "notes", "submodule", "update-index", "write-tree", "commit-tree", "read-tree", "update-ref", "symbolic-ref", "mktag", "mktree", "fast-import", "filter-branch"]);
const remoteCommands = new Set(["fetch", "pull", "push", "remote", "ls-remote", "fetch-pack", "send-pack", "receive-pack", "upload-pack", "upload-archive", "daemon", "http-backend", "imap-send", "send-email", "request-pull", "ls-remote"]);
const specialized = new Set(["archimport", "cvsexportcommit", "cvsimport", "cvsserver", "p4", "quiltimport", "svn", "imap-send", "send-email", "filter-branch"]);
const taskTerms = {
  reset: ["undo my last commit", "uncommit", "move branch pointer", "unstage changes", "discard local changes", "history-changing", "destructive"],
  revert: ["undo my last commit", "undo a pushed commit", "undo commit safely", "make a reversing commit", "history-changing"],
  blame: ["find who changed this line", "who changed this line", "line history", "author of a line"],
  "ls-files": ["list files tracked by git", "tracked files", "index entries"],
  "cat-file": ["inspect an object", "read git object", "object database", "blob tree commit"],
  "clean": ["remove untracked files", "discard untracked files", "destructive"],
  "reflog": ["recover lost commit", "find previous head", "undo reset", "recovery"],
  "bisect": ["find commit that introduced a bug", "binary search history", "regression"],
  "update-ref": ["update a reference", "move a ref", "low-level reference editing", "destructive"],
  status: ["nothing to commit", "working tree clean", "not a git repository", "untracked files"],
  add: ["pathspec did not match any files", "ignored file", "stage changes", "staging area"],
  commit: ["nothing to commit", "user identity unknown", "please tell me who you are", "record staged changes"],
  push: ["non-fast-forward", "rejected fetch first", "failed to push some refs", "publish commits"],
  merge: ["merge conflict", "unmerged paths", "resolve a conflict"],
  "check-ignore": ["why is this file ignored", "debug ignore rules"],
};

function sourceType(record, name) {
  if (!record) return "Internal built-in helper";
  if (record.sourceGroup.startsWith("Low-level")) return "Plumbing command";
  if (record.sourceGroup.startsWith("Ancillary")) return record.sourceGroup.includes("Interrogators") ? "Ancillary interrogator" : "Ancillary command";
  if (record.sourceGroup.startsWith("Main Porcelain")) return "Porcelain command";
  if (record.sourceGroup.startsWith("Interacting")) return "Interoperability command";
  if (record.sourceGroup.startsWith("External")) return "External helper";
  return record.sourceGroup || "Git command";
}

function logicalCategory(name, record, internal) {
  for (const [category, names] of Object.entries(groups)) if (names.has(name)) return category;
  if (internal) return "Internal helpers";
  if (record?.sourceGroup.startsWith("Low-level")) return "Plumbing & object storage";
  if (record?.sourceGroup.startsWith("Interacting")) return "Specialized & interoperability";
  return "Specialized & interoperability";
}

function classifyDifficulty(record, internal, name) {
  if (internal || record?.sourceGroup.startsWith("Low-level") || specialized.has(name)) return "advanced";
  if (record?.sourceGroup.startsWith("Main Porcelain") && !["filter-branch", "fast-export", "fast-import", "sparse-checkout", "maintenance", "range-diff", "backfill", "history"].includes(name)) return "beginner";
  return "intermediate";
}

function classifyRisk(name) {
  if (informational.has(name)) return "informational";
  if (destructive.has(name)) return "destructive";
  if (historyChanging.has(name)) return "history-modifying";
  return "safe";
}

function commandDocName(name) {
  const direct = `git-${name}.html`;
  return docsFiles.has(direct) ? direct : null;
}

const commandRows = [...builtins].sort((left, right) => left.localeCompare(right)).map((name) => {
  const record = helpRecords.get(name);
  const internal = !record;
  const fileName = commandDocName(name);
  const source = fileName ? manualDetails(join(installedDocs, fileName)) : null;
  const description = record?.description ?? source?.summary ?? "Installed built-in helper. No standalone command summary is provided by `git help -a`.";
  return {
    name,
    slug: name,
    type: "builtin",
    category: logicalCategory(name, record, internal),
    sourceCategory: record?.sourceGroup ?? "Not listed by git help -a; exposed by --list-cmds=main",
    sourceType: sourceType(record, name),
    description,
    synopsis: source?.synopsis ?? "",
    overview: source?.description ?? "",
    difficulty: classifyDifficulty(record, internal, name),
    risk: classifyRisk(name),
    documented: true,
    manualAvailable: Boolean(fileName),
    manualPath: fileName ? `/git-docs/${fileName}` : "",
    officialDocumentationUrl: fileName ? `https://git-scm.com/docs/${fileName.replace(/\.html$/, "")}/${docsVersion}.html` : "",
    gitVersion,
    deprecated: name === "survey" || /DEPRECATED/i.test(description),
    experimental: /EXPERIMENTAL/i.test(description),
    internal,
    externalHelper: false,
    playgroundSupported: playgroundSupported.has(name),
    safeForEducationalExecution: playgroundSupported.has(name),
    requiresAdvancedConfiguration: remoteCommands.has(name) || specialized.has(name),
    requiresRemoteInfrastructure: remoteCommands.has(name),
    searchTerms: taskTerms[name] ?? [],
  };
});

const externalRows = [...externalHelpers].sort((left, right) => left.localeCompare(right)).map((name) => {
  const record = helpRecords.get(name);
  return {
    name,
    slug: name,
    type: "external-helper",
    category: "External helpers",
    sourceCategory: record?.sourceGroup ?? "git --list-cmds=others",
    sourceType: "External helper, not a Git built-in command",
    description: record?.description ?? "A helper executable discovered by Git; supplied separately from the Git built-in command set.",
    difficulty: "advanced",
    risk: "safe",
    documented: false,
    manualAvailable: false,
    manualPath: "",
    officialDocumentationUrl: "",
    gitVersion,
    deprecated: false,
    internal: false,
    externalHelper: true,
    playgroundSupported: false,
    safeForEducationalExecution: false,
    requiresAdvancedConfiguration: true,
    requiresRemoteInfrastructure: false,
    searchTerms: [],
  };
});

const guideRecords = parseGroupedHelp(git("help", "-g"));
const guideNames = [...guideRecords.keys()];
const guideAliases = {
  "core-tutorial": "gitcore-tutorial.html",
  credentials: "gitcredentials.html",
  "cvs-migration": "gitcvs-migration.html",
  datamodel: "gitdatamodel.html",
  diffcore: "gitdiffcore.html",
  everyday: "giteveryday.html",
  faq: "gitfaq.html",
  glossary: "gitglossary.html",
  namespaces: "gitnamespaces.html",
  "remote-helpers": "gitremote-helpers.html",
  submodules: "gitsubmodules.html",
  tutorial: "gittutorial.html",
  "tutorial-2": "gittutorial-2.html",
  workflows: "gitworkflows.html",
};

const interfaceRecords = new Map([
  ["attributes", { description: "Defining attributes per path", docFile: "gitattributes.html" }],
  ["cli", { description: "Git command-line interface and conventions", docFile: "gitcli.html" }],
  ["hooks", { description: "Hooks used by Git", docFile: "githooks.html" }],
  ["ignore", { description: "Specifies intentionally untracked files to ignore", docFile: "gitignore.html" }],
  ["mailmap", { description: "Map author/committer names and e-mail addresses", docFile: "gitmailmap.html" }],
  ["modules", { description: "Defining submodule properties", docFile: "gitmodules.html" }],
  ["repository-layout", { description: "Git repository layout", docFile: "gitrepository-layout.html" }],
  ["revisions", { description: "Specifying revisions and ranges", docFile: "gitrevisions.html" }],
  ["format-bundle", { description: "The bundle file format", docFile: "gitformat-bundle.html" }],
  ["format-chunk", { description: "Chunk-based file formats", docFile: "gitformat-chunk.html" }],
  ["format-commit-graph", { description: "Git commit-graph format", docFile: "gitformat-commit-graph.html" }],
  ["format-index", { description: "Git index format", docFile: "gitformat-index.html" }],
  ["format-pack", { description: "Git pack format", docFile: "gitformat-pack.html" }],
  ["format-signature", { description: "Git cryptographic signature formats", docFile: "gitformat-signature.html" }],
  ["protocol-capabilities", { description: "Protocol v0 and v1 capabilities", docFile: "gitprotocol-capabilities.html" }],
  ["protocol-common", { description: "Things common to various protocols", docFile: "gitprotocol-common.html" }],
  ["protocol-http", { description: "Git HTTP-based protocols", docFile: "gitprotocol-http.html" }],
  ["protocol-pack", { description: "How packs are transferred over the wire", docFile: "gitprotocol-pack.html" }],
  ["protocol-v2", { description: "Git Wire Protocol, Version 2", docFile: "gitprotocol-v2.html" }],
]);

const guides = guideNames.map((name) => {
  const record = guideRecords.get(name);
  const fileName = guideAliases[name];
  return {
    name,
    title: record.description,
    type: "guide",
    category: "Git guides",
    sourceCategory: "git help -g",
    manualPath: fileName && docsFiles.has(fileName) ? `/git-docs/${fileName}` : "",
    officialDocumentationUrl: fileName ? `https://git-scm.com/docs/${fileName.replace(/\.html$/, "")}/${docsVersion}.html` : "",
    manualAvailable: Boolean(fileName && docsFiles.has(fileName)),
    gitVersion,
  };
});

const concepts = [...interfaceRecords].map(([name, record]) => ({
  name,
  title: record.description,
  type: "concept",
  category: "Interfaces & formats",
  sourceCategory: "git help -a concepts/interfaces",
  manualPath: docsFiles.has(record.docFile) ? `/git-docs/${record.docFile}` : "",
  officialDocumentationUrl: `https://git-scm.com/docs/${record.docFile.replace(/\.html$/, "")}/${docsVersion}.html`,
  manualAvailable: docsFiles.has(record.docFile),
  gitVersion,
}));

const catalog = {
  gitVersion,
  docsVersion,
  generatedFrom: ["git --version", "git help -a", "git --list-cmds=main", "git --list-cmds=others", "git --list-cmds=alias", "git help -g", "installed Git HTML manuals"],
  listCommandCategoriesSupported: ["main", "others", "alias", "config", "nohelpers"],
  listCommandCategoriesUnsupported: ["ancillary", "plumbing", "plumbingmanipulators", "plumbinginterrogators", "foreign", "foreignscminterfaces", "exclude"],
  builtinCommands: commandRows,
  externalHelpers: externalRows,
  aliases,
  guides,
  concepts,
};

mkdirSync(dirname(outJson), { recursive: true });
mkdirSync(manualOutput, { recursive: true });
mkdirSync(entriesOutput, { recursive: true });
writeFileSync(outJson, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");

const manualNames = new Set();
for (const row of commandRows) if (row.manualAvailable) manualNames.add(row.manualPath.split("/").at(-1));
for (const row of guides) if (row.manualAvailable) manualNames.add(row.manualPath.split("/").at(-1));
for (const row of concepts) if (row.manualAvailable) manualNames.add(row.manualPath.split("/").at(-1));
for (const fileName of manualNames) copyFileSync(join(installedDocs, fileName), join(manualOutput, fileName));

const undocumentedBuiltins = commandRows.filter((row) => !row.manualAvailable).map((row) => row.name);
const manualBackedCommands = commandRows.filter((row) => row.manualAvailable).length;
const manualBackedGuides = guides.filter((row) => row.manualAvailable).length;
const manualBackedConcepts = concepts.filter((row) => row.manualAvailable).length;
const coverageReport = [
  "# Git command coverage",
  "",
  `Generated from the installed Git for Windows ${gitVersion}. The upstream manual set is version ${docsVersion}.`,
  "",
  "## Inventory sources",
  "",
  "- `git --version` records the exact target build.",
  "- `git help -a` supplies documented command names, groups, and short descriptions.",
  "- `git --list-cmds=main` supplies the installed built-in command inventory, including helpers not listed as user-facing commands by `git help -a`.",
  "- `git --list-cmds=others` supplies separate external helper names; `git --list-cmds=alias` was empty in the generation environment.",
  "- `git help -g` supplies the concept guide list; the guide and interface manuals were copied from the installed HTML documentation directory.",
  "- Target-version references point to [the official Git documentation](https://git-scm.com/docs) at the matching upstream version.",
  "",
  "For this Git build, the accepted `--list-cmds` categories are `main`, `others`, `alias`, `config`, and `nohelpers`. The legacy categories `ancillary`, `plumbing`, `plumbingmanipulators`, `plumbinginterrogators`, `foreign`, `foreignscminterfaces`, and `exclude` return an unsupported-category error, so `git help -a` is used for those command families.",
  "",
  "## Coverage totals",
  "",
  "| Coverage area | Count | Notes |",
  "|---|---:|---|",
  `| Installed built-in names | ${commandRows.length} | All have a searchable catalog entry and generated entry page. |`,
  `| Built-ins with a standalone installed manual | ${manualBackedCommands} | Full source HTML manuals are included under \`public/git-docs\`; syntax is taken from those manuals. |`,
  `| Built-ins without a standalone installed manual | ${undocumentedBuiltins.length} | Internal or platform helpers; listed below and not presented as fully documented. |`,
  `| Git concept guides from \`git help -g\` | ${guides.length} | ${manualBackedGuides} version-matched manuals included locally. |`,
  `| User-facing and developer-facing interfaces/formats | ${concepts.length} | ${manualBackedConcepts} version-matched manuals included locally. |`,
  `| External helpers | ${externalRows.length} | Kept in a separate list; not counted as built-ins. |`,
  `| User aliases in generation environment | ${aliases.length} | No aliases were defined. |`,
  `| Built-ins supported by the playground | ${commandRows.filter((row) => row.playgroundSupported).length} | Derived from the Arbre Engine command registry; unsupported commands remain documentation-only. |`,
  `| Documentation-only built-ins | ${commandRows.filter((row) => !row.playgroundSupported).length} | No terminal execution capability is granted by these entries. |`,
  `| Commands marked deprecated | ${commandRows.filter((row) => row.deprecated).length} | Explicitly identified from the installed Git help/manual inventory. |`,
  `| Commands marked experimental | ${commandRows.filter((row) => row.experimental).length} | Explicitly identified from the installed Git help/manual inventory. |`,
  "",
  "## Built-ins without a standalone manual",
  "",
  ...undocumentedBuiltins.map((name) => `- \`git ${name}\` — discovered by \`--list-cmds=main\`; no matching \`git-${name}.html\` manual shipped with this installation.`),
  "",
  "## Guides without a standalone local manual",
  "",
  ...(guides.filter((guide) => !guide.manualAvailable).map((guide) => `- \`${guide.name}\` — listed by \`git help -g\`; kept as a separate guide entry with an official versioned link.`).length
    ? guides.filter((guide) => !guide.manualAvailable).map((guide) => `- \`${guide.name}\` — listed by \`git help -g\`; kept as a separate guide entry with an official versioned link.`)
    : ["- None."]),
  "",
  "## Scope gaps",
  "",
  "The inventory and source-manual coverage are version-matched, but this release does not meet the requested fully annotated 24-field template for every built-in. The generated entries expose Git's own summaries and synopsis where available, then link/embed the complete official manual. The internal helpers listed above have no standalone manual to expand. Command-specific beginner guidance for working-tree, index, history, HEAD, remote, and recovery effects is not independently authored for all 179 entries. Treat the matching manual as authoritative before using advanced commands; do not describe this release as complete annotated coverage.",
  "",
  "## Execution safety",
  "",
  "The documentation catalog does not control command execution. The Arbre Engine registry remains the only playground allowlist and supplies each command's accepted flags, examples, risk checks, and parser tests. A catalog entry with `playgroundSupported: false` cannot be invoked through the application terminal.",
  "",
  "## Regenerate",
  "",
  "Run `node scripts/generate-git-command-catalog.mjs` on the target installation. Review the inventory diff and this report whenever the installed Git version changes.",
  "",
].join("\n");
writeFileSync(join(root, "docs", "git-command-coverage.md"), coverageReport, "utf8");

for (const row of commandRows) {
  const manualLink = row.manualAvailable ? `[/${row.manualPath.replace(/^\//, "")}](../../public${row.manualPath}) · [Official Git ${docsVersion} manual](${row.officialDocumentationUrl})` : "No standalone manual is shipped for this internal helper; see the complete inventory report.";
  const sections = [
    `# \`git ${row.name}\``,
    "",
    `- **Category:** ${row.category}`,
    `- **Git help group:** ${row.sourceCategory}`,
    `- **Difficulty:** ${row.difficulty}`,
    `- **Typical risk:** ${row.risk}`,
    `- **Deprecated:** ${row.deprecated ? "yes" : "no"}`,
    `- **Experimental:** ${row.experimental ? "yes" : "no"}`,
    `- **Playground:** ${row.playgroundSupported ? "supported by the explicit educational allowlist" : "documentation only"}`,
    `- **Target version:** ${row.gitVersion}`,
    "",
    "## Overview",
    "",
    row.description,
    "",
    "## Syntax",
    "",
    row.synopsis ? `\`\`\`text\n${row.synopsis}\n\`\`\`` : "The installed Git build does not ship a standalone synopsis for this internal helper.",
    "",
    "## Full options, examples, output, effects, and recovery",
    "",
    `The version-matched manual is the authoritative reference for every option and its exact behavior: ${manualLink}.`,
    row.overview ? `\n${row.overview}` : "",
    "",
    "## Execution boundary",
    "",
    row.playgroundSupported ? "This command is deliberately implemented by the isolated playground registry. Its supported flags and examples are narrower than the full Git command." : "This encyclopedia entry does not enable terminal execution. The playground accepts only commands listed in the separate Arbre Engine allowlist.",
    "",
  ].filter(Boolean);
  writeFileSync(join(entriesOutput, `${row.slug}.md`), sections.join("\n"), "utf8");
}

console.log(JSON.stringify({
  gitVersion,
  builtinCommands: commandRows.length,
  manualBackedCommands: commandRows.filter((row) => row.manualAvailable).length,
  builtinCommandsWithoutStandaloneManual: commandRows.filter((row) => !row.manualAvailable).map((row) => row.name),
  externalHelpers: externalRows.length,
  guides: guides.length,
  concepts: concepts.length,
  includedManualPages: manualNames.size,
  aliases: aliases.length,
  playgroundSupportedBuiltins: commandRows.filter((row) => row.playgroundSupported).length,
}, null, 2));
