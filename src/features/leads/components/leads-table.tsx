import { Eye, PencilLine, Trash2 } from "lucide-react";

import { DataTable, type DataTableColumn } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { SourceBadge } from "@/features/leads/components/source-badge";
import type { Lead } from "@/features/leads/types/lead";
import { formatCurrency, formatDate } from "@/features/leads/utils/lead-utils";

type LeadsTableProps = {
  leads: Lead[];
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
};

export function LeadsTable({ leads, onView, onEdit, onDelete }: LeadsTableProps) {
  const columns: DataTableColumn<Lead>[] = [
    {
      key: "lead",
      header: "Lead",
      cell: (lead) => (
        <button
          type="button"
          className="flex flex-col text-left transition-colors hover:text-primary"
          onClick={() => onView(lead)}
        >
          <span className="font-semibold">{lead.nombre}</span>
          <span className="text-sm text-muted-foreground">{lead.email}</span>
        </button>
      ),
    },
    {
      key: "source",
      header: "Fuente",
      cell: (lead) => <SourceBadge source={lead.fuente} />,
      cellClassName: "whitespace-nowrap",
    },
    {
      key: "product",
      header: "Producto",
      cell: (lead) => lead.producto_interes || "-",
      cellClassName: "text-muted-foreground",
      headerClassName: "hidden lg:table-cell",
    },
    {
      key: "budget",
      header: "Presupuesto",
      cell: (lead) => <span className="font-medium">{formatCurrency(lead.presupuesto)}</span>,
      cellClassName: "whitespace-nowrap",
    },
    {
      key: "date",
      header: "Fecha",
      cell: (lead) => <span className="text-muted-foreground">{formatDate(lead.fecha_creacion)}</span>,
      cellClassName: "whitespace-nowrap",
    },
    {
      key: "actions",
      header: "Acciones",
      headerClassName: "text-right",
      cellClassName: "text-right",
      cell: (lead) => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="icon" className="size-9 rounded-2xl" onClick={() => onView(lead)}>
            <Eye className="size-4" />
            <span className="sr-only">Ver detalle</span>
          </Button>
          <Button variant="outline" size="icon" className="size-9 rounded-2xl" onClick={() => onEdit(lead)}>
            <PencilLine className="size-4" />
            <span className="sr-only">Editar lead</span>
          </Button>
          <Button variant="outline" size="icon" className="size-9 rounded-2xl" onClick={() => onDelete(lead)}>
            <Trash2 className="size-4" />
            <span className="sr-only">Eliminar lead</span>
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={leads} getRowKey={(lead) => lead.id} />;
}
