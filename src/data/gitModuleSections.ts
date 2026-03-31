/** Sidebar metadata for Git module — titles match ConceptCards in GitModule.tsx */
const c = (id: number, title: string) => ({ id: String(id), title, number: id });

const basics = [
  c(1, "What is Git"),
  c(2, "Initialize Repository"),
  c(3, "Git Status"),
  c(4, "Git Add"),
  c(5, "Git Commit"),
  c(6, "Git Log"),
  c(7, "Git Diff"),
  c(8, "Git Ignore"),
  c(9, "Git Restore / Reset"),
  c(10, "Git Show"),
];

const branching = [
  c(11, "Git Branch"),
  c(12, "Git Checkout / Switch"),
  c(13, "Git Merge"),
  c(14, "Merge Conflicts"),
  c(15, "Git Rebase"),
  c(16, "Git Stash"),
  c(17, "Git Cherry-pick"),
  c(18, "Git Tag"),
];

const remote = [
  c(19, "Git Remote"),
  c(20, "Git Clone"),
  c(21, "Git Push"),
  c(22, "Git Pull"),
  c(23, "Git Fetch"),
  c(24, "Git Pull vs Fetch"),
  c(25, "Upstream Tracking"),
];

const collaboration = [
  c(26, "Pull Requests"),
  c(27, "Code Review"),
  c(28, "Fork & Clone"),
  c(29, "Branch Protection"),
  c(30, "Git Workflow Strategies"),
  c(31, "Resolving Conflicts in PRs"),
  c(32, "Squash & Merge"),
];

const advanced = [
  c(33, "Interactive Rebase"),
  c(34, "Git Bisect"),
  c(35, "Git Hooks"),
  c(36, "Git Submodules"),
  c(37, "Git Reflog"),
  c(38, "Git Blame"),
  c(39, "Git Clean"),
  c(40, "Git Archive"),
];

const github = [
  c(41, "GitHub Issues"),
  c(42, "GitHub Actions"),
  c(43, "GitHub Pages"),
  c(44, "GitHub Releases"),
  c(45, "GitHub Wikis"),
  c(46, "GitHub Gists"),
  c(47, "GitHub Organizations"),
  c(48, "GitHub CLI"),
];

export const gitSections = [
  { id: "basics", title: "Git Basics", icon: "🔰", count: "1-10", concepts: basics },
  { id: "branching", title: "Branching & Merging", icon: "🌿", count: "11-18", concepts: branching },
  { id: "remote", title: "Remote Repositories", icon: "☁️", count: "19-25", concepts: remote },
  { id: "collaboration", title: "Collaboration", icon: "👥", count: "26-32", concepts: collaboration },
  { id: "advanced", title: "Advanced Git", icon: "⚡", count: "33-40", concepts: advanced },
  { id: "github", title: "GitHub Features", icon: "🐙", count: "41-48", concepts: github },
];
