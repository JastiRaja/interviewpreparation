import { useState, useEffect, type ReactNode } from "react";
import ModuleMobileFAB from "./ModuleMobileFAB";

export interface LearningTrackSection {
  id: string;
  title: string;
  icon: string;
  count: string;
  concepts: { id: string; title: string; number: number }[];
}

interface LearningTrackLayoutProps {
  trackTitle: string;
  trackSubtitle: string;
  sections: LearningTrackSection[];
  defaultSectionId: string;
  renderContent: (activeSectionId: string) => ReactNode;
}

export default function LearningTrackLayout({
  trackTitle,
  trackSubtitle,
  sections,
  defaultSectionId,
  renderContent,
}: LearningTrackLayoutProps) {
  const getStateFromURL = () => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split("?")[1] || "");
    const section = urlParams.get("section") || defaultSectionId;
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
    .filter((section): section is LearningTrackSection => section !== null);

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
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{trackTitle}</h2>
          <p className="text-xs text-gray-600 mt-0.5">{trackSubtitle}</p>
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
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-0 lg:min-w-0">
          {renderContent(activeSection)}
        </div>

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
