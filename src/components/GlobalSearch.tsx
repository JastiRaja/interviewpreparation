import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMMAND_REFERENCE_BLOCKS } from "./QuickCommandReference";

export interface GlobalSearchTopic {
  id: string;
  title: string;
  short: string;
  description: string;
  icon: string;
}

interface GlobalSearchProps {
  topics: GlobalSearchTopic[];
  onSelectTopic: (id: string) => void;
  onJumpToCommandBlock: (blockId: string) => void;
  compact?: boolean;
}

function matches(q: string, ...fields: (string | undefined)[]) {
  const n = q.trim().toLowerCase();
  if (!n) return false;
  return fields.some((f) => f?.toLowerCase().includes(n));
}

export default function GlobalSearch({
  topics,
  onSelectTopic,
  onJumpToCommandBlock,
  compact,
}: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { topicHits, commandHits } = useMemo(() => {
    const q = query.trim();
    if (!q) {
      return { topicHits: [] as GlobalSearchTopic[], commandHits: [] as typeof COMMAND_REFERENCE_BLOCKS };
    }
    const topicHits = topics.filter((t) =>
      matches(q, t.title, t.short, t.description, t.id)
    );
    const commandHits = COMMAND_REFERENCE_BLOCKS.filter((b) =>
      matches(q, b.title, b.summary, b.code.slice(0, 200))
    );
    return { topicHits, commandHits };
  }, [query, topics]);

  const hasResults = topicHits.length > 0 || commandHits.length > 0;
  const showPanel = open && query.trim().length > 0;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
        return;
      }
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const t = e.target as HTMLElement;
        if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const inputClass = compact
    ? "h-9 w-[7.5rem] min-w-0 rounded-full border border-zinc-200 bg-white/90 pl-9 pr-3 text-xs text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 sm:w-40 sm:pr-10 sm:text-sm lg:w-52"
    : "h-10 w-[8.5rem] min-w-0 rounded-full border border-zinc-200 bg-white/90 pl-10 pr-3 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 sm:w-48 sm:pr-11 lg:w-64";

  return (
    <div ref={rootRef} className="relative z-[100] shrink-0">
      <div className="relative flex items-center">
        <span
          className={`pointer-events-none absolute left-3 text-zinc-400 ${compact ? "text-sm" : "text-base"}`}
          aria-hidden
        >
          🔍
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search…"
          aria-label="Search topics and command reference"
          autoComplete="off"
          className={inputClass}
        />
        <span
          className={`pointer-events-none absolute right-2 hidden rounded border border-zinc-200 bg-zinc-50 px-1.5 font-mono text-[10px] text-zinc-500 sm:block ${compact ? "top-1.5" : "top-2"}`}
          aria-hidden
        >
          /
        </span>
      </div>

      <AnimatePresence>
        {showPanel && (
          <>
            <motion.button
              type="button"
              aria-label="Close search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-zinc-900/20 backdrop-blur-[1px] md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="listbox"
              aria-label="Search results"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="fixed left-2 right-2 top-20 z-[100] max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain rounded-2xl border border-zinc-200/90 bg-white py-2 shadow-2xl shadow-zinc-900/15 md:absolute md:inset-x-auto md:left-auto md:right-0 md:top-full md:mt-2 md:w-[min(calc(100vw-2rem),22rem)] md:max-h-[min(70vh,26rem)]"
            >
              {!hasResults && (
                <p className="px-4 py-6 text-center text-sm text-zinc-500">No matches. Try another keyword.</p>
              )}
              {topicHits.length > 0 && (
                <div className="border-b border-zinc-100 pb-2">
                  <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Topics</p>
                  <ul>
                    {topicHits.map((t) => (
                      <li key={t.id}>
                        <button
                          type="button"
                          role="option"
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-indigo-50"
                          onClick={() => {
                            onSelectTopic(t.id);
                            close();
                          }}
                        >
                          <span className="text-lg">{t.icon}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-zinc-900">{t.title}</span>
                            <span className="line-clamp-1 text-xs text-zinc-500">{t.description}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {commandHits.length > 0 && (
                <div className="pt-1">
                  <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Command reference
                  </p>
                  <ul>
                    {commandHits.map((b) => (
                      <li key={b.id}>
                        <button
                          type="button"
                          role="option"
                          className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-emerald-50/80"
                          onClick={() => {
                            onJumpToCommandBlock(b.id);
                            close();
                          }}
                        >
                          <span className="font-semibold text-zinc-900">{b.title}</span>
                          <span className="line-clamp-2 text-xs text-zinc-600">{b.summary}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
