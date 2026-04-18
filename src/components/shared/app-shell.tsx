"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Menu, PanelsTopLeft, Users } from "lucide-react";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/theme-toggle";

type AppShellProps = {
  children: React.ReactNode;
};

const navigation = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Metricas, insights y AI Summary",
    icon: BarChart3,
  },
  {
    href: "/leads",
    label: "Leads",
    description: "CRM liviano con CRUD y filtros",
    icon: Users,
  },
];

function NavigationContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/15">
          <PanelsTopLeft className="size-5" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">{APP_NAME}</p>
          <p className="text-sm text-muted-foreground">Lead management workspace</p>
        </div>
      </div>
      <Separator />
      <nav className="flex-1 space-y-2 px-3 py-5">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-start gap-3 rounded-2xl px-4 py-3 transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                  : "hover:bg-card/80 hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex size-9 items-center justify-center rounded-xl ring-1 transition-colors",
                  active
                    ? "bg-primary-foreground/12 ring-primary-foreground/10"
                    : "bg-background/70 text-muted-foreground ring-border group-hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{item.label}</p>
                <p
                  className={cn(
                    "mt-1 text-xs leading-relaxed",
                    active ? "text-primary-foreground/75" : "text-muted-foreground",
                  )}
                >
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 border-r border-border/60 bg-card/55 backdrop-blur xl:block">
          <NavigationContent />
        </aside>
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3 xl:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-2xl">
                      <Menu className="size-4" />
                      <span className="sr-only">Abrir navegacion</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[320px] p-0">
                    <SheetHeader className="sr-only">
                      <SheetTitle>Navegacion</SheetTitle>
                      <SheetDescription>Accede a dashboard y leads.</SheetDescription>
                    </SheetHeader>
                    <NavigationContent />
                  </SheetContent>
                </Sheet>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Workspace</p>
                  <p className="font-semibold tracking-tight">{APP_NAME}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
