import type { CommandRecapGroup, CommandRecapRow } from "../data/techCommandRecaps";

export type CommandRecapVariant = "emerald" | "indigo" | "green" | "violet" | "cyan" | "blue";

const variantClass: Record<
  CommandRecapVariant,
  { shell: string; bar: string; section: string; code: string }
> = {
  emerald: {
    shell: "border-emerald-300/80 bg-gradient-to-br from-emerald-50/90 to-white",
    bar: "border-emerald-200/60",
    section: "text-emerald-800",
    code: "text-emerald-900",
  },
  indigo: {
    shell: "border-indigo-300/80 bg-gradient-to-br from-indigo-50/90 to-white",
    bar: "border-indigo-200/60",
    section: "text-indigo-800",
    code: "text-indigo-900",
  },
  green: {
    shell: "border-green-300/80 bg-gradient-to-br from-green-50/90 to-white",
    bar: "border-green-200/60",
    section: "text-green-800",
    code: "text-green-900",
  },
  violet: {
    shell: "border-violet-300/80 bg-gradient-to-br from-violet-50/90 to-white",
    bar: "border-violet-200/60",
    section: "text-violet-800",
    code: "text-violet-900",
  },
  cyan: {
    shell: "border-cyan-300/80 bg-gradient-to-br from-cyan-50/90 to-white",
    bar: "border-cyan-200/60",
    section: "text-cyan-800",
    code: "text-cyan-900",
  },
  blue: {
    shell: "border-blue-300/80 bg-gradient-to-br from-blue-50/90 to-white",
    bar: "border-blue-200/60",
    section: "text-blue-800",
    code: "text-blue-900",
  },
};

function RowCard({ row, codeClass }: { row: CommandRecapRow; codeClass: string }) {
  return (
    <div className="rounded-xl border border-zinc-200/80 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
      <code className={`block break-all font-mono text-xs sm:text-sm ${codeClass}`}>{row.command}</code>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-700 sm:text-sm">{row.purpose}</p>
      {row.note && <p className="mt-1 text-xs text-amber-800/90">{row.note}</p>}
    </div>
  );
}

interface CommandRecapPanelProps {
  id: string;
  variant: CommandRecapVariant;
  title: string;
  subtitle?: string;
  groups: CommandRecapGroup[];
}

export default function CommandRecapPanel({ id, variant, title, subtitle, groups }: CommandRecapPanelProps) {
  const v = variantClass[variant];

  return (
    <div id={id} className={`scroll-mt-4 mb-6 rounded-2xl border-2 p-4 shadow-md sm:mb-8 sm:p-6 ${v.shell}`}>
      <div className={`mb-4 border-b pb-3 ${v.bar}`}>
        <h3 className="text-lg font-bold text-zinc-900 sm:text-xl">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-zinc-600 sm:text-sm">{subtitle}</p>}
      </div>
      <div className="space-y-5">
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className={`mb-2 text-xs font-bold uppercase tracking-wide sm:text-sm ${v.section}`}>{g.title}</h4>
            <div className="grid gap-2 sm:gap-2.5 lg:grid-cols-2">
              {g.rows.map((row, i) => (
                <RowCard key={`${g.title}-${i}`} row={row} codeClass={v.code} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
