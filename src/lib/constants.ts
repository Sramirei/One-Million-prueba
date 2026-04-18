export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "OMC Leads";
export const STORAGE_KEY = "omc-leads-db:v2";
export const PAGE_SIZE = 6;
export const LEAD_STORAGE_VERSION = 2;

export const leadSources = [
  "instagram",
  "facebook",
  "landing_page",
  "referido",
  "otro",
] as const;

export const leadSourceLabels: Record<(typeof leadSources)[number], string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  landing_page: "Landing Page",
  referido: "Referido",
  otro: "Otro",
};

export const leadSourceClasses: Record<(typeof leadSources)[number], string> = {
  instagram: "bg-rose-500/12 text-rose-700 ring-rose-200 dark:bg-rose-400/15 dark:text-rose-200 dark:ring-rose-400/20",
  facebook: "bg-sky-500/12 text-sky-700 ring-sky-200 dark:bg-sky-400/15 dark:text-sky-200 dark:ring-sky-400/20",
  landing_page:
    "bg-emerald-500/12 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-400/20",
  referido:
    "bg-amber-500/12 text-amber-700 ring-amber-200 dark:bg-amber-400/15 dark:text-amber-200 dark:ring-amber-400/20",
  otro: "bg-slate-500/12 text-slate-700 ring-slate-200 dark:bg-slate-400/15 dark:text-slate-200 dark:ring-slate-400/20",
};

export const leadSourceChartColors: Record<(typeof leadSources)[number], string> = {
  instagram: "var(--chart-1)",
  facebook: "var(--chart-2)",
  landing_page: "var(--chart-3)",
  referido: "var(--chart-4)",
  otro: "var(--chart-5)",
};
