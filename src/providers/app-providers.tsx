"use client";

import { Toaster } from "sonner";

import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </QueryProvider>
    </ThemeProvider>
  );
}
