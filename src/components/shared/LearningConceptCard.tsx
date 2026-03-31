import { useState, type ReactNode } from "react";
import TheorySection from "../TheorySection";

export type LearningAccent =
  | "amber"
  | "emerald"
  | "blue"
  | "indigo"
  | "violet"
  | "cyan"
  | "rose"
  | "orange"
  | "teal";

const ACCENT_STYLES: Record<
  LearningAccent,
  { border: string; number: string; button: string }
> = {
  amber: {
    border: "border-l-amber-600",
    number: "text-amber-700",
    button: "bg-amber-600 shadow-amber-600/20 hover:bg-amber-700",
  },
  emerald: {
    border: "border-l-emerald-600",
    number: "text-emerald-700",
    button: "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700",
  },
  blue: {
    border: "border-l-blue-600",
    number: "text-blue-700",
    button: "bg-blue-600 shadow-blue-600/20 hover:bg-blue-700",
  },
  indigo: {
    border: "border-l-indigo-600",
    number: "text-indigo-700",
    button: "bg-indigo-600 shadow-indigo-600/20 hover:bg-indigo-700",
  },
  violet: {
    border: "border-l-violet-600",
    number: "text-violet-700",
    button: "bg-violet-600 shadow-violet-600/20 hover:bg-violet-700",
  },
  cyan: {
    border: "border-l-cyan-600",
    number: "text-cyan-700",
    button: "bg-cyan-600 shadow-cyan-600/20 hover:bg-cyan-700",
  },
  rose: {
    border: "border-l-rose-600",
    number: "text-rose-700",
    button: "bg-rose-600 shadow-rose-600/20 hover:bg-rose-700",
  },
  orange: {
    border: "border-l-orange-600",
    number: "text-orange-700",
    button: "bg-orange-600 shadow-orange-600/20 hover:bg-orange-700",
  },
  teal: {
    border: "border-l-teal-600",
    number: "text-teal-700",
    button: "bg-teal-600 shadow-teal-600/20 hover:bg-teal-700",
  },
};

export interface LearningConceptTheory {
  what: string;
  why: string;
  how: string;
  keyPoints: string[];
  interviewQuestions: Array<{ question: string; answer: string }>;
}

interface LearningConceptCardProps {
  id?: string;
  number: number;
  title: string;
  description?: string;
  priority?: string;
  children?: ReactNode;
  accent?: LearningAccent;
  theory?: LearningConceptTheory;
}

export default function LearningConceptCard({
  id,
  number,
  title,
  description,
  priority,
  children,
  theory,
  accent = "indigo",
}: LearningConceptCardProps) {
  const [showExamples, setShowExamples] = useState(false);
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      id={id ? `concept-${id}` : undefined}
      className={`w-full max-w-full scroll-mt-4 flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 border-l-4 ${styles.border} bg-white p-5 shadow-sm ring-1 ring-zinc-100 sm:rounded-2xl sm:p-6 lg:p-7`}
    >
      <div className="flex flex-wrap items-center gap-3 mb-4 w-full">
        <span className={`text-xl font-bold flex-shrink-0 sm:text-2xl ${styles.number}`}>#{number}</span>
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
          <TheorySection {...theory} collapsible={false} />
        </div>
      )}

      {children && (
        <div className="mt-6 w-full max-w-full overflow-visible">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className={`z-10 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white shadow-md transition-colors duration-200 ${styles.button}`}
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
