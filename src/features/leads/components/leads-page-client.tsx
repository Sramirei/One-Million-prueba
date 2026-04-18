"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw, Target, TrendingUp, Wallet } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteLeadDialog } from "@/features/leads/components/delete-lead-dialog";
import { LeadDetailDrawer } from "@/features/leads/components/lead-detail-drawer";
import { LeadFormModal } from "@/features/leads/components/lead-form-modal";
import { LeadsTable } from "@/features/leads/components/leads-table";
import { LeadsToolbar } from "@/features/leads/components/leads-toolbar";
import { useLeadFilters } from "@/features/leads/hooks/useLeadFilters";
import { useLeadMutations } from "@/features/leads/hooks/useLeadMutations";
import { useLeadPagination } from "@/features/leads/hooks/useLeadPagination";
import { useLeads } from "@/features/leads/hooks/useLeads";
import type { Lead } from "@/features/leads/types/lead";
import { formatCurrency, paginateLeads } from "@/features/leads/utils/lead-utils";

type FormState = {
  open: boolean;
  lead: Lead | null;
};

const summaryCards = [
  {
    key: "total",
    title: "Leads filtrados",
    icon: Target,
  },
  {
    key: "recent",
    title: "Ultimos 7 dias",
    icon: TrendingUp,
  },
  {
    key: "pipeline",
    title: "Pipeline estimado",
    icon: Wallet,
  },
] as const;

export function LeadsPageClient() {
  const filterController = useLeadFilters();
  const leadsQuery = useLeads(filterController.filters);
  const pagination = useLeadPagination(leadsQuery.data?.length ?? 0);
  const { currentPage, pageSize, totalPages, resetPage, setCurrentPage } = pagination;

  const [formState, setFormState] = useState<FormState>({
    open: false,
    lead: null,
  });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const { createLeadMutation, updateLeadMutation, deleteLeadMutation } = useLeadMutations();

  useEffect(() => {
    resetPage();
  }, [
    filterController.state.search,
    filterController.state.source,
    filterController.state.dateFrom,
    filterController.state.dateTo,
    resetPage,
  ]);

  const paginatedLeads = useMemo(() => {
    return paginateLeads(leadsQuery.data ?? [], currentPage, pageSize);
  }, [currentPage, leadsQuery.data, pageSize]);

  const recentLeads = useMemo(() => {
    if (!leadsQuery.data) {
      return 0;
    }

    const limit = new Date();
    limit.setDate(limit.getDate() - 7);
    const compareValue = limit.toISOString().slice(0, 10);

    return leadsQuery.data.filter((lead) => lead.fecha_creacion >= compareValue).length;
  }, [leadsQuery.data]);

  const pipelineValue = useMemo(() => {
    return (leadsQuery.data ?? []).reduce((total, lead) => total + (lead.presupuesto ?? 0), 0);
  }, [leadsQuery.data]);

  const summaryValues = {
    total: leadsQuery.data?.length ?? 0,
    recent: recentLeads,
    pipeline: formatCurrency(pipelineValue),
  };

  if (leadsQuery.isLoading) {
    return <LoadingSkeleton />;
  }

  if (leadsQuery.isError) {
    return (
      <ErrorState
        description="No pudimos recuperar la base de leads local. Revisa el almacenamiento del navegador o vuelve a intentarlo."
        onRetry={() => leadsQuery.refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Lead Operations"
        title="Demo"
        description=""
        actions={
          <>
            <Button variant="outline" className="rounded-2xl" onClick={() => leadsQuery.refetch()}>
              <RefreshCw className="mr-2 size-4" />
              Refrescar
            </Button>
            <Button
              className="rounded-2xl"
              onClick={() =>
                setFormState({
                  open: true,
                  lead: null,
                })
              }
            >
              <Plus className="mr-2 size-4" />
              Nuevo lead
            </Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.key}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    {summaryValues[card.key]}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <LeadsToolbar
        search={filterController.state.search}
        source={filterController.state.source}
        dateFrom={filterController.state.dateFrom}
        dateTo={filterController.state.dateTo}
        onSearchChange={filterController.setSearch}
        onSourceChange={filterController.setSource}
        onDateFromChange={filterController.setDateFrom}
        onDateToChange={filterController.setDateTo}
        onClearFilters={filterController.resetFilters}
        activeFilterCount={filterController.activeFilterCount}
      />

      {leadsQuery.data && leadsQuery.data.length > 0 ? (
        <>
          <LeadsTable
            leads={paginatedLeads}
            onView={setSelectedLead}
            onEdit={(lead) =>
              setFormState({
                open: true,
                lead,
              })
            }
            onDelete={setLeadToDelete}
          />
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={leadsQuery.data.length}
            pageSize={pageSize}
          />
        </>
      ) : (
        <EmptyState
          title="No encontramos leads con esos filtros"
          description="Puedes limpiar la busqueda, ampliar el rango de fechas o crear un nuevo lead para seguir poblando el dashboard."
          actionLabel="Crear lead"
          onAction={() =>
            setFormState({
              open: true,
              lead: null,
            })
          }
        />
      )}

      <LeadFormModal
        open={formState.open}
        lead={formState.lead}
        isPending={createLeadMutation.isPending || updateLeadMutation.isPending}
        onOpenChange={(open) =>
          setFormState({
            open,
            lead: open ? formState.lead : null,
          })
        }
        onSubmit={async (values) => {
          try {
            if (formState.lead) {
              await updateLeadMutation.mutateAsync({
                id: formState.lead.id,
                payload: values,
              });
              toast.success("Lead actualizado correctamente.");
            } else {
              await createLeadMutation.mutateAsync(values);
              toast.success("Lead creado y agregado al pipeline.");
            }

            setFormState({ open: false, lead: null });
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "No pudimos guardar el lead.");
          }
        }}
      />

      <LeadDetailDrawer
        lead={selectedLead}
        open={Boolean(selectedLead)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedLead(null);
          }
        }}
        onEdit={(lead) => {
          setSelectedLead(null);
          setFormState({
            open: true,
            lead,
          });
        }}
      />

      <DeleteLeadDialog
        lead={leadToDelete}
        open={Boolean(leadToDelete)}
        isPending={deleteLeadMutation.isPending}
        onOpenChange={(open) => {
          if (!open) {
            setLeadToDelete(null);
          }
        }}
        onConfirm={async () => {
          if (!leadToDelete) {
            return;
          }

          try {
            await deleteLeadMutation.mutateAsync(leadToDelete.id);
            toast.success("Lead eliminado del sistema.");
            setLeadToDelete(null);
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "No pudimos eliminar este lead.");
          }
        }}
      />
    </div>
  );
}
