import { useState, useEffect } from "react";
import CodeExample from "./CodeExample";
import TheorySection from "./TheorySection";

export default function TailwindModule() {
  // Initialize from URL or defaults
  const getStateFromURL = () => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1] || '');
    const section = urlParams.get('section') || "fundamentals";
    const concept = urlParams.get('concept') || null;
    return { section, concept };
  };

  const urlState = getStateFromURL();
  const [activeSection, setActiveSection] = useState(urlState.section);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([urlState.section]));
  const [activeConcept, setActiveConcept] = useState<string | null>(urlState.concept);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Update URL when section/concept changes
  useEffect(() => {
    const hash = window.location.hash.split('?')[0];
    const params = new URLSearchParams();
    if (activeSection) params.set('section', activeSection);
    if (activeConcept) params.set('concept', activeConcept);
    const newHash = params.toString() ? `${hash}?${params.toString()}` : hash;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [activeSection, activeConcept]);

  // Listen for browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const state = getStateFromURL();
      setActiveSection(state.section);
      setActiveConcept(state.concept);
      setExpandedSections(new Set([state.section]));
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const sections = [
    { 
      id: "fundamentals", 
      title: "Fundamentals", 
      icon: "🔰", 
      count: "1-8",
      concepts: [
        { id: "1", title: "Utility-First CSS", number: 1 },
        { id: "2", title: "Installation & Setup", number: 2 },
        { id: "3", title: "Configuration", number: 3 },
        { id: "4", title: "Class Naming", number: 4 },
        { id: "5", title: "Responsive Design", number: 5 },
        { id: "6", title: "Dark Mode", number: 6 },
        { id: "7", title: "Purging & Optimization", number: 7 },
        { id: "8", title: "JIT Mode", number: 8 },
      ]
    },
    { 
      id: "layout", 
      title: "Layout", 
      icon: "📐", 
      count: "9-16",
      concepts: [
        { id: "9", title: "Container & Box Model", number: 9 },
        { id: "10", title: "Flexbox", number: 10 },
        { id: "11", title: "Grid", number: 11 },
        { id: "12", title: "Positioning", number: 12 },
        { id: "13", title: "Display", number: 13 },
        { id: "14", title: "Z-Index & Stacking", number: 14 },
        { id: "15", title: "Overflow", number: 15 },
        { id: "16", title: "Object Fit & Position", number: 16 },
      ]
    },
    { 
      id: "spacing", 
      title: "Spacing & Sizing", 
      icon: "📏", 
      count: "17-22",
      concepts: [
        { id: "17", title: "Padding & Margin", number: 17 },
        { id: "18", title: "Width & Height", number: 18 },
        { id: "19", title: "Max/Min Dimensions", number: 19 },
        { id: "20", title: "Gap", number: 20 },
        { id: "21", title: "Aspect Ratio", number: 21 },
        { id: "22", title: "Sizing Utilities", number: 22 },
      ]
    },
    { 
      id: "typography", 
      title: "Typography", 
      icon: "📝", 
      count: "23-28",
      concepts: [
        { id: "23", title: "Font Family & Size", number: 23 },
        { id: "24", title: "Font Weight & Style", number: 24 },
        { id: "25", title: "Text Alignment", number: 25 },
        { id: "26", title: "Text Decoration", number: 26 },
        { id: "27", title: "Line Height & Letter Spacing", number: 27 },
        { id: "28", title: "Text Overflow", number: 28 },
      ]
    },
    { 
      id: "colors", 
      title: "Colors & Backgrounds", 
      icon: "🎨", 
      count: "29-35",
      concepts: [
        { id: "29", title: "Color System", number: 29 },
        { id: "30", title: "Background Colors", number: 30 },
        { id: "31", title: "Text Colors", number: 31 },
        { id: "32", title: "Border Colors", number: 32 },
        { id: "33", title: "Gradients", number: 33 },
        { id: "34", title: "Opacity", number: 34 },
        { id: "35", title: "Custom Colors", number: 35 },
      ]
    },
    { 
      id: "borders", 
      title: "Borders & Effects", 
      icon: "🖼️", 
      count: "36-42",
      concepts: [
        { id: "36", title: "Border Width & Style", number: 36 },
        { id: "37", title: "Border Radius", number: 37 },
        { id: "38", title: "Shadows", number: 38 },
        { id: "39", title: "Opacity", number: 39 },
        { id: "40", title: "Backdrop Blur", number: 40 },
        { id: "41", title: "Ring", number: 41 },
        { id: "42", title: "Outline", number: 42 },
      ]
    },
    { 
      id: "interactivity", 
      title: "Interactivity", 
      icon: "⚡", 
      count: "43-48",
      concepts: [
        { id: "43", title: "Hover & Focus", number: 43 },
        { id: "44", title: "Active & Disabled", number: 44 },
        { id: "45", title: "Transitions", number: 45 },
        { id: "46", title: "Transforms", number: 46 },
        { id: "47", title: "Animations", number: 47 },
        { id: "48", title: "Cursors", number: 48 },
      ]
    },
    { 
      id: "advanced", 
      title: "Advanced", 
      icon: "🚀", 
      count: "49-54",
      concepts: [
        { id: "49", title: "Arbitrary Values", number: 49 },
        { id: "50", title: "Custom Plugins", number: 50 },
        { id: "51", title: "Component Extraction", number: 51 },
        { id: "52", title: "Directives", number: 52 },
        { id: "53", title: "Performance Tips", number: 53 },
        { id: "54", title: "Best Practices", number: 54 },
      ]
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
        // Update URL
        const hash = window.location.hash.split('?')[0];
        const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
        params.set('section', sectionId);
        window.history.replaceState(null, "", `${hash}?${params.toString()}`);
      }
      return newSet;
    });
  };

  const handleConceptClick = (sectionId: string, conceptId: string) => {
    setActiveSection(sectionId);
    setActiveConcept(conceptId);
    setExpandedSections((prev) => new Set(prev).add(sectionId));
    
    // Update URL
    const hash = window.location.hash.split('?')[0];
    const params = new URLSearchParams();
    params.set('section', sectionId);
    params.set('concept', conceptId);
    window.history.pushState(null, "", `${hash}?${params.toString()}`);
    
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

  // Get all concepts in order for navigation
  const getAllConcepts = () => {
    const allConcepts: Array<{ sectionId: string; conceptId: string; number: number; title: string }> = [];
    sections.forEach(section => {
      section.concepts.forEach(concept => {
        allConcepts.push({
          sectionId: section.id,
          conceptId: concept.id,
          number: concept.number,
          title: concept.title
        });
      });
    });
    return allConcepts.sort((a, b) => a.number - b.number);
  };

  // Navigate to next/previous concept
  const navigateConcept = (direction: 'next' | 'prev') => {
    const allConcepts = getAllConcepts();
    if (!activeConcept) return;
    
    const currentIndex = allConcepts.findIndex(c => c.conceptId === activeConcept);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % allConcepts.length
      : (currentIndex - 1 + allConcepts.length) % allConcepts.length;
    
    const newConcept = allConcepts[newIndex];
    handleConceptClick(newConcept.sectionId, newConcept.conceptId);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "fundamentals":
        return <Fundamentals activeConcept={activeConcept} />;
      case "layout":
        return <LayoutConcepts activeConcept={activeConcept} />;
      case "spacing":
        return <SpacingConcepts activeConcept={activeConcept} />;
      case "typography":
        return <TypographyConcepts activeConcept={activeConcept} />;
      case "colors":
        return <ColorsConcepts activeConcept={activeConcept} />;
      case "borders":
        return <BordersConcepts activeConcept={activeConcept} />;
      case "interactivity":
        return <InteractivityConcepts activeConcept={activeConcept} />;
      case "advanced":
        return <AdvancedConcepts activeConcept={activeConcept} />;
      default:
        return <Fundamentals activeConcept={activeConcept} />;
    }
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
        overflow-y-auto overflow-x-hidden h-[calc(100vh-64px-80px)] sm:h-[calc(100vh-72px-80px)] md:max-h-[calc(100vh-120px)] 
        transition-transform duration-300 ease-in-out
        pb-20 md:pb-0
      `}>
        <div className="mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Tailwind CSS</h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Complete Guide
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
      <div className="flex-1 min-w-0 max-w-full mt-0 md:mt-0 relative">
        {/* Mobile: View All Concepts Button - Always Visible */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden fixed top-[72px] right-3 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm font-semibold flex items-center gap-1.5"
          aria-label="View all concepts"
        >
          <span className="text-base">📚</span>
          <span className="hidden sm:inline">All Concepts</span>
        </button>

        {/* Concept Navigation Bar - Mobile Only */}
        {activeConcept && (
          <div className="md:hidden fixed top-[120px] left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm px-3 py-2">
            <div className="flex items-center justify-between max-w-full">
              <button
                onClick={() => navigateConcept('prev')}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                aria-label="Previous concept"
              >
                <span>←</span>
                <span className="hidden sm:inline">Prev</span>
              </button>
              <div className="flex-1 text-center px-2">
                <span className="text-xs text-gray-500">Concept</span>
                <span className="text-sm font-semibold text-gray-900 ml-1">
                  {getAllConcepts().find(c => c.conceptId === activeConcept)?.number || ''}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  / {getAllConcepts().length}
                </span>
              </div>
              <button
                onClick={() => navigateConcept('next')}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                aria-label="Next concept"
              >
                <span className="hidden sm:inline">Next</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        <div className={`w-full max-w-full overflow-x-hidden px-0 ${activeConcept ? 'pt-16 md:pt-0' : 'pt-0'}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// ========== CONCEPT CARD COMPONENT ==========
interface ConceptCardProps {
  id?: string;
  number: number;
  title: string;
  description?: string;
  priority?: string;
  children?: React.ReactNode;
  theory?: {
    what: string;
    why: string;
    how: string;
    keyPoints: string[];
    interviewQuestions: Array<{ question: string; answer: string }>;
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
      
      {/* Code Examples - Toggleable */}
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

// ========== FUNDAMENTALS (1-8) ==========
function Fundamentals({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🔰 Tailwind CSS Fundamentals</h3>
        <p className="text-blue-100 break-words">
          Core concepts and setup
        </p>
      </div>

      <ConceptCard
        id="1"
        number={1}
        title="Utility-First CSS"
        priority="🔥"
        theory={{
          what: "Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS, you compose designs using utility classes directly in your HTML. Each utility class applies a single, specific style.",
          why: "Utility-first CSS speeds up development, keeps designs consistent, makes it easier to maintain, and results in smaller CSS files through purging. You don't need to name things or switch between files.",
          how: "Tailwind provides utility classes for every CSS property. You apply these classes directly to HTML elements. The framework uses PostCSS to process these classes and generate the final CSS.",
          keyPoints: [
            "Utility classes instead of custom CSS",
            "Compose designs by combining utilities",
            "No need to name CSS classes",
            "Smaller CSS files through purging",
            "Faster development workflow"
          ],
          interviewQuestions: [
            {
              question: "What is utility-first CSS and how does Tailwind implement it?",
              answer: "Utility-first CSS means using small, single-purpose utility classes instead of writing custom CSS. Tailwind provides utility classes for every CSS property (like `flex`, `p-4`, `text-blue-500`). You compose designs by combining these utilities directly in HTML, eliminating the need to write custom CSS or name classes."
            },
            {
              question: "What are the benefits of utility-first CSS?",
              answer: "Benefits include faster development (no context switching), consistent designs (using predefined values), easier maintenance (styles are co-located with HTML), smaller CSS files (unused classes are purged), and better developer experience with autocomplete and IntelliSense."
            }
          ]
        }}
      >
        <CodeExample
          title="Utility-First Approach"
          description="Compare traditional CSS vs Tailwind utilities"
          code={`/* Traditional CSS */
.card {
  display: flex;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Tailwind Utility-First */
<div class="flex p-4 bg-white rounded-lg shadow-md">
  <!-- Content -->
</div>

/* No custom CSS needed! */`}
        />
      </ConceptCard>

      <ConceptCard
        id="2"
        number={2}
        title="Installation & Setup"
        priority="🔥"
        theory={{
          what: "Tailwind CSS can be installed via npm and integrated into your build process. It requires PostCSS and a configuration file to work properly.",
          why: "Proper installation ensures Tailwind processes your utility classes correctly and integrates with your build tools for optimal performance.",
          how: "Install Tailwind via npm, create a config file, add Tailwind directives to your CSS, and configure your build process to use PostCSS.",
          keyPoints: [
            "Install via npm: npm install -D tailwindcss",
            "Initialize config: npx tailwindcss init",
            "Add directives to CSS file",
            "Configure PostCSS",
            "Build process integration"
          ],
          interviewQuestions: [
            {
              question: "How do you install and set up Tailwind CSS?",
              answer: "Install via npm: `npm install -D tailwindcss`. Run `npx tailwindcss init` to create config. Add `@tailwind base; @tailwind components; @tailwind utilities;` to your CSS. Configure PostCSS to use Tailwind. Finally, build your CSS through your build process (Vite, Webpack, etc.)."
            }
          ]
        }}
      >
        <CodeExample
          title="Installation Steps"
          description="Complete setup process"
          code={`# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# This creates:
# - tailwind.config.js
# - postcss.config.js

# Add to your CSS file (e.g., input.css)
@tailwind base;
@tailwind components;
@tailwind utilities;

# Build your CSS
# Vite: Automatically processes CSS
# Webpack: Use postcss-loader
# Or: npx tailwindcss -i ./input.css -o ./output.css`}
        />
      </ConceptCard>

      <ConceptCard
        id="3"
        number={3}
        title="Configuration"
        theory={{
          what: "The tailwind.config.js file allows you to customize Tailwind's default theme, add custom values, configure content paths for purging, and extend functionality.",
          why: "Configuration lets you customize colors, spacing, fonts, breakpoints, and other design tokens to match your brand and design system.",
          how: "Edit tailwind.config.js to modify the theme, add custom colors/spacing, configure content paths, and extend or override default values.",
          keyPoints: [
            "Customize theme (colors, spacing, fonts)",
            "Configure content paths for purging",
            "Extend or override defaults",
            "Add custom utilities",
            "Configure plugins"
          ],
          interviewQuestions: [
            {
              question: "How do you configure Tailwind CSS?",
              answer: "Edit tailwind.config.js. Use `content` array to specify file paths for purging. Customize `theme` to add/modify colors, spacing, fonts, breakpoints. Use `extend` to add to defaults or override to replace them. Add plugins in the `plugins` array."
            }
          ]
        }}
      >
        <CodeExample
          title="Configuration Example"
          description="Customizing Tailwind config"
          code={`// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        }
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="4"
        number={4}
        title="Class Naming"
        theory={{
          what: "Tailwind uses a consistent naming convention for utility classes. Classes follow patterns like `property-modifier-value` (e.g., `text-center`, `bg-blue-500`, `hover:text-white`).",
          why: "Consistent naming makes classes predictable and easy to remember. The naming convention maps directly to CSS properties and values.",
          how: "Learn the patterns: `{property}-{value}` for basic utilities, `{property}-{breakpoint}-{value}` for responsive, `{state}:{property}-{value}` for states like hover/focus.",
          keyPoints: [
            "Pattern: property-value (text-center)",
            "Responsive: sm:text-lg, md:flex",
            "States: hover:bg-blue-500, focus:ring-2",
            "Variants: dark:bg-gray-800",
            "Arbitrary values: w-[500px]"
          ],
          interviewQuestions: [
            {
              question: "How does Tailwind's class naming work?",
              answer: "Tailwind uses `property-value` pattern (e.g., `text-center`, `bg-blue-500`). Add breakpoint prefix for responsive (`md:text-lg`). Add state prefix for interactions (`hover:bg-blue-500`). Use square brackets for arbitrary values (`w-[500px]`)."
            }
          ]
        }}
      >
        <CodeExample
          title="Class Naming Patterns"
          description="Understanding Tailwind class structure"
          code={`/* Basic: property-value */
<div class="text-center bg-blue-500 p-4">

/* Responsive: breakpoint-property-value */
<div class="text-sm md:text-lg lg:text-xl">

/* State: state-property-value */
<button class="bg-blue-500 hover:bg-blue-600 focus:ring-2">

/* Dark mode: dark-property-value */
<div class="bg-white dark:bg-gray-800">

/* Arbitrary values: property-[value] */
<div class="w-[500px] top-[117px] bg-[#1da1f2]">

/* Multiple utilities */
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">`}
        />
      </ConceptCard>

      <ConceptCard
        id="5"
        number={5}
        title="Responsive Design"
        priority="🔥"
        theory={{
          what: "Tailwind uses mobile-first responsive design with breakpoint prefixes. You style for mobile by default, then add larger breakpoint prefixes for tablets and desktops.",
          why: "Mobile-first design ensures your site works on all devices. Most users are on mobile, so starting there ensures better performance and UX.",
          how: "Use breakpoint prefixes: `sm:` (640px+), `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+), `2xl:` (1536px+). Base classes apply to mobile, prefixed classes apply at that breakpoint and up.",
          keyPoints: [
            "Mobile-first approach",
            "Breakpoints: sm, md, lg, xl, 2xl",
            "Base classes for mobile",
            "Prefixed classes for larger screens",
            "Custom breakpoints in config"
          ],
          interviewQuestions: [
            {
              question: "How does Tailwind handle responsive design?",
              answer: "Tailwind uses mobile-first responsive design. Base classes apply to mobile. Add breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) for larger screens. Classes with prefixes apply at that breakpoint and up. Example: `text-sm md:text-lg` means small text on mobile, large on medium+ screens."
            }
          ]
        }}
      >
        <CodeExample
          title="Responsive Design Example"
          description="Mobile-first responsive layout"
          code={`<!-- Mobile-first: base styles for mobile -->
<div class="
  text-sm          <!-- Mobile: small text -->
  md:text-base     <!-- Tablet+: base text -->
  lg:text-lg       <!-- Desktop+: large text -->
  
  p-4              <!-- Mobile: padding -->
  md:p-6           <!-- Tablet+: more padding -->
  lg:p-8           <!-- Desktop+: even more -->
  
  grid-cols-1      <!-- Mobile: 1 column -->
  md:grid-cols-2   <!-- Tablet+: 2 columns -->
  lg:grid-cols-3   <!-- Desktop+: 3 columns -->
">

<!-- Responsive container -->
<div class="container mx-auto px-4 md:px-6 lg:px-8">
  <!-- Content -->
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="6"
        number={6}
        title="Dark Mode"
        theory={{
          what: "Tailwind supports dark mode styling using the `dark:` variant. You can enable it via class strategy (toggle a class) or media strategy (respects system preference).",
          why: "Dark mode reduces eye strain, saves battery on OLED screens, and is preferred by many users. Tailwind makes it easy to implement.",
          how: "Configure dark mode in tailwind.config.js (class or media). Use `dark:` prefix before utility classes. Toggle `dark` class on html/body for class strategy.",
          keyPoints: [
            "Two strategies: class or media",
            "Use dark: prefix for dark styles",
            "Class strategy: toggle 'dark' class",
            "Media strategy: respects system preference",
            "Can combine with other variants"
          ],
          interviewQuestions: [
            {
              question: "How do you implement dark mode with Tailwind?",
              answer: "Configure `darkMode: 'class'` or `'media'` in config. Use `dark:` prefix before utilities (e.g., `dark:bg-gray-800`). For class strategy, toggle `dark` class on html element. For media strategy, it automatically respects system preference."
            }
          ]
        }}
      >
        <CodeExample
          title="Dark Mode Implementation"
          description="Setting up dark mode"
          code={`// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}

<!-- HTML with dark mode -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 class="text-2xl dark:text-3xl">Title</h1>
</div>

<!-- Toggle dark mode (JavaScript) -->
<button onclick="document.documentElement.classList.toggle('dark')">
  Toggle Dark Mode
</button>

<!-- Media strategy (automatic) -->
<!-- Respects prefers-color-scheme CSS media query -->`}
        />
      </ConceptCard>

      <ConceptCard
        id="7"
        number={7}
        title="Purging & Optimization"
        theory={{
          what: "Tailwind's purging (now called 'content') removes unused CSS classes from the final build, resulting in much smaller CSS files. Only classes found in your content files are included.",
          why: "Without purging, Tailwind would generate a huge CSS file with all possible utilities. Purging keeps only what you use, dramatically reducing file size.",
          how: "Configure `content` array in tailwind.config.js with paths to your HTML/JS/TS files. Tailwind scans these files and only includes classes that are actually used.",
          keyPoints: [
            "Removes unused CSS",
            "Configure content paths",
            "Scans files for class names",
            "Dramatically reduces file size",
            "Works with JIT mode automatically"
          ],
          interviewQuestions: [
            {
              question: "How does Tailwind's purging work?",
              answer: "Configure `content` array in config with file paths. Tailwind scans these files for class names. Only classes found in your content are included in the final CSS. This removes unused utilities, keeping the CSS file small. With JIT mode, this happens automatically."
            }
          ]
        }}
      >
        <CodeExample
          title="Content Configuration"
          description="Configuring purging/content paths"
          code={`// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './public/**/*.html',
  ],
  // Only classes found in these files will be included
}

// Example: If you use 'bg-blue-500' in your React component,
// it will be included. If not, it's removed from final CSS.

// Before purging: ~3MB CSS file
// After purging: ~10-50KB CSS file (depending on usage)`}
        />
      </ConceptCard>

      <ConceptCard
        id="8"
        number={8}
        title="JIT Mode"
        priority="🔥"
        theory={{
          what: "Just-In-Time (JIT) mode generates CSS on-demand as you use classes, rather than generating all utilities upfront. It's enabled by default in Tailwind v3+.",
          why: "JIT mode provides faster build times, enables arbitrary values, allows all variants, and generates only what you need. It's more flexible and performant.",
          how: "JIT mode is enabled by default in Tailwind v3+. You can use arbitrary values like `w-[500px]` and any variant combination. No special configuration needed.",
          keyPoints: [
            "Default in Tailwind v3+",
            "Generates CSS on-demand",
            "Enables arbitrary values",
            "All variants available",
            "Faster builds"
          ],
          interviewQuestions: [
            {
              question: "What is JIT mode in Tailwind?",
              answer: "Just-In-Time mode generates CSS on-demand as you use classes, rather than pre-generating all utilities. It's default in v3+. Benefits: faster builds, arbitrary values (`w-[500px]`), all variant combinations work, and only generates what you use."
            }
          ]
        }}
      >
        <CodeExample
          title="JIT Mode Features"
          description="Using JIT mode capabilities"
          code={`/* JIT enables arbitrary values */
<div class="w-[500px] h-[300px] bg-[#1da1f2]">
  <!-- Custom values without config -->
</div>

/* All variants work together */
<button class="
  bg-blue-500 
  hover:bg-blue-600 
  focus:ring-2 
  dark:bg-blue-700 
  dark:hover:bg-blue-800
  md:px-6
  lg:px-8
">
  Button
</button>

/* JIT generates these on-demand */
/* No need to pre-generate all combinations */`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== LAYOUT (9-16) ==========
function LayoutConcepts({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">📐 Layout & Positioning</h3>
        <p className="text-blue-100 break-words">
          Flexbox, Grid, and positioning utilities
        </p>
      </div>

      <ConceptCard
        id="9"
        number={9}
        title="Container & Box Model"
        priority="🔥"
        theory={{
          what: "The `container` class centers content and sets max-widths at different breakpoints. Box model utilities control how elements size and space themselves.",
          why: "Container provides responsive max-widths for content. Box model utilities (box-border, box-content) control how padding and borders affect element sizing.",
          how: "Use `container` class for centered, max-width content. Use `box-border` (default) or `box-content` to change box-sizing behavior.",
          keyPoints: [
            "container: responsive max-widths",
            "box-border: border included in width",
            "box-content: border excluded from width",
            "Centers content automatically",
            "Responsive breakpoints"
          ],
          interviewQuestions: [
            {
              question: "How does Tailwind's container work?",
              answer: "The `container` class centers content and sets responsive max-widths at breakpoints (sm: 640px, md: 768px, etc.). It uses `mx-auto` for centering. Use `box-border` or `box-content` to control box-sizing."
            }
          ]
        }}
      >
        <CodeExample
          title="Container Usage"
          description="Using container and box model"
          code={`<!-- Container with responsive max-widths -->
<div class="container mx-auto px-4">
  <!-- Content centered with max-width -->
</div>

<!-- Box model control -->
<div class="box-border w-64 p-4 border-4">
  <!-- Total width includes border and padding -->
</div>

<div class="box-content w-64 p-4 border-4">
  <!-- Width is content only, border/padding added -->
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="10"
        number={10}
        title="Flexbox"
        priority="🔥"
        theory={{
          what: "Tailwind provides comprehensive flexbox utilities for creating flexible layouts. Classes control flex direction, alignment, wrapping, and item properties.",
          why: "Flexbox is essential for modern layouts. Tailwind's utilities make it easy to create responsive, flexible designs without writing custom CSS.",
          how: "Use `flex` to create flex container. Control direction with `flex-row`, `flex-col`. Align with `items-*`, `justify-*`. Control wrapping with `flex-wrap`, `flex-nowrap`.",
          keyPoints: [
            "flex: create flex container",
            "Direction: flex-row, flex-col, flex-row-reverse",
            "Alignment: items-*, justify-*",
            "Wrapping: flex-wrap, flex-nowrap",
            "Grow/shrink: flex-grow, flex-shrink"
          ],
          interviewQuestions: [
            {
              question: "How do you use flexbox with Tailwind?",
              answer: "Use `flex` for container. `flex-row`/`flex-col` for direction. `items-center`/`items-start` for cross-axis alignment. `justify-between`/`justify-center` for main-axis. `flex-wrap` for wrapping. `flex-1` for grow, `flex-shrink-0` to prevent shrinking."
            }
          ]
        }}
      >
        <CodeExample
          title="Flexbox Examples"
          description="Common flexbox patterns"
          code={`<!-- Horizontal flex container -->
<div class="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Vertical flex container -->
<div class="flex flex-col items-center gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Responsive flex direction -->
<div class="flex flex-col md:flex-row gap-4">
  <!-- Column on mobile, row on desktop -->
</div>

<!-- Flex grow and shrink -->
<div class="flex">
  <div class="flex-1">Grows to fill space</div>
  <div class="flex-shrink-0 w-32">Fixed width</div>
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="11"
        number={11}
        title="Grid"
        priority="🔥"
        theory={{
          what: "Tailwind's grid utilities create CSS Grid layouts. You can define columns, rows, gaps, and item placement using utility classes.",
          why: "CSS Grid is powerful for two-dimensional layouts. Tailwind makes it easy to create complex grid layouts without writing custom CSS.",
          how: "Use `grid` for container. Define columns with `grid-cols-*`. Define rows with `grid-rows-*`. Control gaps with `gap-*`. Place items with `col-span-*`, `row-span-*`.",
          keyPoints: [
            "grid: create grid container",
            "Columns: grid-cols-1 through grid-cols-12",
            "Rows: grid-rows-*",
            "Gaps: gap-*, gap-x-*, gap-y-*",
            "Placement: col-span-*, row-span-*"
          ],
          interviewQuestions: [
            {
              question: "How do you create grid layouts with Tailwind?",
              answer: "Use `grid` for container. `grid-cols-3` for 3 columns. `grid-rows-2` for 2 rows. `gap-4` for spacing. `col-span-2` to span 2 columns. `row-span-2` to span 2 rows. Use responsive prefixes for different breakpoints."
            }
          ]
        }}
      >
        <CodeExample
          title="Grid Layout Examples"
          description="Creating grid layouts"
          code={`<!-- Basic 3-column grid -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 1 col mobile, 2 tablet, 3 desktop -->
</div>

<!-- Grid with spanning -->
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2">Spans 2 columns</div>
  <div>1 column</div>
  <div>1 column</div>
</div>

<!-- Auto-fit grid -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
  <!-- Automatically fits items -->
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="12"
        number={12}
        title="Positioning"
        theory={{
          what: "Tailwind provides utilities for CSS positioning: static, relative, absolute, fixed, and sticky. Also includes utilities for top, right, bottom, left, and z-index.",
          why: "Positioning is essential for layouts, overlays, modals, and sticky elements. Tailwind makes it easy to position elements precisely.",
          how: "Use `static`, `relative`, `absolute`, `fixed`, `sticky` for position. Use `top-*`, `right-*`, `bottom-*`, `left-*` for offsets. Use `z-*` for stacking order.",
          keyPoints: [
            "Position: static, relative, absolute, fixed, sticky",
            "Offsets: top-*, right-*, bottom-*, left-*",
            "Z-index: z-0 through z-50",
            "Sticky: position: sticky with offset",
            "Absolute: positioned relative to nearest positioned parent"
          ],
          interviewQuestions: [
            {
              question: "How do you position elements with Tailwind?",
              answer: "Use `relative`, `absolute`, `fixed`, or `sticky` for position type. Use `top-4`, `right-0`, etc. for offsets. Use `z-10`, `z-20` for stacking. `absolute` positions relative to nearest `relative` parent. `sticky` sticks when scrolling."
            }
          ]
        }}
      >
        <CodeExample
          title="Positioning Examples"
          description="Using positioning utilities"
          code={`<!-- Relative positioning -->
<div class="relative">
  <!-- Absolute child -->
  <div class="absolute top-0 right-0 bg-red-500">
    Top right corner
  </div>
</div>

<!-- Fixed header -->
<header class="fixed top-0 left-0 right-0 z-50 bg-white">
  Sticky header
</header>

<!-- Sticky sidebar -->
<aside class="sticky top-4 h-screen">
  Sticks when scrolling
</aside>

<!-- Centered absolute -->
<div class="relative h-64">
  <div class="absolute inset-0 flex items-center justify-center">
    Centered content
  </div>
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="13"
        number={13}
        title="Display"
        theory={{
          what: "Display utilities control how elements are displayed: block, inline, flex, grid, hidden, etc. These map directly to CSS display property.",
          why: "Display property is fundamental to layout. Tailwind utilities make it easy to change element display behavior.",
          how: "Use `block`, `inline`, `inline-block`, `flex`, `grid`, `hidden`, `table`, etc. to control display type.",
          keyPoints: [
            "block: block-level element",
            "inline: inline element",
            "flex: flex container",
            "grid: grid container",
            "hidden: display: none"
          ],
          interviewQuestions: [
            {
              question: "What display utilities does Tailwind provide?",
              answer: "Tailwind provides `block`, `inline`, `inline-block`, `flex`, `grid`, `table`, `hidden` (display: none), `inline-flex`, `inline-grid`. Use these to control how elements are displayed in the layout."
            }
          ]
        }}
      >
        <CodeExample
          title="Display Utilities"
          description="Changing element display"
          code={`<!-- Block element -->
<div class="block">Block</div>

<!-- Inline element -->
<span class="inline">Inline</span>

<!-- Flex container -->
<div class="flex">Flex</div>

<!-- Grid container -->
<div class="grid">Grid</div>

<!-- Hidden (display: none) -->
<div class="hidden md:block">
  Hidden on mobile, block on desktop
</div>

<!-- Inline flex -->
<div class="inline-flex items-center">
  Inline flex container
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="14"
        number={14}
        title="Z-Index & Stacking"
        theory={{
          what: "Z-index utilities control stacking order of positioned elements. Higher z-index values appear on top of lower values.",
          why: "Z-index is essential for overlays, modals, dropdowns, and ensuring elements appear in the correct order.",
          how: "Use `z-0` through `z-50` for standard values. Use arbitrary values like `z-[999]` for custom values.",
          keyPoints: [
            "z-0 through z-50",
            "Higher values on top",
            "Only works on positioned elements",
            "Arbitrary values: z-[999]",
            "Common: z-10 (dropdowns), z-50 (modals)"
          ],
          interviewQuestions: [
            {
              question: "How do you control z-index with Tailwind?",
              answer: "Use `z-0` through `z-50` for standard stacking. Higher numbers appear on top. Only works on positioned elements (relative, absolute, fixed, sticky). Use `z-[999]` for custom values. Common: `z-10` for dropdowns, `z-50` for modals."
            }
          ]
        }}
      >
        <CodeExample
          title="Z-Index Usage"
          description="Stacking elements"
          code={`<!-- Modal overlay -->
<div class="fixed inset-0 z-40 bg-black bg-opacity-50">
  <!-- Modal -->
  <div class="relative z-50 bg-white rounded-lg">
    Modal content
  </div>
</div>

<!-- Dropdown -->
<div class="relative">
  <button>Menu</button>
  <div class="absolute z-10 bg-white shadow-lg">
    Dropdown content
  </div>
</div>

<!-- Custom z-index -->
<div class="relative z-[999]">
  Custom stacking order
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="15"
        number={15}
        title="Overflow"
        theory={{
          what: "Overflow utilities control how content that overflows its container is handled: visible, hidden, scroll, auto.",
          why: "Overflow control is essential for scrollable containers, hiding overflow, and managing content that exceeds container bounds.",
          how: "Use `overflow-auto`, `overflow-hidden`, `overflow-scroll`, `overflow-visible`. Use `overflow-x-*` and `overflow-y-*` for axis-specific control.",
          keyPoints: [
            "overflow-auto: scroll when needed",
            "overflow-hidden: clip content",
            "overflow-scroll: always show scrollbar",
            "overflow-visible: show overflow",
            "Axis-specific: overflow-x-*, overflow-y-*"
          ],
          interviewQuestions: [
            {
              question: "How do you handle overflow with Tailwind?",
              answer: "Use `overflow-auto` (scroll when needed), `overflow-hidden` (clip), `overflow-scroll` (always scroll), `overflow-visible` (show overflow). Use `overflow-x-hidden` or `overflow-y-auto` for axis-specific control."
            }
          ]
        }}
      >
        <CodeExample
          title="Overflow Examples"
          description="Controlling overflow behavior"
          code={`<!-- Scrollable container -->
<div class="overflow-auto h-64">
  Long content that scrolls
</div>

<!-- Hidden overflow -->
<div class="overflow-hidden rounded-lg">
  Content clipped to container
</div>

<!-- Horizontal scroll only -->
<div class="overflow-x-auto overflow-y-hidden">
  Horizontal scrolling content
</div>

<!-- Text truncation -->
<div class="overflow-hidden text-ellipsis whitespace-nowrap">
  Long text that gets truncated
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="16"
        number={16}
        title="Object Fit & Position"
        theory={{
          what: "Object fit and position utilities control how images and videos fit within their containers, similar to CSS object-fit and object-position.",
          why: "These utilities are essential for responsive images and media that need to fit containers properly.",
          how: "Use `object-contain`, `object-cover`, `object-fill`, `object-none`, `object-scale-down` for fit. Use `object-*` for position.",
          keyPoints: [
            "object-contain: fit inside, maintain aspect",
            "object-cover: fill container, may crop",
            "object-fill: stretch to fill",
            "object-none: no resizing",
            "object-position: control position"
          ],
          interviewQuestions: [
            {
              question: "How do you control image/video fitting with Tailwind?",
              answer: "Use `object-contain` (fit inside, maintain aspect), `object-cover` (fill container, may crop), `object-fill` (stretch), `object-none` (no resize). Use `object-center`, `object-top`, etc. for positioning."
            }
          ]
        }}
      >
        <CodeExample
          title="Object Fit Examples"
          description="Fitting images in containers"
          code={`<!-- Cover: fill container, may crop -->
<img class="object-cover w-full h-64" src="image.jpg">

<!-- Contain: fit inside, no crop -->
<img class="object-contain w-full h-64" src="image.jpg">

<!-- Position control -->
<img class="object-cover object-top w-full h-64" src="image.jpg">

<!-- Responsive object fit -->
<img class="object-contain md:object-cover w-full h-64" src="image.jpg">`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== SPACING & SIZING (17-22) ==========
function SpacingConcepts({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">📏 Spacing & Sizing</h3>
        <p className="text-blue-100 break-words">
          Padding, margin, width, height, and sizing utilities
        </p>
      </div>

      <ConceptCard
        id="17"
        number={17}
        title="Padding & Margin"
        priority="🔥"
        theory={{
          what: "Padding and margin utilities control spacing inside (padding) and outside (margin) of elements. Tailwind uses a spacing scale (0, 0.5, 1, 1.5, 2, etc. in rem units).",
          why: "Consistent spacing creates better visual hierarchy and design consistency. Tailwind's scale ensures spacing is predictable and harmonious.",
          how: "Use `p-*` for padding, `m-*` for margin. Use `px-*`, `py-*` for axis-specific. Use `pt-*`, `pr-*`, `pb-*`, `pl-*` for directional. Negative margins: `-m-*`.",
          keyPoints: [
            "p-4: padding all sides (1rem)",
            "px-4: horizontal padding",
            "py-4: vertical padding",
            "m-4: margin all sides",
            "Negative: -m-4, -mx-4"
          ],
          interviewQuestions: [
            {
              question: "How does Tailwind's spacing system work?",
              answer: "Tailwind uses a spacing scale (0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24 in rem). `p-4` = 1rem padding. `px-4` = horizontal. `py-4` = vertical. `pt-4` = top only. Negative: `-m-4` for negative margin."
            }
          ]
        }}
      >
        <CodeExample
          title="Spacing Examples"
          description="Using padding and margin"
          code={`<!-- Padding all sides -->
<div class="p-4">Padding 1rem</div>

<!-- Horizontal padding -->
<div class="px-6">Horizontal padding</div>

<!-- Vertical margin -->
<div class="my-8">Vertical margin</div>

<!-- Directional spacing -->
<div class="pt-4 pr-6 pb-8 pl-2">
  Top, right, bottom, left
</div>

<!-- Negative margin -->
<div class="-mt-4 -mx-6">
  Negative margin
</div>

<!-- Responsive spacing -->
<div class="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="18"
        number={18}
        title="Width & Height"
        priority="🔥"
        theory={{
          what: "Width and height utilities control element dimensions. Tailwind provides fixed sizes, percentages, viewport units, and arbitrary values.",
          why: "Controlling dimensions is fundamental to layout. Tailwind makes it easy to set consistent sizes across your design.",
          how: "Use `w-*` for width, `h-*` for height. Use `w-full` (100%), `w-screen` (100vw), `w-auto`, `w-fit`. Use arbitrary values: `w-[500px]`.",
          keyPoints: [
            "w-full: 100% width",
            "w-screen: 100vw",
            "w-auto: auto width",
            "w-1/2: 50% width",
            "Arbitrary: w-[500px]"
          ],
          interviewQuestions: [
            {
              question: "How do you set width and height with Tailwind?",
              answer: "Use `w-full` (100%), `w-screen` (100vw), `w-auto`, `w-1/2` (50%), `w-64` (16rem). Same for height: `h-full`, `h-screen`, `h-64`. Use `w-[500px]` for arbitrary values. `w-fit` for fit-content."
            }
          ]
        }}
      >
        <CodeExample
          title="Width & Height Examples"
          description="Setting dimensions"
          code={`<!-- Full width -->
<div class="w-full">100% width</div>

<!-- Fixed width -->
<div class="w-64 h-64">16rem × 16rem</div>

<!-- Percentage width -->
<div class="w-1/2">50% width</div>
<div class="w-1/3">33.33% width</div>
<div class="w-2/3">66.67% width</div>

<!-- Viewport units -->
<div class="w-screen h-screen">Full viewport</div>

<!-- Arbitrary values -->
<div class="w-[500px] h-[300px]">Custom size</div>

<!-- Auto sizing -->
<div class="w-auto h-auto">Auto size</div>

<!-- Min/Max -->
<div class="min-w-0 max-w-md">Min/max width</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="19"
        number={19}
        title="Max/Min Dimensions"
        theory={{
          what: "Max and min dimension utilities constrain element sizes. Useful for responsive design and preventing overflow.",
          why: "Min/max dimensions ensure elements don't get too small or too large, maintaining readability and layout integrity.",
          how: "Use `max-w-*` for max-width, `min-w-*` for min-width. Same for height: `max-h-*`, `min-h-*`. Common: `max-w-screen-xl`, `min-h-screen`.",
          keyPoints: [
            "max-w-*: maximum width",
            "min-w-*: minimum width",
            "max-h-*: maximum height",
            "min-h-*: minimum height",
            "Common: max-w-7xl, min-h-screen"
          ],
          interviewQuestions: [
            {
              question: "How do you use min/max dimensions in Tailwind?",
              answer: "Use `max-w-7xl` (max-width), `min-w-0` (min-width), `max-h-64` (max-height), `min-h-screen` (min-height). Common: `max-w-screen-xl` for containers, `min-h-screen` for full-height layouts, `min-w-0` to allow shrinking in flex/grid."
            }
          ]
        }}
      >
        <CodeExample
          title="Min/Max Dimensions"
          description="Constraining element sizes"
          code={`<!-- Max width container -->
<div class="max-w-7xl mx-auto">
  Centered with max width
</div>

<!-- Min height for full page -->
<div class="min-h-screen">
  At least full viewport height
</div>

<!-- Constrained image -->
<img class="max-w-full max-h-64" src="image.jpg">

<!-- Flexible with constraints -->
<div class="min-w-0 max-w-md">
  Can shrink but not exceed max
</div>

<!-- Responsive max width -->
<div class="max-w-sm md:max-w-2xl lg:max-w-4xl">
  Responsive max width
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="20"
        number={20}
        title="Gap"
        theory={{
          what: "Gap utilities control spacing between flex and grid items. This is the modern way to add spacing in flexbox and grid layouts.",
          why: "Gap is cleaner than using margins on children. It provides consistent spacing between flex/grid items without affecting outer spacing.",
          how: "Use `gap-*` for all sides, `gap-x-*` for horizontal, `gap-y-*` for vertical. Works with `flex` and `grid` containers.",
          keyPoints: [
            "gap-4: spacing between items",
            "gap-x-4: horizontal gap",
            "gap-y-4: vertical gap",
            "Works with flex and grid",
            "Cleaner than margins"
          ],
          interviewQuestions: [
            {
              question: "How do you add gaps in flex/grid layouts?",
              answer: "Use `gap-4` for spacing between all items, `gap-x-4` for horizontal, `gap-y-4` for vertical. Works with `flex` and `grid` containers. Much cleaner than using margins on children."
            }
          ]
        }}
      >
        <CodeExample
          title="Gap Usage"
          description="Spacing flex and grid items"
          code={`<!-- Flex with gap -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Grid with gap -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Different horizontal/vertical gaps -->
<div class="grid grid-cols-3 gap-x-6 gap-y-4">
  <!-- 6rem horizontal, 4rem vertical -->
</div>

<!-- Responsive gap -->
<div class="flex gap-2 md:gap-4 lg:gap-6">
  Responsive spacing
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="21"
        number={21}
        title="Aspect Ratio"
        theory={{
          what: "Aspect ratio utilities maintain consistent width-to-height ratios for elements, especially useful for images and videos.",
          why: "Aspect ratio ensures content maintains its proportions across different screen sizes, preventing layout shifts.",
          how: "Use `aspect-square`, `aspect-video` (16:9), `aspect-auto`, or arbitrary: `aspect-[4/3]`.",
          keyPoints: [
            "aspect-square: 1:1 ratio",
            "aspect-video: 16:9 ratio",
            "aspect-auto: no constraint",
            "Arbitrary: aspect-[4/3]",
            "Works with width/height"
          ],
          interviewQuestions: [
            {
              question: "How do you maintain aspect ratios with Tailwind?",
              answer: "Use `aspect-square` (1:1), `aspect-video` (16:9), `aspect-auto` (no constraint), or `aspect-[4/3]` for custom ratios. Set width and aspect ratio maintains height proportionally."
            }
          ]
        }}
      >
        <CodeExample
          title="Aspect Ratio Examples"
          description="Maintaining proportions"
          code={`<!-- Square image -->
<img class="w-full aspect-square object-cover" src="image.jpg">

<!-- 16:9 video container -->
<div class="aspect-video">
  <iframe src="video"></iframe>
</div>

<!-- Custom aspect ratio -->
<div class="aspect-[4/3] bg-gray-200">
  4:3 aspect ratio
</div>

<!-- Responsive aspect -->
<div class="aspect-square md:aspect-video">
  Square on mobile, 16:9 on desktop
</div>`}
        />
      </ConceptCard>

      <ConceptCard
        id="22"
        number={22}
        title="Sizing Utilities"
        theory={{
          what: "Additional sizing utilities include fit-content, min-content, max-content, and viewport-based sizing for flexible layouts.",
          why: "These utilities provide more control over element sizing, especially for responsive and flexible designs.",
          how: "Use `w-fit`, `w-min`, `w-max`, `h-fit`, `h-min`, `h-max` for content-based sizing. Use viewport units: `w-screen`, `h-screen`.",
          keyPoints: [
            "w-fit: fit-content width",
            "w-min: min-content width",
            "w-max: max-content width",
            "Viewport: w-screen, h-screen",
            "Flexible sizing options"
          ],
          interviewQuestions: [
            {
              question: "What sizing utilities does Tailwind provide?",
              answer: "Tailwind provides `w-fit`/`h-fit` (fit-content), `w-min`/`h-min` (min-content), `w-max`/`h-max` (max-content), `w-screen`/`h-screen` (viewport units), plus fixed sizes, percentages, and arbitrary values."
            }
          ]
        }}
      >
        <CodeExample
          title="Sizing Utilities"
          description="Flexible sizing options"
          code={`<!-- Fit content -->
<button class="w-fit px-4 py-2">
  Button fits content
</button>

<!-- Min content -->
<div class="w-min">
  Minimum content width
</div>

<!-- Max content -->
<div class="w-max">
  Maximum content width
</div>

<!-- Viewport sizing -->
<div class="w-screen h-screen">
  Full viewport
</div>

<!-- Combination -->
<div class="w-full max-w-fit min-w-0">
  Flexible with constraints
</div>`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== TYPOGRAPHY (23-28) ==========
function TypographyConcepts({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">📝 Typography</h3>
        <p className="text-blue-100 break-words">
          Fonts, text sizing, alignment, and text styling
        </p>
      </div>

      <ConceptCard
        id="23"
        number={23}
        title="Font Family & Size"
        priority="🔥"
        theory={{
          what: "Font family and size utilities control typography. Tailwind provides font families (sans, serif, mono) and a type scale for font sizes.",
          why: "Typography is fundamental to design. Consistent font sizes and families create better readability and visual hierarchy.",
          how: "Use `font-sans`, `font-serif`, `font-mono` for families. Use `text-xs` through `text-9xl` for sizes. Customize in config.",
          keyPoints: [
            "font-sans: sans-serif (default)",
            "font-serif: serif fonts",
            "font-mono: monospace",
            "text-sm through text-9xl",
            "Custom fonts in config"
          ],
          interviewQuestions: [
            {
              question: "How do you control fonts and text size with Tailwind?",
              answer: "Use `font-sans` (default), `font-serif`, `font-mono` for families. Use `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` through `text-9xl` for sizes. Customize fonts in tailwind.config.js theme.extend.fontFamily."
            }
          ]
        }}
      >
        <CodeExample
          title="Font Family & Size"
          description="Typography basics"
          code={`<!-- Font families -->
<p class="font-sans">Sans-serif (default)</p>
<p class="font-serif">Serif font</p>
<p class="font-mono">Monospace font</p>

<!-- Font sizes -->
<p class="text-xs">Extra small</p>
<p class="text-sm">Small</p>
<p class="text-base">Base (16px)</p>
<p class="text-lg">Large</p>
<p class="text-xl">Extra large</p>
<p class="text-2xl">2xl</p>
<p class="text-4xl">4xl</p>
<p class="text-6xl">6xl</p>
<p class="text-9xl">9xl</p>

<!-- Responsive text size -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">
  Responsive heading
</h1>

<!-- Custom font in config -->
<p class="font-custom">Custom font family</p>`}
        />
      </ConceptCard>

      <ConceptCard
        id="24"
        number={24}
        title="Font Weight & Style"
        theory={{
          what: "Font weight and style utilities control text appearance: bold, italic, underline, etc.",
          why: "Font weight and style create visual hierarchy and emphasis in typography.",
          how: "Use `font-thin` through `font-black` for weight. Use `italic`, `not-italic` for style. Use `underline`, `line-through` for decoration.",
          keyPoints: [
            "font-thin (100) through font-black (900)",
            "font-normal (400), font-bold (700)",
            "italic, not-italic",
            "underline, line-through",
            "no-underline"
          ],
          interviewQuestions: [
            {
              question: "How do you control font weight and style?",
              answer: "Use `font-thin` (100), `font-light` (300), `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700), `font-extrabold` (800), `font-black` (900). Use `italic` for italic, `underline` for underline, `line-through` for strikethrough."
            }
          ]
        }}
      >
        <CodeExample
          title="Font Weight & Style"
          description="Text appearance"
          code={`<!-- Font weights -->
<p class="font-thin">Thin (100)</p>
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extrabold (800)</p>
<p class="font-black">Black (900)</p>

<!-- Font styles -->
<p class="italic">Italic text</p>
<p class="not-italic">Not italic</p>

<!-- Text decoration -->
<p class="underline">Underlined</p>
<p class="line-through">Strikethrough</p>
<p class="no-underline">No underline</p>

<!-- Combinations -->
<h1 class="text-4xl font-bold italic">
  Bold italic heading
</h1>`}
        />
      </ConceptCard>

      <ConceptCard
        id="25"
        number={25}
        title="Text Alignment"
        theory={{
          what: "Text alignment utilities control horizontal text alignment: left, center, right, justify.",
          why: "Text alignment affects readability and visual hierarchy. Different alignments serve different purposes.",
          how: "Use `text-left`, `text-center`, `text-right`, `text-justify` for alignment.",
          keyPoints: [
            "text-left: left align (default)",
            "text-center: center align",
            "text-right: right align",
            "text-justify: justify text",
            "Responsive: md:text-center"
          ],
          interviewQuestions: [
            {
              question: "How do you align text with Tailwind?",
              answer: "Use `text-left` (default), `text-center`, `text-right`, `text-justify` for alignment. Use responsive prefixes: `text-left md:text-center` for different alignments at different breakpoints."
            }
          ]
        }}
      >
        <CodeExample
          title="Text Alignment"
          description="Aligning text"
          code={`<!-- Left align (default) -->
<p class="text-left">Left aligned</p>

<!-- Center align -->
<h1 class="text-center">Centered heading</h1>

<!-- Right align -->
<p class="text-right">Right aligned</p>

<!-- Justify -->
<p class="text-justify">
  Justified text spreads across full width
</p>

<!-- Responsive alignment -->
<p class="text-left md:text-center lg:text-right">
  Responsive alignment
</p>`}
        />
      </ConceptCard>

      <ConceptCard
        id="26"
        number={26}
        title="Text Decoration"
        theory={{
          what: "Text decoration utilities add visual effects to text: underline, overline, line-through, and their colors.",
          why: "Text decoration provides emphasis and visual cues. Underline colors can match or contrast with text.",
          how: "Use `underline`, `overline`, `line-through`, `no-underline`. Use `decoration-*` for style and `underline-offset-*` for offset.",
          keyPoints: [
            "underline, overline, line-through",
            "no-underline: remove decoration",
            "decoration-solid, decoration-dashed",
            "decoration-blue-500: color",
            "underline-offset-2: offset"
          ],
          interviewQuestions: [
            {
              question: "How do you add text decorations?",
              answer: "Use `underline`, `overline`, `line-through` for decoration types. Use `decoration-solid`/`dashed`/`dotted`/`double`/`wavy` for style. Use `decoration-blue-500` for color. Use `underline-offset-2` for offset from text."
            }
          ]
        }}
      >
        <CodeExample
          title="Text Decoration"
          description="Text effects"
          code={`<!-- Underline -->
<p class="underline">Underlined text</p>

<!-- Colored underline -->
<p class="underline decoration-blue-500">
  Blue underline
</p>

<!-- Dashed underline -->
<p class="underline decoration-dashed">
  Dashed underline
</p>

<!-- Offset underline -->
<p class="underline underline-offset-4">
  Offset underline
</p>

<!-- Overline -->
<p class="overline">Overlined text</p>

<!-- Line through -->
<p class="line-through">Strikethrough</p>

<!-- Remove decoration -->
<a class="no-underline" href="#">No underline link</a>`}
        />
      </ConceptCard>

      <ConceptCard
        id="27"
        number={27}
        title="Line Height & Letter Spacing"
        theory={{
          what: "Line height and letter spacing utilities control text spacing for better readability.",
          why: "Proper line height and letter spacing improve readability and visual appeal of text.",
          how: "Use `leading-*` for line height (leading-tight, leading-normal, leading-relaxed). Use `tracking-*` for letter spacing (tracking-tighter, tracking-normal, tracking-wider).",
          keyPoints: [
            "leading-tight: tight line height",
            "leading-normal: normal (1.5)",
            "leading-relaxed: relaxed (1.625)",
            "tracking-tighter: tighter letters",
            "tracking-wider: wider letters"
          ],
          interviewQuestions: [
            {
              question: "How do you control line height and letter spacing?",
              answer: "Use `leading-tight` (1.25), `leading-normal` (1.5), `leading-relaxed` (1.625), `leading-loose` (2) for line height. Use `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-wider` for letter spacing."
            }
          ]
        }}
      >
        <CodeExample
          title="Line Height & Letter Spacing"
          description="Text spacing"
          code={`<!-- Line heights -->
<p class="leading-tight">Tight line height</p>
<p class="leading-normal">Normal line height</p>
<p class="leading-relaxed">Relaxed line height</p>
<p class="leading-loose">Loose line height</p>

<!-- Letter spacing -->
<p class="tracking-tighter">Tighter letters</p>
<p class="tracking-tight">Tight letters</p>
<p class="tracking-normal">Normal spacing</p>
<p class="tracking-wide">Wide letters</p>
<p class="tracking-wider">Wider letters</p>

<!-- Combinations -->
<h1 class="text-4xl leading-tight tracking-tight">
  Tight heading
</h1>

<p class="text-lg leading-relaxed tracking-wide">
  Relaxed paragraph
</p>`}
        />
      </ConceptCard>

      <ConceptCard
        id="28"
        number={28}
        title="Text Overflow"
        theory={{
          what: "Text overflow utilities handle text that exceeds its container: truncate, ellipsis, clip.",
          why: "Text overflow control prevents layout breaks and provides clean text truncation with ellipsis.",
          how: "Use `truncate` (ellipsis), `text-ellipsis`, `text-clip` for overflow handling. Requires `overflow-hidden` and `whitespace-nowrap`.",
          keyPoints: [
            "truncate: ellipsis on overflow",
            "text-ellipsis: show ellipsis",
            "text-clip: clip text",
            "Requires overflow-hidden",
            "Requires whitespace-nowrap"
          ],
          interviewQuestions: [
            {
              question: "How do you handle text overflow?",
              answer: "Use `truncate` (shorthand for `overflow-hidden text-ellipsis whitespace-nowrap`) to show ellipsis. Use `text-ellipsis` with `overflow-hidden whitespace-nowrap` manually. Use `text-clip` to clip without ellipsis."
            }
          ]
        }}
      >
        <CodeExample
          title="Text Overflow"
          description="Handling long text"
          code={`<!-- Truncate with ellipsis -->
<p class="truncate w-64">
  Long text that gets truncated with ellipsis
</p>

<!-- Manual ellipsis -->
<p class="overflow-hidden text-ellipsis whitespace-nowrap w-64">
  Manual ellipsis setup
</p>

<!-- Clip text -->
<p class="overflow-hidden text-clip whitespace-nowrap w-64">
  Text gets clipped
</p>

<!-- Multi-line truncate (requires line-clamp plugin) -->
<p class="line-clamp-3">
  Long text that truncates after 3 lines
</p>`}
        />
      </ConceptCard>
    </div>
  );
}

// Continue with Colors, Borders, Interactivity, and Advanced sections...
// ========== COLORS & BACKGROUNDS (29-35) ==========
function ColorsConcepts({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🎨 Colors & Backgrounds</h3>
          <p className="text-blue-100 break-words">
            Color system, backgrounds, gradients, and opacity
          </p>
        </div>
  
        <ConceptCard
          id="29"
          number={29}
          title="Color System"
          priority="🔥"
          theory={{
            what: "Tailwind includes a comprehensive color palette with shades from 50 (lightest) to 950 (darkest). Colors are organized by name and shade number.",
            why: "Consistent color system ensures design harmony and makes it easy to create cohesive color schemes.",
            how: "Use color names (blue, red, green, etc.) with shade numbers (50, 100, 200...900, 950). Access via utilities: `bg-blue-500`, `text-gray-700`.",
            keyPoints: [
              "Color names: blue, red, green, gray, etc.",
              "Shades: 50 (lightest) to 950 (darkest)",
              "500 is typically the base color",
              "Custom colors in config",
              "Access via bg-*, text-*, border-*"
            ],
            interviewQuestions: [
              {
                question: "How does Tailwind's color system work?",
                answer: "Tailwind provides color palettes (blue, red, green, gray, etc.) with shades from 50 (lightest) to 950 (darkest). 500 is typically the base color. Use `bg-blue-500`, `text-gray-700`, `border-red-300` to access colors. Customize in tailwind.config.js."
              }
            ]
          }}
        >
          <CodeExample
            title="Color System"
            description="Using Tailwind colors"
            code={`<!-- Background colors -->
  <div class="bg-blue-500">Base blue</div>
  <div class="bg-blue-100">Light blue</div>
  <div class="bg-blue-900">Dark blue</div>
  
  <!-- Text colors -->
  <p class="text-gray-700">Dark gray text</p>
  <p class="text-red-500">Red text</p>
  
  <!-- Border colors -->
  <div class="border-2 border-green-500">Green border</div>
  
  <!-- Available colors -->
  <!-- blue, red, green, yellow, purple, pink, indigo, gray, slate, zinc, neutral, stone, amber, orange, teal, cyan, sky, violet, fuchsia, rose, lime, emerald -->
  
  <!-- Custom colors in config -->
  <div class="bg-brand-500">Custom brand color</div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="30"
          number={30}
          title="Background Colors"
          priority="🔥"
          theory={{
            what: "Background color utilities apply colors to element backgrounds. Supports solid colors, gradients, and images.",
            why: "Background colors are fundamental to design. They create visual hierarchy and define sections.",
            how: "Use `bg-{color}-{shade}` for solid colors. Use `bg-gradient-to-*` for gradients. Use `bg-{image}` for background images.",
            keyPoints: [
              "bg-{color}-{shade}: solid colors",
              "bg-gradient-to-*: gradients",
              "bg-transparent: transparent",
              "bg-current: current color",
              "Responsive: md:bg-blue-500"
            ],
            interviewQuestions: [
              {
                question: "How do you set background colors?",
                answer: "Use `bg-blue-500` for solid colors, `bg-gradient-to-r from-blue-500 to-purple-500` for gradients, `bg-transparent` for transparent, `bg-current` for current text color. Use responsive prefixes: `md:bg-blue-500`."
              }
            ]
          }}
        >
          <CodeExample
            title="Background Colors"
            description="Setting backgrounds"
            code={`<!-- Solid background -->
  <div class="bg-blue-500">Blue background</div>
  
  <!-- Gradient backgrounds -->
  <div class="bg-gradient-to-r from-blue-500 to-purple-500">
    Horizontal gradient
  </div>
  
  <div class="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
    Diagonal gradient
  </div>
  
  <!-- Transparent -->
  <div class="bg-transparent">Transparent</div>
  
  <!-- Current color -->
  <div class="text-blue-500 bg-current">Background matches text</div>
  
  <!-- Responsive -->
  <div class="bg-white md:bg-gray-100">
    White on mobile, gray on desktop
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="31"
          number={31}
          title="Text Colors"
          theory={{
            what: "Text color utilities apply colors to text content. Uses the same color system as backgrounds.",
            why: "Text colors create contrast, hierarchy, and visual interest in typography.",
            how: "Use `text-{color}-{shade}` for text colors. Use `text-current` for current color, `text-transparent` for transparent.",
            keyPoints: [
              "text-{color}-{shade}: text colors",
              "text-current: inherit color",
              "text-transparent: transparent text",
              "Hover: hover:text-blue-500",
              "Responsive: md:text-gray-700"
            ],
            interviewQuestions: [
              {
                question: "How do you set text colors?",
                answer: "Use `text-blue-500`, `text-gray-700`, etc. for colors. Use `text-current` to inherit color, `text-transparent` for transparent. Combine with states: `hover:text-blue-500`, `dark:text-white`."
              }
            ]
          }}
        >
          <CodeExample
            title="Text Colors"
            description="Coloring text"
            code={`<!-- Basic text colors -->
  <p class="text-blue-500">Blue text</p>
  <p class="text-gray-700">Gray text</p>
  <p class="text-red-600">Red text</p>
  
  <!-- Current color -->
  <div class="text-blue-500">
    <span class="text-current">Inherits blue</span>
  </div>
  
  <!-- Transparent text -->
  <p class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
    Gradient text
  </p>
  
  <!-- Hover states -->
  <button class="text-gray-700 hover:text-blue-500">
    Hover to change color
  </button>
  
  <!-- Responsive -->
  <p class="text-sm md:text-base lg:text-lg text-gray-600 md:text-gray-800">
    Responsive text size and color
  </p>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="32"
          number={32}
          title="Border Colors"
          theory={{
            what: "Border color utilities apply colors to element borders. Works with border width utilities.",
            why: "Border colors define edges and create visual separation between elements.",
            how: "Use `border-{color}-{shade}` for border colors. Combine with `border`, `border-2`, etc. for width.",
            keyPoints: [
              "border-{color}-{shade}: border colors",
              "Combine with border width",
              "border-transparent: transparent border",
              "Hover: hover:border-blue-500",
              "Individual sides: border-t-blue-500"
            ],
            interviewQuestions: [
              {
                question: "How do you color borders?",
                answer: "Use `border-blue-500` with `border` or `border-2` for width. Use `border-transparent` for transparent. Use `border-t-blue-500` for individual sides. Combine with states: `hover:border-blue-500`."
              }
            ]
          }}
        >
          <CodeExample
            title="Border Colors"
            description="Coloring borders"
            code={`<!-- Basic border color -->
  <div class="border-2 border-blue-500">Blue border</div>
  
  <!-- Transparent border -->
  <button class="border-2 border-transparent hover:border-blue-500">
    Transparent to blue on hover
  </button>
  
  <!-- Individual sides -->
  <div class="border-t-4 border-blue-500">
    Top border only
  </div>
  
  <!-- Responsive border color -->
  <div class="border-2 border-gray-300 md:border-blue-500">
    Responsive border
  </div>
  
  <!-- Rounded with colored border -->
  <div class="border-2 border-green-500 rounded-lg p-4">
    Rounded colored border
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="33"
          number={33}
          title="Gradients"
          priority="🔥"
          theory={{
            what: "Gradient utilities create smooth color transitions. Tailwind supports linear gradients with direction and color stops.",
            why: "Gradients add visual interest and modern design aesthetics. They're great for backgrounds, text, and borders.",
            how: "Use `bg-gradient-to-{direction}` for direction. Use `from-{color}`, `via-{color}`, `to-{color}` for color stops.",
            keyPoints: [
              "bg-gradient-to-r: right (horizontal)",
              "bg-gradient-to-b: bottom (vertical)",
              "bg-gradient-to-br: bottom-right (diagonal)",
              "from-*, via-*, to-*: color stops",
              "bg-clip-text: gradient text"
            ],
            interviewQuestions: [
              {
                question: "How do you create gradients with Tailwind?",
                answer: "Use `bg-gradient-to-r` (right), `bg-gradient-to-b` (bottom), `bg-gradient-to-br` (diagonal) for direction. Use `from-blue-500`, `via-purple-500`, `to-pink-500` for color stops. Use `bg-clip-text` with `text-transparent` for gradient text."
              }
            ]
          }}
        >
          <CodeExample
            title="Gradients"
            description="Creating gradients"
            code={`<!-- Horizontal gradient -->
  <div class="bg-gradient-to-r from-blue-500 to-purple-500">
    Left to right
  </div>
  
  <!-- Vertical gradient -->
  <div class="bg-gradient-to-b from-blue-400 to-purple-600">
    Top to bottom
  </div>
  
  <!-- Diagonal gradient -->
  <div class="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
    Diagonal with middle color
  </div>
  
  <!-- Gradient text -->
  <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
    Gradient Text
  </h1>
  
  <!-- Multiple stops -->
  <div class="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
    Rainbow gradient
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="34"
          number={34}
          title="Opacity"
          theory={{
            what: "Opacity utilities control element transparency. Can be applied to backgrounds, text, borders, and other properties.",
            why: "Opacity creates layering effects, overlays, and visual depth. Useful for modals, hover effects, and disabled states.",
            how: "Use `opacity-*` for general opacity (0-100). Use `bg-{color}/{opacity}` for background opacity. Use `text-{color}/{opacity}` for text opacity.",
            keyPoints: [
              "opacity-0 through opacity-100",
              "bg-blue-500/50: 50% opacity background",
              "text-gray-700/75: 75% opacity text",
              "border-blue-500/30: 30% opacity border",
              "hover:opacity-75: hover opacity"
            ],
            interviewQuestions: [
              {
                question: "How do you control opacity?",
                answer: "Use `opacity-50` for 50% opacity. Use `bg-blue-500/50` for background with opacity. Use `text-gray-700/75` for text opacity. Use `border-blue-500/30` for border opacity. Combine with states: `hover:opacity-75`."
              }
            ]
          }}
        >
          <CodeExample
            title="Opacity"
            description="Controlling transparency"
            code={`<!-- General opacity -->
  <div class="opacity-50">50% opacity</div>
  <div class="opacity-0">Invisible</div>
  <div class="opacity-100">Fully opaque</div>
  
  <!-- Background opacity -->
  <div class="bg-blue-500/50">50% blue background</div>
  <div class="bg-red-500/25">25% red background</div>
  
  <!-- Text opacity -->
  <p class="text-gray-700/75">75% opacity text</p>
  
  <!-- Border opacity -->
  <div class="border-2 border-blue-500/30">30% border opacity</div>
  
  <!-- Hover opacity -->
  <button class="opacity-75 hover:opacity-100">
    Hover to full opacity
  </button>
  
  <!-- Overlay -->
  <div class="relative">
    <div class="absolute inset-0 bg-black/50">
      Semi-transparent overlay
    </div>
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="35"
          number={35}
          title="Custom Colors"
          theory={{
            what: "You can add custom colors to Tailwind's theme in the configuration file. These become available as utilities.",
            why: "Custom colors allow you to match brand colors, use design system colors, and extend Tailwind's palette.",
            how: "Add colors to `theme.extend.colors` in tailwind.config.js. Use any color format (hex, rgb, hsl). Access via utilities: `bg-brand-500`.",
            keyPoints: [
              "Add to theme.extend.colors",
              "Use hex, rgb, or hsl",
              "Access via bg-*, text-*, border-*",
              "Can override default colors",
              "Supports opacity modifiers"
            ],
            interviewQuestions: [
              {
                question: "How do you add custom colors?",
                answer: "In tailwind.config.js, add to `theme.extend.colors`: `brand: { 500: '#0ea5e9' }` or `brand: '#0ea5e9'`. Access via `bg-brand-500` or `bg-brand`. Supports opacity: `bg-brand/50`. Can override defaults by using `theme.colors` instead of `extend`."
              }
            ]
          }}
        >
          <CodeExample
            title="Custom Colors"
            description="Adding custom colors"
            code={`// tailwind.config.js
  module.exports = {
    theme: {
      extend: {
        colors: {
          brand: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#0ea5e9',
            900: '#0c4a6e',
          },
          // Or simple format
          primary: '#0ea5e9',
          secondary: '#8b5cf6',
        }
      }
    }
  }
  
  <!-- Usage -->
  <div class="bg-brand-500">Brand color</div>
  <div class="text-primary">Primary text</div>
  <div class="border-2 border-secondary">Secondary border</div>
  
  <!-- With opacity -->
  <div class="bg-brand-500/50">50% brand opacity</div>`}
          />
        </ConceptCard>
      </div>
    );
  }
  
  // ========== BORDERS & EFFECTS (36-42) ==========
  function BordersConcepts({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🖼️ Borders & Effects</h3>
          <p className="text-blue-100 break-words">
            Borders, shadows, opacity, and visual effects
          </p>
        </div>
  
        <ConceptCard
          id="36"
          number={36}
          title="Border Width & Style"
          priority="🔥"
          theory={{
            what: "Border width and style utilities control border appearance. Width ranges from 0 to 8, styles include solid, dashed, dotted.",
            why: "Borders define edges, create separation, and add visual structure to elements.",
            how: "Use `border`, `border-2`, `border-4`, `border-8` for width. Use `border-solid`, `border-dashed`, `border-dotted`, `border-double` for style. Use `border-0` to remove.",
            keyPoints: [
              "border: 1px width",
              "border-2, border-4, border-8: thicker",
              "border-0: no border",
              "border-solid, border-dashed, border-dotted",
              "Individual sides: border-t-2"
            ],
            interviewQuestions: [
              {
                question: "How do you control border width and style?",
                answer: "Use `border` (1px), `border-2`, `border-4`, `border-8` for width. Use `border-solid` (default), `border-dashed`, `border-dotted`, `border-double` for style. Use `border-0` to remove. Use `border-t-2` for individual sides."
              }
            ]
          }}
        >
          <CodeExample
            title="Border Width & Style"
            description="Styling borders"
            code={`<!-- Border width -->
  <div class="border">1px border</div>
  <div class="border-2">2px border</div>
  <div class="border-4">4px border</div>
  <div class="border-8">8px border</div>
  
  <!-- Border style -->
  <div class="border-2 border-solid">Solid</div>
  <div class="border-2 border-dashed">Dashed</div>
  <div class="border-2 border-dotted">Dotted</div>
  <div class="border-2 border-double">Double</div>
  
  <!-- Individual sides -->
  <div class="border-t-2 border-b-4">
    Top 2px, bottom 4px
  </div>
  
  <!-- Remove border -->
  <div class="border-0">No border</div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="37"
          number={37}
          title="Border Radius"
          priority="🔥"
          theory={{
            what: "Border radius utilities round element corners. Provides various radius sizes from none to full (circle).",
            why: "Rounded corners create modern, friendly designs. They soften edges and improve visual appeal.",
            how: "Use `rounded`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full` for radius. Use `rounded-{side}` for individual corners.",
            keyPoints: [
              "rounded: 0.25rem (4px)",
              "rounded-lg: 0.5rem (8px)",
              "rounded-full: 50% (circle)",
              "rounded-none: no radius",
              "Individual: rounded-t-lg, rounded-br-xl"
            ],
            interviewQuestions: [
              {
                question: "How do you round corners?",
                answer: "Use `rounded` (4px), `rounded-sm` (2px), `rounded-md` (6px), `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-3xl` (24px), `rounded-full` (50% circle). Use `rounded-t-lg` for top, `rounded-br-xl` for bottom-right, etc."
              }
            ]
          }}
        >
          <CodeExample
            title="Border Radius"
            description="Rounding corners"
            code={`<!-- Basic radius -->
  <div class="rounded">Small radius</div>
  <div class="rounded-lg">Large radius</div>
  <div class="rounded-full">Circle</div>
  
  <!-- Sizes -->
  <div class="rounded-sm">2px</div>
  <div class="rounded-md">6px</div>
  <div class="rounded-xl">12px</div>
  <div class="rounded-2xl">16px</div>
  <div class="rounded-3xl">24px</div>
  
  <!-- Individual corners -->
  <div class="rounded-t-lg">Top rounded</div>
  <div class="rounded-br-xl">Bottom-right rounded</div>
  <div class="rounded-tl-2xl rounded-br-2xl">
    Top-left and bottom-right
  </div>
  
  <!-- Circular elements -->
  <img class="rounded-full w-32 h-32" src="avatar.jpg">
  <button class="rounded-full px-6 py-3">Pill button</button>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="38"
          number={38}
          title="Shadows"
          priority="🔥"
          theory={{
            what: "Shadow utilities add depth and elevation to elements. Tailwind provides multiple shadow sizes from sm to 2xl.",
            why: "Shadows create visual hierarchy, depth, and help elements stand out. They're essential for cards, buttons, and modals.",
            how: "Use `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl` for size. Use `shadow-{color}` for colored shadows. Use `shadow-none` to remove.",
            keyPoints: [
              "shadow-sm: small shadow",
              "shadow: default shadow",
              "shadow-lg: large shadow",
              "shadow-2xl: extra large",
              "shadow-{color}: colored shadows"
            ],
            interviewQuestions: [
              {
                question: "How do you add shadows?",
                answer: "Use `shadow-sm` (small), `shadow` (default), `shadow-md` (medium), `shadow-lg` (large), `shadow-xl` (extra large), `shadow-2xl` (2xl). Use `shadow-blue-500` for colored shadows. Use `shadow-none` to remove."
              }
            ]
          }}
        >
          <CodeExample
            title="Shadows"
            description="Adding depth"
            code={`<!-- Shadow sizes -->
  <div class="shadow-sm">Small shadow</div>
  <div class="shadow">Default shadow</div>
  <div class="shadow-md">Medium shadow</div>
  <div class="shadow-lg">Large shadow</div>
  <div class="shadow-xl">Extra large</div>
  <div class="shadow-2xl">2xl shadow</div>
  
  <!-- Colored shadows -->
  <div class="shadow-lg shadow-blue-500/50">
    Blue shadow
  </div>
  
  <!-- Hover shadow -->
  <button class="shadow-md hover:shadow-lg">
    Shadow grows on hover
  </button>
  
  <!-- Inner shadow -->
  <div class="shadow-inner">Inner shadow</div>
  
  <!-- No shadow -->
  <div class="shadow-none">No shadow</div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="39"
          number={39}
          title="Opacity"
          theory={{
            what: "Opacity utilities control element transparency. Can be applied globally or to specific properties.",
            why: "Opacity creates layering, overlays, and visual effects. Useful for modals, disabled states, and transitions.",
            how: "Use `opacity-0` through `opacity-100` for general opacity. Use property-specific opacity: `bg-{color}/50`, `text-{color}/75`.",
            keyPoints: [
              "opacity-0: invisible",
              "opacity-50: 50% transparent",
              "opacity-100: fully opaque",
              "bg-blue-500/50: background opacity",
              "hover:opacity-75: hover opacity"
            ],
            interviewQuestions: [
              {
                question: "How do you control opacity?",
                answer: "Use `opacity-0` (invisible) through `opacity-100` (opaque) for general opacity. Use `bg-blue-500/50` for background opacity, `text-gray-700/75` for text opacity. Combine with states: `hover:opacity-75`, `disabled:opacity-50`."
              }
            ]
          }}
        >
          <CodeExample
            title="Opacity"
            description="Transparency effects"
            code={`<!-- General opacity -->
  <div class="opacity-50">50% transparent</div>
  <div class="opacity-0">Invisible</div>
  
  <!-- Property-specific -->
  <div class="bg-blue-500/50">50% blue background</div>
  <p class="text-gray-700/75">75% text opacity</p>
  
  <!-- Hover effects -->
  <button class="opacity-75 hover:opacity-100">
    Hover to full opacity
  </button>
  
  <!-- Disabled state -->
  <button class="opacity-50 cursor-not-allowed" disabled>
    Disabled button
  </button>
  
  <!-- Overlay -->
  <div class="relative">
    <div class="absolute inset-0 bg-black/50">
      50% black overlay
    </div>
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="40"
          number={40}
          title="Backdrop Blur"
          theory={{
            what: "Backdrop blur utilities create frosted glass effects by blurring content behind an element.",
            why: "Backdrop blur creates modern, elegant overlays and glassmorphism effects. Great for modals and navigation bars.",
            how: "Use `backdrop-blur-sm`, `backdrop-blur`, `backdrop-blur-md`, `backdrop-blur-lg`, `backdrop-blur-xl`, `backdrop-blur-2xl`, `backdrop-blur-3xl` for blur intensity.",
            keyPoints: [
              "backdrop-blur-sm: small blur",
              "backdrop-blur: default blur",
              "backdrop-blur-lg: large blur",
              "backdrop-blur-3xl: maximum blur",
              "Combine with bg-white/50 for glass effect"
            ],
            interviewQuestions: [
              {
                question: "How do you create backdrop blur effects?",
                answer: "Use `backdrop-blur-sm`, `backdrop-blur`, `backdrop-blur-md`, `backdrop-blur-lg`, `backdrop-blur-xl`, `backdrop-blur-2xl`, `backdrop-blur-3xl` for blur intensity. Combine with semi-transparent backgrounds like `bg-white/50` for glassmorphism."
              }
            ]
          }}
        >
          <CodeExample
            title="Backdrop Blur"
            description="Frosted glass effects"
            code={`<!-- Basic backdrop blur -->
  <div class="backdrop-blur-sm">Small blur</div>
  <div class="backdrop-blur-lg">Large blur</div>
  
  <!-- Glassmorphism effect -->
  <div class="backdrop-blur-lg bg-white/50 border border-white/20">
    Frosted glass card
  </div>
  
  <!-- Modal overlay -->
  <div class="fixed inset-0 backdrop-blur-md bg-black/30">
    Blurred overlay
  </div>
  
  <!-- Navigation bar -->
  <nav class="backdrop-blur-xl bg-white/80 border-b">
    Glass navigation
  </nav>
  
  <!-- Card with blur -->
  <div class="backdrop-blur-2xl bg-blue-500/20 rounded-lg p-6">
    Blurred background card
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="41"
          number={41}
          title="Ring"
          theory={{
            what: "Ring utilities create focus rings around elements, commonly used for accessibility and focus states.",
            why: "Focus rings are essential for accessibility. They indicate keyboard focus and improve usability.",
            how: "Use `ring`, `ring-2`, `ring-4` for width. Use `ring-{color}` for color. Use `ring-offset-*` for offset. Use `focus:ring-2` for focus states.",
            keyPoints: [
              "ring: 1px ring",
              "ring-2, ring-4: thicker rings",
              "ring-blue-500: colored ring",
              "ring-offset-2: offset from element",
              "focus:ring-2: focus state"
            ],
            interviewQuestions: [
              {
                question: "How do you create focus rings?",
                answer: "Use `ring` (1px), `ring-2`, `ring-4` for width. Use `ring-blue-500` for color. Use `ring-offset-2` for offset. Apply with `focus:ring-2` for focus states. Use `ring-inset` for inner ring."
              }
            ]
          }}
        >
          <CodeExample
            title="Ring Utilities"
            description="Focus rings"
            code={`<!-- Basic ring -->
  <button class="ring-2 ring-blue-500">
    Ring button
  </button>
  
  <!-- Focus ring -->
  <button class="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    Focus ring on focus
  </button>
  
  <!-- Colored ring -->
  <div class="ring-4 ring-red-500">
    Red ring
  </div>
  
  <!-- Ring with offset -->
  <div class="ring-2 ring-blue-500 ring-offset-2">
    Ring with offset
  </div>
  
  <!-- Inset ring -->
  <div class="ring-2 ring-inset ring-gray-300">
    Inner ring
  </div>
  
  <!-- Input with focus ring -->
  <input class="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" type="text">`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="42"
          number={42}
          title="Outline"
          theory={{
            what: "Outline utilities control element outlines. Outlines are similar to borders but don't affect layout.",
            why: "Outlines are useful for focus states and don't cause layout shifts like borders do.",
            how: "Use `outline`, `outline-2`, `outline-4` for width. Use `outline-{color}` for color. Use `outline-none` to remove. Use `outline-offset-*` for offset.",
            keyPoints: [
              "outline: 2px outline",
              "outline-2, outline-4: width",
              "outline-blue-500: color",
              "outline-none: remove outline",
              "outline-offset-2: offset"
            ],
            interviewQuestions: [
              {
                question: "How do you use outlines?",
                answer: "Use `outline` (2px), `outline-2`, `outline-4` for width. Use `outline-blue-500` for color. Use `outline-none` to remove default browser outline. Use `outline-offset-2` for offset. Outlines don't affect layout like borders."
              }
            ]
          }}
        >
          <CodeExample
            title="Outline"
            description="Element outlines"
            code={`<!-- Basic outline -->
  <div class="outline outline-blue-500">
    Blue outline
  </div>
  
  <!-- Outline width -->
  <div class="outline-2 outline-red-500">2px outline</div>
  <div class="outline-4 outline-green-500">4px outline</div>
  
  <!-- Remove outline -->
  <button class="outline-none focus:outline-2 focus:outline-blue-500">
    No default, focus outline
  </button>
  
  <!-- Outline offset -->
  <div class="outline outline-blue-500 outline-offset-2">
    Outlined with offset
  </div>
  
  <!-- Focus outline -->
  <input class="outline-none focus:outline-2 focus:outline-blue-500" type="text">`}
          />
        </ConceptCard>
      </div>
    );
  }
  
  // ========== INTERACTIVITY (43-48) ==========
  function InteractivityConcepts({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">⚡ Interactivity</h3>
          <p className="text-blue-100 break-words">
            Hover, focus, transitions, transforms, and animations
          </p>
        </div>
  
        <ConceptCard
          id="43"
          number={43}
          title="Hover & Focus"
          priority="🔥"
          theory={{
            what: "Hover and focus variants apply styles when elements are hovered or focused. Essential for interactive elements.",
            why: "Hover and focus states provide user feedback and improve accessibility. They indicate interactivity.",
            how: "Use `hover:*` prefix for hover states. Use `focus:*` prefix for focus states. Combine multiple utilities: `hover:bg-blue-500 focus:ring-2`.",
            keyPoints: [
              "hover:bg-blue-500: hover background",
              "hover:text-white: hover text color",
              "focus:ring-2: focus ring",
              "focus:outline-none: remove default",
              "Can combine: hover:bg-blue-500 focus:ring-2"
            ],
            interviewQuestions: [
              {
                question: "How do you style hover and focus states?",
                answer: "Use `hover:` prefix: `hover:bg-blue-500`, `hover:text-white`, `hover:scale-105`. Use `focus:` prefix: `focus:ring-2`, `focus:outline-none`, `focus:bg-blue-500`. Can combine: `hover:bg-blue-500 focus:ring-2 focus:ring-blue-500`."
              }
            ]
          }}
        >
          <CodeExample
            title="Hover & Focus"
            description="Interactive states"
            code={`<!-- Hover states -->
  <button class="bg-blue-500 hover:bg-blue-600 hover:text-white">
    Hover button
  </button>
  
  <!-- Focus states -->
  <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text">
  
  <!-- Combined -->
  <button class="
    bg-blue-500 
    hover:bg-blue-600 
    focus:ring-2 
    focus:ring-blue-500 
    focus:outline-none
  ">
    Interactive button
  </button>
  
  <!-- Hover scale -->
  <div class="hover:scale-105 transition-transform">
    Scales on hover
  </div>
  
  <!-- Focus visible (keyboard only) -->
  <button class="focus-visible:ring-2 focus-visible:ring-blue-500">
    Ring only on keyboard focus
  </button>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="44"
          number={44}
          title="Active & Disabled"
          theory={{
            what: "Active and disabled variants apply styles when elements are clicked or disabled. Important for button states.",
            why: "Active states provide click feedback. Disabled states indicate non-interactive elements.",
            how: "Use `active:*` prefix for active (clicked) state. Use `disabled:*` prefix for disabled state. Use `disabled:opacity-50` for disabled appearance.",
            keyPoints: [
              "active:scale-95: click feedback",
              "active:bg-blue-700: active background",
              "disabled:opacity-50: disabled appearance",
              "disabled:cursor-not-allowed: disabled cursor",
              "Can combine states"
            ],
            interviewQuestions: [
              {
                question: "How do you style active and disabled states?",
                answer: "Use `active:` prefix: `active:scale-95`, `active:bg-blue-700` for click feedback. Use `disabled:` prefix: `disabled:opacity-50`, `disabled:cursor-not-allowed` for disabled appearance. Combine: `active:scale-95 disabled:opacity-50`."
              }
            ]
          }}
        >
          <CodeExample
            title="Active & Disabled"
            description="Button states"
            code={`<!-- Active state -->
  <button class="bg-blue-500 active:bg-blue-700 active:scale-95">
    Click feedback
  </button>
  
  <!-- Disabled state -->
  <button class="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
    Disabled button
  </button>
  
  <!-- Combined states -->
  <button class="
    bg-blue-500 
    hover:bg-blue-600 
    active:bg-blue-700 
    active:scale-95
    disabled:opacity-50 
    disabled:cursor-not-allowed
    transition-all
  ">
    Full state button
  </button>
  
  <!-- Input disabled -->
  <input class="disabled:opacity-50 disabled:cursor-not-allowed" disabled type="text">`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="45"
          number={45}
          title="Transitions"
          priority="🔥"
          theory={{
            what: "Transition utilities create smooth animations between state changes. Control duration, timing, and properties.",
            why: "Transitions make UI feel smooth and polished. They provide visual feedback for state changes.",
            how: "Use `transition` for basic transition. Use `transition-{property}` for specific properties. Use `duration-*` for duration. Use `ease-*` for timing.",
            keyPoints: [
              "transition: basic transition",
              "transition-all: all properties",
              "duration-150, duration-300, duration-500",
              "ease-in, ease-out, ease-in-out",
              "delay-75, delay-100: delays"
            ],
            interviewQuestions: [
              {
                question: "How do you add transitions?",
                answer: "Use `transition` for basic, `transition-all` for all properties, `transition-colors` for colors only. Use `duration-150` (fast), `duration-300` (default), `duration-500` (slow). Use `ease-in`, `ease-out`, `ease-in-out` for timing. Use `delay-75`, `delay-100` for delays."
              }
            ]
          }}
        >
          <CodeExample
            title="Transitions"
            description="Smooth animations"
            code={`<!-- Basic transition -->
  <button class="bg-blue-500 hover:bg-blue-600 transition">
    Smooth color change
  </button>
  
  <!-- Transition all -->
  <div class="transition-all hover:scale-105 hover:bg-blue-500">
    All properties transition
  </div>
  
  <!-- Duration -->
  <button class="transition duration-300 hover:bg-blue-500">
    300ms transition
  </button>
  
  <button class="transition duration-500 hover:bg-blue-500">
    500ms (slower)
  </button>
  
  <!-- Timing function -->
  <div class="transition ease-in hover:scale-105">Ease in</div>
  <div class="transition ease-out hover:scale-105">Ease out</div>
  <div class="transition ease-in-out hover:scale-105">Ease in-out</div>
  
  <!-- Delay -->
  <div class="transition delay-100 hover:bg-blue-500">
    Delayed transition
  </div>
  
  <!-- Specific property -->
  <div class="transition-colors duration-300 hover:bg-blue-500">
    Only colors transition
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="46"
          number={46}
          title="Transforms"
          priority="🔥"
          theory={{
            what: "Transform utilities apply CSS transforms: scale, rotate, translate, skew. Great for hover effects and animations.",
            why: "Transforms create engaging interactions. They're performant and don't cause layout reflow.",
            how: "Use `scale-*`, `rotate-*`, `translate-*`, `skew-*` for transforms. Use `transform` class. Use `origin-*` for transform origin.",
            keyPoints: [
              "scale-50 through scale-150",
              "rotate-45, rotate-90, rotate-180",
              "translate-x-4, translate-y-4",
              "skew-x-12, skew-y-12",
              "origin-center, origin-top-left"
            ],
            interviewQuestions: [
              {
                question: "How do you use transforms?",
                answer: "Use `scale-105` (1.05x), `scale-50` (0.5x), `scale-150` (1.5x) for scaling. Use `rotate-45`, `rotate-90`, `rotate-180` for rotation. Use `translate-x-4`, `translate-y-4` for movement. Use `skew-x-12` for skewing. Add `transform` class. Use `origin-center` for transform origin."
              }
            ]
          }}
        >
          <CodeExample
            title="Transforms"
            description="Transform effects"
            code={`<!-- Scale -->
  <div class="hover:scale-105 transition-transform">
    Scales on hover
  </div>
  <div class="scale-50">Half size</div>
  <div class="scale-150">1.5x size</div>
  
  <!-- Rotate -->
  <div class="rotate-45">45° rotation</div>
  <div class="hover:rotate-90 transition-transform">Rotates on hover</div>
  
  <!-- Translate (move) -->
  <div class="translate-x-4">Moved right</div>
  <div class="translate-y-4">Moved down</div>
  <div class="hover:translate-y-2 transition-transform">
    Moves on hover
  </div>
  
  <!-- Skew -->
  <div class="skew-x-12">Skewed horizontally</div>
  <div class="skew-y-12">Skewed vertically</div>
  
  <!-- Transform origin -->
  <div class="origin-top-left rotate-45">
    Rotates from top-left
  </div>
  
  <!-- Combined -->
  <div class="hover:scale-110 hover:rotate-3 transition-transform">
    Scale and rotate
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="47"
          number={47}
          title="Animations"
          theory={{
            what: "Animation utilities apply keyframe animations. Tailwind includes spin, ping, pulse, bounce. Custom animations can be added.",
            why: "Animations add life to UI. They draw attention and provide feedback for actions.",
            how: "Use `animate-spin` for rotation, `animate-ping` for ping effect, `animate-pulse` for pulsing, `animate-bounce` for bouncing. Add custom in config.",
            keyPoints: [
              "animate-spin: continuous rotation",
              "animate-ping: ping effect",
              "animate-pulse: opacity pulse",
              "animate-bounce: bounce animation",
              "Custom animations in config"
            ],
            interviewQuestions: [
              {
                question: "How do you add animations?",
                answer: "Use `animate-spin` for loading spinners, `animate-ping` for notification dots, `animate-pulse` for loading states, `animate-bounce` for bouncing. Add custom animations in tailwind.config.js `theme.extend.keyframes` and `animation`."
              }
            ]
          }}
        >
          <CodeExample
            title="Animations"
            description="Keyframe animations"
            code={`<!-- Spin (loading) -->
  <div class="animate-spin">Loading...</div>
  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
    <!-- Spinner icon -->
  </svg>
  
  <!-- Ping (notification) -->
  <div class="relative">
    <div class="animate-ping absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></div>
    <div class="h-3 w-3 bg-red-500 rounded-full"></div>
  </div>
  
  <!-- Pulse (loading) -->
  <div class="animate-pulse bg-gray-200 h-4 w-48"></div>
  
  <!-- Bounce -->
  <div class="animate-bounce">Bouncing</div>
  
  <!-- Custom animation (in config) -->
  <div class="animate-fade-in">Custom fade</div>
  
  // tailwind.config.js
  module.exports = {
    theme: {
      extend: {
        keyframes: {
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          }
        },
        animation: {
          'fade-in': 'fade-in 0.5s ease-in',
        }
      }
    }
  }`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="48"
          number={48}
          title="Cursors"
          theory={{
            what: "Cursor utilities change the mouse cursor appearance. Indicates interactivity and element behavior.",
            why: "Cursor changes provide visual feedback about element interactivity and available actions.",
            how: "Use `cursor-pointer` for clickable, `cursor-not-allowed` for disabled, `cursor-wait` for loading, `cursor-text` for text, `cursor-move` for draggable.",
            keyPoints: [
              "cursor-pointer: hand cursor",
              "cursor-not-allowed: disabled",
              "cursor-wait: loading",
              "cursor-text: text selection",
              "cursor-move: draggable"
            ],
            interviewQuestions: [
              {
                question: "How do you change cursors?",
                answer: "Use `cursor-pointer` for clickable elements, `cursor-not-allowed` for disabled, `cursor-wait` for loading states, `cursor-text` for text inputs, `cursor-move` for draggable, `cursor-default` for default, `cursor-help` for help."
              }
            ]
          }}
        >
          <CodeExample
            title="Cursors"
            description="Mouse cursor styles"
            code={`<!-- Pointer (clickable) -->
  <button class="cursor-pointer">Clickable</button>
  <a href="#" class="cursor-pointer">Link</a>
  
  <!-- Not allowed (disabled) -->
  <button class="cursor-not-allowed opacity-50" disabled>
    Disabled
  </button>
  
  <!-- Wait (loading) -->
  <div class="cursor-wait">Loading...</div>
  
  <!-- Text (input) -->
  <input class="cursor-text" type="text">
  
  <!-- Move (draggable) -->
  <div class="cursor-move">Draggable</div>
  
  <!-- Help -->
  <span class="cursor-help" title="Help text">?</span>
  
  <!-- Default -->
  <div class="cursor-default">Default cursor</div>
  
  <!-- Grab -->
  <div class="cursor-grab active:cursor-grabbing">
    Grab cursor
  </div>`}
          />
        </ConceptCard>
      </div>
    );
  }
  
  // ========== ADVANCED (49-54) ==========
  function AdvancedConcepts({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🚀 Advanced</h3>
          <p className="text-blue-100 break-words">
            Arbitrary values, plugins, customization, and best practices
          </p>
        </div>
  
        <ConceptCard
          id="49"
          number={49}
          title="Arbitrary Values"
          priority="🔥"
          theory={{
            what: "Arbitrary values allow you to use any CSS value without configuring it first. Use square brackets: `w-[500px]`.",
            why: "Arbitrary values provide flexibility when you need values not in Tailwind's default scale. No config needed.",
            how: "Use square brackets with any CSS value: `w-[500px]`, `bg-[#1da1f2]`, `text-[14px]`, `top-[117px]`. Works with JIT mode.",
            keyPoints: [
              "w-[500px]: arbitrary width",
              "bg-[#1da1f2]: arbitrary color",
              "text-[14px]: arbitrary font size",
              "top-[117px]: arbitrary position",
              "Works with all utilities"
            ],
            interviewQuestions: [
              {
                question: "How do you use arbitrary values?",
                answer: "Use square brackets with any CSS value: `w-[500px]` for width, `bg-[#1da1f2]` for color, `text-[14px]` for font size, `top-[117px]` for position. Works with all utilities and variants. Requires JIT mode (default in v3+)."
              }
            ]
          }}
        >
          <CodeExample
            title="Arbitrary Values"
            description="Using custom values"
            code={`<!-- Arbitrary width -->
  <div class="w-[500px]">500px width</div>
  <div class="w-[calc(100%-2rem)]">Calc width</div>
  
  <!-- Arbitrary color -->
  <div class="bg-[#1da1f2]">Twitter blue</div>
  <div class="text-[rgb(255,0,0)]">Red text</div>
  
  <!-- Arbitrary spacing -->
  <div class="p-[17px]">17px padding</div>
  <div class="m-[calc(2rem+10px)]">Calc margin</div>
  
  <!-- Arbitrary font size -->
  <p class="text-[14px]">14px text</p>
  <p class="text-[clamp(1rem,2vw,2rem)]">Clamp size</p>
  
  <!-- Arbitrary position -->
  <div class="top-[117px] left-[50%]">Custom position</div>
  
  <!-- With variants -->
  <div class="hover:bg-[#custom-color]">Hover arbitrary</div>
  <div class="md:w-[600px]">Responsive arbitrary</div>
  
  <!-- Complex values -->
  <div class="grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
    Complex grid
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="50"
          number={50}
          title="Custom Plugins"
          theory={{
            what: "Tailwind plugins extend functionality by adding new utilities, components, or variants. Can be official or custom.",
            why: "Plugins add functionality not in core Tailwind. They enable reusable patterns and extend the framework.",
            how: "Install plugins via npm. Add to `plugins` array in config. Create custom plugins using plugin() function.",
            keyPoints: [
              "Install: npm install @tailwindcss/forms",
              "Add to plugins array",
              "Official plugins: forms, typography, aspect-ratio",
              "Custom plugins: plugin() function",
              "Extend utilities and variants"
            ],
            interviewQuestions: [
              {
                question: "How do you use Tailwind plugins?",
                answer: "Install via npm: `npm install @tailwindcss/forms`. Add to `plugins: []` in config. Official plugins include forms, typography, aspect-ratio, line-clamp. Create custom plugins using `plugin(function({ addUtilities }) { ... })` to add new utilities."
              }
            ]
          }}
        >
          <CodeExample
            title="Custom Plugins"
            description="Extending Tailwind"
            code={`// Install plugin
  npm install @tailwindcss/forms
  
  // tailwind.config.js
  module.exports = {
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  
  // Custom plugin example
  const plugin = require('tailwindcss/plugin')
  
  module.exports = {
    plugins: [
      plugin(function({ addUtilities }) {
        addUtilities({
          '.scrollbar-hide': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        })
      }),
    ],
  }
  
  // Usage
  <div class="scrollbar-hide overflow-auto">
    Hidden scrollbar
  </div>`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="51"
          number={51}
          title="Component Extraction"
          theory={{
            what: "Component extraction creates reusable component classes using @apply directive. Combines multiple utilities into one class.",
            why: "Component extraction reduces repetition and creates reusable patterns. Useful for frequently used combinations.",
            how: "Use @apply in CSS file to combine utilities. Create component classes. Use in HTML like regular classes.",
            keyPoints: [
              "@apply: combine utilities",
              "Create in CSS file",
              "Reusable component classes",
              "Can use in @layer components",
              "Use like regular classes"
            ],
            interviewQuestions: [
              {
                question: "How do you extract components?",
                answer: "Use @apply in CSS: .btn { @apply px-4 py-2 bg-blue-500 text-white rounded; }. Use in HTML: <button class=\"btn\">. Can use in @layer components for better organization. Useful for frequently repeated patterns."
              }
            ]
          }}
        >
          <CodeExample
            title="Component Extraction"
            description="Reusable components"
            code={`/* styles.css */
  @layer components {
    .btn {
      @apply px-4 py-2 rounded font-semibold transition-colors;
    }
    
    .btn-primary {
      @apply bg-blue-500 text-white hover:bg-blue-600;
    }
    
    .btn-secondary {
      @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
    }
    
    .card {
      @apply bg-white rounded-lg shadow-md p-6;
    }
    
    .input {
      @apply border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none;
    }
  }
  
  <!-- Usage -->
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  
  <div class="card">
    Card content
  </div>
  
  <input class="input" type="text">`}
          />
        </ConceptCard>
  
        <ConceptCard
          id="52"
          number={52}
          title="Directives"
          theory={{
            what: "Tailwind directives (@tailwind, @apply, @layer) control how CSS is generated and organized.",
            why: "Directives organize CSS, control generation, and enable component extraction. Essential for proper setup.",
            how: "Use @tailwind base/components/utilities in CSS. Use @apply in components. Use @layer for organization.",
            keyPoints: [
              "@tailwind base: base styles",
              "@tailwind components: component layer",
              "@tailwind utilities: utility layer",
              "@apply: apply utilities",
              "@layer: organize CSS"
            ],
            interviewQuestions: [
              {
                question: "What are Tailwind directives?",
                answer: "Directives control CSS generation: `@tailwind base` (base styles), `@tailwind components` (component layer), `@tailwind utilities` (utility classes). `@apply` applies utilities in custom CSS. `@layer` organizes CSS into layers for proper cascade order."
              }
            ]
            }}
        >
            <CodeExample
            title="Directives"
            description="Organizing CSS"
            code={`/* styles.css */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  /* Usage */
  <div class="bg-blue-500 text-white p-4 rounded-lg">
    Tailwind directive example`}
            />
        </ConceptCard>
    );

<ConceptCard
        id="53"
        number={53}
        title="Performance Tips"
        priority="🔥"
        theory={{
          what: "Performance optimization in Tailwind focuses on keeping CSS small, builds fast, and UI responsive.",
          why: "Large CSS files slow down websites. Good Tailwind usage ensures tiny CSS bundles and fast rendering.",
          how: "Use content scanning, avoid dynamic class strings, use JIT properly, avoid huge safelists, prefer utility composition.",
          keyPoints: [
            "Always configure content paths",
            "Avoid dynamic class name generation",
            "Use JIT mode (default in v3+)",
            "Do not overuse @apply",
            "Avoid massive safelists"
          ],
          interviewQuestions: [
            {
              question: "How do you optimize Tailwind performance?",
              answer: "Configure content paths properly, avoid dynamic class strings, rely on JIT mode, don't use large safelists, keep utilities in HTML, and avoid generating unnecessary CSS via @apply or plugins."
            }
          ]
        }}
      >
        <CodeExample
          title="Performance Tips"
          description="Keeping Tailwind fast and small"
          code={`// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}

// ❌ Bad: dynamic class names (won't be detected)
<div className={\`bg-\${color}-500\`} />

// ✅ Good: explicit classes
<div className={isBlue ? "bg-blue-500" : "bg-red-500"} />

// ❌ Avoid giant safelists
safelist: ["bg-red-100", "bg-red-200", "... thousands more"]

// ✅ Let JIT generate only what you use

// ❌ Overusing @apply everywhere
// ✅ Prefer composing utilities in JSX/HTML`}
/>
      </ConceptCard>

      <ConceptCard
        id="54"
        number={54}
        title="Best Practices"
        priority="🔥"
        theory={{
          what: "Best practices define how to structure Tailwind projects for scalability, maintainability, and team usage.",
          why: "Without conventions, Tailwind projects can become messy and inconsistent.",
          how: "Follow composition-first, extract only real components, use design tokens, avoid premature abstraction.",
          keyPoints: [
            "Compose in HTML first",
            "Extract only repeated patterns",
            "Use config for design tokens",
            "Avoid premature @apply",
            "Keep class order logical"
          ],
          interviewQuestions: [
            {
              question: "What are Tailwind best practices?",
              answer: "Compose utilities in HTML first, extract only truly reusable components, use config for colors/spacing/fonts, avoid overusing @apply, keep class order logical, and rely on JIT and content scanning."
            }
          ]
        }}
      >
        <CodeExample
          title="Best Practices"
          description="How to write clean Tailwind code"
          code={`// ✅ Good: compose directly
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">

// ✅ Extract only when reused
.btn {
  @apply px-4 py-2 rounded font-semibold;
}

// ❌ Bad: everything abstracted too early
.card-wrapper-primary-container-style { ... }

// ✅ Use config for tokens
theme: {
  extend: {
    colors: {
      brand: "#0ea5e9"
    }
  }
}

// ✅ Logical class grouping
<div class="
  flex items-center justify-between
  p-4
  bg-white rounded-lg shadow-md
">`}
/>
      </ConceptCard>
    </div>
  );
}
