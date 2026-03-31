import { useEffect, useState, type ReactNode } from "react";
import CodeExample from "./CodeExample";
import TheorySection from "./TheorySection";

type PracticalTheory = {
  what: string;
  why: string;
  how: string;
  keyPoints: string[];
  interviewQuestions: Array<{ question: string; answer: string }>;
};

const PRACTICAL_THEORY: Record<string, PracticalTheory> = {
  "61": {
    what: "Rendering a list means mapping an array to React elements. Each item needs a stable `key`—usually an id from your data—so React can reconcile updates efficiently when items reorder, add, or remove.",
    why: "Lists appear in almost every UI (products, comments, rows). Interviewers check that you avoid index keys when order changes and that you handle empty and loading states.",
    how: "Use `items.map(item => <Row key={item.id} ... />)`. Derive keys from data, not array index, when the list can reorder. Keep list markup pure; fetch data in a parent or hook.",
    keyPoints: ["Keys must be unique among siblings", "Do not use random keys per render", "Consider virtualization for very long lists"],
    interviewQuestions: [
      {
        question: "Why is using array index as `key` risky?",
        answer: "If items reorder, insert, or delete, React may reuse the wrong component state for a row because keys follow position, not identity—causing subtle UI bugs.",
      },
    ],
  },
  "62": {
    what: "A navbar often tracks the active section in component state and highlights the current tab or link. It is a small example of controlled UI: user clicks update state, and the view reflects that state.",
    why: "Navigation patterns are common in front-end interviews—clean separation between tab metadata and rendering matters.",
    how: "Store `active` in `useState`, render buttons in a loop, toggle classes for active vs inactive. For real apps, sync with the URL (React Router) for shareable state.",
    keyPoints: ["Accessible nav uses `<nav>` and `aria-current`", "Match design system for focus rings", "Mobile: collapse into menu"],
    interviewQuestions: [
      {
        question: "How would you sync the navbar with the URL?",
        answer: "Use the router’s location or params (e.g. React Router `useLocation`/`NavLink`) so active state derives from the path, not only local state.",
      },
    ],
  },
  "63": {
    what: "A modal overlays the page and traps focus for a short task. In React, you typically use local `open` state, conditional render, fixed positioning, and often a portal to `document.body`.",
    why: "Modals are standard for confirmations, forms, and dialogs; interviews test accessibility (focus trap, ESC to close) and layering.",
    how: "Toggle `{open && <div className=\"fixed inset-0\">...</div>}`. For production, use a dialog primitive or library; pair with `createPortal` and `role=\"dialog\"`.",
    keyPoints: ["Backdrop click vs explicit close", "Return focus to trigger on close", "Consider `inert` on background for a11y"],
    interviewQuestions: [
      {
        question: "Why portal a modal?",
        answer: "To escape parent `overflow`/`z-index` issues and render at the document root while keeping React context and event bubbling behavior consistent.",
      },
    ],
  },
  "64": {
    what: "Tabs switch visible panels while sharing one container. State holds the active index or id; only the active panel’s content mounts or is shown.",
    why: "Demonstrates conditional rendering and keyboard support (arrow keys) in more advanced versions.",
    how: "Use `useState` for active index; map tab buttons and render one content area. For a11y, link tabs to tabpanels with `role=\"tablist\"` / `aria-selected`.",
    keyPoints: ["Lazy-load heavy tab content if needed", "Avoid remounting expensive trees on every switch if state must persist"],
    interviewQuestions: [
      {
        question: "How do tabs relate to URL state?",
        answer: "You can encode the active tab in query/hash params so refresh and sharing preserve context—similar to route segments in nested routes.",
      },
    ],
  },
  "65": {
    what: "Search filters a list by matching user text—usually case-insensitive—against item fields. The input is controlled: React state is the source of truth.",
    why: "Tests understanding of controlled components, derived state, and debouncing for network search.",
    how: "Store `query` in state; `filtered = items.filter(...)`. For API search, debounce keystrokes and cancel in-flight requests with `AbortController`.",
    keyPoints: ["Debounce 200–400ms for server search", "Highlight matches for UX", "Empty state when no results"],
    interviewQuestions: [
      {
        question: "Controlled vs uncontrolled input?",
        answer: "Controlled: value comes from React state (`value` + `onChange`). Uncontrolled: DOM holds value (`ref`/`defaultValue`). Controlled is easier for validation and one-way data flow.",
      },
    ],
  },
  "66": {
    what: "Pagination shows a slice of items and page controls. Client-side pagination computes `slice(start, end)` from page number and page size.",
    why: "Large datasets cannot render at once—pagination or virtual scrolling is required.",
    how: "Track `page` and `pageSize`; derive `start = (page-1)*size`. Disable Prev on page 1; disable Next on last page. Server pagination uses API `limit/offset` or cursors.",
    keyPoints: ["URL-sync page for shareable links", "Infinite scroll alternative for feeds", "Accessibility: announce page changes"],
    interviewQuestions: [
      {
        question: "Cursor vs offset pagination?",
        answer: "Offset/limit is simple but slow on deep pages and unstable if rows insert. Cursor-based uses an opaque token from the last item—better for large, live datasets.",
      },
    ],
  },
  "67": {
    what: "Form validation ensures user input meets rules before submit—format, required fields, passwords. Errors are derived state from inputs.",
    why: "Almost every app has forms; interviews cover validation timing (on blur vs submit) and accessible error messages.",
    how: "Validate on submit for simple cases; on blur for better UX. Libraries: React Hook Form, Formik. Link errors with `aria-describedby` and `aria-invalid`.",
    keyPoints: ["Don’t block typing with aggressive sync validation", "Server-side validation is still mandatory", "Show errors near fields"],
    interviewQuestions: [
      {
        question: "Where should validation run?",
        answer: "Client-side for fast feedback and UX; always re-validate on the server for security and consistency because client code can be bypassed.",
      },
    ],
  },
  "68": {
    what: "Dashboard layout splits chrome (sidebar) from main content using CSS Grid or Flexbox. Responsive layouts collapse sidebar into drawers on small screens.",
    why: "Tests layout skills and semantic structure (`aside`, `main`, landmarks for screen readers).",
    how: "Use `grid-cols-*`, `col-span-*`, or flex with `flex-1` for main. Keep scroll regions per panel if needed.",
    keyPoints: ["Sticky header/sidebar patterns", "Min width / overflow handling", "Dark mode tokens if applicable"],
    interviewQuestions: [
      {
        question: "Grid vs Flex for app shell?",
        answer: "Grid excels at two-dimensional areas (sidebar + main regions). Flex is great for one-dimensional toolbars and stacks—often combined.",
      },
    ],
  },
  "69": {
    what: "Fetching remote data in React usually means `useEffect` + `fetch` or a data library (React Query). You store loading, error, and data in state and render accordingly.",
    why: "Data fetching is core to front-end work; interviewers look for cleanup, race-condition handling, and error UI.",
    how: "On mount, start request; set loading; on success set data; on failure set error. Cleanup: ignore stale responses or abort. Prefer libraries for cache and retries.",
    keyPoints: ["Avoid waterfalls when possible", "Handle empty and error states", "Type API responses in TypeScript"],
    interviewQuestions: [
      {
        question: "What is a race condition in fetching?",
        answer: "If a fast response arrives after a slow one for an older request, you might show stale data. Fix with abort signals, request ids, or libraries that cancel superseded queries.",
      },
    ],
  },
  "70": {
    what: "Reusable components accept props (`children`, `variant`, `onClick`) so the same building block works across screens. Keep APIs small and composable.",
    why: "Design systems and consistency depend on reusable primitives—common interview topic for component API design.",
    how: "Define a TypeScript props interface; use `children` for composition; avoid hard-coded copy inside the primitive.",
    keyPoints: ["forwardRef if parents need DOM access", "Style variants via `className` or `cva`", "Document in Storybook"],
    interviewQuestions: [
      {
        question: "When extract a new component?",
        answer: "When the same JSX structure repeats with small variations, or when a piece has clear boundaries and a stable API—avoid premature abstraction.",
      },
    ],
  },
};

/* =====================================================
   SOURCE CODE STRINGS (Single Source of Truth)
===================================================== */

const CARD_LIST_CODE = `function CardList() {
  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Tablet", price: 700 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow bg-white">
          <h3 className="font-bold">{p.name}</h3>
          <p>$\{p.price}</p>
        </div>
      ))}
    </div>
  );
}`;

const NAVBAR_CODE = `function Navbar() {
  const [active, setActive] = useState("home");
  const tabs = ["home", "about", "products"];

  return (
    <div className="flex gap-4 border-b p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={
            active === tab
              ? "bg-blue-500 text-white px-3 py-1 rounded"
              : "bg-gray-100 px-3 py-1 rounded"
          }
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}`;

const MODAL_CODE = `function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="border px-3 py-1 rounded"
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-64">
            <h2 className="font-bold mb-2">Modal</h2>
            <p>This is a modal</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 border px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`;

const TABS_CODE = `function Tabs() {
  const [active, setActive] = useState(0);
  const tabs = ["Profile", "Settings", "Billing"];

  return (
    <div>
      <div className="flex gap-2">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={
              active === i
                ? "bg-blue-500 text-white px-3 py-1 rounded"
                : "bg-gray-100 px-3 py-1 rounded"
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="border p-4 mt-2 rounded">
        Content of {tabs[active]}
      </div>
    </div>
  );
}`;

const SEARCH_CODE = `function SearchFilter() {
  const [query, setQuery] = useState("");
  const items = ["Apple", "Banana", "Orange", "Mango"];

  const filtered = items.filter((i) =>
    i.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        className="border p-2 rounded w-full"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className="mt-2 list-disc ml-5">
        {filtered.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}`;

const PAGINATION_CODE = `function Pagination() {
  const items = Array.from({ length: 30 }, (_, i) => i + 1);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const start = (page - 1) * pageSize;
  const visible = items.slice(start, start + pageSize);

  return (
    <div>
      <ul className="list-disc ml-5">
        {visible.map((i) => (
          <li key={i}>Item {i}</li>
        ))}
      </ul>

      <div className="flex gap-3 items-center mt-3">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}`;

const FORM_CODE = `function FormValidation() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!email.includes("@")) {
      setError("Invalid email");
    } else {
      setError("");
      alert("Form submitted");
    }
  };

  return (
    <div className="space-y-2">
      <input
        className="border p-2 rounded w-full"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={submit} className="border px-3 py-1 rounded">
        Submit
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}`;

const DASHBOARD_CODE = `function DashboardLayout() {
  return (
    <div className="grid grid-cols-4 h-40 border rounded overflow-hidden">
      <aside className="bg-gray-200 p-4">Sidebar</aside>
      <main className="col-span-3 p-4">Main Content</main>
    </div>
  );
}`;

const API_CODE = `function ApiCards() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {users.map((u) => (
        <div key={u.id} className="border p-3 rounded">
          <h3>{u.name}</h3>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
}`;

const REUSABLE_CODE = `function UIButton({ children, onClick }) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}`;

/* =====================================================
   REAL COMPONENTS (MATCH 1:1 WITH CODE ABOVE)
===================================================== */

function CardList() {
  const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Tablet", price: 700 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow bg-white">
          <h3 className="font-bold">{p.name}</h3>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  );
}

function Navbar() {
  const [active, setActive] = useState("home");
  const tabs = ["home", "about", "products"];

  return (
    <div className="flex gap-4 border-b p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={
            active === tab
              ? "bg-blue-500 text-white px-3 py-1 rounded"
              : "bg-gray-100 px-3 py-1 rounded"
          }
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="border px-3 py-1 rounded"
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-64">
            <h2 className="font-bold mb-2">Modal</h2>
            <p>This is a modal</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 border px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Tabs() {
  const [active, setActive] = useState(0);
  const tabs = ["Profile", "Settings", "Billing"];

  return (
    <div>
      <div className="flex gap-2">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={
              active === i
                ? "bg-blue-500 text-white px-3 py-1 rounded"
                : "bg-gray-100 px-3 py-1 rounded"
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="border p-4 mt-2 rounded">
        Content of {tabs[active]}
      </div>
    </div>
  );
}

function SearchFilter() {
  const [query, setQuery] = useState("");
  const items = ["Apple", "Banana", "Orange", "Mango"];

  const filtered = items.filter((i) =>
    i.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        className="border p-2 rounded w-full"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className="mt-2 list-disc ml-5">
        {filtered.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function Pagination() {
  const items = Array.from({ length: 30 }, (_, i) => i + 1);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const start = (page - 1) * pageSize;
  const visible = items.slice(start, start + pageSize);

  return (
    <div>
      <ul className="list-disc ml-5">
        {visible.map((i) => (
          <li key={i}>Item {i}</li>
        ))}
      </ul>

      <div className="flex gap-3 items-center mt-3">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

function FormValidation() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!email.includes("@")) {
      setError("Invalid email");
    } else {
      setError("");
      alert("Form submitted");
    }
  };

  return (
    <div className="space-y-2">
      <input
        className="border p-2 rounded w-full"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={submit} className="border px-3 py-1 rounded">
        Submit
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

function DashboardLayout() {
  return (
    <div className="grid grid-cols-4 h-40 border rounded overflow-hidden">
      <aside className="bg-gray-200 p-4">Sidebar</aside>
      <main className="col-span-3 p-4">Main Content</main>
    </div>
  );
}

function ApiCards() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {users.map((u) => (
        <div key={u.id} className="border p-3 rounded">
          <h3>{u.name}</h3>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
}

function UIButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ReusableDemo() {
  return (
    <div className="flex gap-3">
      <UIButton onClick={() => alert("Saved")}>Save</UIButton>
      <UIButton onClick={() => alert("Deleted")}>Delete</UIButton>
    </div>
  );
}

/* =====================================================
   UI WRAPPER
===================================================== */

function DemoBlock({
  id,
  title,
  demo,
  code,
}: {
  id: string;
  title: string;
  demo: ReactNode;
  code: string;
}) {
  const [showCode, setShowCode] = useState(false);
  const theory = PRACTICAL_THEORY[id];

  return (
    <div id={`concept-${id}`} className="border rounded p-4 space-y-3">
      <h2 className="font-bold text-lg">{title}</h2>

      {theory && (
        <div className="rounded-lg border border-zinc-200/80 bg-white p-1">
          <TheorySection {...theory} collapsible={false} />
        </div>
      )}

      <div className="p-3 bg-gray-50 rounded">{demo}</div>

      <button
        onClick={() => setShowCode((s) => !s)}
        className="border px-4 py-1 rounded text-blue-600"
      >
        {showCode ? "Hide Code" : "Show Code"}
      </button>

      {showCode && <CodeExample title="Source Code" code={code} />}
    </div>
  );
}

/* =====================================================
   MAIN EXPORT
===================================================== */

export default function PracticalConcepts({
  activeConcept: _activeConcept,
}: {
  activeConcept: string | null;
}) {
  return (
    <div className="space-y-10 p-6">
      <DemoBlock id="61" title="61. Card List" demo={<CardList />} code={CARD_LIST_CODE} />
      <DemoBlock id="62" title="62. Navbar" demo={<Navbar />} code={NAVBAR_CODE} />
      <DemoBlock id="63" title="63. Modal" demo={<ModalDemo />} code={MODAL_CODE} />
      <DemoBlock id="64" title="64. Tabs" demo={<Tabs />} code={TABS_CODE} />
      <DemoBlock id="65" title="65. Search" demo={<SearchFilter />} code={SEARCH_CODE} />
      <DemoBlock id="66" title="66. Pagination" demo={<Pagination />} code={PAGINATION_CODE} />
      <DemoBlock id="67" title="67. Form" demo={<FormValidation />} code={FORM_CODE} />
      <DemoBlock id="68" title="68. Dashboard" demo={<DashboardLayout />} code={DASHBOARD_CODE} />
      <DemoBlock id="69" title="69. API" demo={<ApiCards />} code={API_CODE} />
      <DemoBlock id="70" title="70. Reusable" demo={<ReusableDemo />} code={REUSABLE_CODE} />
    </div>
  );
}
