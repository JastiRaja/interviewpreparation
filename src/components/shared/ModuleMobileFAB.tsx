import { createPortal } from "react-dom";

/**
 * Floating controls to open the module sidebar on small screens.
 * Rendered via portal to document.body so main/topic overflow-hidden does not clip fixed positioning.
 * - Phone (< sm): one FAB above the app bottom topic bar, inset for safe areas.
 * - Tablet (sm–md): top-left toggle under the header, safe-area aware.
 */
export default function ModuleMobileFAB({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const nodes = (
    <>
      <button
        type="button"
        onClick={onToggleSidebar}
        className="hidden sm:flex md:hidden fixed z-[55] items-center justify-center rounded-xl bg-indigo-600 p-2.5 text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700"
        style={{
          top: "max(5.5rem, calc(4rem + env(safe-area-inset-top, 0px)))",
          left: "calc(0.75rem + env(safe-area-inset-left, 0px))",
        }}
        aria-label="Open topic menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onToggleSidebar}
        className="sm:hidden fixed z-[55] flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 transition-transform active:scale-95 hover:bg-indigo-700"
        style={{
          bottom: "calc(4.85rem + env(safe-area-inset-bottom, 0px))",
          right: "calc(0.75rem + env(safe-area-inset-right, 0px))",
        }}
        aria-label="Open topic menu"
      >
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(nodes, document.body);
}
