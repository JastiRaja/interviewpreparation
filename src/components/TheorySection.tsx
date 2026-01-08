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
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-colors"
      >
        <span className="font-semibold text-sm sm:text-base text-gray-900 flex items-center gap-2">
          <span className="text-lg sm:text-xl">📖</span>
          Theory & Interview Prep
        </span>
        <span className="text-gray-600 text-sm sm:text-base">{expanded ? "▼" : "▶"}</span>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 sm:space-y-4 bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200 w-full max-w-full overflow-hidden"
        >
          {/* What */}
          <div className="w-full">
            <h5 className="font-bold text-base sm:text-lg mb-2 text-blue-600 flex items-center gap-2 flex-wrap">
              <span>💡</span> <span>What is it?</span>
            </h5>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{what}</p>
          </div>

          {/* Why */}
          {why && (
            <div className="w-full">
              <h5 className="font-bold text-base sm:text-lg mb-2 text-green-600 flex items-center gap-2 flex-wrap">
                <span>❓</span> <span>Why is it important?</span>
              </h5>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{why}</p>
            </div>
          )}

          {/* How */}
          {how && (
            <div className="w-full">
              <h5 className="font-bold text-base sm:text-lg mb-2 text-purple-600 flex items-center gap-2 flex-wrap">
                <span>⚙️</span> <span>How does it work?</span>
              </h5>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{how}</p>
            </div>
          )}

          {/* Key Points */}
          {keyPoints && keyPoints.length > 0 && (
            <div className="w-full">
              <h5 className="font-bold text-base sm:text-lg mb-2 text-orange-600 flex items-center gap-2 flex-wrap">
                <span>🔑</span> <span>Key Points to Remember</span>
              </h5>
              <ul className="space-y-2">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700 w-full">
                    <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                    <span className="break-words flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interview Questions */}
          {interviewQuestions && interviewQuestions.length > 0 && (
            <div className="w-full">
              <h5 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-red-600 flex items-center gap-2 flex-wrap">
                <span>🎤</span> <span>Common Interview Questions</span>
              </h5>
              <div className="space-y-3 sm:space-y-4 w-full">
                {interviewQuestions.map((qa, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 sm:p-4 border-l-4 border-red-500 w-full overflow-hidden"
                  >
                    <p className="font-semibold text-sm sm:text-base text-gray-900 mb-2 break-words">
                      Q: {qa.question}
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
                      <span className="font-semibold">A:</span> {qa.answer}
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

