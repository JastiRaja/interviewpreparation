import { useState, useEffect, type ReactNode } from "react";
import CodeExample from "./CodeExample";
import TheorySection from "./TheorySection";
import ModuleMobileFAB from "./shared/ModuleMobileFAB";

export default function JavaModule() {
  const getStateFromURL = () => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split("?")[1] || "");
    const section = urlParams.get("section") || "fundamentals";
    const concept = urlParams.get("concept") || null;
    return { section, concept };
  };

  const urlState = getStateFromURL();
  const [activeSection, setActiveSection] = useState(urlState.section);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([urlState.section]));
  const [activeConcept, setActiveConcept] = useState<string | null>(urlState.concept);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const hash = window.location.hash.split("?")[0];
    const params = new URLSearchParams();
    if (activeSection) params.set("section", activeSection);
    if (activeConcept) params.set("concept", activeConcept);
    const newHash = params.toString() ? `${hash}?${params.toString()}` : hash;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [activeSection, activeConcept]);

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
      title: "Language fundamentals",
      icon: "☕",
      count: "1-5",
      concepts: [
        { id: "1", title: "JVM, JRE, and JDK", number: 1 },
        { id: "2", title: "Primitives vs reference types", number: 2 },
        { id: "3", title: "OOP pillars", number: 3 },
        { id: "4", title: "Interfaces vs abstract classes", number: 4 },
        { id: "5", title: "Access modifiers & static", number: 5 },
      ],
    },
    {
      id: "core",
      title: "Core APIs & JVM",
      icon: "⚙️",
      count: "6-10",
      concepts: [
        { id: "6", title: "Collections framework", number: 6 },
        { id: "7", title: "Generics", number: 7 },
        { id: "8", title: "Exceptions", number: 8 },
        { id: "9", title: "equals() & hashCode()", number: 9 },
        { id: "10", title: "Strings & mutability", number: 10 },
      ],
    },
    {
      id: "springboot",
      title: "Spring Boot",
      icon: "🌿",
      count: "11-16",
      concepts: [
        { id: "11", title: "What is Spring Boot?", number: 11 },
        { id: "12", title: "Starters & auto-configuration", number: 12 },
        { id: "13", title: "@SpringBootApplication & runtime", number: 13 },
        { id: "14", title: "REST controllers", number: 14 },
        { id: "15", title: "Configuration & profiles", number: 15 },
        { id: "16", title: "Spring Data JPA basics", number: 16 },
      ],
    },
  ];

  const getFirstConceptIdForSection = (sectionId: string) => {
    const section = sections.find((item) => item.id === sectionId);
    return section?.concepts[0]?.id ?? null;
  };

  useEffect(() => {
    if (!activeConcept) {
      const firstConceptId = getFirstConceptIdForSection(activeSection);
      if (firstConceptId) {
        setActiveConcept(firstConceptId);
      }
    }
  }, [activeSection, activeConcept]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
        setActiveSection(sectionId);
        const hash = window.location.hash.split("?")[0];
        const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
        params.set("section", sectionId);
        window.history.replaceState(null, "", `${hash}?${params.toString()}`);
      }
      return newSet;
    });
  };

  const handleConceptClick = (sectionId: string, conceptId: string) => {
    setActiveSection(sectionId);
    setActiveConcept(conceptId);
    setExpandedSections((prev) => new Set(prev).add(sectionId));

    const hash = window.location.hash.split("?")[0];
    const params = new URLSearchParams();
    params.set("section", sectionId);
    params.set("concept", conceptId);
    window.history.pushState(null, "", `${hash}?${params.toString()}`);

    if (window.innerWidth < 768) {
      setTimeout(() => setSidebarOpen(false), 0);
    }

    setTimeout(() => {
      const element = document.getElementById(`concept-${conceptId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const navigateSection = (direction: "next" | "prev") => {
    const currentSectionIndex = sections.findIndex((section) => section.id === activeSection);
    if (currentSectionIndex === -1) return;

    const newSectionIndex = direction === "next" ? currentSectionIndex + 1 : currentSectionIndex - 1;
    if (newSectionIndex < 0 || newSectionIndex >= sections.length) return;

    const targetSection = sections[newSectionIndex];
    const firstConceptId = targetSection.concepts[0]?.id;
    if (!firstConceptId) return;

    handleConceptClick(targetSection.id, firstConceptId);
  };

  const currentSectionIndex = sections.findIndex((section) => section.id === activeSection);
  const canNavigatePrev = currentSectionIndex > 0;
  const canNavigateNext = currentSectionIndex > -1 && currentSectionIndex < sections.length - 1;
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const isSearchActive = normalizedSearchQuery.length > 0;
  const filteredSections = sections
    .map((section) => {
      if (!isSearchActive) return section;

      const sectionMatches =
        section.title.toLowerCase().includes(normalizedSearchQuery) ||
        section.count.toLowerCase().includes(normalizedSearchQuery);
      const matchingConcepts = section.concepts.filter(
        (concept) =>
          concept.title.toLowerCase().includes(normalizedSearchQuery) ||
          concept.id.includes(normalizedSearchQuery) ||
          String(concept.number).includes(normalizedSearchQuery)
      );

      if (sectionMatches) return section;
      if (matchingConcepts.length > 0) return { ...section, concepts: matchingConcepts };
      return null;
    })
    .filter((section): section is (typeof sections)[number] => section !== null);

  const renderContent = () => {
    switch (activeSection) {
      case "fundamentals":
        return <JavaFundamentals activeConcept={activeConcept} />;
      case "core":
        return <JavaCoreApis activeConcept={activeConcept} />;
      case "springboot":
        return <JavaSpringBoot activeConcept={activeConcept} />;
      default:
        return <JavaFundamentals activeConcept={activeConcept} />;
    }
  };

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col gap-2 md:flex-row md:gap-3 lg:gap-4">
      <ModuleMobileFAB onToggleSidebar={() => setSidebarOpen((o) => !o)} />

      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-[64px] sm:top-[72px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        fixed z-40 md:static md:z-auto
        top-[64px] sm:top-[72px] md:top-auto left-0
        w-[min(280px,88vw)] sm:w-52 md:w-52 lg:w-56 shrink-0
        bg-white/85 backdrop-blur-xl rounded-xl border border-zinc-200/80 shadow-lg shadow-zinc-900/5 p-2.5 sm:p-3
        overflow-y-auto overflow-x-hidden overscroll-contain
        h-[calc(100dvh-64px-5.75rem)] sm:h-[calc(100dvh-72px-5.75rem)] md:h-auto md:max-h-none md:min-h-0 md:self-stretch
        transition-transform duration-300 ease-in-out
        pb-20 md:pb-0
      `}
      >
        <div className="mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-zinc-200/80">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Java</h2>
          <p className="text-xs text-gray-600 mt-0.5">Language, JVM, and standard library</p>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics..."
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 py-2 text-xs text-zinc-800 placeholder:text-zinc-400 sm:text-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          {filteredSections.map((section) => {
            const isExpanded = isSearchActive ? true : expandedSections.has(section.id);
            const isActive = activeSection === section.id;

            return (
              <div key={section.id} className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white/40">
                <button
                  onClick={() => !isSearchActive && toggleSection(section.id)}
                  className={`w-full px-3 py-2 text-left font-medium transition-colors flex items-center justify-between text-sm ${
                    isActive
                      ? "bg-indigo-50 text-indigo-900 border-l-[3px] border-indigo-500"
                      : "bg-white/80 text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="text-base flex-shrink-0">{section.icon}</span>
                    <span className="truncate">{section.title}</span>
                    <span className="text-xs opacity-75 flex-shrink-0">({section.count})</span>
                  </div>
                  {!isSearchActive && (
                    <span className={`transition-transform text-xs flex-shrink-0 ml-1 ${isExpanded ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-zinc-200/80 bg-zinc-50/80">
                    {section.concepts.map((concept) => (
                      <button
                        key={concept.id}
                        onClick={() => handleConceptClick(section.id, concept.id)}
                        className={`w-full px-4 py-1.5 text-left text-xs transition-colors flex items-center gap-1.5 ${
                          activeConcept === concept.id
                            ? "bg-indigo-100 text-indigo-900 font-semibold border-l-[3px] border-indigo-500"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                        }`}
                      >
                        <span className="text-indigo-600 font-semibold text-xs flex-shrink-0">#{concept.number}</span>
                        <span className="flex-1 text-left truncate">{concept.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {isSearchActive && filteredSections.length === 0 && (
            <div className="rounded-lg border border-zinc-200/80 bg-zinc-50 px-3 py-2 text-xs text-zinc-500">
              No topics found.
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-0 flex min-h-0 min-w-0 flex-1 basis-0 flex-col md:mt-0">
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-0 lg:min-w-0">{renderContent()}</div>

        {activeConcept && (
          <div className="mt-3 mb-1 shrink-0 rounded-2xl border border-zinc-200/90 bg-white/95 px-3 py-2.5 shadow-md shadow-zinc-900/5 backdrop-blur-sm sm:px-4 md:mt-4">
            <div className="flex items-center justify-between gap-2 max-w-full">
              <button
                onClick={() => navigateSection("prev")}
                className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-zinc-700 transition-colors hover:bg-indigo-50 hover:text-indigo-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent sm:px-3 sm:text-sm"
                aria-label="Previous section"
                disabled={!canNavigatePrev}
              >
                <span>←</span>
                <span>Previous Section</span>
              </button>
              <div className="flex-1 text-center px-2">
                <span className="text-xs font-medium text-zinc-500">Section</span>
                <span className="ml-1 text-sm font-semibold text-zinc-900">
                  {currentSectionIndex > -1 ? currentSectionIndex + 1 : ""}
                </span>
                <span className="ml-1 text-xs text-zinc-500">/ {sections.length}</span>
                <span className="ml-2 text-xs text-zinc-500">
                  ({currentSectionIndex > -1 ? sections[currentSectionIndex].count : ""})
                </span>
              </div>
              <button
                onClick={() => navigateSection("next")}
                className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-zinc-700 transition-colors hover:bg-indigo-50 hover:text-indigo-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent sm:px-3 sm:text-sm"
                aria-label="Next section"
                disabled={!canNavigateNext}
              >
                <span>Next Section</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ConceptCardProps {
  id?: string;
  number: number;
  title: string;
  description?: string;
  priority?: string;
  children?: ReactNode;
  accent?: "amber" | "emerald";
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
  accent = "amber",
}: ConceptCardProps) {
  const [showExamples, setShowExamples] = useState(false);
  const borderAccent = accent === "emerald" ? "border-l-emerald-600" : "border-l-amber-600";
  const numberColor = accent === "emerald" ? "text-emerald-700" : "text-amber-700";
  const buttonClass =
    accent === "emerald"
      ? "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700"
      : "bg-amber-600 shadow-amber-600/20 hover:bg-amber-700";

  return (
    <div
      id={id ? `concept-${id}` : undefined}
      className={`w-full max-w-full scroll-mt-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 border-l-4 ${borderAccent} bg-white p-5 shadow-sm ring-1 ring-zinc-100 sm:rounded-2xl sm:p-6 lg:p-7`}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4 w-full">
        <span className={`text-xl font-bold flex-shrink-0 sm:text-2xl ${numberColor}`}>#{number}</span>
        <h4 className="text-xl font-bold text-gray-900 break-words flex-1 min-w-0 sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
          {title}
        </h4>
        {priority && (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold flex-shrink-0">
            {priority}
          </span>
        )}
      </div>
      {description && <p className="text-gray-600 mb-4 break-words w-full">{description}</p>}

      {theory && (
        <div className="mb-6">
          <TheorySection {...theory} />
        </div>
      )}

      {children && (
        <div className="mt-6 w-full max-w-full overflow-visible">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className={`z-10 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white shadow-md transition-colors duration-200 ${buttonClass}`}
            type="button"
          >
            <span className="font-semibold text-white">{showExamples ? "Hide Examples" : "See Examples"}</span>
            <span className="text-xl text-white">{showExamples ? "▲" : "▼"}</span>
          </button>
          {showExamples && <div className="mt-4 w-full max-w-full flex flex-col space-y-4 overflow-hidden">{children}</div>}
        </div>
      )}
    </div>
  );
}

function JavaFundamentals({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">☕ Java language fundamentals</h3>
        <p className="text-amber-100 break-words">Platform basics, types, and object-oriented building blocks</p>
      </div>

      <ConceptCard
        id="1"
        number={1}
        title="JVM, JRE, and JDK"
        priority="🔥"
        theory={{
          what: "The JDK (Java Development Kit) includes the compiler (`javac`), tools, and libraries to build Java programs. The JRE (Java Runtime Environment) is what runs bytecode: the JVM plus core libraries. The JVM (Java Virtual Machine) executes `.class` bytecode in a managed environment.",
          why: "Interviewers check whether you understand write-time vs run-time: you develop with the JDK, deploy often with a JRE or a trimmed runtime, and portability comes from targeting the JVM rather than a single OS.",
          how: "You compile source to bytecode with `javac`, package classes and resources, then launch with `java` which starts a JVM, loads classes, and interprets or JIT-compiles hot code.",
          keyPoints: [
            "JDK ⊃ JRE ⊃ JVM (historically; modern distributions may bundle differently)",
            "Bytecode is platform-neutral; the JVM is platform-specific",
            "Garbage collection and class loading are JVM responsibilities",
          ],
          interviewQuestions: [
            {
              question: "What is the difference between JDK, JRE, and JVM?",
              answer: "The JDK is the full development kit (compiler, tools, standard libraries). The JRE is the runtime needed to execute Java programs (JVM + libraries). The JVM is the engine that runs bytecode, manages memory, and provides the execution model.",
            },
            {
              question: "Why is Java called platform-independent?",
              answer: "Source compiles to bytecode, which any compliant JVM can run. The JVM is implemented per platform, so the same bytecode runs wherever a JVM exists, without recompiling for each operating system.",
            },
          ],
        }}
      >
        <CodeExample
          title="Compile and run"
          code={`javac Hello.java
java Hello`}
        />
      </ConceptCard>

      <ConceptCard
        id="2"
        number={2}
        title="Primitives vs reference types"
        theory={{
          what: "Primitives (`int`, `long`, `double`, `boolean`, `char`, etc.) store values directly and are not objects. Reference types (classes, interfaces, arrays) hold references to objects on the heap.",
          why: "Primitives are efficient and have predictable memory layout. Reference types enable identity, polymorphism, and `null`, which primitives do not have (except their wrapper objects).",
          how: "Primitives are passed by value (a copy). Object references are passed by value too—the reference is copied, but it still points at the same object. Autoboxing converts between primitives and wrappers automatically but has allocation cost.",
          keyPoints: [
            "Eight primitives; everything else is a reference type",
            "`==` compares references for objects; use `equals` for value equality",
            "Wrapper types (`Integer`, `Double`) cache some values (e.g. small integers)",
          ],
          interviewQuestions: [
            {
              question: "What is autoboxing?",
              answer: "Autoboxing automatically converts a primitive to its corresponding wrapper when an object is required, and unboxing does the reverse. It can hide allocation and `NullPointerException` risks when unboxing a null wrapper.",
            },
          ],
        }}
      >
        <CodeExample
          title="Reference vs primitive"
          code={`int a = 1;
int b = a;
b = 2; // a still 1

int[] arr = {1};
mutate(arr); // arr[0] can change — same object

void mutate(int[] x) { x[0] = 99; }`}
        />
      </ConceptCard>

      <ConceptCard
        id="3"
        number={3}
        title="OOP pillars"
        theory={{
          what: "Encapsulation hides internal state behind methods. Inheritance derives new types from existing ones. Polymorphism lets you treat different classes through a common supertype (overriding). Abstraction hides complexity behind simpler interfaces (abstract types, APIs).",
          why: "These ideas support maintainable design: clear contracts, reuse, substitution (Liskov), and controlled change.",
          how: "Use access modifiers and getters/setters for encapsulation. Use `extends` for implementation inheritance and `implements` for contracts. Runtime polymorphism resolves overridden methods via dynamic dispatch on the actual object type.",
          keyPoints: [
            "Favor composition when inheritance only shares code awkwardly",
            "Polymorphism depends on overriding instance methods, not fields",
            "Abstract classes and interfaces express abstraction differently",
          ],
          interviewQuestions: [
            {
              question: "Explain polymorphism in Java.",
              answer: "Polymorphism allows a reference of a supertype to refer to subtype objects. Overridden instance methods are dispatched at runtime based on the actual object, enabling substitutable behavior (e.g. `List` reference pointing to `ArrayList` or `LinkedList`).",
            },
          ],
        }}
      />

      <ConceptCard
        id="4"
        number={4}
        title="Interfaces vs abstract classes"
        theory={{
          what: "An interface declares abstract behavior (and since Java 8+, can include `default` and `static` methods). An abstract class can hold state, constructors, and a mix of concrete and abstract methods.",
          why: "Interfaces support multiple inheritance of type; a class can implement many interfaces but extend only one class. Abstract classes share implementation among related subclasses.",
          how: "Choose an interface for capabilities across unrelated types (`Comparable`, `Runnable`). Choose an abstract class when subclasses share significant code or protected hooks.",
          keyPoints: [
            "Interfaces: implicit `public` abstract methods (classic)",
            "`default` methods let interfaces evolve without breaking implementors",
            "Abstract class: single inheritance; can have fields and non-public members",
          ],
          interviewQuestions: [
            {
              question: "When would you use an interface instead of an abstract class?",
              answer: "Use an interface to define a contract that many unrelated classes can fulfill, possibly multiple contracts per class. Use an abstract class when types share a common base implementation, state, or construction pattern and form a clear hierarchy.",
            },
          ],
        }}
      />

      <ConceptCard
        id="5"
        number={5}
        title="Access modifiers & static"
        theory={{
          what: "`private`, `package-private` (default), `protected`, and `public` control visibility. `static` members belong to the class, not instances.",
          why: "Visibility enforces encapsulation. `static` is for shared state or utilities that do not need object identity.",
          how: "`static` methods cannot access instance fields directly. `static` blocks run once when the class is initialized. Instance methods receive implicit `this`.",
          keyPoints: [
            "`protected` also visible to subclasses in other packages",
            "Static nested class does not hold an outer reference; inner class does",
            "Avoid mutable static state in concurrent or testable designs",
          ],
          interviewQuestions: [
            {
              question: "Can a static method be overridden?",
              answer: "No. Static methods are resolved at compile time based on the reference type (hiding), not dynamically dispatched like instance overrides. Subclass static methods with the same signature hide the parent’s static method.",
            },
          ],
        }}
      >
        <CodeExample
          title="Static vs instance"
          code={`class Counter {
  static int total;
  int value;
  static void resetAll() { total = 0; }
  void inc() { value++; total++; }
}`}
        />
      </ConceptCard>
    </div>
  );
}

function JavaCoreApis({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-orange-600 to-amber-700 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">⚙️ Core APIs & JVM</h3>
        <p className="text-orange-100 break-words">Collections, generics, errors, and object contracts</p>
      </div>

      <ConceptCard
        id="6"
        number={6}
        title="Collections framework"
        priority="🔥"
        theory={{
          what: "`java.util` provides interfaces (`List`, `Set`, `Map`, `Queue`) and implementations (`ArrayList`, `LinkedHashSet`, `HashMap`, `TreeMap`, etc.). Iteration is typically via enhanced for-loops or iterators.",
          why: "Choosing the right structure affects Big-O for insert, lookup, and ordering guarantees—common interview and design territory.",
          how: "`ArrayList` is dynamic array; `LinkedList` is doubly-linked; `HashMap` is hash table average O(1) get; `TreeMap` is sorted by key. `HashSet` backs on `HashMap`; `LinkedHashSet` preserves insertion order.",
          keyPoints: [
            "`Map` is not a `Collection` (separate hierarchy)",
            "`ConcurrentHashMap` for thread-safe concurrent access patterns",
            "Prefer interface types on the left: `List<String> items = new ArrayList<>();`",
          ],
          interviewQuestions: [
            {
              question: "When would you pick `HashMap` vs `TreeMap`?",
              answer: "`HashMap` offers average constant-time operations with no ordering guarantee. `TreeMap` keeps keys sorted (or custom `Comparator`) with O(log n) operations—use when you need ordered traversal or range queries.",
            },
          ],
        }}
      >
        <CodeExample
          title="Common declarations"
          code={`List<String> names = new ArrayList<>();
Set<Integer> ids = new HashSet<>();
Map<String, Integer> scores = new HashMap<>();`}
        />
      </ConceptCard>

      <ConceptCard
        id="7"
        number={7}
        title="Generics"
        theory={{
          what: "Generics parameterize types (`List<String>`) so the compiler enforces type safety at compile time. Type erasure removes most generic type information at bytecode level; runtime sees raw types with casts inserted by the compiler.",
          why: "You avoid casts and catch mistakes early instead of `ClassCastException` at runtime.",
          how: "Use type parameters on classes and methods. Wildcards (`? extends T`, `? super T`) express variance. PECS: producer `extends`, consumer `super`.",
          keyPoints: [
            "Cannot instantiate `new T()` or use primitives as type args (`List<int>` invalid; use `List<Integer>`)",
            "Bridge methods are generated for overridden generic methods",
            "Raw types exist for backward compatibility—avoid in new code",
          ],
          interviewQuestions: [
            {
              question: "What is type erasure?",
              answer: "Generics are mostly erased to their bounds or `Object` in bytecode, with compiler-inserted casts. This keeps JVM compatibility but means you cannot `new T()` or inspect generic type parameters at runtime (except via reflection on declarations).",
            },
          ],
        }}
      />

      <ConceptCard
        id="8"
        number={8}
        title="Exceptions"
        theory={{
          what: "`Throwable` splits into `Error` (serious JVM problems, usually not caught) and `Exception`. Checked exceptions must be declared or handled; `RuntimeException` and `Error` are unchecked.",
          why: "Checked exceptions force callers to acknowledge failure modes; unchecked ones signal programming bugs or conditions you typically do not recover from in every caller.",
          how: "Use `try` / `catch` / `finally` or `try-with-resources` for `AutoCloseable`. Re-throw wrapped in a new exception with cause for context. Do not swallow exceptions silently in production code.",
          keyPoints: [
            "`try-with-resources` closes in reverse order, suppresses close exceptions via `addSuppressed`",
            "Prefer specific catch blocks; avoid catching `Throwable` unless framework boundary",
            "Custom exceptions extend `Exception` (checked) or `RuntimeException`",
          ],
          interviewQuestions: [
            {
              question: "Difference between checked and unchecked exceptions?",
              answer: "Checked exceptions extend `Exception` but not `RuntimeException`; the compiler requires `throws` or `try/catch`. Unchecked are `RuntimeException` and `Error`; they need not be declared and often indicate bugs or unrecoverable states.",
            },
          ],
        }}
      >
        <CodeExample
          title="Try-with-resources"
          code={`try (var in = Files.newInputStream(path)) {
  // use stream
} catch (IOException e) {
  throw new UncheckedIOException(e);
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="9"
        number={9}
        title="equals() & hashCode()"
        theory={{
          what: "`equals` defines logical equality. `hashCode` returns an int used by hash-based collections. The contract: equal objects must have equal hash codes; unequal objects may still collide.",
          why: "Breaking the contract breaks `HashMap`/`HashSet`: you can lose entries or get inconsistent behavior.",
          how: "If you override `equals`, override `hashCode` using the same fields. Use `Objects.hash` or build consistently. For mutable keys, be careful—changing fields after insert breaks the map.",
          keyPoints: [
            "Symmetry, reflexivity, transitivity for `equals`",
            "Prefer `Objects.equals` for null-safe field comparison",
            "When subclassing, be careful with `equals` symmetry (Liskov)",
          ],
          interviewQuestions: [
            {
              question: "If two objects are equal, what must be true of `hashCode`?",
              answer: "They must return the same `hashCode` value. The converse is not required: unequal objects may share a hash code (collision), but equal objects must not disagree on hash code.",
            },
          ],
        }}
      />

      <ConceptCard
        id="10"
        number={10}
        title="Strings & mutability"
        theory={{
          what: "`String` objects are immutable: operations return new instances. `StringBuilder` / `StringBuffer` provide mutable character sequences; `StringBuffer` is synchronized.",
          why: "Immutability enables safe sharing, caching (string pool), and predictable hashing. Concatenation in loops creates many intermediate `String` objects without a builder.",
          how: "Use `+` or `String.concat` for few joins; use `StringBuilder` for many appends. The string pool interns literals; `new String(\"x\")` creates a separate heap object unless interned.",
          keyPoints: [
            "`==` on strings compares references, not value",
            "Use `equals` for value comparison",
            "Text blocks (`\"\"\"`) since Java 15 simplify multiline literals",
          ],
          interviewQuestions: [
            {
              question: "Why is String immutable in Java?",
              answer: "Immutability allows the JVM to cache and share literals safely, use strings as keys in hash structures without surprise mutation, and simplify reasoning in multithreaded code without locking.",
            },
          ],
        }}
      >
        <CodeExample
          title="Builder in a loop"
          code={`StringBuilder sb = new StringBuilder();
for (String part : parts) {
  sb.append(part).append(',');
}
String result = sb.toString();`}
        />
      </ConceptCard>
    </div>
  );
}

function JavaSpringBoot({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🌿 Spring Boot</h3>
        <p className="text-emerald-100 break-words">Convention over configuration, web APIs, and data access on the JVM</p>
      </div>

      <ConceptCard
        accent="emerald"
        id="11"
        number={11}
        title="What is Spring Boot?"
        priority="🔥"
        theory={{
          what: "Spring Boot is an opinionated layer on the Spring Framework that auto-configures beans, bundles an embedded HTTP server (Tomcat, Jetty, or Undertow), and provides production-ready features (metrics, health) with minimal XML or JavaConfig boilerplate.",
          why: "Teams ship JVM services faster: starters pull coherent dependency sets, sensible defaults reduce glue code, and executable JARs simplify deployment compared to traditional WAR-only setups.",
          how: "You add `spring-boot-starter-*` dependencies, annotate a main class with `@SpringBootApplication`, and run `mvn spring-boot:run` or `java -jar app.jar`. Spring Boot’s `SpringApplication` bootstraps the context and applies auto-configuration based on the classpath.",
          keyPoints: [
            "Built on Spring Framework (IoC, AOP, etc.)—Boot is not a separate container",
            "Opinionated defaults; override via properties, beans, or exclude auto-config",
            "Actuator exposes operational endpoints when the actuator starter is added",
          ],
          interviewQuestions: [
            {
              question: "How does Spring Boot differ from Spring Framework?",
              answer: "Spring Framework is the core programming model (IoC container, modules). Spring Boot accelerates development with starters, auto-configuration, embedded servers, and fat JARs so you configure less and run standalone apps quickly—still using Spring underneath.",
            },
          ],
        }}
      >
        <CodeExample
          title="Minimal main class"
          code={`@SpringBootApplication
public class DemoApplication {
  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        accent="emerald"
        id="12"
        number={12}
        title="Starters & auto-configuration"
        theory={{
          what: "Starters are curated BOM-style dependencies (e.g. `spring-boot-starter-web`) that transitively pull compatible libraries. Auto-configuration classes (`@ConditionalOn*`) register beans when certain classes or properties are present.",
          why: "You avoid version skew between Spring, Jackson, logging, and web stacks. Auto-configuration applies only what you need based on the classpath.",
          how: "Spring Boot loads `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` (Boot 3+) and evaluates conditions. You can exclude auto-config with `@SpringBootApplication(exclude = ...)` or `spring.autoconfigure.exclude` in properties.",
          keyPoints: [
            "`spring-boot-starter-parent` (Maven) or BOM import manages dependency versions",
            "`spring-boot-starter-test` brings JUnit, Mockito, AssertJ, etc.",
            "Use `@ConditionalOnMissingBean` to let apps replace defaults safely",
          ],
          interviewQuestions: [
            {
              question: "What is Spring Boot auto-configuration?",
              answer: "It is a mechanism that automatically registers Spring beans when the classpath and environment match certain conditions—for example, a `DataSource` when JDBC is on the classpath and properties are set—so you write less explicit configuration.",
            },
          ],
        }}
      >
        <CodeExample
          title="Typical Maven dependencies"
          code={`<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>`}
        />
      </ConceptCard>

      <ConceptCard
        accent="emerald"
        id="13"
        number={13}
        title="@SpringBootApplication & runtime"
        theory={{
          what: "`@SpringBootApplication` combines `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan` (defaults to the package of the annotated class and below). The embedded server starts when the application context is refreshed.",
          why: "One annotation establishes the application’s configuration entry point and component scanning roots, which matches how most Boot apps are structured.",
          how: "Place the main class in a root package so subpackages are scanned. Use `server.port`, `server.servlet.context-path`, and other `server.*` properties to tune the embedded container.",
          keyPoints: [
            "Fat JAR uses a custom `JarLauncher` to run with nested JARs on the classpath",
            "`SpringApplication.run` returns a `ConfigurableApplicationContext` for programmatic use",
            "Graceful shutdown hooks can be configured for Kubernetes-friendly stops",
          ],
          interviewQuestions: [
            {
              question: "What does @SpringBootApplication meta-annotate?",
              answer: "It is a convenience alias for `@SpringBootConfiguration` (specialized `@Configuration`), `@EnableAutoConfiguration`, and `@ComponentScan` with default attributes—so configuration, scanning, and auto-config are enabled together.",
            },
          ],
        }}
      />

      <ConceptCard
        accent="emerald"
        id="14"
        number={14}
        title="REST controllers"
        theory={{
          what: "`@RestController` combines `@Controller` and `@ResponseBody`, so return values serialize to the HTTP body (usually JSON via Jackson). Map URLs with `@GetMapping`, `@PostMapping`, etc., and bind inputs with `@PathVariable`, `@RequestParam`, and `@RequestBody`.",
          why: "This is the standard way to expose HTTP APIs in Boot: declarative mapping, content negotiation, and validation integration (`@Valid` on request bodies).",
          how: "DTOs or records represent payloads. Use appropriate HTTP status codes (`ResponseEntity`), global `@ControllerAdvice` for errors, and CORS configuration when browsers call your API cross-origin.",
          keyPoints: [
            "`@RequestMapping` on class sets a base path; method annotations narrow verb and path",
            "Validation: `spring-boot-starter-validation` (Hibernate Validator) on the classpath",
            "Prefer idempotent verbs and clear status codes for REST semantics",
          ],
          interviewQuestions: [
            {
              question: "Difference between @Controller and @RestController?",
              answer: "`@RestController` adds `@ResponseBody` to all handler methods, so return values are written directly to the response body (e.g. JSON). A classic `@Controller` often returns view names resolved by a view technology unless each method adds `@ResponseBody`.",
            },
          ],
        }}
      >
        <CodeExample
          title="Simple REST endpoint"
          code={`@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService users;

  public UserController(UserService users) {
    this.users = users;
  }

  @GetMapping("/{id}")
  public UserDto get(@PathVariable UUID id) {
    return users.findById(id);
  }

  @PostMapping
  public ResponseEntity<UserDto> create(@Valid @RequestBody CreateUserRequest body) {
    UserDto created = users.create(body);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        accent="emerald"
        id="15"
        number={15}
        title="Configuration & profiles"
        theory={{
          what: "Externalized configuration uses `application.properties` or `application.yml`, environment variables, and command-line args with a defined precedence. Profiles (`dev`, `prod`) select `application-{profile}.yml` and `@Profile` beans.",
          why: "Twelve-factor style deployments need different URLs, secrets, and feature flags per environment without recompiling.",
          how: "Activate profiles with `spring.profiles.active` or `SPRING_PROFILES_ACTIVE`. Type-safe binding uses `@ConfigurationProperties` on a `@ConfigurationProperties` class or record with `@EnableConfigurationProperties`. Secrets often come from env vars or a vault integration.",
          keyPoints: [
            "Relaxed binding maps `my.serviceUrl` to `MY_SERVICE_URL` in env",
            "`@Value` for single properties; `@ConfigurationProperties` for grouped settings",
            "Use `spring.config.import` (Boot 2.4+) for optional config files or cloud config",
          ],
          interviewQuestions: [
            {
              question: "How do Spring Boot profiles work?",
              answer: "Profiles label an environment or variant. When active, Boot loads additional property files like `application-prod.yml` and registers beans annotated with `@Profile(\"prod\")`. You activate them via `spring.profiles.active` or environment variables.",
            },
          ],
        }}
      >
        <CodeExample
          title="application.yml snippet"
          code={`spring:
  application:
    name: orders-api
  datasource:
    url: jdbc:postgresql://localhost:5432/orders
server:
  port: 8080

---
spring:
  config:
    activate:
      on-profile: dev
logging:
  level:
    com.example: DEBUG`}
        />
      </ConceptCard>

      <ConceptCard
        accent="emerald"
        id="16"
        number={16}
        title="Spring Data JPA basics"
        theory={{
          what: "With `spring-boot-starter-data-jpa`, Hibernate is the default JPA provider. You define `@Entity` classes, Spring creates a `EntityManagerFactory` and `DataSource`, and repository interfaces extend `JpaRepository` for CRUD and query methods.",
          why: "You avoid most DAO boilerplate: derived query method names, `@Query`, pagination, and transactions (`@Transactional`) integrate with the persistence context.",
          how: "Map entities with annotations (`@Id`, `@GeneratedValue`, relationships). Use `spring.jpa.hibernate.ddl-auto` carefully (often `validate` or Flyway/Liquibase in production). Implement ports as services that depend on repositories.",
          keyPoints: [
            "Lazy loading and `OpenEntityManagerInView`—understand session boundaries",
            "N+1 queries: use `@EntityGraph`, join fetch, or DTO projections",
            "Prefer migrations over `ddl-auto=update` in production",
          ],
          interviewQuestions: [
            {
              question: "What is a Spring Data JPA repository interface?",
              answer: "It is an interface extending `JpaRepository` (or `CrudRepository`) parameterized by entity and ID type. Spring Data generates the implementation at runtime from method names, `@Query` annotations, or specifications—no manual DAO class required.",
            },
          ],
        }}
      >
        <CodeExample
          title="Entity + repository"
          code={`@Entity
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  // getters/setters or record-style accessors
}

public interface BookRepository extends JpaRepository<Book, Long> {
  List<Book> findByTitleContainingIgnoreCase(String fragment);
}`}
        />
      </ConceptCard>
    </div>
  );
}
