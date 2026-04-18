import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: PaginationControlsProps) {
  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-border/80 bg-card/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Mostrando <span className="font-semibold text-foreground">{from}</span> a{" "}
        <span className="font-semibold text-foreground">{to}</span> de{" "}
        <span className="font-semibold text-foreground">{totalItems}</span> leads
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-2xl"
        >
          <ChevronLeft className="size-4" />
          <span className="sr-only">Pagina anterior</span>
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            className={cn("min-w-11 rounded-2xl", page === currentPage && "shadow-md shadow-primary/20")}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-2xl"
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">Pagina siguiente</span>
        </Button>
      </div>
    </div>
  );
}
