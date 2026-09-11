import type { FullStackTrack } from "../fullstackTrackTypes";

export const frontendEngTrack: FullStackTrack = {
  layoutTitle: "Frontend Architecture & Testing",
  layoutSubtitle: "Core Web Vitals, TanStack Query, List Virtualization, RTL, MSW, Playwright, and a11y",
  accent: "cyan",
  defaultSectionId: "performance-state",
  sections: [
    {
      id: "performance-state",
      title: "Performance & Server State",
      icon: "⚡",
      heroTitle: "⚡ Core Web Vitals, Virtualization & TanStack Query",
      heroSubtitle: "LCP, INP, CLS optimization, rendering 100k items, and server-state caching",
      heroGradient: "from-sky-600 via-blue-700 to-indigo-800",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Core Web Vitals (LCP, INP, CLS, TTFB)",
          priority: "🔥",
          theory: {
            what: "Google's Core Web Vitals measure real-world user experience: (1) LCP (Largest Contentful Paint - main content render time, good < 2.5s), (2) INP (Interaction to Next Paint - UI responsiveness upon click/keypress, replaced FID, good < 200ms), (3) CLS (Cumulative Layout Shift - visual stability against unexpected jumps, good < 0.1), and (4) TTFB (Time to First Byte - server response speed, good < 800ms).",
            why: "Directly impacts Google SEO rankings, user conversion, and perceived application speed.",
            how: "Optimize LCP by preloading hero images (<link rel='preload'>) and removing render-blocking JS. Optimize INP by yielding main thread (requestAnimationFrame / scheduler.yield) and avoiding heavy synchronous JS loops. Optimize CLS by setting explicit width/height on images and reserving layout slots for ads/banners.",
            keyPoints: [
              "INP measures longest latency of any user interaction throughout full page lifecycle",
              "CLS fix: always provide aspect-ratio or explicit dimensions for media/skeleton loaders",
              "Use web-vitals npm library to capture field metrics to analytics endpoints",
            ],
            interviewQuestions: [
              {
                question: "What is INP (Interaction to Next Paint) and how do you optimize it in React applications?",
                answer: "INP measures the time between a user interaction (click, keypress) and the next frame update on screen. Optimize by: (1) Breaking long tasks (>50ms) using useTransition / startTransition, (2) Debouncing inputs, (3) Offloading CPU-heavy sorting/filtering to Web Workers, and (4) Avoiding expensive re-renders with React.memo/useMemo.",
              },
            ],
          },
          codeExample: {
            title: "Web Vitals RUM Instrumentation & Yielding Main Thread",
            code: `import { onCLS, onINP, onLCP } from "web-vitals";

// 1. Report field metrics to Real User Monitoring (RUM) backend
function sendToAnalytics(metric: any) {
  navigator.sendBeacon("/api/vitals", JSON.stringify(metric));
}

onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);

// 2. React 19 Concurrent transition yielding main thread for INP
import { useState, useTransition } from "react";

export function SearchFilter({ items }: { items: string[] }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // High priority: update input text immediately (Keeps INP < 50ms)
    setQuery(e.target.value);

    // Non-blocking transition: filter heavy list in background
    startTransition(() => {
      setFiltered(items.filter((item) => item.includes(e.target.value)));
    });
  };

  return <input value={query} onChange={handleChange} />;
}`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "List Virtualization & Bundle Optimization",
          priority: "🔥",
          theory: {
            what: "List Virtualization (@tanstack/react-virtual, react-window) renders only the DOM nodes currently visible in the viewport (+ a small buffer), recycling elements as the user scrolls. Bundle optimization uses dynamic imports (React.lazy), tree-shaking, and manual chunking to keep initial JS bundles under 150KB.",
            why: "Mounting 10,000 DOM nodes freezes the browser (100MB+ memory leak, sluggish scrolling). Virtualization keeps DOM node count constant (~30 nodes) regardless of total items.",
            how: "Use useVirtualizer with parent container ref. Calculate total height dynamically and position virtual items with CSS transform: translateY.",
            keyPoints: [
              "DOM Node bloat: Browsers struggle with >1,500 simultaneous DOM elements",
              "Dynamic imports: const HeavyChart = lazy(() => import('./HeavyChart')) with <Suspense>",
              "Tree-shaking requires pure ES Module imports (import { map } from 'lodash-es' rather than full library)",
            ],
            interviewQuestions: [
              {
                question: "How does list virtualization allow rendering 100,000 items smoothly at 60 FPS?",
                answer: "Instead of creating 100,000 DOM elements, virtualization computes the scroll offset and viewport height, rendering only the ~20-30 visible rows inside an inner container with the total scrollable height set via CSS translateY.",
              },
            ],
          },
          codeExample: {
            title: "Virtualizing 50,000 Rows with TanStack Virtual",
            code: `import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // 40px estimated row height
    overscan: 5,            // Pre-render 5 items above/below viewport
  });

  return (
    <div ref={parentRef} className="h-96 overflow-auto border rounded">
      <div
        className="relative w-full"
        style={{ height: \`\${virtualizer.getTotalSize()}px\` }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className="absolute top-0 left-0 w-full px-4 py-2 border-b"
            style={{
              height: \`\${virtualRow.size}px\`,
              transform: \`translateY(\${virtualRow.start}px)\`,
            }}
          >
            Row {virtualRow.index}: {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "TanStack Query (React Query) Server-State",
          priority: "🔥",
          theory: {
            what: "TanStack Query manages asynchronous Server-State (fetching, caching, deduping identical requests, background revalidation on window focus, and optimistic updates). It separates transient server cache from true client UI state.",
            why: "Eliminates hundreds of lines of boilerplate useEffect/useState loading/error states and handles race conditions automatically.",
            how: "Use useQuery for data fetching, useMutation for mutations, and queryClient.invalidateQueries({ queryKey }) to trigger automatic background refetches upon data updates.",
            keyPoints: [
              "Stale-Time vs GC-Time (Cache-Time): staleTime defines how long data is considered fresh before background refetch; gcTime defines when inactive cache is garbage collected",
              "Optimistic Updates: Update client UI instantly before server response; rollback on mutation failure",
              "Automatic request deduplication: Multiple components requesting ['user', 1] make only ONE network call",
            ],
            interviewQuestions: [
              {
                question: "How do you implement an Optimistic Update with rollback using TanStack Query?",
                answer: "In useMutation: (1) onMutate: Cancel outgoing refetches, snapshot previous query data, and write optimistic value to cache with queryClient.setQueryData. (2) onError: Restore the previous snapshot. (3) onSettled: Invalidate queries to sync with the final server state.",
              },
            ],
          },
          codeExample: {
            title: "Optimistic Update with Rollback in TanStack Query",
            code: `import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Todo { id: string; title: string; completed: boolean }

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: Todo) => {
      const res = await fetch(\`/api/todos/\${todo.id}\`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !todo.completed }),
      });
      return res.json();
    },
    // 1. When mutate is called: Update UI optimistically
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((t) => (t.id === updatedTodo.id ? { ...t, completed: !t.completed } : t))
      );

      return { previousTodos }; // Context for rollback
    },
    // 2. If mutation fails: Rollback to previous state
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    // 3. Always refetch in background to guarantee sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}`,
          },
        },
      ],
    },
    {
      id: "testing-accessibility",
      title: "Testing & Accessibility (a11y)",
      icon: "🧪",
      heroTitle: "🧪 Modern Testing (RTL, MSW, Playwright) & a11y",
      heroSubtitle: "Unit, Integration, E2E testing, API mocking, and WCAG accessibility",
      heroGradient: "from-blue-700 via-indigo-800 to-violet-900",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "React Testing Library (RTL) & Accessible Queries",
          priority: "🔥",
          theory: {
            what: "React Testing Library tests components from the user's perspective rather than testing internal implementation details (state/props). Queries prioritize accessibility: (1) getByRole (best), (2) getByLabelText (forms), (3) getByText, and only as a last resort (4) getByTestId.",
            why: "Refactoring component internals should never break tests as long as user-facing behavior remains intact.",
            how: "Use userEvent (simulates real mouse/keyboard events) over fireEvent. Use findBy* for asynchronous elements with built-in waitFor polling.",
            keyPoints: [
              "Query Priority: getByRole('button', { name: /submit/i }) is resilient and guarantees accessibility",
              "userEvent.click() triggers real focus, pointer, and keyboard events",
              "Never test state hooks or internal methods directly",
            ],
            interviewQuestions: [
              {
                question: "Why does React Testing Library discourage testing component state directly?",
                answer: "Testing state couples tests to internal implementation details. If a developer refactors useState to useReducer or Zustand, implementation-testing suites break even if the UI still works. Testing rendered accessible DOM elements ensures tests verify what real users experience.",
              },
            ],
          },
          codeExample: {
            title: "Accessible Component Test with RTL and userEvent",
            code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { expect, test, vi } from "vitest";

test("submits form with valid credentials", async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<LoginForm onSubmit={handleSubmit} />);

  // Accessible role and label queries
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /sign in/i });

  await user.type(emailInput, "alex@example.com");
  await user.type(passwordInput, "Secret123!");
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    email: "alex@example.com",
    password: "Secret123!",
  });
});`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "Mock Service Worker (MSW) API Mocking",
          priority: "🔥",
          theory: {
            what: "Mock Service Worker (MSW) intercepts network requests at the network layer using Service Workers (in browser) or class-override (in Node.js/Vitest). Handlers define mock REST or GraphQL endpoints.",
            why: "Unlike mocking global fetch/axios (which tests fake client code), MSW leaves client request code 100% untouched and realistic.",
            how: "Define handlers using http.get('/api/user', () => HttpResponse.json({...})). Start worker in browser for dev or server.listen() in Vitest/Jest beforeAll.",
            keyPoints: [
              "Shared mock handlers between unit tests (Vitest), E2E tests (Playwright), and Storybook",
              "Simulate network errors (HttpResponse.error()) and HTTP 500 delays seamlessly",
              "Zero pollution in production bundles",
            ],
            interviewQuestions: [
              {
                question: "How does Mock Service Worker (MSW) differ from traditional fetch / axios mocks?",
                answer: "Traditional mocking stubs the JS fetch function, which can hide bugs in headers, query param encoding, or serialization. MSW intercepts requests at the actual network boundary via Service Workers, leaving all application HTTP networking code completely unmodified and tested end-to-end.",
              },
            ],
          },
          codeExample: {
            title: "MSW Rest Handler & Vitest Test Setup",
            code: `import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

// 1. Define MSW Network Interceptors
export const handlers = [
  http.get("/api/user/101", () => {
    return HttpResponse.json({ id: "101", name: "Sarah Connor" });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders user profile after network fetch", async () => {
  render(<UserProfile userId="101" />);
  // findByRole polls automatically for async network render
  expect(await screen.findByRole("heading", { name: /sarah connor/i })).toBeInTheDocument();
});`,
          },
        },
        {
          id: "6",
          number: 6,
          title: "Playwright E2E Automated Testing",
          priority: "🔥",
          theory: {
            what: "Playwright provides modern, reliable end-to-end (E2E) testing across Chromium, Firefox, and WebKit. It features auto-waiting (no arbitrary sleep(3000)), network interception, mobile device emulation, and visual regression snapshot testing.",
            why: "Guarantees critical business user flows (checkout, registration, subscription) work across real browser rendering engines.",
            how: "Adopt the Page Object Model (POM) pattern to encapsulate page locators and user actions into reusable test classes.",
            keyPoints: [
              "Auto-waiting: Playwright waits for elements to be visible, enabled, and stable before clicking",
              "Page Object Model (POM): Decouples test specifications from UI locator changes",
              "Trace Viewer: Record video, DOM snapshots, and network waterfalls on test failure for instant debugging",
            ],
            interviewQuestions: [
              {
                question: "What is the Page Object Model (POM) pattern in automated testing?",
                answer: "POM creates an object-oriented abstraction representing a web page or component (e.g. LoginPage class). Test files call methods like loginPage.login('user', 'pass') rather than repeating raw CSS/role selectors across dozens of tests.",
              },
            ],
          },
          codeExample: {
            title: "Playwright Page Object Model (POM) Test",
            code: `import { test, expect, Page } from "@playwright/test";

// 1. Page Object Model Class
class CheckoutPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/checkout");
  }

  async fillShippingDetails(name: string, address: string) {
    await this.page.getByLabel("Full Name").fill(name);
    await this.page.getByLabel("Shipping Address").fill(address);
  }

  async placeOrder() {
    await this.page.getByRole("button", { name: "Place Order" }).click();
  }
}

// 2. E2E Test Suite
test("completes checkout flow successfully", async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.goto();
  await checkout.fillShippingDetails("Alex Rivera", "123 Market St, SF");
  await checkout.placeOrder();

  await expect(page.getByText("Order Confirmed!")).toBeVisible();
});`,
          },
        },
        {
          id: "7",
          number: 7,
          title: "Web Accessibility (a11y) & WCAG Guidelines",
          priority: "🔥",
          theory: {
            what: "Web Accessibility (a11y) ensures digital products can be used by everyone, including people with visual, motor, auditory, or cognitive disabilities. WCAG 2.1 AA is the industry standard compliance level based on four principles: Perceivable, Operable, Understandable, Robust (POUR).",
            why: "Legal requirement in many jurisdictions (ADA, EAA) and expands audience reach to all users.",
            how: "Use native semantic HTML (<button>, <nav>, <main>) first before ARIA. Implement keyboard focus trapping inside modal dialogs (Tab/Shift+Tab cannot escape open modal), ensure 4.5:1 color contrast ratio for normal text, and use aria-live='polite' for dynamic content announcements.",
            keyPoints: [
              "First Rule of ARIA: Do not use ARIA if a native HTML element (e.g. <button> instead of <div onClick>) exists",
              "Focus Management: Return focus to the triggering element when a modal or drawer closes",
              "Screen Reader testing: Ensure all interactive icons have aria-label or visually hidden text",
            ],
            interviewQuestions: [
              {
                question: "How do you implement an accessible modal dialog in React?",
                answer: "1. Add role='dialog', aria-modal='true', and aria-labelledby. 2. Implement a focus trap so Tab cycles only inside the modal. 3. Close on Escape key press. 4. Prevent background scrolling. 5. Restore focus back to the button that opened the modal upon closing.",
              },
            ],
          },
          codeExample: {
            title: "Accessible Modal Focus Trap & ARIA Attributes",
            code: `import { useEffect, useRef } from "react";

export function AccessibleModal({ isOpen, onClose, title, children }: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus first focusable element upon open
    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    // Close on Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" role="presentation">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white p-6 rounded-xl max-w-md w-full"
      >
        <h2 id="modal-title" className="text-xl font-bold">{title}</h2>
        <div className="mt-4">{children}</div>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-zinc-900 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
}`,
          },
        },
      ],
    },
  ],
};
