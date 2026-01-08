import { useState } from "react";

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
        <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200 w-full">
          {title && (
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 break-words">{title}</h4>
          )}
          {description && (
            <p className="text-xs sm:text-sm text-gray-600 break-words">{description}</p>
          )}
        </div>
      )}
      <div className="relative w-full">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1 sm:gap-2 z-10"
        >
          {copied ? (
            <>
              <span>✓</span> <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span> <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
        <pre className="p-3 sm:p-4 md:p-6 bg-gray-900 text-gray-100 overflow-x-auto w-full max-w-full" style={{ maxWidth: '100%' }}>
          <code className="text-xs sm:text-sm font-mono whitespace-pre overflow-x-auto block" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{code}</code>
        </pre>
      </div>
    </div>
  );
}

