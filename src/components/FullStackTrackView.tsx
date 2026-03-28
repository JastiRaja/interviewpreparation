import { useMemo } from "react";
import CodeExample from "./CodeExample";
import LearningConceptCard from "./shared/LearningConceptCard";
import LearningTrackLayout, { type LearningTrackSection } from "./shared/LearningTrackLayout";
import type { FullStackTrack } from "../data/fullstackTrackTypes";

function toNavSections(track: FullStackTrack): LearningTrackSection[] {
  return track.sections.map((s) => ({
    id: s.id,
    title: s.title,
    icon: s.icon,
    count: `${s.concepts[0].number}-${s.concepts[s.concepts.length - 1].number}`,
    concepts: s.concepts.map((c) => ({ id: c.id, title: c.title, number: c.number })),
  }));
}

export default function FullStackTrackView({ track }: { track: FullStackTrack }) {
  const navSections = useMemo(() => toNavSections(track), [track]);

  return (
    <LearningTrackLayout
      trackTitle={track.layoutTitle}
      trackSubtitle={track.layoutSubtitle}
      sections={navSections}
      defaultSectionId={track.defaultSectionId}
      renderContent={(activeSectionId) => {
        const sec = track.sections.find((s) => s.id === activeSectionId) ?? track.sections[0];
        return (
          <div className="w-full max-w-full space-y-4 overflow-x-hidden sm:space-y-5 lg:space-y-6 xl:space-y-8">
            <div
              className={`rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden bg-gradient-to-r ${sec.heroGradient}`}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">{sec.heroTitle}</h3>
              <p className="text-sm sm:text-base opacity-90 break-words">{sec.heroSubtitle}</p>
            </div>
            {sec.concepts.map((c) => (
              <LearningConceptCard
                key={c.id}
                id={c.id}
                number={c.number}
                title={c.title}
                priority={c.priority}
                accent={track.accent}
                theory={c.theory}
              >
                {c.codeExample ? <CodeExample title={c.codeExample.title} code={c.codeExample.code} /> : null}
              </LearningConceptCard>
            ))}
          </div>
        );
      }}
    />
  );
}
