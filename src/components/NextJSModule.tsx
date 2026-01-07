import { useState } from "react";
import CodeExample from "./CodeExample";
import TheorySection from "./TheorySection";

// Helper component for concept cards
interface ConceptCardProps {
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
  number,
  title,
  description,
  priority,
  children,
  theory,
}: ConceptCardProps) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 w-full max-w-full flex flex-col overflow-hidden">
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

export default function NextJSModule() {
  const [activeSection, setActiveSection] = useState("fundamentals");

  const sections = [
    { id: "fundamentals", title: "Fundamentals", icon: "🔰", count: "1-5" },
    { id: "routing", title: "Routing", icon: "🛣️", count: "6-10" },
    { id: "data", title: "Data Fetching", icon: "📡", count: "11-15" },
    { id: "advanced", title: "Advanced", icon: "⚡", count: "16-20" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Next.js</h2>
        <p className="text-gray-600">
          Learn Next.js - The React framework for production
        </p>
      </div>

      {/* Section Tabs - Scrollable */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 border-b border-gray-200 min-w-max pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeSection === section.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.title}
              <span className="ml-2 text-xs opacity-75">
                ({section.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 w-full max-w-full overflow-x-hidden">
        {activeSection === "fundamentals" && <Fundamentals />}
        {activeSection === "routing" && <Routing />}
        {activeSection === "data" && <DataFetching />}
        {activeSection === "advanced" && <Advanced />}
      </div>
    </div>
  );
}

// ========== FUNDAMENTALS (1-5) ==========
function Fundamentals() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-black to-gray-800 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🔰 Next.js Fundamentals</h3>
        <p className="text-gray-300 break-words">Core concepts and setup</p>
      </div>

      <ConceptCard
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
function Routing() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">🛣️ Routing</h3>
        <p className="text-blue-100 break-words">File-based routing and navigation</p>
      </div>

      <ConceptCard
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
function DataFetching() {
  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-3xl font-bold mb-2 break-words">📡 Data Fetching</h3>
        <p className="text-green-100 break-words">Fetching data in Next.js</p>
      </div>

      <ConceptCard
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
function Advanced() {
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