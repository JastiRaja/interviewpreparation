import { useState, useEffect } from "react";
import ModuleMobileFAB from "./shared/ModuleMobileFAB";
import {
  JavaBasics,
  JavaCollections,
  JavaConcurrency,
  JavaEnterprise,
  JavaExceptions,
  JavaFileIo,
  JavaJdbc,
  JavaModern,
  JavaOop,
  JavaWeb,
} from "./JavaModuleTracks";

export default function JavaModule() {
  const getStateFromURL = () => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split("?")[1] || "");
    let section = urlParams.get("section") || "basics";
    if (section === "fundamentals") section = "basics";
    else if (section === "core") section = "collections";
    else if (section === "springboot") section = "enterprise";
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
      id: "basics",
      title: "1. Core Java basics",
      icon: "🧱",
      count: "1-8",
      concepts: [
        { id: "1", title: "JVM, JRE, and JDK", number: 1 },
        { id: "2", title: "Variables & data types", number: 2 },
        { id: "3", title: "Operators (arithmetic, logical, …)", number: 3 },
        { id: "4", title: "Control statements (if, switch, loops)", number: 4 },
        { id: "5", title: "Arrays", number: 5 },
        { id: "6", title: "Strings & StringBuilder", number: 6 },
        { id: "7", title: "Input / output (Scanner, printing)", number: 7 },
        { id: "8", title: "Primitives vs references & wrappers", number: 8 },
      ],
    },
    {
      id: "oop",
      title: "2. Object-oriented programming",
      icon: "🧩",
      count: "9-17",
      concepts: [
        { id: "9", title: "Classes & objects", number: 9 },
        { id: "10", title: "Constructors & initialization", number: 10 },
        { id: "11", title: "Encapsulation", number: 11 },
        { id: "12", title: "Inheritance", number: 12 },
        { id: "13", title: "Polymorphism (overload & override)", number: 13 },
        { id: "14", title: "Abstract classes", number: 14 },
        { id: "15", title: "Interfaces & default methods", number: 15 },
        { id: "16", title: "equals() & hashCode()", number: 16 },
        { id: "17", title: "Access modifiers & static", number: 17 },
      ],
    },
    {
      id: "collections",
      title: "3. Collections framework",
      icon: "📦",
      count: "18-24",
      concepts: [
        { id: "18", title: "Collections overview & when to use which", number: 18 },
        { id: "19", title: "List: ArrayList & LinkedList", number: 19 },
        { id: "20", title: "Set: HashSet, TreeSet, LinkedHashSet", number: 20 },
        { id: "21", title: "Map: HashMap, TreeMap, LinkedHashMap", number: 21 },
        { id: "22", title: "Iterator, enhanced for, fail-fast", number: 22 },
        { id: "23", title: "Comparable vs Comparator", number: 23 },
        { id: "24", title: "Generics essentials", number: 24 },
      ],
    },
    {
      id: "exceptions",
      title: "4. Exception handling",
      icon: "⚙️",
      count: "25-28",
      concepts: [
        { id: "25", title: "try, catch, finally", number: 25 },
        { id: "26", title: "throw vs throws", number: 26 },
        { id: "27", title: "Custom exceptions", number: 27 },
        { id: "28", title: "try-with-resources", number: 28 },
      ],
    },
    {
      id: "modern",
      title: "5. Java 8+ features",
      icon: "🔄",
      count: "29-32",
      concepts: [
        { id: "29", title: "Lambda expressions", number: 29 },
        { id: "30", title: "Functional interfaces", number: 30 },
        { id: "31", title: "Streams API", number: 31 },
        { id: "32", title: "Optional", number: 32 },
      ],
    },
    {
      id: "concurrency",
      title: "6. Multithreading & concurrency",
      icon: "🧵",
      count: "33-36",
      concepts: [
        { id: "33", title: "Thread & Runnable", number: 33 },
        { id: "34", title: "Synchronization & locks", number: 34 },
        { id: "35", title: "Thread lifecycle", number: 35 },
        { id: "36", title: "Executors & thread pools", number: 36 },
      ],
    },
    {
      id: "io",
      title: "7. File handling (I/O)",
      icon: "💾",
      count: "37-39",
      concepts: [
        { id: "37", title: "File, Path & Files (NIO.2)", number: 37 },
        { id: "38", title: "Readers, writers & buffering", number: 38 },
        { id: "39", title: "Serialization", number: 39 },
      ],
    },
    {
      id: "jdbc",
      title: "8. JDBC",
      icon: "🗄️",
      count: "40-42",
      concepts: [
        { id: "40", title: "Connecting with JDBC", number: 40 },
        { id: "41", title: "PreparedStatement & CRUD", number: 41 },
        { id: "42", title: "Transactions & connection pools", number: 42 },
      ],
    },
    {
      id: "web",
      title: "9. Java web basics",
      icon: "🌐",
      count: "43-45",
      concepts: [
        { id: "43", title: "HTTP basics for Java devs", number: 43 },
        { id: "44", title: "Servlets", number: 44 },
        { id: "45", title: "JSP overview", number: 45 },
      ],
    },
    {
      id: "enterprise",
      title: "10. Spring & ecosystem",
      icon: "🚀",
      count: "46-54",
      concepts: [
        { id: "46", title: "Maven & Gradle", number: 46 },
        { id: "47", title: "Spring Framework (IoC & DI)", number: 47 },
        { id: "48", title: "What is Spring Boot?", number: 48 },
        { id: "49", title: "Starters & auto-configuration", number: 49 },
        { id: "50", title: "@SpringBootApplication & runtime", number: 50 },
        { id: "51", title: "REST controllers", number: 51 },
        { id: "52", title: "Configuration & profiles", number: 52 },
        { id: "53", title: "Spring Data JPA basics", number: 53 },
        { id: "54", title: "Microservices basics", number: 54 },
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
      case "basics":
        return <JavaBasics activeConcept={activeConcept} />;
      case "oop":
        return <JavaOop activeConcept={activeConcept} />;
      case "collections":
        return <JavaCollections activeConcept={activeConcept} />;
      case "exceptions":
        return <JavaExceptions activeConcept={activeConcept} />;
      case "modern":
        return <JavaModern activeConcept={activeConcept} />;
      case "concurrency":
        return <JavaConcurrency activeConcept={activeConcept} />;
      case "io":
        return <JavaFileIo activeConcept={activeConcept} />;
      case "jdbc":
        return <JavaJdbc activeConcept={activeConcept} />;
      case "web":
        return <JavaWeb activeConcept={activeConcept} />;
      case "enterprise":
        return <JavaEnterprise activeConcept={activeConcept} />;
      default:
        return <JavaBasics activeConcept={activeConcept} />;
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
          <p className="text-xs text-gray-600 mt-0.5">Basics → OOP → Collections → Spring (full learning path)</p>
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
