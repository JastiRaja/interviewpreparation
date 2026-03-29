import { useState, type ReactNode } from "react";
import TheorySection from "./TheorySection";

export interface JavaConceptTheory {
  what: string;
  why: string;
  how: string;
  keyPoints: string[];
  interviewQuestions: Array<{ question: string; answer: string }>;
}

interface ConceptCardProps {
  id?: string;
  number: number;
  title: string;
  description?: string;
  priority?: string;
  children?: ReactNode;
  accent?: "amber" | "emerald";
  theory?: JavaConceptTheory;
}

export function JavaConceptCard({
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
      <div className="mb-4 flex w-full flex-wrap items-center gap-3">
        <span className={`flex-shrink-0 text-xl font-bold sm:text-2xl ${numberColor}`}>#{number}</span>
        <h4 className="min-w-0 flex-1 break-words text-xl font-bold text-gray-900 sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
          {title}
        </h4>
        {priority && (
          <span className="flex-shrink-0 rounded bg-red-100 px-2 py-1 text-sm font-semibold text-red-700">{priority}</span>
        )}
      </div>
      {description && <p className="mb-4 w-full break-words text-gray-600">{description}</p>}

      {theory && (
        <div className="mb-6">
          <TheorySection {...theory} />
        </div>
      )}

      {children && (
        <div className="mt-6 w-full max-w-full overflow-visible">
          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className={`z-10 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white shadow-md transition-colors duration-200 ${buttonClass}`}
          >
            <span className="font-semibold text-white">{showExamples ? "Hide Examples" : "See Examples"}</span>
            <span className="text-xl text-white">{showExamples ? "▲" : "▼"}</span>
          </button>
          {showExamples && <div className="mt-4 flex w-full max-w-full flex-col space-y-4 overflow-hidden">{children}</div>}
        </div>
      )}
    </div>
  );
}
