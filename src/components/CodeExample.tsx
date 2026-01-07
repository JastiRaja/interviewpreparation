import { useState } from "react";
import { motion } from "framer-motion";

interface CodeExampleProps {
  title?: string;
  description?: string;
  code: string;
  showTitle?: boolean;
}

export default function CodeExample({
  title,
  description,
  code,
  showTitle = true,
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-full">
      {showTitle && (title || description) && (
        <div className="px-6 py-4 border-b border-gray-200 w-full">
          {title && (
            <h4 className="text-lg font-bold text-gray-900 mb-1 break-words">{title}</h4>
          )}
          {description && (
            <p className="text-sm text-gray-600 break-words">{description}</p>
          )}
        </div>
      )}
      <div className="relative w-full">
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 z-10"
        >
          {copied ? (
            <>
              <span>✓</span> Copied!
            </>
          ) : (
            <>
              <span>📋</span> Copy
            </>
          )}
        </button>
        <pre className="p-6 bg-gray-900 text-gray-100 overflow-x-auto w-full max-w-full">
          <code className="text-sm font-mono whitespace-pre overflow-x-auto block">{code}</code>
        </pre>
      </div>
    </div>
  );
}

