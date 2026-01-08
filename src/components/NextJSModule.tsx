import { useState, useEffect } from "react";
import CodeExample from "./CodeExample";
import TheorySection from "./TheorySection";

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
      className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-md border-l-4 border-blue-500 w-full max-w-full flex flex-col overflow-hidden scroll-mt-4"
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 w-full">
        <span className="text-xl sm:text-2xl font-bold text-blue-500 flex-shrink-0">#{number}</span>
        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words flex-1 min-w-0">{title}</h4>
        {priority && (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold flex-shrink-0">
            {priority}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 break-words w-full">{description}</p>
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
            className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md z-10 relative"
            type="button"
          >
            <span className="font-semibold">{showExamples ? "Hide Examples" : "See Examples"}</span>
            <span className="text-lg sm:text-xl">{showExamples ? "▲" : "▼"}</span>
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

export default function NextJSModule() {
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
      count: "1-5",
      concepts: [
        { id: "1", title: "What is Next.js", number: 1 },
        { id: "2", title: "Pages Router vs App Router", number: 2 },
        { id: "3", title: "Server-Side Rendering (SSR)", number: 3 },
        { id: "4", title: "Static Site Generation (SSG)", number: 4 },
        { id: "5", title: "Incremental Static Regeneration (ISR)", number: 5 },
      ]
    },
    { 
      id: "routing", 
      title: "Routing", 
      icon: "🛣️", 
      count: "6-10",
      concepts: [
        { id: "6", title: "File-Based Routing", number: 6 },
        { id: "7", title: "Dynamic Routes", number: 7 },
        { id: "8", title: "Navigation (Link & useRouter)", number: 8 },
        { id: "9", title: "Layouts", number: 9 },
        { id: "10", title: "Loading & Error States", number: 10 },
      ]
    },
    { 
      id: "data", 
      title: "Data Fetching", 
      icon: "📡", 
      count: "11-15",
      concepts: [
        { id: "11", title: "Data Fetching in App Router", number: 11 },
        { id: "12", title: "API Routes", number: 12 },
        { id: "13", title: "Middleware", number: 13 },
        { id: "14", title: "Environment Variables", number: 14 },
        { id: "15", title: "Image Optimization", number: 15 },
      ]
    },
    { 
      id: "advanced", 
      title: "Advanced", 
      icon: "⚡", 
      count: "16-20",
      concepts: [
        { id: "16", title: "Server Components vs Client Components", number: 16 },
        { id: "17", title: "Metadata & SEO", number: 17 },
        { id: "18", title: "Deployment", number: 18 },
        { id: "19", title: "Performance Optimization", number: 19 },
        { id: "20", title: "TypeScript & Testing", number: 20 },
      ]
    },
    { 
      id: "features", 
      title: "Advanced Features", 
      icon: "🚀", 
      count: "21-30",
      concepts: [
        { id: "21", title: "Streaming & Suspense", number: 21 },
        { id: "22", title: "Route Handlers (App Router)", number: 22 },
        { id: "23", title: "Parallel Routes", number: 23 },
        { id: "24", title: "Intercepting Routes", number: 24 },
        { id: "25", title: "Route Groups", number: 25 },
        { id: "26", title: "Font Optimization", number: 26 },
        { id: "27", title: "Caching & Revalidation", number: 27 },
        { id: "28", title: "Cookies & Headers", number: 28 },
        { id: "29", title: "Redirects & Rewrites", number: 29 },
        { id: "30", title: "Internationalization (i18n)", number: 30 },
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
    
    // Scroll to concept after a brief delay
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

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-full w-full relative">
      {/* Mobile Menu Button - Only show on larger mobile/tablet, hide on small mobile */}
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
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Next.js</h2>
          <p className="text-xs text-gray-600 mt-0.5">
            React framework
          </p>
        </div>

        <div className="space-y-1.5">
          {sections.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const isActive = activeSection === section.id;

            return (
              <div key={section.id} className="border border-gray-200 rounded-md overflow-hidden">
                {/* Section Header - Clickable */}
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

                {/* Concepts List - Expandable */}
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

      {/* Right Content Area - Takes more space */}
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
          {activeSection === "fundamentals" && <Fundamentals activeConcept={activeConcept} />}
          {activeSection === "routing" && <Routing activeConcept={activeConcept} />}
          {activeSection === "data" && <DataFetching activeConcept={activeConcept} />}
          {activeSection === "advanced" && <Advanced activeConcept={activeConcept} />}
          {activeSection === "features" && <AdvancedFeatures activeConcept={activeConcept} />}
        </div>
      </div>
    </div>
  );
}

// ========== FUNDAMENTALS (1-5) ==========
function Fundamentals({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🔰 Next.js Fundamentals</h3>
        <p className="text-sm sm:text-base text-gray-300 break-words">Core concepts and setup</p>
      </div>

      <ConceptCard
        id="1"
        number={1}
        title="What is Next.js"
        priority="🔥"
        theory={{
          what: "Next.js is a React framework that provides server-side rendering (SSR), static site generation (SSG), API routes, file-based routing, and optimizations out of the box. It's built on top of React.",
          why: "Next.js solves common React problems: routing, SSR, performance optimization, and deployment. It enables faster page loads, better SEO, and improved user experience. It's the most popular React framework for production.",
          how: "Install: 'npx create-next-app@latest'. Next.js provides file-based routing, automatic code splitting, image optimization, API routes, and built-in CSS support. It extends React with additional features.",
          keyPoints: [
            "React framework for production",
            "Server-side rendering (SSR)",
            "Static site generation (SSG)",
            "File-based routing",
            "Built-in optimizations"
          ],
          interviewQuestions: [
            {
              question: "What is Next.js and why use it?",
              answer: "Next.js is a React framework that provides server-side rendering, static site generation, file-based routing, API routes, and optimizations out of the box. It solves common React problems like routing, SSR, performance, and SEO. It enables faster page loads, better SEO, and improved user experience. It's the most popular React framework for production applications."
            }
          ]
        }}
      >
        <CodeExample
          title="Creating Next.js App"
          description="Initialize a new Next.js project"
          code={`# Create new Next.js app
npx create-next-app@latest my-app

# Options:
# - TypeScript? Yes/No
# - ESLint? Yes/No
# - Tailwind CSS? Yes/No
# - App Router? Yes/No
# - src/ directory? Yes/No
# - Import alias? @/*

# Navigate to project
cd my-app

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000`}
        />
      </ConceptCard>

      <ConceptCard
        id="2"
        number={2}
        title="Pages Router vs App Router"
        priority="🔥"
        theory={{
          what: "Next.js has two routing systems: Pages Router (older, file-based in /pages) and App Router (newer, React Server Components in /app). App Router is the recommended approach for new projects.",
          why: "App Router provides better performance with React Server Components, improved data fetching, layouts, loading states, and error handling. Pages Router is simpler but less powerful. Choose App Router for new projects.",
          how: "Pages Router: Create files in /pages directory. App Router: Create files in /app directory with special files (page.tsx, layout.tsx, loading.tsx, error.tsx). App Router uses React Server Components by default.",
          keyPoints: [
            "Pages Router: /pages directory",
            "App Router: /app directory (recommended)",
            "App Router uses Server Components",
            "Better performance with App Router",
            "Choose App Router for new projects"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between Pages Router and App Router?",
              answer: "Pages Router uses /pages directory with file-based routing. App Router uses /app directory with React Server Components, layouts, loading states, and error boundaries. App Router provides better performance, improved data fetching, and is recommended for new projects. Pages Router is simpler but less powerful."
            }
          ]
        }}
      >
        <CodeExample
          title="Pages Router vs App Router"
          description="Understanding the two routing systems"
          code={`# Pages Router (older)
# pages/index.js
export default function Home() {
  return <h1>Home</h1>;
}

# pages/about.js
export default function About() {
  return <h1>About</h1>;
}

# App Router (newer, recommended)
# app/page.tsx
export default function Home() {
  return <h1>Home</h1>;
}

# app/about/page.tsx
export default function About() {
  return <h1>About</h1>;
}

# App Router special files:
# - page.tsx (route)
# - layout.tsx (shared layout)
# - loading.tsx (loading UI)
# - error.tsx (error UI)
# - not-found.tsx (404 page)`}
        />
      </ConceptCard>

      <ConceptCard
        id="3"
        number={3}
        title="Server-Side Rendering (SSR)"
        priority="🔥"
        theory={{
          what: "Server-Side Rendering (SSR) renders React components on the server for each request. The server generates HTML and sends it to the client, improving initial load time and SEO.",
          why: "SSR improves SEO (search engines can crawl content), faster initial page load (HTML sent immediately), and better performance on slow devices. It's essential for content-heavy sites and SEO-critical pages.",
          how: "In Pages Router: Use 'getServerSideProps'. In App Router: Components are Server Components by default, or use async components. Data is fetched on the server for each request.",
          keyPoints: [
            "Renders on server per request",
            "Better SEO",
            "Faster initial load",
            "getServerSideProps (Pages Router)",
            "Server Components (App Router)"
          ],
          interviewQuestions: [
            {
              question: "What is Server-Side Rendering in Next.js?",
              answer: "SSR renders React components on the server for each request, sending HTML to the client. It improves SEO, initial page load, and performance. In Pages Router, use getServerSideProps. In App Router, components are Server Components by default. Data is fetched on the server for each request."
            }
          ]
        }}
      >
        <CodeExample
          title="Server-Side Rendering"
          description="Implementing SSR in Next.js"
          code={`# Pages Router - getServerSideProps
# pages/products/[id].js
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  const product = await res.json();
  
  return {
    props: { product }
  };
}

export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

# App Router - Server Component (default)
# app/products/[id]/page.tsx
async function getProduct(id: string) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  return res.json();
}

export default async function Product({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="4"
        number={4}
        title="Static Site Generation (SSG)"
        priority="🔥"
        theory={{
          what: "Static Site Generation (SSG) pre-renders pages at build time. HTML is generated once during build and reused for all requests, providing the best performance.",
          why: "SSG provides the fastest page loads (pre-rendered HTML), excellent SEO, and can be served from CDN. It's perfect for content that doesn't change frequently like blogs, documentation, or marketing pages.",
          how: "In Pages Router: Use 'getStaticProps' and optionally 'getStaticPaths'. In App Router: Use 'generateStaticParams' for dynamic routes. Pages are generated at build time.",
          keyPoints: [
            "Pre-renders at build time",
            "Fastest performance",
            "Perfect for static content",
            "getStaticProps (Pages Router)",
            "generateStaticParams (App Router)"
          ],
          interviewQuestions: [
            {
              question: "What is Static Site Generation in Next.js?",
              answer: "SSG pre-renders pages at build time, generating HTML once that's reused for all requests. It provides the fastest performance, excellent SEO, and can be served from CDN. Use getStaticProps in Pages Router or generateStaticParams in App Router. Perfect for content that doesn't change frequently."
            }
          ]
        }}
      >
        <CodeExample
          title="Static Site Generation"
          description="Pre-rendering pages at build time"
          code={`# Pages Router - getStaticProps
# pages/blog/[slug].js
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }));
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(\`https://api.example.com/posts/\${params.slug}\`);
  const post = await res.json();
  
  return {
    props: { post },
    revalidate: 3600 // ISR: revalidate every hour
  };
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

# App Router - generateStaticParams
# app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`).then(res => res.json());
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="5"
        number={5}
        title="Incremental Static Regeneration (ISR)"
        priority="🔥"
        theory={{
          what: "Incremental Static Regeneration (ISR) allows you to update static pages after build time without rebuilding the entire site. Pages are regenerated on-demand or on a schedule.",
          why: "ISR combines benefits of SSG (fast performance) with dynamic content. You can have thousands of pages without long build times, and content updates automatically. Perfect for e-commerce, blogs, or content sites.",
          how: "In Pages Router: Add 'revalidate' to getStaticProps return. In App Router: Export 'revalidate' constant or use 'export const dynamic = \"force-static\"'. Pages regenerate after the revalidate period.",
          keyPoints: [
            "Updates static pages after build",
            "Combines SSG with dynamic content",
            "revalidate property",
            "Regenerates on-demand or schedule",
            "Perfect for large sites"
          ],
          interviewQuestions: [
            {
              question: "What is Incremental Static Regeneration?",
              answer: "ISR allows updating static pages after build time without rebuilding the entire site. Add 'revalidate' to getStaticProps (Pages Router) or export 'revalidate' constant (App Router). Pages regenerate after the revalidate period. It combines SSG performance with dynamic content, perfect for large sites with frequently updated content."
            }
          ]
        }}
      >
        <CodeExample
          title="Incremental Static Regeneration"
          description="Updating static pages after build"
          code={`# Pages Router - ISR
# pages/products/[id].js
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking' // or 'true'
  };
}

export async function getStaticProps({ params }) {
  const product = await fetch(\`https://api.example.com/products/\${params.id}\`).then(res => res.json());
  
  return {
    props: { product },
    revalidate: 60 // Regenerate every 60 seconds
  };
}

# App Router - ISR
# app/products/[id]/page.tsx
export const revalidate = 60; // Regenerate every 60 seconds

export async function generateStaticParams() {
  return []; // Generate on-demand
}

export default async function Product({ params }: { params: { id: string } }) {
  const product = await fetch(\`https://api.example.com/products/\${params.id}\`).then(res => res.json());
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  );
}

# On-demand revalidation (App Router)
# app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { path } = await request.json();
  await fetch(\`\${process.env.NEXT_PUBLIC_URL}/api/revalidate?path=\${path}&secret=\${process.env.REVALIDATE_SECRET}\`);
  return Response.json({ revalidated: true });
}`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== ROUTING (6-10) ==========
function Routing({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🛣️ Routing</h3>
        <p className="text-blue-100 break-words">File-based routing and navigation</p>
      </div>

      <ConceptCard
        id="6"
        number={6}
        title="File-Based Routing"
        priority="🔥"
        theory={{
          what: "Next.js uses file-based routing where the file structure determines routes. Files in /pages (Pages Router) or /app (App Router) automatically become routes.",
          why: "File-based routing is intuitive - the file structure matches the URL structure. No route configuration needed. It's simpler than manual routing and reduces boilerplate.",
          how: "Pages Router: Create files in /pages. App Router: Create folders with page.tsx. Dynamic routes use [param]. Nested routes use folders. Special files: _app.js, _document.js (Pages) or layout.tsx (App).",
          keyPoints: [
            "File structure = URL structure",
            "No route configuration",
            "Dynamic routes: [param]",
            "Nested routes: folders",
            "Intuitive and simple"
          ],
          interviewQuestions: [
            {
              question: "How does file-based routing work in Next.js?",
              answer: "Next.js uses file-based routing where the file structure determines routes. In Pages Router, files in /pages become routes. In App Router, folders with page.tsx become routes. Dynamic routes use [param] syntax. Nested routes use folder structure. No route configuration needed - it's automatic."
            }
          ]
        }}
      >
        <CodeExample
          title="File-Based Routing"
          description="Understanding Next.js routing"
          code={`# Pages Router
# pages/index.js → /
# pages/about.js → /about
# pages/blog/[slug].js → /blog/:slug
# pages/products/[...params].js → /products/* (catch-all)
# pages/shop/[[...params]].js → /shop/* (optional catch-all)

# App Router
# app/page.tsx → /
# app/about/page.tsx → /about
# app/blog/[slug]/page.tsx → /blog/:slug
# app/products/[...params]/page.tsx → /products/* (catch-all)
# app/shop/[[...params]]/page.tsx → /shop/* (optional catch-all)

# Route Groups (App Router)
# app/(marketing)/about/page.tsx → /about
# app/(marketing)/contact/page.tsx → /contact
# Groups don't affect URL structure

# Parallel Routes (App Router)
# app/@analytics/page.tsx
# app/@team/page.tsx
# app/layout.tsx with <Analytics /> and <Team /> slots`}
        />
      </ConceptCard>

      <ConceptCard
        id="7"
        number={7}
        title="Dynamic Routes"
        theory={{
          what: "Dynamic routes handle URLs with variable segments. Use brackets [param] for single segments, [...params] for catch-all, and [[...params]] for optional catch-all.",
          why: "Dynamic routes enable pages that handle multiple URLs with a single component. Essential for blogs, product pages, user profiles, or any content with variable identifiers.",
          how: "Pages Router: Create [param].js. Access via context.params. App Router: Create [param]/page.tsx. Access via params prop. Use getStaticPaths (Pages) or generateStaticParams (App) for SSG.",
          keyPoints: [
            "Handle variable URL segments",
            "[param] for single segment",
            "[...params] for catch-all",
            "[[...params]] for optional",
            "Access via params"
          ],
          interviewQuestions: [
            {
              question: "How do you create dynamic routes in Next.js?",
              answer: "Use brackets: [param] for single dynamic segment, [...params] for catch-all routes, [[...params]] for optional catch-all. In Pages Router, access via context.params. In App Router, access via params prop. Use getStaticPaths (Pages) or generateStaticParams (App) for static generation."
            }
          ]
        }}
      >
        <CodeExample
          title="Dynamic Routes"
          description="Creating routes with parameters"
          code={`# Pages Router
# pages/users/[id].js
export async function getServerSideProps({ params }) {
  const user = await fetch(\`/api/users/\${params.id}\`).then(res => res.json());
  return { props: { user } };
}

export default function User({ user }) {
  return <h1>{user.name}</h1>;
}

# pages/shop/[...params].js (catch-all)
# /shop/a → params.params = ['a']
# /shop/a/b → params.params = ['a', 'b']

# App Router
# app/users/[id]/page.tsx
export default async function User({ params }: { params: { id: string } }) {
  const user = await fetch(\`/api/users/\${params.id}\`).then(res => res.json());
  return <h1>{user.name}</h1>;
}

# app/shop/[...params]/page.tsx (catch-all)
export default function Shop({ params }: { params: { params: string[] } }) {
  return <div>Shop: {params.params.join('/')}</div>;
}

# app/docs/[[...slug]]/page.tsx (optional catch-all)
# /docs → params.slug = undefined
# /docs/guide → params.slug = ['guide']`}
        />
      </ConceptCard>

      <ConceptCard
        id="8"
        number={8}
        title="Navigation (Link & useRouter)"
        priority="🔥"
        theory={{
          what: "Next.js provides Link component for client-side navigation and useRouter hook for programmatic navigation. Both enable fast, client-side routing without full page reloads.",
          why: "Client-side navigation is faster than full page reloads, provides better UX, and maintains application state. Link prefetches pages in the background for instant navigation.",
          how: "Use <Link href='/path'> for navigation. Use useRouter().push() or useRouter().replace() for programmatic navigation. Link automatically prefetches linked pages.",
          keyPoints: [
            "Link component for navigation",
            "useRouter for programmatic",
            "Client-side routing",
            "Automatic prefetching",
            "Faster than page reload"
          ],
          interviewQuestions: [
            {
              question: "How do you navigate in Next.js?",
              answer: "Use the Link component for declarative navigation: <Link href='/path'>. Use useRouter hook for programmatic navigation: router.push('/path') or router.replace('/path'). Both enable client-side routing without full page reloads. Link automatically prefetches linked pages for instant navigation."
            }
          ]
        }}
      >
        <CodeExample
          title="Navigation"
          description="Client-side navigation"
          code={`import Link from 'next/link';
import { useRouter } from 'next/navigation'; // App Router
// or
import { useRouter } from 'next/router'; // Pages Router

# Using Link component
export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/[slug]" as="/blog/my-post">Blog</Link>
      
      # With prefetch (default: true)
      <Link href="/contact" prefetch={false}>Contact</Link>
      
      # External link
      <Link href="https://example.com" target="_blank">External</Link>
    </nav>
  );
}

# Programmatic navigation
'use client'; // App Router
import { useRouter } from 'next/navigation';

export default function Button() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/dashboard');
    // or
    router.replace('/login'); // Replace history
    // or
    router.back(); // Go back
    // or
    router.refresh(); // Refresh current page
  };
  
  return <button onClick={handleClick}>Navigate</button>;
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="9"
        number={9}
        title="Layouts"
        priority="🔥"
        theory={{
          what: "Layouts are shared UI components that wrap pages. They persist across navigation, maintaining state and avoiding re-renders. App Router has built-in layout support.",
          why: "Layouts enable shared UI (headers, footers, navigation) without re-rendering on navigation. They improve performance and provide consistent UI across pages.",
          how: "App Router: Create layout.tsx in folders. It wraps all pages in that segment. Pages Router: Use _app.js for global layout. Layouts can be nested for different sections.",
          keyPoints: [
            "Shared UI components",
            "Persist across navigation",
            "layout.tsx (App Router)",
            "_app.js (Pages Router)",
            "Can be nested"
          ],
          interviewQuestions: [
            {
              question: "What are layouts in Next.js?",
              answer: "Layouts are shared UI components that wrap pages and persist across navigation. In App Router, create layout.tsx in folders - it wraps all pages in that segment. In Pages Router, use _app.js for global layout. Layouts maintain state and avoid re-renders, perfect for headers, footers, and navigation."
            }
          ]
        }}
      >
        <CodeExample
          title="Layouts"
          description="Shared UI components"
          code={`# App Router - layout.tsx
# app/layout.tsx (root layout)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}

# app/dashboard/layout.tsx (nested layout)
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>Dashboard Nav</nav>
      {children}
    </div>
  );
}

# Pages Router - _app.js
# pages/_app.js
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

# Layouts persist across navigation
# State is maintained
# No re-renders on navigation`}
        />
      </ConceptCard>

      <ConceptCard
        id="10"
        number={10}
        title="Loading & Error States"
        theory={{
          what: "Next.js provides built-in loading and error states. loading.tsx shows loading UI while data fetches. error.tsx handles errors with error boundaries.",
          why: "Loading and error states improve UX by showing feedback during data fetching and gracefully handling errors. They're essential for production applications.",
          how: "App Router: Create loading.tsx for loading UI, error.tsx for error handling, not-found.tsx for 404. Pages Router: Use getServerSideProps loading states or custom error pages.",
          keyPoints: [
            "Built-in loading states",
            "Error boundaries",
            "loading.tsx (App Router)",
            "error.tsx (App Router)",
            "Better UX"
          ],
          interviewQuestions: [
            {
              question: "How do you handle loading and error states in Next.js?",
              answer: "In App Router, create loading.tsx to show loading UI while data fetches, error.tsx for error handling with error boundaries, and not-found.tsx for 404 pages. These are automatically used by Next.js. In Pages Router, handle loading in getServerSideProps or use custom error pages."
            }
          ]
        }}
      >
        <CodeExample
          title="Loading & Error States"
          description="Built-in loading and error handling"
          code={`# App Router - loading.tsx
# app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div>
      <div className="animate-pulse">Loading...</div>
    </div>
  );
}

# App Router - error.tsx
# app/dashboard/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

# App Router - not-found.tsx
# app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

# Pages Router - Custom error page
# pages/_error.js
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? \`An error \${statusCode} occurred on server\`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== DATA FETCHING (11-15) ==========
function DataFetching({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">📡 Data Fetching</h3>
        <p className="text-green-100 break-words">Fetching data in Next.js</p>
      </div>

      <ConceptCard
        id="11"
        number={11}
        title="Data Fetching in App Router"
        priority="🔥"
        theory={{
          what: "App Router uses async Server Components for data fetching. Components can be async and fetch data directly. No need for getServerSideProps or getStaticProps.",
          why: "Server Components simplify data fetching - just make components async and fetch. It's more intuitive, supports streaming, and provides better performance with React Server Components.",
          how: "Make component async: 'export default async function Page()'. Fetch data directly: 'const data = await fetch(url)'. Use in Server Components. For client components, use useEffect or SWR/React Query.",
          keyPoints: [
            "Async Server Components",
            "Fetch directly in components",
            "No getServerSideProps needed",
            "Supports streaming",
            "Simpler than Pages Router"
          ],
          interviewQuestions: [
            {
              question: "How do you fetch data in App Router?",
              answer: "In App Router, make components async and fetch data directly: 'export default async function Page() { const data = await fetch(url); return <div>{data}</div>; }'. Server Components can be async. For client components, use useEffect, SWR, or React Query. No need for getServerSideProps or getStaticProps."
            }
          ]
        }}
      >
        <CodeExample
          title="Data Fetching in App Router"
          description="Fetching data with Server Components"
          code={`# App Router - Server Component
# app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store' // Always fetch fresh (SSR)
    // or
    // cache: 'force-cache' // Cache forever (SSG)
    // or
    // next: { revalidate: 60 } // Revalidate every 60s (ISR)
  });
  return res.json();
}

export default async function Products() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

# Client Component with useEffect
# app/products/client-page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="12"
        number={12}
        title="API Routes"
        priority="🔥"
        theory={{
          what: "API Routes allow you to create API endpoints within your Next.js app. They're serverless functions that handle HTTP requests and can be deployed as serverless functions.",
          why: "API Routes enable full-stack applications without a separate backend. You can handle form submissions, database operations, authentication, and more. They're perfect for small to medium applications.",
          how: "Pages Router: Create files in /pages/api. App Router: Create route.ts or route.js in /app/api. Export HTTP method handlers (GET, POST, etc.). They're serverless functions.",
          keyPoints: [
            "API endpoints in Next.js",
            "/pages/api (Pages Router)",
            "/app/api (App Router)",
            "Serverless functions",
            "Full-stack capability"
          ],
          interviewQuestions: [
            {
              question: "What are API Routes in Next.js?",
              answer: "API Routes are API endpoints within your Next.js app. In Pages Router, create files in /pages/api. In App Router, create route.ts in /app/api. Export HTTP method handlers (GET, POST, etc.). They're serverless functions that enable full-stack applications without a separate backend."
            }
          ]
        }}
      >
        <CodeExample
          title="API Routes"
          description="Creating API endpoints"
          code={`# Pages Router
# pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const user = getUserById(id);
    res.status(200).json(user);
  } else if (req.method === 'POST') {
    const user = createUser(req.body);
    res.status(201).json(user);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end();
  }
}

# App Router
# app/api/users/[id]/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = getUserById(params.id);
  return Response.json(user);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const user = createUser(body);
  return Response.json(user, { status: 201 });
}

# Dynamic route
# app/api/products/[...params]/route.ts
export async function GET(request: Request, { params }: { params: { params: string[] } }) {
  // Handle /api/products/a/b/c
  return Response.json({ params: params.params });
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="13"
        number={13}
        title="Middleware"
        theory={{
          what: "Middleware runs before a request is completed. It can modify the request/response, redirect, rewrite URLs, or add headers. It's perfect for authentication, A/B testing, or feature flags.",
          why: "Middleware enables request interception, authentication checks, redirects, and URL rewrites before pages render. It's efficient and runs on the Edge runtime for fast performance.",
          how: "Create middleware.ts in project root. Export middleware function. Use NextResponse to modify requests. It runs on Edge runtime. Can match specific paths with config.matcher.",
          keyPoints: [
            "Runs before request completes",
            "Modify request/response",
            "Authentication, redirects",
            "Edge runtime",
            "middleware.ts file"
          ],
          interviewQuestions: [
            {
              question: "What is middleware in Next.js?",
              answer: "Middleware runs before a request is completed. Create middleware.ts in project root. It can modify requests/responses, redirect, rewrite URLs, or add headers. Perfect for authentication, A/B testing, or feature flags. It runs on Edge runtime for fast performance. Use NextResponse to modify requests."
            }
          ]
        }}
      >
        <CodeExample
          title="Middleware"
          description="Intercepting and modifying requests"
          code={`# middleware.ts (project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  # Authentication check
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  # Add header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  
  # Rewrite URL
  if (request.nextUrl.pathname === '/old') {
    return NextResponse.rewrite(new URL('/new', request.url));
  }
  
  return response;
}

# Match specific paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

# A/B Testing example
export function middleware(request: NextRequest) {
  const variant = Math.random() > 0.5 ? 'a' : 'b';
  
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL(\`/\${variant}\`, request.url));
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="14"
        number={14}
        title="Environment Variables"
        theory={{
          what: "Environment variables store configuration and secrets. Next.js supports .env files and exposes variables to the client with NEXT_PUBLIC_ prefix.",
          why: "Environment variables keep secrets secure, allow different configs per environment (dev, staging, prod), and prevent committing sensitive data to version control.",
          how: "Create .env.local file. Use NEXT_PUBLIC_ prefix for client-side variables. Access via process.env. Server-only variables are only available on server. Use .env.example for documentation.",
          keyPoints: [
            "Store configuration and secrets",
            "NEXT_PUBLIC_ for client",
            ".env.local file",
            "Different per environment",
            "Keep secrets secure"
          ],
          interviewQuestions: [
            {
              question: "How do you use environment variables in Next.js?",
              answer: "Create .env.local file in project root. Variables with NEXT_PUBLIC_ prefix are exposed to client (process.env.NEXT_PUBLIC_API_URL). Server-only variables are only available on server. Use .env.example to document required variables. Never commit .env.local to version control."
            }
          ]
        }}
      >
        <CodeExample
          title="Environment Variables"
          description="Managing configuration"
          code={`# .env.local
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=UA-123456

# .env.example (documentation)
DATABASE_URL=
API_SECRET_KEY=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ANALYTICS_ID=

# Server Component (App Router)
# app/api/data/route.ts
export async function GET() {
  const dbUrl = process.env.DATABASE_URL; // Server-only
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Available everywhere
  
  return Response.json({ data: '...' });
}

# Client Component
'use client';
export default function Component() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ Works
  // const secret = process.env.API_SECRET_KEY; // ❌ Undefined on client
  
  return <div>API: {apiUrl}</div>;
}

# Runtime config (Pages Router)
# next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};`}
        />
      </ConceptCard>

      <ConceptCard
        id="15"
        number={15}
        title="Image Optimization"
        priority="🔥"
        theory={{
          what: "Next.js Image component automatically optimizes images. It provides lazy loading, responsive images, automatic format selection (WebP, AVIF), and prevents layout shift.",
          why: "Image optimization improves performance, reduces bandwidth, improves Core Web Vitals, and provides better UX. The Image component handles all optimizations automatically.",
          how: "Use <Image> from 'next/image'. Provide src, width, height (or fill). Use priority for above-fold images. Configure domains in next.config.js for external images.",
          keyPoints: [
            "Automatic image optimization",
            "Lazy loading",
            "Responsive images",
            "Format selection (WebP, AVIF)",
            "Prevents layout shift"
          ],
          interviewQuestions: [
            {
              question: "How does Next.js optimize images?",
              answer: "Next.js Image component automatically optimizes images. Use <Image> from 'next/image' with src, width, height (or fill). It provides lazy loading, responsive images, automatic format selection (WebP, AVIF), and prevents layout shift. Configure external image domains in next.config.js. Use priority prop for above-fold images."
            }
          ]
        }}
      >
        <CodeExample
          title="Image Optimization"
          description="Using Next.js Image component"
          code={`import Image from 'next/image';

# Basic usage
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
/>

# With fill (responsive)
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="/hero.jpg"
    alt="Hero"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>

# Priority (above-fold)
<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority
/>

# External images
# next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    // or
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
};

<Image
  src="https://example.com/image.jpg"
  alt="External"
  width={800}
  height={600}
/>

# Responsive with sizes
<Image
  src="/responsive.jpg"
  alt="Responsive"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== ADVANCED (16-20) ==========
function Advanced({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  const deploymentCode = `# Vercel Deployment (Recommended)
# 1. Push code to GitHub
# 2. Import project on Vercel
# 3. Auto-deploys on every push
# 4. Preview deployments for PRs

# Build command (automatic):
npm run build

# Output directory: .next

# Environment Variables:
# Add in Vercel dashboard
# Or via CLI: vercel env add

# Standalone Output (for Docker):
# next.config.js
module.exports = {
  output: "standalone",
};

# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]

# Other Platforms:
# Netlify: Connect GitHub, auto-deploys
# AWS Amplify: Connect repo, configure build
# Self-host: Build and run Node.js server

# Production Build:
npm run build
npm start

# Static Export:
# next.config.js
module.exports = {
  output: "export",
};

# Then deploy static files to any hosting`;

  const performanceCode = `# Dynamic Imports (Code Splitting)
import dynamic from 'next/dynamic';

# Lazy load component
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if needed
});

export default function Page() {
  return <HeavyComponent />;
}

# Bundle Analysis
# Install: npm install @next/bundle-analyzer
# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // config
});

# Run: ANALYZE=true npm run build

# Font Optimization
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

# Third-party Scripts
import Script from 'next/script';

<Script
  src="https://example.com/script.js"
  strategy="afterInteractive" // or "lazyOnload"
/>

# Performance Monitoring
# Use Lighthouse, Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);`;

  const typescriptTestingCode = `# TypeScript Support (Built-in)
# Just use .tsx files
# app/page.tsx
export default function Page(): JSX.Element {
  return <h1>Hello</h1>;
}

# Type-safe API routes
# app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ users: [] });
}

# Type-safe params
# app/products/[id]/page.tsx
export default async function Product({ 
  params 
}: { 
  params: { id: string } 
}) {
  // params.id is typed
  return <div>{params.id}</div>;
}

# Testing Setup
# Install: npm install -D jest @testing-library/react @testing-library/jest-dom
# jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);

# __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

# E2E Testing with Playwright
# Install: npm install -D @playwright/test
# playwright.config.js
module.exports = {
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
};

# e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Home');
});`;

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">⚡ Advanced Next.js</h3>
        <p className="text-purple-100 break-words">Advanced features and optimizations</p>
      </div>

      <ConceptCard
        id="16"
        number={16}
        title="Server Components vs Client Components"
        priority="🔥"
        theory={{
          what: "Server Components render on the server, reducing JavaScript bundle size. Client Components render on the client with interactivity. App Router uses Server Components by default.",
          why: "Server Components reduce bundle size (no JavaScript sent to client), improve performance, enable direct database access, and provide better security. Use Client Components only when you need interactivity.",
          how: "App Router: Components are Server by default. Add 'use client' directive for Client Components. Server Components can't use hooks, browser APIs, or event handlers. Client Components can.",
          keyPoints: [
            "Server Components: default in App Router",
            "Client Components: 'use client' directive",
            "Server: smaller bundle, better performance",
            "Client: interactivity, hooks, events",
            "Use Client only when needed"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between Server and Client Components?",
              answer: "Server Components render on the server, reducing JavaScript bundle size and improving performance. They can access databases directly. Client Components (with 'use client') render on the client and support interactivity, hooks, and browser APIs. App Router uses Server Components by default. Use Client Components only when you need interactivity."
            }
          ]
        }}
      >
        <CodeExample
          title="Server vs Client Components"
          description="Understanding component types"
          code={`# Server Component (default in App Router)
# app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}

export default async function Products() {
  const products = await getProducts(); // Direct database/API access
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

# Client Component
# app/components/Counter.tsx
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

# Mixing Server and Client
# Server Component can import Client Component
# app/page.tsx (Server)
import Counter from './components/Counter';

export default function Page() {
  return (
    <div>
      <h1>Server Component</h1>
      <Counter /> {/* Client Component */}
    </div>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="17"
        number={17}
        title="Metadata & SEO"
        theory={{
          what: "Next.js provides built-in SEO support through metadata API (App Router) or Head component (Pages Router). It generates proper meta tags, Open Graph, and Twitter cards.",
          why: "SEO is crucial for discoverability. Next.js makes it easy to add meta tags, Open Graph images, structured data, and other SEO optimizations. It improves search engine rankings.",
          how: "App Router: Export metadata object or generateMetadata function. Pages Router: Use Head component or next/head. Add title, description, Open Graph, Twitter cards, and structured data.",
          keyPoints: [
            "Built-in SEO support",
            "Metadata API (App Router)",
            "Head component (Pages Router)",
            "Open Graph, Twitter cards",
            "Improves search rankings"
          ],
          interviewQuestions: [
            {
              question: "How do you handle SEO in Next.js?",
              answer: "In App Router, export metadata object or generateMetadata function to add title, description, Open Graph tags, and Twitter cards. In Pages Router, use Head component from next/head. Next.js automatically generates proper meta tags for better SEO and social media sharing."
            }
          ]
        }}
      >
        <CodeExample
          title="Metadata & SEO"
          description="Optimizing for search engines"
          code={`# App Router - Metadata
# app/layout.tsx
export const metadata = {
  title: 'My App',
  description: 'App description',
  openGraph: {
    title: 'My App',
    description: 'App description',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My App',
    description: 'App description',
    images: ['/twitter-image.jpg'],
  },
};

# Dynamic metadata
# app/products/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

# Pages Router - Head
# pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="description" content="App description" />
        <meta property="og:title" content="My App" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <h1>Home</h1>
    </>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="18"
        number={18}
        title="Deployment"
        priority="🔥"
        theory={{
          what: "Next.js applications can be deployed to various platforms. Vercel (Next.js creators) provides the best experience with zero-config deployment, automatic optimizations, and edge functions.",
          why: "Deployment makes your application accessible to users. Vercel provides the best Next.js experience with automatic optimizations, preview deployments, and edge functions. Other options include Netlify, AWS, or self-hosting.",
          how: "Vercel: Connect GitHub repo, auto-deploys on push. Build command: 'npm run build'. Output: Standalone or default. Other platforms: Build with 'next build', deploy output. Configure environment variables on platform.",
          keyPoints: [
            "Vercel: best Next.js experience",
            "Automatic deployments",
            "Preview deployments for PRs",
            "Edge functions support",
            "Other platforms: Netlify, AWS, etc."
          ],
          interviewQuestions: [
            {
              question: "How do you deploy a Next.js application?",
              answer: "Vercel provides the best Next.js deployment experience - connect GitHub repo and it auto-deploys. For other platforms, run 'next build' to create production build, then deploy the output. Configure environment variables on the platform. Vercel offers automatic optimizations, preview deployments, and edge functions. Other options include Netlify, AWS Amplify, or self-hosting."
            }
          ]
        }}
      >
        <CodeExample
          title="Deployment"
          description="Deploying Next.js applications"
          code={deploymentCode}
        />
      </ConceptCard>

      <ConceptCard
        id="19"
        number={19}
        title="Performance Optimization"
        priority="🔥"
        theory={{
          what: "Next.js provides many built-in performance optimizations: automatic code splitting, image optimization, font optimization, and bundle analysis. You can further optimize with dynamic imports and bundle analysis.",
          why: "Performance directly impacts user experience, SEO, and conversion rates. Next.js optimizations reduce bundle size, improve load times, and provide better Core Web Vitals scores.",
          how: "Use dynamic imports for code splitting: 'import dynamic from \"next/dynamic\"'. Analyze bundle: 'npm run build' then check .next/analyze. Use Image component. Optimize fonts. Monitor with Lighthouse.",
          keyPoints: [
            "Automatic code splitting",
            "Dynamic imports",
            "Bundle analysis",
            "Image and font optimization",
            "Monitor with Lighthouse"
          ],
          interviewQuestions: [
            {
              question: "How do you optimize Next.js performance?",
              answer: "Next.js provides automatic optimizations: code splitting, image optimization, font optimization. Use dynamic imports for code splitting: 'const Component = dynamic(() => import(\"./Component\"))'. Analyze bundle size with 'npm run build'. Use Image component for images. Monitor performance with Lighthouse. Optimize third-party scripts and use React Server Components."
            }
          ]
        }}
      >
        <CodeExample
          title="Performance Optimization"
          description="Optimizing Next.js applications"
          code={performanceCode}
        />
      </ConceptCard>

      <ConceptCard
        id="20"
        number={20}
        title="TypeScript & Testing"
        theory={{
          what: "Next.js has excellent TypeScript support out of the box. For testing, use Jest with React Testing Library, or Playwright/Cypress for E2E. Next.js provides TypeScript types for all APIs.",
          why: "TypeScript provides type safety, better IDE support, and catches errors early. Testing ensures code quality and prevents regressions. Both are essential for production applications.",
          how: "TypeScript: Create .tsx files, Next.js provides types. Testing: Install Jest, React Testing Library. Configure jest.config.js. Write tests in __tests__ or .test.tsx files. Use Playwright for E2E.",
          keyPoints: [
            "Excellent TypeScript support",
            "TypeScript types included",
            "Jest + React Testing Library",
            "Playwright/Cypress for E2E",
            "Essential for production"
          ],
          interviewQuestions: [
            {
              question: "How do you use TypeScript and testing in Next.js?",
              answer: "Next.js has built-in TypeScript support - just use .tsx files and Next.js provides types for all APIs. For testing, use Jest with React Testing Library for unit/integration tests. Configure jest.config.js. Use Playwright or Cypress for E2E testing. Write tests in __tests__ directories or .test.tsx files."
            }
          ]
        }}
      >
        <CodeExample
          title="TypeScript & Testing"
          description="Type safety and testing setup"
          code={typescriptTestingCode}
        />
      </ConceptCard>
    </div>
  );
}

// ========== ADVANCED FEATURES (21-30) ==========
function AdvancedFeatures({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🚀 Advanced Features</h3>
        <p className="text-orange-100 break-words">Advanced Next.js features and patterns</p>
      </div>

      <ConceptCard
        id="21"
        number={21}
        title="Streaming & Suspense"
        priority="🔥"
        theory={{
          what: "Streaming allows Next.js to send HTML in chunks as it's generated, improving perceived performance. Suspense boundaries define loading states for async components.",
          why: "Streaming improves Time to First Byte (TTFB) and allows users to see content faster. Suspense provides better loading states and enables progressive rendering. Essential for slow data fetching.",
          how: "Use <Suspense> boundaries around async components. App Router automatically streams Server Components. Use loading.tsx for route-level loading states. Streaming works automatically with async Server Components.",
          keyPoints: [
            "Stream HTML in chunks",
            "Improves perceived performance",
            "Suspense for loading states",
            "Automatic with Server Components",
            "Better TTFB"
          ],
          interviewQuestions: [
            {
              question: "How does streaming work in Next.js?",
              answer: "Streaming allows Next.js to send HTML in chunks as it's generated, improving Time to First Byte and perceived performance. App Router automatically streams Server Components. Use Suspense boundaries to define loading states for async components. Streaming works automatically with async Server Components and enables progressive rendering."
            }
          ]
        }}
      >
        <CodeExample
          title="Streaming & Suspense"
          description="Progressive rendering with Suspense"
          code={`# App Router - Streaming with Suspense
# app/dashboard/page.tsx
import { Suspense } from 'react';

async function UserProfile() {
  const user = await fetch('/api/user').then(res => res.json());
  return <div>{user.name}</div>;
}

async function UserPosts() {
  const posts = await fetch('/api/posts').then(res => res.json());
  return <div>{posts.map(p => <div key={p.id}>{p.title}</div>)}</div>;
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile />
      </Suspense>
      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPosts />
      </Suspense>
    </div>
  );
}

# Route-level loading
# app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading dashboard...</div>;
}

# Streaming with error boundaries
# app/dashboard/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Error: {error.message}</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="22"
        number={22}
        title="Route Handlers (App Router)"
        priority="🔥"
        theory={{
          what: "Route Handlers are the App Router equivalent of API Routes. They use standard Web APIs (Request/Response) and support all HTTP methods. They're more flexible than Pages Router API routes.",
          why: "Route Handlers use standard Web APIs, making them more familiar and flexible. They support streaming, middleware, and edge runtime. They're the recommended way to create API endpoints in App Router.",
          how: "Create route.ts or route.js in /app/api. Export named functions for HTTP methods (GET, POST, PUT, DELETE, etc.). Use Request and Response objects. Can use async/await.",
          keyPoints: [
            "App Router API routes",
            "Standard Web APIs",
            "Request/Response objects",
            "All HTTP methods",
            "Edge runtime support"
          ],
          interviewQuestions: [
            {
              question: "What are Route Handlers in App Router?",
              answer: "Route Handlers are the App Router equivalent of API Routes. Create route.ts in /app/api and export named functions for HTTP methods (GET, POST, etc.). They use standard Web APIs (Request/Response), support streaming, middleware, and edge runtime. They're more flexible than Pages Router API routes."
            }
          ]
        }}
      >
        <CodeExample
          title="Route Handlers"
          description="Creating API endpoints in App Router"
          code={`# app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

# GET handler
export async function GET(request: NextRequest) {
  const users = await getUsers();
  return NextResponse.json(users);
}

# POST handler
export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await createUser(body);
  return NextResponse.json(user, { status: 201 });
}

# PUT handler
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const user = await updateUser(body);
  return NextResponse.json(user);
}

# DELETE handler
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await deleteUser(id);
  return NextResponse.json({ deleted: true });
}

# Dynamic route
# app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserById(params.id);
  return NextResponse.json(user);
}

# Edge runtime
export const runtime = 'edge';

# Streaming response
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('Hello'));
      controller.close();
    },
  });
  return new Response(stream);
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="23"
        number={23}
        title="Parallel Routes"
        theory={{
          what: "Parallel Routes allow you to simultaneously render multiple pages in the same layout. They use slots (@folder) to create independent loading and error states for different sections.",
          why: "Parallel Routes enable complex UIs with independent loading states, better UX for dashboard-like applications, and allow different sections to load independently. Perfect for dashboards, analytics, and multi-panel layouts.",
          how: "Create folders with @ prefix (e.g., @analytics, @team). These become slots. Use them in layout.tsx. Each slot can have its own loading.tsx and error.tsx. Use default.tsx for unmatched routes.",
          keyPoints: [
            "Multiple pages in same layout",
            "Use @folder for slots",
            "Independent loading states",
            "Perfect for dashboards",
            "Better UX"
          ],
          interviewQuestions: [
            {
              question: "What are Parallel Routes in Next.js?",
              answer: "Parallel Routes allow rendering multiple pages simultaneously in the same layout. Create folders with @ prefix (e.g., @analytics) to create slots. Use them in layout.tsx. Each slot can have independent loading.tsx and error.tsx. Perfect for dashboards and multi-panel layouts where different sections load independently."
            }
          ]
        }}
      >
        <CodeExample
          title="Parallel Routes"
          description="Rendering multiple pages simultaneously"
          code={`# Folder structure
# app/dashboard/
#   layout.tsx
#   @analytics/
#     page.tsx
#     loading.tsx
#   @team/
#     page.tsx
#     loading.tsx
#   page.tsx

# app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2">
        <div>{analytics}</div>
        <div>{team}</div>
      </div>
    </div>
  );
}

# app/dashboard/@analytics/page.tsx
export default function Analytics() {
  return <div>Analytics Dashboard</div>;
}

# app/dashboard/@analytics/loading.tsx
export default function AnalyticsLoading() {
  return <div>Loading analytics...</div>;
}

# app/dashboard/@team/page.tsx
export default function Team() {
  return <div>Team Dashboard</div>;
}

# app/dashboard/@team/loading.tsx
export default function TeamLoading() {
  return <div>Loading team...</div>;
}

# Default slot for unmatched routes
# app/dashboard/@analytics/default.tsx
export default function Default() {
  return <div>No analytics selected</div>;
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="24"
        number={24}
        title="Intercepting Routes"
        theory={{
          what: "Intercepting Routes allow you to intercept route navigation and show a different UI (like a modal) while keeping the URL unchanged. They use (.)folder syntax to intercept routes at the same level.",
          why: "Intercepting Routes enable modals, sidebars, and other overlays that don't change the URL. They provide better UX for actions like viewing details, editing, or creating content without leaving the current page.",
          how: "Use (.)folder syntax to intercept routes. (.) intercepts same level, (..) intercepts parent level, (..)(..) intercepts two levels up. Create a page.tsx in the intercepting folder. The URL stays the same but shows different UI.",
          keyPoints: [
            "Intercept route navigation",
            "Show modal/overlay",
            "URL stays unchanged",
            "(.)folder syntax",
            "Better UX"
          ],
          interviewQuestions: [
            {
              question: "What are Intercepting Routes?",
              answer: "Intercepting Routes allow intercepting route navigation to show different UI (like modals) while keeping the URL unchanged. Use (.)folder syntax: (.) intercepts same level, (..) intercepts parent. Create page.tsx in intercepting folder. Perfect for modals, sidebars, and overlays that don't change the URL."
            }
          ]
        }}
      >
        <CodeExample
          title="Intercepting Routes"
          description="Intercepting navigation for modals"
          code={`# Folder structure
# app/
#   @modal/
#     (.)photo/
#       [id]/
#         page.tsx  # Intercepts /photo/[id]
#   photo/
#     [id]/
#       page.tsx    # Regular page

# Intercepting route (modal)
# app/@modal/(.)photo/[id]/page.tsx
export default function PhotoModal({ params }: { params: { id: string } }) {
  return (
    <div className="modal">
      <h1>Photo {params.id}</h1>
      {/* Modal content */}
    </div>
  );
}

# Regular route
# app/photo/[id]/page.tsx
export default function Photo({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Photo {params.id}</h1>
      {/* Full page content */}
    </div>
  );
}

# Layout with modal slot
# app/layout.tsx
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

# Syntax:
# (.) - Same level
# (..) - Parent level
# (..)(..) - Two levels up
# (...) - Root level`}
        />
      </ConceptCard>

      <ConceptCard
        id="25"
        number={25}
        title="Route Groups"
        theory={{
          what: "Route Groups organize routes without affecting the URL structure. They use parentheses (folder) to create logical groupings. Useful for organizing routes, applying layouts, or creating route segments.",
          why: "Route Groups help organize complex applications, apply different layouts to route segments, and create logical groupings without changing URLs. They're essential for large applications with many routes.",
          how: "Create folders with parentheses: (marketing), (dashboard). These don't appear in URLs. Use them to organize routes, apply layouts, or create route segments. Can combine with other routing features.",
          keyPoints: [
            "Organize routes logically",
            "Don't affect URLs",
            "(folder) syntax",
            "Apply different layouts",
            "Better organization"
          ],
          interviewQuestions: [
            {
              question: "What are Route Groups in Next.js?",
              answer: "Route Groups organize routes without affecting URL structure. Use parentheses: (marketing), (dashboard). They don't appear in URLs but help organize routes, apply different layouts to segments, and create logical groupings. Essential for organizing large applications with many routes."
            }
          ]
        }}
      >
        <CodeExample
          title="Route Groups"
          description="Organizing routes without affecting URLs"
          code={`# Folder structure
# app/
#   (marketing)/
#     about/
#       page.tsx      # /about
#     contact/
#       page.tsx      # /contact
#     layout.tsx      # Layout for marketing routes
#   (dashboard)/
#     dashboard/
#       page.tsx      # /dashboard
#     settings/
#       page.tsx      # /settings
#     layout.tsx      # Layout for dashboard routes
#   layout.tsx        # Root layout

# Marketing layout
# app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Marketing Nav</nav>
      {children}
    </div>
  );
}

# Dashboard layout
# app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Dashboard Nav</nav>
      {children}
    </div>
  );
}

# URLs remain the same:
# /about (not /marketing/about)
# /dashboard (not /dashboard/dashboard)

# Can combine with other features:
# app/(marketing)/@modal/(.)photo/[id]/page.tsx`}
        />
      </ConceptCard>

      <ConceptCard
        id="26"
        number={26}
        title="Font Optimization"
        priority="🔥"
        theory={{
          what: "Next.js automatically optimizes fonts using next/font. It downloads fonts at build time, generates CSS, and self-hosts fonts. Supports Google Fonts, local fonts, and custom fonts.",
          why: "Font optimization improves performance by eliminating layout shift, reducing external requests, and self-hosting fonts. It improves Core Web Vitals (CLS) and provides better performance than external font loading.",
          how: "Import from 'next/font/google' or 'next/font/local'. Configure font with options. Apply className to elements. Next.js handles optimization automatically. Use variable fonts for better performance.",
          keyPoints: [
            "Automatic font optimization",
            "Self-hosts fonts",
            "Eliminates layout shift",
            "Google Fonts support",
            "Better Core Web Vitals"
          ],
          interviewQuestions: [
            {
              question: "How does Next.js optimize fonts?",
              answer: "Next.js optimizes fonts using next/font. Import from 'next/font/google' or 'next/font/local', configure with options, and apply className. Next.js downloads fonts at build time, generates CSS, and self-hosts fonts. This eliminates layout shift, reduces external requests, and improves Core Web Vitals."
            }
          ]
        }}
      >
        <CodeExample
          title="Font Optimization"
          description="Optimizing fonts with next/font"
          code={`# Google Fonts
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

# Apply to layout
# app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

# Variable fonts (better performance)
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function Layout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

# Local fonts
import localFont from 'next/font/local';

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
});

# Multiple fonts
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });

export default function Layout({ children }) {
  return (
    <html className={\`\${inter.variable} \${roboto.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="27"
        number={27}
        title="Caching & Revalidation"
        priority="🔥"
        theory={{
          what: "Next.js has a sophisticated caching system with multiple cache layers: Request Memoization, Data Cache, Full Route Cache, and Router Cache. You can control caching with fetch options and revalidation.",
          why: "Caching improves performance by reducing redundant requests and computations. Understanding caching is crucial for optimizing Next.js applications and ensuring data freshness. Different cache layers serve different purposes.",
          how: "Use fetch cache options: 'no-store' (no cache), 'force-cache' (cache forever), 'revalidate' (time-based). Use revalidatePath and revalidateTag for on-demand revalidation. Understand Request Memoization, Data Cache, and Full Route Cache.",
          keyPoints: [
            "Multiple cache layers",
            "Request Memoization",
            "Data Cache",
            "Full Route Cache",
            "On-demand revalidation"
          ],
          interviewQuestions: [
            {
              question: "How does caching work in Next.js?",
              answer: "Next.js has multiple cache layers: Request Memoization (deduplicates requests), Data Cache (caches fetch results), Full Route Cache (caches rendered pages), and Router Cache (client-side cache). Control with fetch options: 'no-store', 'force-cache', or 'revalidate'. Use revalidatePath and revalidateTag for on-demand revalidation."
            }
          ]
        }}
      >
        <CodeExample
          title="Caching & Revalidation"
          description="Understanding Next.js caching"
          code={`# Fetch caching options
# app/products/page.tsx

# No cache (always fetch fresh)
const res = await fetch('https://api.example.com/products', {
  cache: 'no-store',
});

# Cache forever
const res = await fetch('https://api.example.com/products', {
  cache: 'force-cache',
});

# Time-based revalidation (ISR)
const res = await fetch('https://api.example.com/products', {
  next: { revalidate: 3600 }, # Revalidate every hour
});

# Tag-based revalidation
const res = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] },
});

# On-demand revalidation
# app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST() {
  revalidatePath('/products'); # Revalidate specific path
  revalidateTag('products'); # Revalidate by tag
  return Response.json({ revalidated: true });
}

# Request Memoization (automatic)
# Same fetch in same render = deduplicated
async function getData() {
  return fetch('https://api.example.com/data'); # Deduplicated
}

export default async function Page() {
  const data1 = await getData(); # First request
  const data2 = await getData(); # Uses memoized result
  return <div>{data1.id}</div>;
}

# Opt out of memoization
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="28"
        number={28}
        title="Cookies & Headers"
        theory={{
          what: "Next.js provides utilities for working with cookies and headers in Server Components, Route Handlers, and Middleware. Use cookies() and headers() from 'next/headers' for reading, and setCookie/headers for setting.",
          why: "Cookies and headers are essential for authentication, session management, and request metadata. Next.js provides type-safe utilities for working with them in server-side code.",
          how: "Import cookies() and headers() from 'next/headers' in Server Components. Use request.cookies and request.headers in Route Handlers. Use NextResponse.cookies.set() in Middleware. All are read-only in Server Components.",
          keyPoints: [
            "Type-safe cookie/header utilities",
            "cookies() and headers()",
            "Server Components",
            "Route Handlers",
            "Middleware support"
          ],
          interviewQuestions: [
            {
              question: "How do you work with cookies and headers in Next.js?",
              answer: "In Server Components, import cookies() and headers() from 'next/headers' - they're read-only. In Route Handlers, use request.cookies and request.headers. In Middleware, use NextResponse.cookies.set() to set cookies. Next.js provides type-safe utilities for working with cookies and headers in server-side code."
            }
          ]
        }}
      >
        <CodeExample
          title="Cookies & Headers"
          description="Working with cookies and headers"
          code={`# Server Component
# app/dashboard/page.tsx
import { cookies, headers } from 'next/headers';

export default async function Dashboard() {
  # Read cookies
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  # Read headers
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  
  return <div>Dashboard</div>;
}

# Route Handler
# app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  # Read cookies
  const token = request.cookies.get('token');
  
  # Read headers
  const userAgent = request.headers.get('user-agent');
  
  # Set cookies
  const response = NextResponse.json({ user: '...' });
  response.cookies.set('session', 'value', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, # 1 day
  });
  
  # Set headers
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

# Middleware
# middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  # Read cookies
  const token = request.cookies.get('token');
  
  # Set cookies
  const response = NextResponse.next();
  response.cookies.set('visited', 'true');
  
  return response;
}

# Delete cookie
response.cookies.delete('token');

# Get all cookies
const allCookies = request.cookies.getAll();`}
        />
      </ConceptCard>

      <ConceptCard
        id="29"
        number={29}
        title="Redirects & Rewrites"
        theory={{
          what: "Redirects send users to a different URL (301/302). Rewrites proxy requests to a different URL without changing the browser URL. Both can be configured in next.config.js or programmatically.",
          why: "Redirects are essential for SEO (301 permanent, 302 temporary), handling old URLs, and URL migrations. Rewrites enable API proxying, A/B testing, and serving content from different sources without exposing URLs.",
          how: "Configure in next.config.js with redirects and rewrites arrays. Use redirect() in Server Components and Route Handlers. Use NextResponse.redirect() and NextResponse.rewrite() in Middleware.",
          keyPoints: [
            "Redirects: change URL",
            "Rewrites: proxy without changing URL",
            "next.config.js configuration",
            "Programmatic redirects",
            "SEO and URL management"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between redirects and rewrites?",
              answer: "Redirects send users to a different URL (301 permanent, 302 temporary) and change the browser URL. Rewrites proxy requests to a different URL without changing the browser URL. Configure in next.config.js or use redirect() in Server Components, NextResponse.redirect()/rewrite() in Middleware. Redirects are for SEO and URL changes, rewrites for API proxying and A/B testing."
            }
          ]
        }}
      >
        <CodeExample
          title="Redirects & Rewrites"
          description="URL redirection and rewriting"
          code={`# next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, # 301
      },
      {
        source: '/temporary',
        destination: '/new',
        permanent: false, # 302
      },
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.example.com/:path*',
      },
      {
        source: '/old-path',
        destination: '/new-path', # URL stays /old-path
      },
    ];
  },
};

# Programmatic redirect (Server Component)
# app/login/page.tsx
import { redirect } from 'next/navigation';

export default async function Login() {
  const user = await getUser();
  
  if (user) {
    redirect('/dashboard'); # Server-side redirect
  }
  
  return <div>Login form</div>;
}

# Programmatic redirect (Route Handler)
# app/api/login/route.ts
import { redirect } from 'next/navigation';

export async function POST() {
  # Handle login
  redirect('/dashboard');
}

# Middleware redirect
# middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/old') {
    return NextResponse.redirect(new URL('/new', request.url));
  }
  
  # Rewrite
  if (request.nextUrl.pathname === '/api/proxy') {
    return NextResponse.rewrite(new URL('/api/actual', request.url));
  }
  
  return NextResponse.next();
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="30"
        number={30}
        title="Internationalization (i18n)"
        theory={{
          what: "Internationalization (i18n) enables multi-language support in Next.js applications. You can use next-intl, next-i18next, or built-in routing with locale detection. Supports locale-based routing and translations.",
          why: "i18n is essential for global applications. It enables serving content in multiple languages, improves SEO for different regions, and provides better UX for international users. Many applications require multi-language support.",
          how: "Use next-intl (recommended for App Router) or next-i18next (Pages Router). Configure locales in next.config.js. Create translation files. Use locale-based routing (/en, /fr, etc.) or subdomain routing.",
          keyPoints: [
            "Multi-language support",
            "Locale-based routing",
            "next-intl (App Router)",
            "next-i18next (Pages Router)",
            "Translation management"
          ],
          interviewQuestions: [
            {
              question: "How do you implement internationalization in Next.js?",
              answer: "For App Router, use next-intl. For Pages Router, use next-i18next or configure i18n in next.config.js. Create translation files for each locale. Use locale-based routing (/en, /fr) or subdomain routing. Next.js supports automatic locale detection, locale prefixes in URLs, and locale-specific content."
            }
          ]
        }}
      >
        <CodeExample
          title="Internationalization (i18n)"
          description="Multi-language support"
          code={`# Using next-intl (App Router)
# Install: npm install next-intl

# next.config.js
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl({
  # config
});

# Middleware for locale detection
# middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(de|en)/:path*'],
};

# i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'fr'],
  defaultLocale: 'en',
});

# Translation files
# messages/en.json
{
  "HomePage": {
    "title": "Welcome",
    "description": "Welcome to our app"
  }
}

# messages/de.json
{
  "HomePage": {
    "title": "Willkommen",
    "description": "Willkommen in unserer App"
  }
}

# Using translations
# app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

# Pages Router - next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'de', 'fr'],
    defaultLocale: 'en',
  },
};

# Using next-i18next
# Install: npm install next-i18next react-i18next

# public/locales/en/common.json
{
  "welcome": "Welcome"
}

# Using in component
import { useTranslation } from 'next-i18next';

export default function Component() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome')}</h1>;
}`}
        />
      </ConceptCard>
    </div>
  );
}