import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  cell: (item: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (item: T) => string;
  rowClassName?: (item: T) => string;
};

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  rowClassName,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-card/80">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/80 bg-muted/45">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn("whitespace-nowrap text-xs uppercase tracking-[0.18em] text-muted-foreground", column.headerClassName)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={getRowKey(item)} className={cn("border-border/65", rowClassName?.(item))}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={cn("align-middle", column.cellClassName)}>
                    {column.cell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
