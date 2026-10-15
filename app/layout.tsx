import type { Metadata } from "next";
import CursorProvider from "@/components/cursor";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: "Villa Atelier | Luxury Architecture Showcase",
    template: "%s | Villa Atelier",
  },
  description:
    "An ultra-luxury 3D architectural exhibition showcasing world-class private estates and monolithic residences.",
  keywords: [
    "Luxury Architecture",
    "Villa Atelier",
    "Architectural Showcase",
    "3D Architecture",
    "Private Estates",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-sans min-h-screen m-0 p-0 bg-[#f7f5f0] dark:bg-[#090909] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white"
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorProvider>{children}</CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}