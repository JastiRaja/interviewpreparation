import { useEffect, useState, type ReactNode } from "react";
import CodeExample from "./CodeExample";

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

  return (
    <div id={`concept-${id}`} className="border rounded p-4 space-y-3">
      <h2 className="font-bold text-lg">{title}</h2>

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
  activeConcept,
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
