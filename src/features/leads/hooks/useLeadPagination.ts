"use client";

import { useCallback, useMemo, useState } from "react";

import { PAGE_SIZE } from "@/lib/constants";

export function useLeadPagination(totalItems: number, pageSize = PAGE_SIZE) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    },
    [totalPages],
  );
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const meta = useMemo(
    () => ({
      currentPage: safeCurrentPage,
      pageSize,
      totalPages,
      setCurrentPage: handlePageChange,
      resetPage,
    }),
    [handlePageChange, pageSize, resetPage, safeCurrentPage, totalPages],
  );

  return meta;
}
