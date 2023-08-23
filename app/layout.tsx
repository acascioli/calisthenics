import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ToasterProvider } from "@/components/providers/toaster-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";
import ClientOnly from "@/components/providers/client-only";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenTech",
  description: "ESG Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="it" suppressHydrationWarning>
        {/* <CrispProvider /> */}
        <body className={font.className}>
          <ClientOnly>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ToasterProvider />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </ClientOnly>
        </body>
      </html>
    </ClerkProvider>
  );
}
