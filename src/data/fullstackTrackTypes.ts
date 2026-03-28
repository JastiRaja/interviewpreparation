import type { LearningAccent } from "../components/shared/LearningConceptCard";
import type { LearningConceptTheory } from "../components/shared/LearningConceptCard";

export interface FullStackConcept {
  id: string;
  number: number;
  title: string;
  priority?: string;
  theory: LearningConceptTheory;
  codeExample?: { title: string; code: string };
}

export interface FullStackSection {
  id: string;
  title: string;
  icon: string;
  heroTitle: string;
  heroSubtitle: string;
  heroGradient: string;
  concepts: FullStackConcept[];
}

export interface FullStackTrack {
  layoutTitle: string;
  layoutSubtitle: string;
  accent: LearningAccent;
  defaultSectionId: string;
  sections: FullStackSection[];
}
