import { useState } from "react";
import CodeExample from "./CodeExample";
import TheorySection from "./TheorySection";

export default function GitModule() {
  const [activeSection, setActiveSection] = useState("basics");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["basics"]));
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { 
      id: "basics", 
      title: "Git Basics", 
      icon: "🔰", 
      count: "1-10",
      concepts: Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1), title: `Concept ${i + 1}`, number: i + 1 }))
    },
    { 
      id: "branching", 
      title: "Branching & Merging", 
      icon: "🌿", 
      count: "11-18",
      concepts: Array.from({ length: 8 }, (_, i) => ({ id: String(i + 11), title: `Concept ${i + 11}`, number: i + 11 }))
    },
    { 
      id: "remote", 
      title: "Remote Repositories", 
      icon: "☁️", 
      count: "19-25",
      concepts: Array.from({ length: 7 }, (_, i) => ({ id: String(i + 19), title: `Concept ${i + 19}`, number: i + 19 }))
    },
    { 
      id: "collaboration", 
      title: "Collaboration", 
      icon: "👥", 
      count: "26-32",
      concepts: Array.from({ length: 7 }, (_, i) => ({ id: String(i + 26), title: `Concept ${i + 26}`, number: i + 26 }))
    },
    { 
      id: "advanced", 
      title: "Advanced Git", 
      icon: "⚡", 
      count: "33-40",
      concepts: Array.from({ length: 8 }, (_, i) => ({ id: String(i + 33), title: `Concept ${i + 33}`, number: i + 33 }))
    },
    { 
      id: "github", 
      title: "GitHub Features", 
      icon: "🐙", 
      count: "41-48",
      concepts: Array.from({ length: 8 }, (_, i) => ({ id: String(i + 41), title: `Concept ${i + 41}`, number: i + 41 }))
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
        setActiveSection(sectionId);
      }
      return newSet;
    });
  };

  const handleConceptClick = (sectionId: string, conceptId: string) => {
    setActiveSection(sectionId);
    setActiveConcept(conceptId);
    setExpandedSections((prev) => new Set(prev).add(sectionId));
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setTimeout(() => setSidebarOpen(false), 0);
    }
    
    setTimeout(() => {
      const element = document.getElementById(`concept-${conceptId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-full w-full relative">
      {/* Mobile Menu Button - Only show on larger mobile/tablet */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden sm:flex md:hidden fixed top-[72px] left-3 z-50 bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Floating Button for Small Screens */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sm:hidden fixed bottom-20 right-4 z-40 bg-blue-500 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95"
        aria-label="Toggle module menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-[64px] sm:top-[72px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Vertical Navigation - Responsive */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:sticky top-[64px] sm:top-[72px] md:top-0 left-0 z-40
        w-[280px] sm:w-64 md:w-64 flex-shrink-0 
        bg-white rounded-xl shadow-md p-2 sm:p-3 
        overflow-y-auto h-[calc(100vh-64px)] sm:h-[calc(100vh-72px)] md:max-h-[calc(100vh-120px)] 
        transition-transform duration-300 ease-in-out
      `}>
        <div className="mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Git & GitHub</h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Version control
          </p>
        </div>

        <div className="space-y-1.5">
          {sections.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const isActive = activeSection === section.id;

            return (
              <div key={section.id} className="border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full px-3 py-2 text-left font-medium transition-colors flex items-center justify-between text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="text-base flex-shrink-0">{section.icon}</span>
                    <span className="truncate">{section.title}</span>
                    <span className="text-xs opacity-75 flex-shrink-0">({section.count})</span>
                  </div>
                  <span className={`transition-transform text-xs flex-shrink-0 ml-1 ${isExpanded ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {isExpanded && (
                  <div className="bg-gray-50 border-t border-gray-200">
                    {section.concepts.map((concept) => (
                      <button
                        key={concept.id}
                        onClick={() => handleConceptClick(section.id, concept.id)}
                        className={`w-full px-4 py-1.5 text-left text-xs transition-colors flex items-center gap-1.5 ${
                          activeConcept === concept.id
                            ? "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <span className="text-blue-500 font-semibold text-xs flex-shrink-0">#{concept.number}</span>
                        <span className="flex-1 text-left truncate">{concept.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 min-w-0 max-w-full mt-0 md:mt-0">
        <div className="w-full max-w-full overflow-x-hidden px-0">
          {activeSection === "basics" && <GitBasics activeConcept={activeConcept} />}
          {activeSection === "branching" && <BranchingMerging activeConcept={activeConcept} />}
          {activeSection === "remote" && <RemoteRepositories activeConcept={activeConcept} />}
          {activeSection === "collaboration" && <Collaboration activeConcept={activeConcept} />}
          {activeSection === "advanced" && <AdvancedGit activeConcept={activeConcept} />}
          {activeSection === "github" && <GitHubFeatures activeConcept={activeConcept} />}
        </div>
      </div>
    </div>
  );
}

// ========== GIT BASICS (1-10) ==========
function GitBasics({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🔰 Git Basics</h3>
        <p className="text-green-100 break-words">Essential Git commands and concepts</p>
      </div>

      <ConceptCard
        id="1"
        number={1}
        title="What is Git"
        priority="🔥"
        theory={{
          what: "Git is a distributed version control system that tracks changes in files and coordinates work among multiple developers. It allows you to save snapshots of your project at different points in time.",
          why: "Git enables you to track changes, revert to previous versions, work on different features simultaneously, and collaborate with others. It's essential for professional development and is used by almost all software projects.",
          how: "Install Git on your system. Initialize a repository with 'git init'. Track files with 'git add'. Save snapshots with 'git commit'. View history with 'git log'. Git stores all changes in a hidden .git folder.",
          keyPoints: [
            "Distributed version control system",
            "Tracks changes in files",
            "Allows collaboration",
            "Saves snapshots (commits)",
            "Essential for professional development"
          ],
          interviewQuestions: [
            {
              question: "What is Git and why is it important?",
              answer: "Git is a distributed version control system that tracks changes in files and coordinates work among developers. It's important because it allows you to track changes, revert to previous versions, work on different features simultaneously, and collaborate with others. It's essential for professional development and is used by almost all software projects."
            }
          ]
        }}
      >
        <CodeExample
          title="Installing Git"
          description="Check if Git is installed and install if needed"
          code={`# Check Git version
git --version

# Install Git on macOS (using Homebrew)
brew install git

# Install Git on Windows
# Download from: https://git-scm.com/download/win

# Install Git on Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install git

# Configure Git (first time setup)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list`}
        />
      </ConceptCard>

      <ConceptCard
        id="2"
        number={2}
        title="Initialize Repository"
        priority="🔥"
        theory={{
          what: "Initializing a repository creates a new Git repository in your project folder. This sets up the .git directory that stores all version control information.",
          why: "You need to initialize a repository before you can start tracking changes with Git. It's the first step in version controlling your project.",
          how: "Navigate to your project folder and run 'git init'. This creates a .git folder (hidden) that stores all Git data. You can also initialize in an existing folder or create a new one.",
          keyPoints: [
            "Creates .git directory",
            "First step in version control",
            "Run: git init",
            "Can initialize in existing or new folder",
            "Sets up repository structure"
          ],
          interviewQuestions: [
            {
              question: "How do you initialize a Git repository?",
              answer: "Navigate to your project folder and run 'git init'. This creates a hidden .git directory that stores all version control information. You can initialize in an existing folder or create a new one. After initialization, you can start tracking files with 'git add' and making commits with 'git commit'."
            }
          ]
        }}
      >
        <CodeExample
          title="Initialize Repository"
          description="Create a new Git repository"
          code={`# Initialize in current directory
git init

# Initialize in a new directory
mkdir my-project
cd my-project
git init

# Initialize with initial commit
git init
git add .
git commit -m "Initial commit"

# Check repository status
git status`}
        />
      </ConceptCard>

      <ConceptCard
        id="3"
        number={3}
        title="Git Status"
        priority="🔥"
        theory={{
          what: "git status shows the current state of your working directory and staging area. It tells you which files are modified, staged, or untracked.",
          why: "git status helps you understand what changes you've made and what needs to be committed. It's one of the most frequently used Git commands.",
          how: "Run 'git status' to see the current state. It shows: modified files (red), staged files (green), untracked files, and branch information. Use it frequently to check your repository state.",
          keyPoints: [
            "Shows repository state",
            "Displays modified/staged files",
            "Shows untracked files",
            "Displays branch information",
            "Use frequently"
          ],
          interviewQuestions: [
            {
              question: "What does git status show?",
              answer: "git status shows the current state of your working directory and staging area. It displays which files are modified (red), staged (green), untracked, and shows branch information. It's one of the most frequently used Git commands to understand what changes you've made and what needs to be committed."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Status"
          description="Check repository status"
          code={`# Check status
git status

# Short status (more compact)
git status -s

# Example output:
# On branch main
# Changes not staged for commit:
#   modified:   src/App.tsx
#   modified:   package.json
#
# Untracked files:
#   src/components/NewComponent.tsx
#
# Changes to be committed:
#   new file:   README.md`}
        />
      </ConceptCard>

      <ConceptCard
        id="4"
        number={4}
        title="Git Add"
        priority="🔥"
        theory={{
          what: "git add stages files for commit. It tells Git which changes you want to include in the next commit. Files can be added individually or all at once.",
          why: "Staging allows you to selectively commit changes. You can stage specific files, review what you're committing, and make logical commits. It's part of Git's three-stage workflow: working directory → staging area → repository.",
          how: "Add specific file: 'git add filename'. Add all files: 'git add .'. Add all files in directory: 'git add directory/'. Use 'git add -A' to add all changes including deletions. Check status after adding.",
          keyPoints: [
            "Stages files for commit",
            "git add filename (specific file)",
            "git add . (all files)",
            "Part of three-stage workflow",
            "Review before committing"
          ],
          interviewQuestions: [
            {
              question: "What does git add do?",
              answer: "git add stages files for commit. It tells Git which changes you want to include in the next commit. You can add specific files with 'git add filename' or all files with 'git add .'. Staging allows you to selectively commit changes and review what you're committing before making the commit."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Add"
          description="Stage files for commit"
          code={`# Add specific file
git add src/App.tsx

# Add all files in directory
git add src/

# Add all files (current directory and subdirectories)
git add .

# Add all changes including deletions
git add -A

# Add files interactively (choose which changes to stage)
git add -p

# Check what's staged
git status`}
        />
      </ConceptCard>

      <ConceptCard
        id="5"
        number={5}
        title="Git Commit"
        priority="🔥"
        theory={{
          what: "git commit saves a snapshot of your staged changes to the repository. Each commit has a unique ID, author, timestamp, and message describing the changes.",
          why: "Commits create a history of your project. They allow you to revert to previous versions, understand what changed and when, and collaborate with others. Good commit messages are essential for project maintenance.",
          how: "Commit staged changes: 'git commit -m \"message\"'. Write clear, descriptive commit messages. Follow conventions (e.g., 'feat:', 'fix:', 'docs:'). Commit frequently with logical, related changes.",
          keyPoints: [
            "Saves snapshot of changes",
            "Requires staged files",
            "Each commit has unique ID",
            "Write clear commit messages",
            "Commit frequently"
          ],
          interviewQuestions: [
            {
              question: "How do you make a commit in Git?",
              answer: "After staging files with 'git add', use 'git commit -m \"message\"' to save a snapshot. Write clear, descriptive commit messages that explain what changed and why. Follow conventions like 'feat:', 'fix:', 'docs:' for better organization. Commit frequently with logical, related changes."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Commit"
          description="Save changes to repository"
          code={`# Commit with message
git commit -m "Add user authentication"

# Commit with detailed message
git commit -m "Add user authentication

- Implement login functionality
- Add JWT token handling
- Create protected routes"

# Amend last commit (change message or add files)
git commit --amend -m "New message"

# Commit without staging (adds and commits)
git commit -am "Quick commit"

# View commit history
git log`}
        />
      </ConceptCard>

      <ConceptCard
        id="6"
        number={6}
        title="Git Log"
        theory={{
          what: "git log shows the commit history of your repository. It displays commits in reverse chronological order with commit IDs, authors, dates, and messages.",
          why: "git log helps you understand project history, find when changes were made, and see who made them. It's essential for debugging and understanding project evolution.",
          how: "Run 'git log' to see full history. Use 'git log --oneline' for compact view. Use 'git log --graph' to see branch structure. Filter by author, date, or file. Use 'q' to quit the log viewer.",
          keyPoints: [
            "Shows commit history",
            "Displays commit details",
            "Use --oneline for compact view",
            "Use --graph for branch visualization",
            "Filter by author, date, file"
          ],
          interviewQuestions: [
            {
              question: "How do you view Git commit history?",
              answer: "Use 'git log' to see the full commit history. Use 'git log --oneline' for a compact one-line view. Use 'git log --graph' to visualize branch structure. You can filter by author with '--author', by date with '--since', or by file. Press 'q' to quit the log viewer."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Log"
          description="View commit history"
          code={`# View full log
git log

# One-line format
git log --oneline

# Graph view (shows branches)
git log --graph --oneline --all

# Last N commits
git log -5

# Filter by author
git log --author="John"

# Filter by date
git log --since="2024-01-01"

# Filter by file
git log -- src/App.tsx

# Show changes in commits
git log -p

# Show statistics
git log --stat`}
        />
      </ConceptCard>

      <ConceptCard
        id="7"
        number={7}
        title="Git Diff"
        theory={{
          what: "git diff shows the differences between files. It compares working directory vs staging area, staging area vs repository, or between commits.",
          why: "git diff helps you see exactly what changed before committing. It's useful for reviewing changes, debugging, and understanding differences between versions.",
          how: "View unstaged changes: 'git diff'. View staged changes: 'git diff --staged'. Compare commits: 'git diff commit1 commit2'. Compare branches: 'git diff branch1 branch2'.",
          keyPoints: [
            "Shows file differences",
            "git diff (unstaged changes)",
            "git diff --staged (staged changes)",
            "Compare commits or branches",
            "Useful for reviewing changes"
          ],
          interviewQuestions: [
            {
              question: "What does git diff show?",
              answer: "git diff shows the differences between files. 'git diff' shows unstaged changes (working directory vs staging area). 'git diff --staged' shows staged changes (staging area vs repository). You can also compare commits with 'git diff commit1 commit2' or branches with 'git diff branch1 branch2'."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Diff"
          description="View differences"
          code={`# View unstaged changes
git diff

# View staged changes
git diff --staged
# or
git diff --cached

# View changes in specific file
git diff src/App.tsx

# Compare two commits
git diff abc123 def456

# Compare two branches
git diff main develop

# Compare with previous commit
git diff HEAD~1

# Word-level diff (easier to read)
git diff --word-diff`}
        />
      </ConceptCard>

      <ConceptCard
        id="8"
        number={8}
        title="Git Ignore"
        priority="🔥"
        theory={{
          what: ".gitignore is a file that tells Git which files and directories to ignore. Files listed in .gitignore won't be tracked by Git.",
          why: ".gitignore prevents committing unnecessary files like node_modules, build outputs, environment variables, IDE settings, and OS files. It keeps your repository clean and secure.",
          how: "Create .gitignore file in repository root. Add patterns (file names, directories, wildcards). Common patterns: node_modules/, .env, *.log, dist/, .DS_Store. Use # for comments.",
          keyPoints: [
            "Tells Git what to ignore",
            "Create .gitignore file",
            "Add file/directory patterns",
            "Prevents committing unnecessary files",
            "Essential for clean repositories"
          ],
          interviewQuestions: [
            {
              question: "What is .gitignore and why is it important?",
              answer: ".gitignore is a file that tells Git which files and directories to ignore. It prevents committing unnecessary files like node_modules, build outputs, environment variables (.env), IDE settings, and OS files. It keeps your repository clean, secure, and prevents accidentally committing sensitive information."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Ignore"
          description="Ignore files and directories"
          code={`# .gitignore file

# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/
*.log

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Specific files
config.json
secrets.txt

# Patterns
*.tmp
*.cache
temp/
*.min.js`}
        />
      </ConceptCard>

      <ConceptCard
        id="9"
        number={9}
        title="Git Restore / Reset"
        theory={{
          what: "git restore and git reset undo changes. git restore reverts files in working directory. git reset moves the branch pointer and can unstage files.",
          why: "These commands help you undo mistakes, discard unwanted changes, or unstage files. They're essential for fixing errors and managing your working directory.",
          how: "Discard changes: 'git restore filename'. Unstage: 'git restore --staged filename'. Reset to commit: 'git reset --soft/hard/mixed commit'. Be careful with reset --hard as it discards changes permanently.",
          keyPoints: [
            "Undo changes",
            "git restore (discard changes)",
            "git restore --staged (unstage)",
            "git reset (move branch pointer)",
            "Be careful with --hard"
          ],
          interviewQuestions: [
            {
              question: "How do you undo changes in Git?",
              answer: "Use 'git restore filename' to discard changes in working directory. Use 'git restore --staged filename' to unstage files. Use 'git reset --soft commit' to move branch pointer but keep changes staged. Use 'git reset --hard commit' to discard all changes (be careful - this is permanent)."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Restore / Reset"
          description="Undo changes"
          code={`# Discard changes in working directory
git restore src/App.tsx

# Unstage file (keep changes)
git restore --staged src/App.tsx

# Discard all changes
git restore .

# Reset to previous commit (soft - keeps changes staged)
git reset --soft HEAD~1

# Reset to previous commit (mixed - keeps changes, unstaged)
git reset HEAD~1

# Reset to previous commit (hard - discards all changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard abc123`}
        />
      </ConceptCard>

      <ConceptCard
        id="10"
        number={10}
        title="Git Show"
        theory={{
          what: "git show displays information about a specific commit, including the changes made, author, date, and commit message.",
          why: "git show helps you examine specific commits in detail. It's useful for understanding what changed in a particular commit, reviewing code, and debugging.",
          how: "Show last commit: 'git show'. Show specific commit: 'git show commit-id'. Show file from commit: 'git show commit-id:filename'. Show only stats: 'git show --stat'.",
          keyPoints: [
            "Shows commit details",
            "git show (last commit)",
            "git show commit-id (specific commit)",
            "Shows changes, author, date",
            "Useful for reviewing commits"
          ],
          interviewQuestions: [
            {
              question: "What does git show do?",
              answer: "git show displays information about a specific commit, including the changes made, author, date, and commit message. Use 'git show' for the last commit or 'git show commit-id' for a specific commit. It's useful for examining commits in detail and understanding what changed."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Show"
          description="View commit details"
          code={`# Show last commit
git show

# Show specific commit
git show abc123

# Show only commit message
git show --stat

# Show file from commit
git show abc123:src/App.tsx

# Show commit with word diff
git show --word-diff

# Show only changed files
git show --name-only`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== BRANCHING & MERGING (11-18) ==========
function BranchingMerging({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🌿 Branching & Merging</h3>
        <p className="text-blue-100 break-words">Working with branches and merging changes</p>
      </div>

      <ConceptCard
        id="11"
        number={11}
        title="Git Branch"
        priority="🔥"
        theory={{
          what: "A branch is a movable pointer to a commit. Branches allow you to work on different features or versions simultaneously without affecting the main codebase.",
          why: "Branches enable parallel development, feature isolation, experimentation, and safe collaboration. They're essential for team workflows and allow you to work on features without breaking main code.",
          how: "List branches: 'git branch'. Create branch: 'git branch branch-name'. Switch branch: 'git checkout branch-name' or 'git switch branch-name'. Create and switch: 'git checkout -b branch-name'.",
          keyPoints: [
            "Movable pointer to commit",
            "Enables parallel development",
            "git branch (list/create)",
            "git checkout/switch (change branch)",
            "Essential for team workflows"
          ],
          interviewQuestions: [
            {
              question: "What are Git branches and why use them?",
              answer: "Branches are movable pointers to commits that allow you to work on different features simultaneously. They enable parallel development, feature isolation, and safe collaboration. Use 'git branch' to list/create branches, 'git checkout branch-name' to switch, and 'git checkout -b branch-name' to create and switch."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Branch"
          description="Work with branches"
          code={`# List branches
git branch

# List all branches (including remote)
git branch -a

# Create new branch
git branch feature-login

# Switch to branch
git checkout feature-login
# or (newer syntax)
git switch feature-login

# Create and switch in one command
git checkout -b feature-login
# or
git switch -c feature-login

# Delete branch
git branch -d feature-login

# Force delete (even if not merged)
git branch -D feature-login

# Rename current branch
git branch -m new-name`}
        />
      </ConceptCard>

      <ConceptCard
        id="12"
        number={12}
        title="Git Checkout / Switch"
        theory={{
          what: "git checkout and git switch change which branch you're working on. git switch is the newer, simpler command for switching branches.",
          why: "You need to switch branches to work on different features or versions. git switch is recommended for switching, while git checkout has multiple uses (switching, creating branches, restoring files).",
          how: "Switch branch: 'git switch branch-name' or 'git checkout branch-name'. Create and switch: 'git switch -c branch-name'. Switch to previous branch: 'git switch -'.",
          keyPoints: [
            "Changes active branch",
            "git switch (recommended)",
            "git checkout (older, multi-purpose)",
            "git switch -c (create and switch)",
            "git switch - (previous branch)"
          ],
          interviewQuestions: [
            {
              question: "How do you switch branches in Git?",
              answer: "Use 'git switch branch-name' (recommended) or 'git checkout branch-name' to switch branches. Use 'git switch -c branch-name' to create and switch in one command. Use 'git switch -' to switch to the previous branch. git switch is simpler and more focused than git checkout."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Checkout / Switch"
          description="Change branches"
          code={`# Switch to branch
git switch feature-login
# or
git checkout feature-login

# Create and switch
git switch -c feature-login
# or
git checkout -b feature-login

# Switch to previous branch
git switch -

# Switch to remote branch
git switch -c local-branch origin/remote-branch

# Detach HEAD (checkout specific commit)
git checkout abc123`}
        />
      </ConceptCard>

      <ConceptCard
        id="13"
        number={13}
        title="Git Merge"
        priority="🔥"
        theory={{
          what: "git merge combines changes from one branch into another. It creates a merge commit that has two parents, combining the histories of both branches.",
          why: "Merging integrates feature branches into main, combines work from different developers, and maintains project history. It's essential for collaborative development.",
          how: "Switch to target branch: 'git checkout main'. Merge source branch: 'git merge feature-branch'. Resolve conflicts if any. Fast-forward merges happen automatically when possible.",
          keyPoints: [
            "Combines branch changes",
            "Creates merge commit",
            "Switch to target branch first",
            "Resolve conflicts if needed",
            "Fast-forward when possible"
          ],
          interviewQuestions: [
            {
              question: "How do you merge branches in Git?",
              answer: "Switch to the target branch (e.g., 'git checkout main'), then merge the source branch with 'git merge feature-branch'. Git will create a merge commit combining both histories. If there are conflicts, resolve them manually. Fast-forward merges happen automatically when the target branch hasn't diverged."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Merge"
          description="Merge branches"
          code={`# Switch to target branch
git checkout main

# Merge feature branch
git merge feature-login

# Merge with no fast-forward (always creates merge commit)
git merge --no-ff feature-login

# Merge with commit message
git merge -m "Merge feature-login into main" feature-login

# Abort merge (if conflicts)
git merge --abort

# Squash merge (combines all commits into one)
git merge --squash feature-login
git commit -m "Add login feature"`}
        />
      </ConceptCard>

      <ConceptCard
        id="14"
        number={14}
        title="Merge Conflicts"
        priority="🔥"
        theory={{
          what: "Merge conflicts occur when Git can't automatically combine changes from different branches. They happen when the same lines are modified differently in both branches.",
          why: "Conflicts are normal in collaborative development. They indicate that multiple people worked on the same code. Resolving conflicts requires understanding both changes and deciding how to combine them.",
          how: "Git marks conflicts in files with <<<<<<, ======, >>>>>> markers. Edit files to resolve conflicts. Remove conflict markers. Stage resolved files: 'git add'. Complete merge: 'git commit'.",
          keyPoints: [
            "Occur when changes conflict",
            "Marked with conflict markers",
            "Edit files to resolve",
            "Remove conflict markers",
            "Stage and commit resolution"
          ],
          interviewQuestions: [
            {
              question: "How do you resolve merge conflicts?",
              answer: "When conflicts occur, Git marks them in files with <<<<<<, ======, >>>>>> markers. Edit the files to resolve conflicts by choosing which changes to keep or combining them. Remove the conflict markers. Stage resolved files with 'git add', then complete the merge with 'git commit'."
            }
          ]
        }}
      >
        <CodeExample
          title="Merge Conflicts"
          description="Resolve conflicts"
          code={`# When merge conflict occurs:
# <<<<<<< HEAD
# Current branch changes
# =======
# Incoming branch changes
# >>>>>>> feature-branch

# Example conflict:
<<<<<<< HEAD
function login() {
  return "Login";
}
=======
function login() {
  return "Sign in";
}
>>>>>>> feature-branch

# Resolved version:
function login() {
  return "Login";
}

# After resolving:
git add src/App.tsx
git commit -m "Resolve merge conflict"`}
        />
      </ConceptCard>

      <ConceptCard
        id="15"
        number={15}
        title="Git Rebase"
        theory={{
          what: "git rebase moves or combines commits from one branch onto another. It rewrites commit history to create a linear history instead of merge commits.",
          why: "Rebase creates a cleaner, linear history. It's useful for keeping feature branches up-to-date with main and avoiding unnecessary merge commits. However, it rewrites history, so use carefully on shared branches.",
          how: "Rebase current branch onto another: 'git rebase main'. Interactive rebase: 'git rebase -i HEAD~n'. Resolve conflicts if any. Continue after resolving: 'git rebase --continue'. Abort: 'git rebase --abort'.",
          keyPoints: [
            "Rewrites commit history",
            "Creates linear history",
            "git rebase main",
            "Interactive: git rebase -i",
            "Don't rebase shared branches"
          ],
          interviewQuestions: [
            {
              question: "What is git rebase and when would you use it?",
              answer: "git rebase moves commits from one branch onto another, creating a linear history. Use it to keep feature branches up-to-date with main without merge commits. Use 'git rebase main' to rebase current branch. Use 'git rebase -i' for interactive rebase. Don't rebase branches that others are working on as it rewrites history."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Rebase"
          description="Rebase branches"
          code={`# Rebase current branch onto main
git checkout feature-branch
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Continue after resolving conflicts
git rebase --continue

# Abort rebase
git rebase --abort

# Rebase onto different branch
git rebase --onto main feature-old feature-new`}
        />
      </ConceptCard>

      <ConceptCard
        id="16"
        number={16}
        title="Git Stash"
        priority="🔥"
        theory={{
          what: "git stash temporarily saves uncommitted changes so you can switch branches or pull updates without committing. Stashed changes can be reapplied later.",
          why: "Stash is useful when you need to switch branches but have uncommitted changes, or when you need to pull updates but aren't ready to commit. It's a temporary storage for your work.",
          how: "Save changes: 'git stash' or 'git stash save \"message\"'. List stashes: 'git stash list'. Apply stash: 'git stash apply' or 'git stash pop'. Drop stash: 'git stash drop'. Clear all: 'git stash clear'.",
          keyPoints: [
            "Temporarily saves changes",
            "git stash (save changes)",
            "git stash pop (apply and remove)",
            "git stash list (view stashes)",
            "Useful for switching branches"
          ],
          interviewQuestions: [
            {
              question: "What is git stash and when would you use it?",
              answer: "git stash temporarily saves uncommitted changes so you can switch branches or pull updates. Use it when you have uncommitted work but need to switch branches. Use 'git stash' to save, 'git stash pop' to apply and remove, and 'git stash list' to view all stashes."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Stash"
          description="Temporarily save changes"
          code={`# Stash current changes
git stash

# Stash with message
git stash save "WIP: working on login"

# Stash including untracked files
git stash -u

# List stashes
git stash list

# Apply stash (keeps stash)
git stash apply

# Apply specific stash
git stash apply stash@{0}

# Apply and remove stash
git stash pop

# Drop stash
git stash drop stash@{0}

# Clear all stashes
git stash clear`}
        />
      </ConceptCard>

      <ConceptCard
        id="17"
        number={17}
        title="Git Cherry-pick"
        theory={{
          what: "git cherry-pick applies a specific commit from one branch to another. It's useful for applying individual commits without merging entire branches.",
          why: "Cherry-picking allows you to selectively apply commits. Useful for bug fixes, applying specific features, or backporting changes to older versions.",
          how: "Find commit ID: 'git log'. Switch to target branch: 'git checkout main'. Cherry-pick: 'git cherry-pick commit-id'. Resolve conflicts if any. Continue: 'git cherry-pick --continue'.",
          keyPoints: [
            "Applies specific commit",
            "git cherry-pick commit-id",
            "Useful for bug fixes",
            "Can cherry-pick multiple commits",
            "Resolve conflicts if needed"
          ],
          interviewQuestions: [
            {
              question: "What is git cherry-pick?",
              answer: "git cherry-pick applies a specific commit from one branch to another. Use it to selectively apply commits without merging entire branches. Find the commit ID with 'git log', switch to target branch, then use 'git cherry-pick commit-id'. Useful for bug fixes and applying specific features."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Cherry-pick"
          description="Apply specific commits"
          code={`# Find commit ID
git log --oneline

# Cherry-pick single commit
git checkout main
git cherry-pick abc123

# Cherry-pick multiple commits
git cherry-pick abc123 def456

# Cherry-pick range
git cherry-pick abc123..def456

# Continue after resolving conflicts
git cherry-pick --continue

# Abort cherry-pick
git cherry-pick --abort`}
        />
      </ConceptCard>

      <ConceptCard
        id="18"
        number={18}
        title="Git Tag"
        theory={{
          what: "Git tags mark specific points in history, typically for releases. Tags are like branches but don't move - they point to a specific commit permanently.",
          why: "Tags are used to mark releases (v1.0.0, v2.1.3), important milestones, or stable versions. They make it easy to reference specific versions of your code.",
          how: "Create lightweight tag: 'git tag v1.0.0'. Create annotated tag: 'git tag -a v1.0.0 -m \"message\"'. List tags: 'git tag'. Push tags: 'git push origin v1.0.0' or 'git push --tags'.",
          keyPoints: [
            "Marks specific points in history",
            "Used for releases",
            "git tag v1.0.0 (create)",
            "git tag (list)",
            "Push tags separately"
          ],
          interviewQuestions: [
            {
              question: "What are Git tags and how do you use them?",
              answer: "Git tags mark specific points in history, typically for releases. Create with 'git tag v1.0.0' (lightweight) or 'git tag -a v1.0.0 -m \"message\"' (annotated). List with 'git tag'. Push with 'git push origin v1.0.0' or 'git push --tags'. Tags don't move like branches - they permanently point to a commit."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Tag"
          description="Mark releases"
          code={`# Create lightweight tag
git tag v1.0.0

# Create annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag specific commit
git tag -a v1.0.0 abc123 -m "Release 1.0.0"

# List tags
git tag

# Show tag details
git show v1.0.0

# Delete tag
git tag -d v1.0.0

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push --tags`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== REMOTE REPOSITORIES (19-25) ==========
function RemoteRepositories({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">☁️ Remote Repositories</h3>
        <p className="text-purple-100 break-words">Working with remote repositories</p>
      </div>

      <ConceptCard
        id="19"
        number={19}
        title="Git Remote"
        priority="🔥"
        theory={{
          what: "A remote is a reference to another repository, typically on a server like GitHub. It allows you to share code, collaborate, and synchronize with others.",
          why: "Remotes enable collaboration, backup, and distribution of code. They're essential for team development and allow multiple developers to work on the same project.",
          how: "Add remote: 'git remote add origin url'. List remotes: 'git remote -v'. Remove remote: 'git remote remove origin'. Rename remote: 'git remote rename old new'.",
          keyPoints: [
            "Reference to remote repository",
            "git remote add (add remote)",
            "git remote -v (list)",
            "Typically named 'origin'",
            "Essential for collaboration"
          ],
          interviewQuestions: [
            {
              question: "What is a Git remote and how do you add one?",
              answer: "A remote is a reference to another repository, typically on GitHub. Add with 'git remote add origin url'. List with 'git remote -v'. The default remote is usually named 'origin'. Remotes enable collaboration, backup, and code sharing between developers."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Remote"
          description="Manage remote repositories"
          code={`# Add remote
git remote add origin https://github.com/user/repo.git

# List remotes
git remote -v

# Show remote URL
git remote get-url origin

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin upstream`}
        />
      </ConceptCard>

      <ConceptCard
        id="20"
        number={20}
        title="Git Clone"
        priority="🔥"
        theory={{
          what: "git clone creates a local copy of a remote repository. It downloads all files, history, and branches from the remote repository.",
          why: "Clone is the standard way to get a copy of a project. It sets up the local repository with the remote already configured, making it ready to work with.",
          how: "Clone repository: 'git clone url'. Clone to specific directory: 'git clone url directory-name'. Clone specific branch: 'git clone -b branch-name url'. Clone with SSH: 'git clone git@github.com:user/repo.git'.",
          keyPoints: [
            "Creates local copy",
            "Downloads all history",
            "git clone url",
            "Sets up remote automatically",
            "Standard way to get project"
          ],
          interviewQuestions: [
            {
              question: "How do you clone a Git repository?",
              answer: "Use 'git clone url' to create a local copy of a remote repository. It downloads all files, history, and branches, and automatically sets up the remote. Clone to a specific directory with 'git clone url directory-name'. Clone a specific branch with 'git clone -b branch-name url'."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Clone"
          description="Clone remote repository"
          code={`# Clone repository
git clone https://github.com/user/repo.git

# Clone to specific directory
git clone https://github.com/user/repo.git my-project

# Clone specific branch
git clone -b develop https://github.com/user/repo.git

# Clone with SSH
git clone git@github.com:user/repo.git

# Shallow clone (less history)
git clone --depth 1 https://github.com/user/repo.git`}
        />
      </ConceptCard>

      <ConceptCard
        id="21"
        number={21}
        title="Git Push"
        priority="🔥"
        theory={{
          what: "git push uploads local commits to a remote repository. It updates the remote with your local changes.",
          why: "Push shares your work with others, backs up your code, and updates remote branches. It's essential for collaboration and keeping remotes in sync.",
          how: "Push to remote: 'git push origin branch-name'. Push current branch: 'git push'. Push all branches: 'git push --all'. First push: 'git push -u origin branch-name' (sets upstream).",
          keyPoints: [
            "Uploads commits to remote",
            "git push origin branch",
            "git push -u (set upstream)",
            "Shares work with others",
            "Essential for collaboration"
          ],
          interviewQuestions: [
            {
              question: "How do you push changes to a remote repository?",
              answer: "Use 'git push origin branch-name' to upload commits to remote. Use 'git push -u origin branch-name' for first push to set upstream tracking. Use 'git push' to push current branch if upstream is set. Push shares your work, backs up code, and updates remote branches."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Push"
          description="Upload commits to remote"
          code={`# Push to remote
git push origin main

# Push current branch (if upstream set)
git push

# First push (set upstream)
git push -u origin feature-login

# Push all branches
git push --all

# Force push (dangerous - overwrites remote)
git push --force
# or safer
git push --force-with-lease

# Push tags
git push --tags`}
        />
      </ConceptCard>

      <ConceptCard
        id="22"
        number={22}
        title="Git Pull"
        priority="🔥"
        theory={{
          what: "git pull downloads changes from remote and merges them into your current branch. It's equivalent to 'git fetch' followed by 'git merge'.",
          why: "Pull updates your local repository with changes from others. It's essential for staying up-to-date and getting the latest code from the team.",
          how: "Pull from remote: 'git pull origin branch-name'. Pull current branch: 'git pull'. Pull with rebase: 'git pull --rebase'. Resolve conflicts if any.",
          keyPoints: [
            "Downloads and merges changes",
            "git pull origin branch",
            "Equivalent to fetch + merge",
            "git pull --rebase (rebase instead)",
            "Updates local repository"
          ],
          interviewQuestions: [
            {
              question: "What does git pull do?",
              answer: "git pull downloads changes from remote and merges them into your current branch. It's equivalent to 'git fetch' followed by 'git merge'. Use 'git pull origin branch-name' or 'git pull' for current branch. Use 'git pull --rebase' to rebase instead of merge."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Pull"
          description="Download and merge changes"
          code={`# Pull from remote
git pull origin main

# Pull current branch
git pull

# Pull with rebase
git pull --rebase

# Pull specific branch
git pull origin feature-login

# Pull and show verbose output
git pull -v`}
        />
      </ConceptCard>

      <ConceptCard
        id="23"
        number={23}
        title="Git Fetch"
        theory={{
          what: "git fetch downloads changes from remote without merging them. It updates remote-tracking branches but doesn't change your working directory.",
          why: "Fetch lets you see what others have done without merging. It's safer than pull because it doesn't automatically merge, allowing you to review changes first.",
          how: "Fetch from remote: 'git fetch origin'. Fetch all remotes: 'git fetch --all'. Fetch specific branch: 'git fetch origin branch-name'. Then merge or rebase as needed.",
          keyPoints: [
            "Downloads without merging",
            "Updates remote-tracking branches",
            "git fetch origin",
            "Safer than pull",
            "Review before merging"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between git fetch and git pull?",
              answer: "git fetch downloads changes from remote without merging, updating remote-tracking branches. git pull downloads and merges in one step. Fetch is safer because you can review changes before merging. Use 'git fetch origin' then 'git merge origin/branch' or 'git pull' for automatic merge."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Fetch"
          description="Download without merging"
          code={`# Fetch from remote
git fetch origin

# Fetch all remotes
git fetch --all

# Fetch specific branch
git fetch origin main

# Fetch and prune (remove deleted remote branches)
git fetch --prune

# See what was fetched
git log origin/main..HEAD`}
        />
      </ConceptCard>

      <ConceptCard
        id="24"
        number={24}
        title="Git Pull vs Fetch"
        theory={{
          what: "git pull = fetch + merge (automatic). git fetch downloads only, then you manually merge. Understanding the difference helps you choose the right approach.",
          why: "Fetch gives you control to review changes before merging. Pull is convenient but automatically merges, which might cause unexpected conflicts. Choose based on your workflow.",
          how: "Use 'git fetch' to download and review. Then 'git merge origin/branch' or 'git rebase origin/branch'. Use 'git pull' for quick updates when you're ready to merge immediately.",
          keyPoints: [
            "Pull = fetch + merge",
            "Fetch = download only",
            "Fetch gives more control",
            "Pull is convenient",
            "Choose based on workflow"
          ],
          interviewQuestions: [
            {
              question: "When would you use git fetch instead of git pull?",
              answer: "Use git fetch when you want to review changes before merging. Fetch downloads changes without merging, letting you inspect what others did. Then manually merge with 'git merge origin/branch' or rebase. Use git pull when you're ready to merge immediately and want the convenience of one command."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Pull vs Fetch"
          description="Understanding the difference"
          code={`# Pull (fetch + merge automatically)
git pull origin main

# Fetch (download only)
git fetch origin

# Then manually merge
git merge origin/main

# Or rebase
git rebase origin/main

# Check what would be merged
git log HEAD..origin/main

# See differences
git diff HEAD origin/main`}
        />
      </ConceptCard>

      <ConceptCard
        id="25"
        number={25}
        title="Upstream Tracking"
        theory={{
          what: "Upstream tracking links a local branch to a remote branch. It allows you to use 'git push' and 'git pull' without specifying the remote and branch name.",
          why: "Upstream tracking makes working with remotes easier. Once set, you can use 'git push' and 'git pull' without typing the full remote and branch name every time.",
          how: "Set upstream on push: 'git push -u origin branch-name'. Set upstream later: 'git branch --set-upstream-to=origin/branch-name'. View upstream: 'git branch -vv'. Remove upstream: 'git branch --unset-upstream'.",
          keyPoints: [
            "Links local to remote branch",
            "git push -u (set upstream)",
            "Allows git push/pull without full name",
            "View with git branch -vv",
            "Makes remote work easier"
          ],
          interviewQuestions: [
            {
              question: "What is upstream tracking in Git?",
              answer: "Upstream tracking links a local branch to a remote branch. Set it with 'git push -u origin branch-name' or 'git branch --set-upstream-to=origin/branch-name'. Once set, you can use 'git push' and 'git pull' without specifying the remote and branch. View with 'git branch -vv'."
            }
          ]
        }}
      >
        <CodeExample
          title="Upstream Tracking"
          description="Link local and remote branches"
          code={`# Set upstream on first push
git push -u origin feature-login

# Set upstream later
git branch --set-upstream-to=origin/feature-login

# View upstream branches
git branch -vv

# Remove upstream
git branch --unset-upstream

# After setting upstream, you can use:
git push    # Instead of git push origin feature-login
git pull    # Instead of git pull origin feature-login`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== COLLABORATION (26-32) ==========
function Collaboration({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">👥 Collaboration</h3>
        <p className="text-orange-100 break-words">Working with teams and collaborative workflows</p>
      </div>

      <ConceptCard
        id="26"
        number={26}
        title="Pull Requests"
        priority="🔥"
        theory={{
          what: "Pull Requests (PRs) are a GitHub feature that allows you to propose changes to a repository. They enable code review, discussion, and collaboration before merging.",
          why: "Pull Requests enable code review, discussion, CI/CD integration, and maintain code quality. They're essential for team collaboration and ensure changes are reviewed before merging.",
          how: "Create feature branch, make changes, push branch, open PR on GitHub. Reviewers can comment, request changes, or approve. Merge when approved. Use descriptive titles and descriptions.",
          keyPoints: [
            "Propose changes for review",
            "Enable code review",
            "Discussion before merging",
            "CI/CD integration",
            "Essential for teams"
          ],
          interviewQuestions: [
            {
              question: "What is a Pull Request and how does it work?",
              answer: "Pull Requests are a GitHub feature that allows you to propose changes. Create a feature branch, make changes, push to GitHub, then open a PR. Reviewers can comment, request changes, or approve. Merge when approved. PRs enable code review, discussion, and maintain code quality."
            }
          ]
        }}
      >
        <CodeExample
          title="Pull Requests"
          description="Create and manage PRs"
          code={`# Workflow for Pull Request:
# 1. Create feature branch
git checkout -b feature-new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push branch
git push -u origin feature-new-feature

# 4. Open PR on GitHub
# - Go to repository
# - Click "New Pull Request"
# - Select your branch
# - Add description
# - Request reviewers

# 5. After review, merge PR
# - Squash and merge (recommended)
# - Merge commit
# - Rebase and merge`}
        />
      </ConceptCard>

      <ConceptCard
        id="27"
        number={27}
        title="Code Review"
        priority="🔥"
        theory={{
          what: "Code review is the process of examining code changes before merging. It ensures code quality, catches bugs, shares knowledge, and maintains standards.",
          why: "Code review improves code quality, catches bugs early, shares knowledge among team members, ensures consistency, and maintains coding standards. It's essential for professional development.",
          how: "Review PRs on GitHub. Check code quality, logic, tests, documentation. Leave constructive comments. Approve or request changes. Be respectful and helpful. Review promptly.",
          keyPoints: [
            "Examine code before merging",
            "Ensures code quality",
            "Catches bugs early",
            "Shares knowledge",
            "Maintains standards"
          ],
          interviewQuestions: [
            {
              question: "What should you look for in a code review?",
              answer: "In code review, check: code quality and readability, logic correctness, test coverage, documentation, adherence to standards, security issues, performance, and edge cases. Leave constructive comments, be respectful, and review promptly. Approve when satisfied or request changes."
            }
          ]
        }}
      >
        <CodeExample
          title="Code Review"
          description="Best practices for reviewing code"
          code={`# Code Review Checklist:
# ✅ Code quality and readability
# ✅ Logic correctness
# ✅ Test coverage
# ✅ Documentation
# ✅ Adherence to standards
# ✅ Security issues
# ✅ Performance
# ✅ Edge cases

# On GitHub:
# - Leave inline comments
# - Use suggestions
# - Request changes if needed
# - Approve when satisfied
# - Be constructive and respectful

# Example review comments:
# "Consider extracting this into a function"
# "This might cause a memory leak"
# "Great solution! Just a small suggestion..."
# "Please add tests for this edge case"`}
        />
      </ConceptCard>

      <ConceptCard
        id="28"
        number={28}
        title="Fork & Clone"
        theory={{
          what: "Forking creates your own copy of someone else's repository. Cloning downloads a repository to your local machine. Forking is for contributing to others' projects.",
          why: "Forking allows you to contribute to open-source projects or work on projects you don't have write access to. Cloning is how you get any repository locally.",
          how: "Fork: Click 'Fork' on GitHub. Clone: 'git clone url'. For contributions: Fork → Clone → Make changes → Push → Open PR to original repository.",
          keyPoints: [
            "Fork = copy to your account",
            "Clone = download locally",
            "Fork for contributing",
            "Clone for any repository",
            "Fork → Clone → PR workflow"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between fork and clone?",
              answer: "Forking creates your own copy of a repository on GitHub (for contributing to projects you don't own). Cloning downloads any repository to your local machine. For contributing: Fork on GitHub → Clone your fork → Make changes → Push → Open PR to original repository."
            }
          ]
        }}
      >
        <CodeExample
          title="Fork & Clone"
          description="Fork and clone workflow"
          code={`# Forking (on GitHub):
# 1. Go to repository
# 2. Click "Fork" button
# 3. Repository copied to your account

# Cloning your fork:
git clone https://github.com/your-username/repo.git
cd repo

# Add original as upstream:
git remote add upstream https://github.com/original-owner/repo.git

# Keep fork updated:
git fetch upstream
git merge upstream/main

# Make changes and push:
git checkout -b feature-fix
# ... make changes ...
git push origin feature-fix

# Open PR to original repository`}
        />
      </ConceptCard>

      <ConceptCard
        id="29"
        number={29}
        title="Branch Protection"
        theory={{
          what: "Branch protection rules enforce requirements before merging to protected branches (like main). They require PRs, reviews, status checks, and prevent force pushes.",
          why: "Branch protection prevents accidental changes to important branches, ensures code quality through reviews, requires tests to pass, and maintains project stability.",
          how: "Set up on GitHub: Settings → Branches → Add rule. Require PR reviews, require status checks, require branches to be up to date, prevent force pushes. Apply to main, develop, etc.",
          keyPoints: [
            "Protects important branches",
            "Requires PR reviews",
            "Requires status checks",
            "Prevents force pushes",
            "Maintains code quality"
          ],
          interviewQuestions: [
            {
              question: "What are branch protection rules?",
              answer: "Branch protection rules enforce requirements before merging to protected branches. They require pull requests, code reviews, status checks (CI/CD), prevent force pushes, and require branches to be up to date. Set up in GitHub Settings → Branches. Essential for maintaining code quality on main/develop branches."
            }
          ]
        }}
      >
        <CodeExample
          title="Branch Protection"
          description="Protect important branches"
          code={`# Branch Protection Settings (GitHub):
# Settings → Branches → Add rule

# Common rules:
# ✅ Require pull request reviews
#   - Required number of reviewers: 1-2
#   - Dismiss stale reviews
# ✅ Require status checks to pass
#   - CI/CD must pass
# ✅ Require branches to be up to date
# ✅ Prevent force pushes
# ✅ Prevent deletion

# Protected branches:
# - main/master
# - develop
# - release/*

# Benefits:
# - Prevents accidental changes
# - Ensures code quality
# - Requires tests to pass
# - Maintains project stability`}
        />
      </ConceptCard>

      <ConceptCard
        id="30"
        number={30}
        title="Git Workflow Strategies"
        priority="🔥"
        theory={{
          what: "Git workflows define how teams use Git for collaboration. Common workflows include Git Flow, GitHub Flow, and GitLab Flow. Each has different branching strategies.",
          why: "Workflows provide structure for collaboration, define when to create branches, how to merge, and maintain code quality. They help teams work together efficiently.",
          how: "GitHub Flow: main branch + feature branches. Git Flow: main, develop, feature, release, hotfix branches. Choose based on team size and release cycle. Follow consistently.",
          keyPoints: [
            "Define collaboration patterns",
            "GitHub Flow (simple)",
            "Git Flow (complex)",
            "Choose based on needs",
            "Follow consistently"
          ],
          interviewQuestions: [
            {
              question: "What are common Git workflow strategies?",
              answer: "Common workflows: 1) GitHub Flow - simple, main branch + feature branches, continuous deployment. 2) Git Flow - complex, uses main, develop, feature, release, hotfix branches, good for scheduled releases. 3) GitLab Flow - similar to GitHub Flow with environment branches. Choose based on team size and release cycle."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Workflow Strategies"
          description="Common workflow patterns"
          code={`# GitHub Flow (Simple):
# - main branch (always deployable)
# - Feature branches
# - PR → Review → Merge → Deploy

# Git Flow (Complex):
# - main (production)
# - develop (integration)
# - feature/* (new features)
# - release/* (preparing release)
# - hotfix/* (urgent fixes)

# Example Git Flow:
git checkout -b feature/login develop
# ... work ...
git checkout develop
git merge --no-ff feature/login
git checkout -b release/1.0.0
# ... prepare release ...
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0

# Choose workflow based on:
# - Team size
# - Release cycle
# - Project complexity`}
        />
      </ConceptCard>

      <ConceptCard
        id="31"
        number={31}
        title="Resolving Conflicts in PRs"
        theory={{
          what: "When PRs have conflicts with the target branch, they need to be resolved before merging. Conflicts occur when both branches modified the same lines.",
          why: "Resolving conflicts ensures the merged code is correct and combines changes properly. It's a common part of collaborative development.",
          how: "Update branch: 'git pull origin main' or 'git rebase origin/main'. Resolve conflicts in files. Stage resolved files: 'git add'. Continue: 'git rebase --continue' or commit. Push: 'git push'.",
          keyPoints: [
            "Update branch with target",
            "Resolve conflicts in files",
            "Stage resolved files",
            "Continue rebase or commit",
            "Push updated branch"
          ],
          interviewQuestions: [
            {
              question: "How do you resolve conflicts in a Pull Request?",
              answer: "Update your branch with the target branch: 'git pull origin main' or 'git rebase origin/main'. Resolve conflicts in files (remove markers, combine changes). Stage resolved files with 'git add'. Continue with 'git rebase --continue' or commit. Push updated branch. The PR will update automatically."
            }
          ]
        }}
      >
        <CodeExample
          title="Resolving Conflicts in PRs"
          description="Fix conflicts in pull requests"
          code={`# Method 1: Merge target into branch
git checkout feature-branch
git pull origin main
# Resolve conflicts
git add .
git commit -m "Resolve conflicts"
git push

# Method 2: Rebase on target
git checkout feature-branch
git rebase origin/main
# Resolve conflicts
git add .
git rebase --continue
git push --force-with-lease

# On GitHub:
# - Can resolve simple conflicts in UI
# - Or resolve locally and push

# After resolving:
# - PR updates automatically
# - Reviewers can review resolution
# - Merge when approved`}
        />
      </ConceptCard>

      <ConceptCard
        id="32"
        number={32}
        title="Squash & Merge"
        theory={{
          what: "Squash and merge combines all commits from a PR into a single commit when merging. It creates a cleaner history than merge commits.",
          why: "Squash and merge keeps main branch history clean, makes it easier to understand changes, and allows you to write a single descriptive commit message for the entire feature.",
          how: "On GitHub: Select 'Squash and merge' when merging PR. All commits become one. Write a descriptive commit message. Alternative: Use 'git merge --squash' locally.",
          keyPoints: [
            "Combines commits into one",
            "Cleaner history",
            "Single commit message",
            "Available on GitHub",
            "Good for feature branches"
          ],
          interviewQuestions: [
            {
              question: "What is squash and merge?",
              answer: "Squash and merge combines all commits from a PR into a single commit when merging. It creates a cleaner main branch history and allows you to write one descriptive commit message for the entire feature. Use it on GitHub when merging PRs or 'git merge --squash' locally."
            }
          ]
        }}
      >
        <CodeExample
          title="Squash & Merge"
          description="Combine commits when merging"
          code={`# On GitHub:
# When merging PR:
# 1. Click "Squash and merge"
# 2. Edit commit message
# 3. Confirm merge

# Locally:
git checkout main
git merge --squash feature-branch
git commit -m "Add login feature

- Implement authentication
- Add JWT handling
- Create protected routes"

# Benefits:
# - Cleaner history
# - One commit per feature
# - Easier to understand
# - Easier to revert

# vs Regular merge:
# - Regular: Creates merge commit
# - Squash: Single commit
# - Choose based on preference`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== ADVANCED GIT (33-40) ==========
function AdvancedGit({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">⚡ Advanced Git</h3>
        <p className="text-indigo-100 break-words">Advanced Git concepts and techniques</p>
      </div>

      <ConceptCard
        id="33"
        number={33}
        title="Interactive Rebase"
        theory={{
          what: "Interactive rebase lets you modify commits: reorder, edit, squash, drop, or change commit messages. It rewrites history, so use carefully.",
          why: "Interactive rebase helps clean up commit history, combine related commits, fix commit messages, and create a cleaner project history before sharing.",
          how: "Start interactive rebase: 'git rebase -i HEAD~n' (last n commits). Editor opens with commit list. Choose actions: pick, reword, edit, squash, drop. Save and follow prompts.",
          keyPoints: [
            "Modify commit history",
            "git rebase -i HEAD~n",
            "Reorder, edit, squash commits",
            "Rewrites history",
            "Use before sharing"
          ],
          interviewQuestions: [
            {
              question: "What is interactive rebase?",
              answer: "Interactive rebase lets you modify commits: reorder, edit, squash, drop, or change messages. Use 'git rebase -i HEAD~n' to rebase last n commits. Editor opens with actions: pick, reword, edit, squash, drop. It rewrites history, so use before sharing, not on shared branches."
            }
          ]
        }}
      >
        <CodeExample
          title="Interactive Rebase"
          description="Modify commit history"
          code={`# Interactive rebase last 3 commits
git rebase -i HEAD~3

# Editor opens:
# pick abc123 Add login
# pick def456 Fix typo
# pick ghi789 Add tests

# Change to:
# pick abc123 Add login
# squash def456 Fix typo
# reword ghi789 Add tests

# Actions:
# pick - use commit as-is
# reword - change message
# edit - modify commit
# squash - combine with previous
# drop - remove commit

# After editing, follow prompts to:
# - Edit commit messages
# - Resolve conflicts
# - Complete rebase`}
        />
      </ConceptCard>

      <ConceptCard
        id="34"
        number={34}
        title="Git Bisect"
        theory={{
          what: "git bisect helps find which commit introduced a bug by binary search. It automatically checks out commits and asks if the bug exists.",
          why: "Bisect is efficient for finding bugs in large histories. Instead of checking commits one by one, it uses binary search to quickly narrow down the problematic commit.",
          how: "Start: 'git bisect start'. Mark bad commit: 'git bisect bad'. Mark good commit: 'git bisect good commit-id'. Test and mark good/bad. Git narrows down. Reset: 'git bisect reset'.",
          keyPoints: [
            "Finds bug-introducing commit",
            "Uses binary search",
            "git bisect start",
            "Mark good/bad commits",
            "Efficient debugging tool"
          ],
          interviewQuestions: [
            {
              question: "What is git bisect and how do you use it?",
              answer: "git bisect finds which commit introduced a bug using binary search. Start with 'git bisect start', mark bad commit with 'git bisect bad', mark good commit with 'git bisect good commit-id'. Test each commit Git checks out and mark good/bad. Git narrows down to the problematic commit. Reset with 'git bisect reset'."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Bisect"
          description="Find bug-introducing commit"
          code={`# Start bisect
git bisect start

# Mark current commit as bad
git bisect bad

# Mark known good commit
git bisect good abc123

# Git checks out middle commit
# Test and mark:
git bisect good  # If bug doesn't exist
git bisect bad   # If bug exists

# Git continues narrowing down
# Until it finds the commit

# View the commit
git show

# Reset when done
git bisect reset

# Automated bisect (with script):
git bisect start HEAD abc123
git bisect run npm test`}
        />
      </ConceptCard>

      <ConceptCard
        id="35"
        number={35}
        title="Git Hooks"
        theory={{
          what: "Git hooks are scripts that run automatically at certain Git events (pre-commit, post-commit, pre-push, etc.). They can validate code, run tests, or perform custom actions.",
          why: "Hooks automate tasks, enforce standards, run tests before commits, format code, and prevent bad commits. They help maintain code quality automatically.",
          how: "Hooks are in .git/hooks/. Common: pre-commit (before commit), pre-push (before push), commit-msg (validate message). Write scripts (bash, Node.js, etc.). Make executable: 'chmod +x'.",
          keyPoints: [
            "Scripts run at Git events",
            "Located in .git/hooks/",
            "pre-commit, pre-push common",
            "Automate tasks",
            "Enforce standards"
          ],
          interviewQuestions: [
            {
              question: "What are Git hooks?",
              answer: "Git hooks are scripts that run automatically at Git events (pre-commit, post-commit, pre-push, etc.). They're in .git/hooks/. Common hooks: pre-commit (run before commit), pre-push (run before push), commit-msg (validate message). Use them to run tests, format code, or enforce standards automatically."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Hooks"
          description="Automate tasks with hooks"
          code={`# Hooks location
.git/hooks/

# Pre-commit hook example
#!/bin/sh
# Run linter
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed"
  exit 1
fi

# Pre-push hook example
#!/bin/sh
# Run tests
npm test
if [ $? -ne 0 ]; then
  echo "Tests failed"
  exit 1
fi

# Make executable
chmod +x .git/hooks/pre-commit

# Using Husky (Node.js):
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-push "npm test"`}
        />
      </ConceptCard>

      <ConceptCard
        id="36"
        number={36}
        title="Git Submodules"
        theory={{
          what: "Git submodules allow you to include one Git repository as a subdirectory of another. Useful for including external dependencies or shared code.",
          why: "Submodules let you include external repositories while keeping them separate. Useful for shared libraries, themes, or dependencies that are maintained separately.",
          how: "Add submodule: 'git submodule add url path'. Clone with submodules: 'git clone --recursive url'. Update submodules: 'git submodule update --remote'. Initialize: 'git submodule init'.",
          keyPoints: [
            "Include repo in repo",
            "git submodule add",
            "Clone with --recursive",
            "Update with submodule update",
            "Useful for dependencies"
          ],
          interviewQuestions: [
            {
              question: "What are Git submodules?",
              answer: "Git submodules allow you to include one Git repository as a subdirectory of another. Add with 'git submodule add url path'. Clone with 'git clone --recursive' to include submodules. Update with 'git submodule update --remote'. Useful for including external dependencies or shared code while keeping them separate."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Submodules"
          description="Include external repositories"
          code={`# Add submodule
git submodule add https://github.com/user/lib.git libs/shared-lib

# Clone repository with submodules
git clone --recursive https://github.com/user/repo.git

# Or after cloning:
git submodule init
git submodule update

# Update submodule to latest
git submodule update --remote

# Update all submodules
git submodule update --remote --recursive

# Remove submodule
git submodule deinit libs/shared-lib
git rm libs/shared-lib`}
        />
      </ConceptCard>

      <ConceptCard
        id="37"
        number={37}
        title="Git Reflog"
        theory={{
          what: "git reflog records all changes to branch tips. It's a safety net that lets you recover 'lost' commits, even after resets or deletions.",
          why: "Reflog helps recover lost work. If you accidentally reset or delete commits, reflog shows where they were. It's Git's safety mechanism.",
          how: "View reflog: 'git reflog'. See reflog for branch: 'git reflog branch-name'. Recover commit: 'git checkout commit-id' then create new branch. Reflog expires after 90 days by default.",
          keyPoints: [
            "Records branch tip changes",
            "git reflog (view)",
            "Recovers lost commits",
            "Safety net",
            "Expires after 90 days"
          ],
          interviewQuestions: [
            {
              question: "What is git reflog?",
              answer: "git reflog records all changes to branch tips. It's a safety net that lets you recover 'lost' commits. View with 'git reflog'. If you accidentally reset or delete commits, find them in reflog, checkout the commit-id, and create a new branch. Reflog expires after 90 days by default."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Reflog"
          description="Recover lost commits"
          code={`# View reflog
git reflog

# View reflog for specific branch
git reflog main

# Example output:
# abc123 HEAD@{0}: commit: Add feature
# def456 HEAD@{1}: reset: moving to HEAD~1
# ghi789 HEAD@{2}: commit: Previous commit

# Recover lost commit
git reflog
# Find commit ID (e.g., ghi789)
git checkout ghi789
git checkout -b recovered-branch

# Or reset to that commit
git reset --hard ghi789

# Reflog expires after 90 days
# Keep important work committed!`}
        />
      </ConceptCard>

      <ConceptCard
        id="38"
        number={38}
        title="Git Blame"
        theory={{
          what: "git blame shows who last modified each line of a file and when. It's useful for understanding code history and finding who to ask about code.",
          why: "Blame helps understand code ownership, find when lines were changed, identify who to contact about code, and track down when bugs were introduced.",
          how: "View blame: 'git blame filename'. Show specific lines: 'git blame -L 10,20 filename'. Show commit info: 'git blame -c filename'. Use on GitHub: click 'Blame' button.",
          keyPoints: [
            "Shows line-by-line history",
            "git blame filename",
            "Shows author and date",
            "Useful for code ownership",
            "Available on GitHub"
          ],
          interviewQuestions: [
            {
              question: "What does git blame do?",
              answer: "git blame shows who last modified each line of a file and when. Use 'git blame filename' to see line-by-line history. It shows the commit, author, and date for each line. Useful for understanding code ownership, finding when changes were made, and identifying who to contact about code."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Blame"
          description="See line-by-line history"
          code={`# View blame for file
git blame src/App.tsx

# View specific lines
git blame -L 10,20 src/App.tsx

# Show commit info
git blame -c src/App.tsx

# Ignore whitespace
git blame -w src/App.tsx

# Example output:
# abc123 (John Doe 2024-01-15 10:30:00 -0500 1) import React
# def456 (Jane Smith 2024-01-20 14:20:00 -0500 2) import { useState }
# ghi789 (John Doe 2024-01-15 10:31:00 -0500 3) 
# abc123 (John Doe 2024-01-15 10:32:00 -0500 4) export default function App() {

# On GitHub:
# Click "Blame" button on file view`}
        />
      </ConceptCard>

      <ConceptCard
        id="39"
        number={39}
        title="Git Clean"
        theory={{
          what: "git clean removes untracked files and directories from working directory. It's useful for cleaning up build artifacts, temporary files, or untracked changes.",
          why: "Clean helps remove untracked files that shouldn't be in the repository, like build outputs, temporary files, or files that should be in .gitignore.",
          how: "Dry run (see what would be removed): 'git clean -n'. Remove files: 'git clean -f'. Remove files and directories: 'git clean -fd'. Interactive: 'git clean -i'.",
          keyPoints: [
            "Removes untracked files",
            "git clean -n (dry run)",
            "git clean -f (remove files)",
            "git clean -fd (files and dirs)",
            "Use carefully"
          ],
          interviewQuestions: [
            {
              question: "What does git clean do?",
              answer: "git clean removes untracked files and directories from the working directory. Use 'git clean -n' for a dry run to see what would be removed. Use 'git clean -f' to remove files, 'git clean -fd' to remove files and directories. Use carefully as it permanently deletes untracked files."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Clean"
          description="Remove untracked files"
          code={`# Dry run (see what would be removed)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Interactive mode
git clean -i

# Remove ignored files too
git clean -fX

# Remove everything (including ignored)
git clean -fx

# Common use cases:
# - Remove build artifacts
# - Clean up temporary files
# - Remove files that should be in .gitignore

# Be careful! This permanently deletes files.`}
        />
      </ConceptCard>

      <ConceptCard
        id="40"
        number={40}
        title="Git Archive"
        theory={{
          what: "git archive creates a tar or zip archive of a specific commit or branch. Useful for creating release packages or backups.",
          why: "Archive creates clean snapshots without .git directory, perfect for releases, backups, or distributing code without version control files.",
          how: "Create archive: 'git archive --format=zip --output=release.zip HEAD'. Archive specific branch: 'git archive --format=tar branch-name'. Include submodules: 'git archive --format=zip --prefix=repo/ HEAD'.",
          keyPoints: [
            "Creates archive of repository",
            "git archive --format=zip",
            "No .git directory",
            "Useful for releases",
            "Multiple formats supported"
          ],
          interviewQuestions: [
            {
              question: "What is git archive?",
              answer: "git archive creates a tar or zip archive of a specific commit or branch. Use 'git archive --format=zip --output=release.zip HEAD' to create a zip. It doesn't include the .git directory, making it perfect for releases, backups, or distributing code. Supports tar, zip, and other formats."
            }
          ]
        }}
      >
        <CodeExample
          title="Git Archive"
          description="Create repository archives"
          code={`# Create zip archive of current commit
git archive --format=zip --output=release.zip HEAD

# Create tar archive
git archive --format=tar --output=release.tar HEAD

# Archive specific branch
git archive --format=zip --output=v1.0.0.zip v1.0.0

# Archive with prefix
git archive --format=zip --prefix=myapp/ --output=release.zip HEAD

# Archive specific directory
git archive --format=zip HEAD src/ > src.zip

# Common use cases:
# - Create release packages
# - Backup specific versions
# - Distribute code without .git
# - Create deployment packages`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== GITHUB FEATURES (41-48) ==========
function GitHubFeatures({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🐙 GitHub Features</h3>
        <p className="text-gray-300 break-words">GitHub-specific features and workflows</p>
      </div>

      <ConceptCard
        id="41"
        number={41}
        title="GitHub Issues"
        priority="🔥"
        theory={{
          what: "GitHub Issues are a project management tool for tracking bugs, features, and tasks. They enable discussion, assignment, labeling, and linking to PRs.",
          why: "Issues help organize work, track bugs, plan features, discuss ideas, and link code changes to problems. They're essential for project management and collaboration.",
          how: "Create issue: Click 'Issues' → 'New Issue'. Add title, description, labels, assignees. Link to PR: Reference in PR description (#123). Close: 'Closes #123' in PR description.",
          keyPoints: [
            "Track bugs and features",
            "Discussion and assignment",
            "Labels and milestones",
            "Link to PRs",
            "Essential for project management"
          ],
          interviewQuestions: [
            {
              question: "What are GitHub Issues?",
              answer: "GitHub Issues are a project management tool for tracking bugs, features, and tasks. Create issues to track work, assign to team members, add labels, and link to PRs. Reference issues in PRs with '#123'. Use 'Closes #123' in PR description to auto-close issues when PR merges."
            }
          ]
        }}
      >
        <CodeExample
          title="GitHub Issues"
          description="Track bugs and features"
          code={`# Creating Issues:
# 1. Click "Issues" tab
# 2. Click "New Issue"
# 3. Add title and description
# 4. Add labels (bug, feature, etc.)
# 5. Assign to team members
# 6. Add to milestone

# Issue Templates:
# - Bug report
# - Feature request
# - Question
# - Custom templates

# Linking to PRs:
# In PR description:
# "Fixes #123"
# "Closes #123"
# "Resolves #123"
# "Related to #123"

# Issue Actions:
# - Comment
# - Assign
# - Label
# - Milestone
# - Close/Reopen`}
        />
      </ConceptCard>

      <ConceptCard
        id="42"
        number={42}
        title="GitHub Actions"
        priority="🔥"
        theory={{
          what: "GitHub Actions is a CI/CD platform integrated with GitHub. It automates workflows like testing, building, and deploying on events like push or PR.",
          why: "Actions automate repetitive tasks, run tests automatically, deploy on merge, and ensure code quality. It's essential for modern development workflows.",
          how: "Create .github/workflows/ directory. Write YAML workflow files. Define triggers (push, PR), jobs, and steps. Use actions from marketplace. Workflows run automatically on events.",
          keyPoints: [
            "CI/CD platform",
            "Automates workflows",
            "YAML workflow files",
            "Runs on events",
            "Essential for automation"
          ],
          interviewQuestions: [
            {
              question: "What are GitHub Actions?",
              answer: "GitHub Actions is a CI/CD platform that automates workflows. Create .github/workflows/ directory and write YAML files defining triggers (push, PR), jobs, and steps. Workflows run automatically on events like push or PR. Use for testing, building, deploying, and other automation tasks."
            }
          ]
        }}
      >
        <CodeExample
          title="GitHub Actions"
          description="Automate workflows"
          code={`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm test
    - run: npm run lint

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - run: npm ci
    - run: npm run build`}
        />
      </ConceptCard>

      <ConceptCard
        id="43"
        number={43}
        title="GitHub Pages"
        theory={{
          what: "GitHub Pages hosts static websites directly from GitHub repositories. It's free hosting for documentation, portfolios, or project sites.",
          why: "Pages provides free hosting, automatic deployment from repository, custom domains, and is perfect for documentation, portfolios, or project websites.",
          how: "Enable in Settings → Pages. Choose source branch (main/docs). Site available at username.github.io/repo. Use Jekyll or static HTML. Deploys automatically on push.",
          keyPoints: [
            "Free static hosting",
            "Deploys from repository",
            "Custom domains supported",
            "Perfect for docs/portfolios",
            "Automatic deployment"
          ],
          interviewQuestions: [
            {
              question: "What is GitHub Pages?",
              answer: "GitHub Pages hosts static websites directly from GitHub repositories. Enable in Settings → Pages, choose source branch (main or docs), and your site is available at username.github.io/repo. It's free hosting perfect for documentation, portfolios, or project websites. Deploys automatically on push."
            }
          ]
        }}
      >
        <CodeExample
          title="GitHub Pages"
          description="Host static websites"
          code={`# Enable GitHub Pages:
# 1. Go to Settings → Pages
# 2. Choose source branch (main or docs)
# 3. Choose folder (/root or /docs)
# 4. Save

# Site URL:
# https://username.github.io/repo-name

# Custom domain:
# Add CNAME file with domain name
# Configure DNS

# Jekyll (default):
# Uses Jekyll to build site
# Supports Markdown, Liquid

# Static HTML:
# Just HTML/CSS/JS files
# No build process needed

# Deployment:
# Automatic on push to source branch
# Or manual via Actions`}
        />
      </ConceptCard>

      <ConceptCard
        id="44"
        number={44}
        title="GitHub Releases"
        theory={{
          what: "GitHub Releases package software versions with release notes, binaries, and changelogs. They're linked to Git tags and provide a way to distribute software.",
          why: "Releases provide a clear way to distribute software versions, document changes, attach binaries, and give users a way to download specific versions.",
          how: "Create release: Click 'Releases' → 'Draft new release'. Choose tag (or create new). Add title, description, attach files. Publish release. Releases are linked to tags.",
          keyPoints: [
            "Package software versions",
            "Linked to Git tags",
            "Release notes and binaries",
            "Distribution point",
            "Version documentation"
          ],
          interviewQuestions: [
            {
              question: "What are GitHub Releases?",
              answer: "GitHub Releases package software versions with release notes, binaries, and changelogs. Create in Releases section, choose or create a tag, add title and description, attach files. They're linked to Git tags and provide a way to distribute and document software versions."
            }
          ]
        }}
      >
        <CodeExample
          title="GitHub Releases"
          description="Package and distribute versions"
          code={`# Create Release:
# 1. Go to Releases
# 2. Click "Draft new release"
# 3. Choose tag (v1.0.0) or create new
# 4. Add title and description
# 5. Attach binaries (optional)
# 6. Publish

# Release Notes Example:
# ## What's New
# - Added user authentication
# - Fixed login bug
# - Improved performance
#
# ## Breaking Changes
# - API endpoint changed
#
# ## Contributors
# @user1, @user2

# Attach Files:
# - Binaries (.exe, .dmg, .zip)
# - Source code archives
# - Documentation

# Auto-generate from PRs:
# Use release notes generator`}
        />
      </ConceptCard>

      <ConceptCard
        id="45"
        number={45}
        title="GitHub Wikis"
        theory={{
          what: "GitHub Wikis provide documentation for repositories. They're separate Git repositories that can be edited through the web interface or cloned.",
          why: "Wikis are useful for project documentation, guides, FAQs, and collaborative documentation. They're separate from code but linked to the repository.",
          how: "Enable in Settings → Features → Wikis. Create pages through web interface. Edit Markdown files. Clone wiki: 'git clone https://github.com/user/repo.wiki.git'.",
          keyPoints: [
            "Repository documentation",
            "Separate Git repository",
            "Editable via web or Git",
            "Markdown format",
            "Collaborative documentation"
          ],
          interviewQuestions: [
            {
              question: "What are GitHub Wikis?",
              answer: "GitHub Wikis provide documentation for repositories. Enable in Settings → Features → Wikis. Create and edit pages through the web interface using Markdown. Wikis are separate Git repositories that can be cloned with 'git clone https://github.com/user/repo.wiki.git'. Useful for project documentation and guides."
            }
          ]
        }}
      >
        <CodeExample
          title="GitHub Wikis"
          description="Documentation for repositories"
          code={`# Enable Wiki:
# Settings → Features → Wikis → Enable

# Create Pages:
# - Click "Wiki" tab
# - Click "New Page"
# - Write in Markdown
# - Save

# Common Pages:
# - Home (main page)
# - Installation
# - Usage
# - API Reference
# - Contributing
# - FAQ

# Clone Wiki:
git clone https://github.com/user/repo.wiki.git

# Edit Locally:
# Edit Markdown files
# Commit and push

# Wiki Features:
# - Markdown support
# - Sidebar navigation
# - Search
# - Page history`}
        />
      </ConceptCard>

      <ConceptCard
        id="46"
        number={46}
        title="GitHub Gists"
        theory={{
          what: "GitHub Gists are simple way to share code snippets, notes, or small files. They're Git repositories but simpler and focused on sharing.",
          why: "Gists are perfect for sharing code snippets, quick notes, configuration files, or small scripts. They're public by default but can be secret.",
          how: "Create: Go to gist.github.com. Paste code, add filename, description. Choose public or secret. Share URL. Clone: 'git clone https://gist.github.com/id.git'.",
          keyPoints: [
            "Share code snippets",
            "Simple Git repositories",
            "Public or secret",
            "Easy to share",
            "Perfect for snippets"
          ],
          interviewQuestions: [
            {
              question: "What are GitHub Gists?",
              answer: "GitHub Gists are a simple way to share code snippets, notes, or small files. Create at gist.github.com, paste code, add filename and description, choose public or secret. They're Git repositories but simpler. Perfect for sharing code snippets, configuration files, or quick notes."
            }
          ]
        }}
      >
        <CodeExample
          title="GitHub Gists"
          description="Share code snippets"
          code={`# Create Gist:
# 1. Go to gist.github.com
# 2. Paste code
# 3. Add filename (e.g., app.js)
# 4. Add description
# 5. Choose public or secret
# 6. Create

# Gist URL:
# https://gist.github.com/username/gist-id

# Clone Gist:
git clone https://gist.github.com/gist-id.git

# Use Cases:
# - Share code snippets
# - Configuration files
# - Quick notes
# - Small scripts
# - Code examples

# Features:
# - Syntax highlighting
# - Version history
# - Fork and edit
# - Comments`}
        />
      </ConceptCard>

      <ConceptCard
        id="47"
        number={47}
        title="GitHub Organizations"
        theory={{
          what: "GitHub Organizations are shared accounts for teams. They provide team management, repositories, billing, and permissions for multiple users.",
          why: "Organizations enable team collaboration, centralized billing, repository management, team permissions, and are essential for companies and large projects.",
          how: "Create: Click '+' → 'New organization'. Add members, create teams, set permissions. Manage repositories, billing, and settings. Teams can have different access levels.",
          keyPoints: [
            "Shared team accounts",
            "Team management",
            "Centralized billing",
            "Repository permissions",
            "Essential for teams"
          ],
          interviewQuestions: [
            {
              question: "What are GitHub Organizations?",
              answer: "GitHub Organizations are shared accounts for teams. Create with '+' → 'New organization'. Add members, create teams, set permissions for repositories. Organizations enable team collaboration, centralized billing, and repository management. Essential for companies and large projects with multiple developers."
            }
          ]
        }}
      >
        <CodeExample
          title="GitHub Organizations"
          description="Team collaboration"
          code={`# Create Organization:
# 1. Click "+" → "New organization"
# 2. Choose plan
# 3. Add organization name
# 4. Add members

# Organization Features:
# - Team management
# - Repository permissions
# - Centralized billing
# - Team discussions
# - Project boards
# - Audit logs

# Teams:
# - Create teams (Frontend, Backend, etc.)
# - Assign repositories
# - Set permissions (read, write, admin)
# - Add members to teams

# Permissions:
# - Member (basic access)
# - Owner (full control)
# - Custom roles`}
        />
      </ConceptCard>

      <ConceptCard
        id="48"
        number={48}
        title="GitHub CLI"
        priority="🔥"
        theory={{
          what: "GitHub CLI (gh) is a command-line tool for GitHub. It lets you manage repositories, issues, PRs, and other GitHub features from the terminal.",
          why: "CLI enables automation, scripting, faster workflows, and integration with other tools. It's powerful for developers who prefer command-line interfaces.",
          how: "Install: 'brew install gh' (macOS), 'winget install GitHub.cli' (Windows), or download from GitHub. Authenticate: 'gh auth login'. Use commands: 'gh repo clone', 'gh pr create', 'gh issue list'. Check help: 'gh --help'.",
          keyPoints: [
            "Command-line tool for GitHub",
            "Manage repos, issues, PRs",
            "gh auth login (authenticate)",
            "Automation and scripting",
            "Faster workflows"
          ],
          interviewQuestions: [
            {
              question: "What is GitHub CLI and how do you use it?",
              answer: "GitHub CLI (gh) is a command-line tool for managing GitHub from the terminal. Install with 'brew install gh' (macOS) or download from GitHub. Authenticate with 'gh auth login'. Use commands like 'gh repo clone', 'gh pr create', 'gh issue list' to manage repositories, PRs, and issues. Great for automation and scripting."
            }
          ]
        }}
      >
        <CodeExample
          title="GitHub CLI"
          description="Command-line GitHub management"
          code={`# Install (macOS)
brew install gh

# Install (Windows)
winget install GitHub.cli

# Authenticate
gh auth login

# Clone repository
gh repo clone user/repo

# Create PR
gh pr create --title "Add feature" --body "Description"

# List PRs
gh pr list

# View PR
gh pr view 123

# Merge PR
gh pr merge 123

# Create issue
gh issue create --title "Bug" --body "Description"

# List issues
gh issue list

# View repository
gh repo view user/repo

# Checkout PR
gh pr checkout 123

# Help
gh --help
gh pr --help`}
        />
      </ConceptCard>
    </div>
  );
}

// Helper component for concept cards
interface ConceptCardProps {
  id?: string;
  number: number;
  title: string;
  description?: string;
  priority?: string;
  children: React.ReactNode;
  theory?: {
    what: string;
    why?: string;
    how?: string;
    keyPoints?: string[];
    interviewQuestions?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

function ConceptCard({
  id,
  number,
  title,
  description,
  priority,
  children,
  theory,
}: ConceptCardProps) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div 
      id={id ? `concept-${id}` : undefined}
      className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 w-full max-w-full flex flex-col overflow-hidden scroll-mt-4"
    >
      <div className="flex flex-wrap items-center gap-3 mb-4 w-full">
        <span className="text-2xl font-bold text-blue-500 flex-shrink-0">#{number}</span>
        <h4 className="text-2xl font-bold text-gray-900 break-words flex-1 min-w-0">{title}</h4>
        {priority && (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold flex-shrink-0">
            {priority}
          </span>
        )}
      </div>
      {description && (
        <p className="text-gray-600 mb-4 break-words w-full">{description}</p>
      )}
      
      {/* Theory Section - Always Visible */}
      {theory && (
        <div className="mb-6">
          <TheorySection {...theory} />
        </div>
      )}
      
      {/* Code Examples - Toggleable - Always show button if children exist */}
      {children && (
        <div className="mt-6 w-full max-w-full overflow-visible">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md z-10 relative"
            type="button"
          >
            <span className="text-black font-semibold">{showExamples ? "Hide Examples" : "See Examples"}</span>
            <span className="text-xl text-black">{showExamples ? "▲" : "▼"}</span>
          </button>
          {showExamples && (
            <div className="mt-4 w-full max-w-full flex flex-col space-y-4 overflow-hidden">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}