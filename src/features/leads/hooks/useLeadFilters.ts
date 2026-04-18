"use client";

import { startTransition, useDeferredValue, useMemo, useState } from "react";

import type { LeadFilters } from "@/features/leads/types/lead";

const defaultFilters: LeadFilters = {
  search: "",
  source: "all",
  dateFrom: "",
  dateTo: "",
};

export function useLeadFilters(initialFilters?: Partial<LeadFilters>) {
  const [search, setSearch] = useState(initialFilters?.search ?? defaultFilters.search);
  const [source, setSource] = useState(initialFilters?.source ?? defaultFilters.source);
  const [dateFrom, setDateFrom] = useState(initialFilters?.dateFrom ?? defaultFilters.dateFrom);
  const [dateTo, setDateTo] = useState(initialFilters?.dateTo ?? defaultFilters.dateTo);

  const deferredSearch = useDeferredValue(search);

  const filters = useMemo<LeadFilters>(
    () => ({
      search: deferredSearch,
      source,
      dateFrom,
      dateTo,
    }),
    [dateFrom, dateTo, deferredSearch, source],
  );

  const activeFilterCount = Number(Boolean(search.trim())) + Number(source !== "all") + Number(Boolean(dateFrom || dateTo));

  return {
    filters,
    state: { search, source, dateFrom, dateTo },
    setSearch: (value: string) => startTransition(() => setSearch(value)),
    setSource,
    setDateFrom,
    setDateTo,
    activeFilterCount,
    resetFilters: () => {
      setSearch(defaultFilters.search);
      setSource(defaultFilters.source);
      setDateFrom(defaultFilters.dateFrom);
      setDateTo(defaultFilters.dateTo);
    },
  };
}
