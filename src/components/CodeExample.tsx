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
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-zinc-100">
      {showTitle && (title || description) && (
        <div className="w-full border-b border-zinc-200/80 px-4 py-3 sm:px-5 sm:py-4">
          {title && (
            <h4 className="mb-1 text-base font-bold tracking-tight text-zinc-900 break-words sm:text-lg">{title}</h4>
          )}
          {description && (
            <p className="text-xs text-zinc-600 break-words sm:text-sm">{description}</p>
          )}
        </div>
      )}
      <div className="relative w-full">
        <button
          type="button"
          onClick={copyToClipboard}
          className="absolute top-2 right-2 z-10 flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-md transition-colors hover:bg-zinc-700 sm:top-3 sm:right-3 sm:px-3 sm:text-sm"
        >
          {copied ? (
            <>
              <span>✓</span> <span className="hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <span>📋</span> <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
        <pre
          className="max-w-full overflow-x-auto bg-zinc-950 p-4 pt-12 font-mono text-sm text-zinc-100 sm:p-5 sm:pt-14 sm:text-[0.8125rem]"
          style={{ maxWidth: "100%" }}
        >
          <code
            className="block overflow-x-auto whitespace-pre font-mono"
            style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
