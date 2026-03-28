import { useState } from "react";
import { motion } from "framer-motion";

interface TheorySectionProps {
  what: string;
  why?: string;
  how?: string;
  keyPoints?: string[];
  interviewQuestions?: Array<{
    question: string;
    answer: string;
  }>;
}

export default function TheorySection({
  what,
  why,
  how,
  keyPoints,
  interviewQuestions,
}: TheorySectionProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mt-4 space-y-4">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-xl border border-zinc-200/90 bg-zinc-50/80 p-3 text-left transition-colors hover:border-indigo-200 hover:bg-indigo-50/50 sm:p-4"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900 sm:text-base">
          <span className="text-lg sm:text-xl" aria-hidden>
            📖
          </span>
          Theory & interview prep
        </span>
        <span className="text-sm text-zinc-500 sm:text-base">{expanded ? "▼" : "▶"}</span>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full max-w-full space-y-4 overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 md:p-6 lg:p-7"
        >
          <div className="w-full">
            <h5 className="mb-2 flex flex-wrap items-center gap-2 text-base font-bold text-indigo-700 sm:text-lg">
              <span aria-hidden>💡</span> <span>What is it?</span>
            </h5>
            <p className="text-sm leading-relaxed text-zinc-700 break-words sm:text-base lg:text-[17px] lg:leading-relaxed">
              {what}
            </p>
          </div>

          {why && (
            <div className="w-full">
              <h5 className="mb-2 flex flex-wrap items-center gap-2 text-base font-bold text-emerald-700 sm:text-lg">
                <span aria-hidden>❓</span> <span>Why it matters</span>
              </h5>
              <p className="text-sm leading-relaxed text-zinc-700 break-words sm:text-base lg:text-[17px] lg:leading-relaxed">
                {why}
              </p>
            </div>
          )}

          {how && (
            <div className="w-full">
              <h5 className="mb-2 flex flex-wrap items-center gap-2 text-base font-bold text-violet-700 sm:text-lg">
                <span aria-hidden>⚙️</span> <span>How it works</span>
              </h5>
              <p className="text-sm leading-relaxed text-zinc-700 break-words sm:text-base lg:text-[17px] lg:leading-relaxed">
                {how}
              </p>
            </div>
          )}

          {keyPoints && keyPoints.length > 0 && (
            <div className="w-full">
              <h5 className="mb-2 flex flex-wrap items-center gap-2 text-base font-bold text-amber-700 sm:text-lg">
                <span aria-hidden>🔑</span> <span>Key points</span>
              </h5>
              <ul className="space-y-2">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex w-full items-start gap-2 text-sm text-zinc-700 sm:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                    <span className="flex-1 break-words">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {interviewQuestions && interviewQuestions.length > 0 && (
            <div className="w-full">
              <h5 className="mb-3 flex flex-wrap items-center gap-2 text-base font-bold text-rose-700 sm:text-lg">
                <span aria-hidden>🎤</span> <span>Interview questions</span>
              </h5>
              <div className="w-full space-y-3 sm:space-y-4">
                {interviewQuestions.map((qa, index) => (
                  <div
                    key={index}
                    className="w-full overflow-hidden rounded-xl border border-zinc-200/80 border-l-4 border-l-rose-500 bg-zinc-50/60 p-3 sm:p-4"
                  >
                    <p className="mb-2 text-sm font-semibold text-zinc-900 break-words sm:text-base">
                      Q: {qa.question}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-700 break-words sm:text-base">
                      <span className="font-semibold text-zinc-800">A:</span> {qa.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
