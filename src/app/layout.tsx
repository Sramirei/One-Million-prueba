import type { Metadata } from "next";

import "@/app/globals.css";
import { AppShell } from "@/components/shared/app-shell";
import { AppProviders } from "@/providers/app-providers";

export const metadata: Metadata = {
  title: "OMC Leads",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
