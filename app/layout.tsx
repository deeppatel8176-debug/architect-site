import type { Metadata } from "next";
import CursorProvider from "@/components/cursor";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Siddhatva Design | Luxury Architecture Showcase",
    template: "%s | Siddhatva Design",
  },
  description:
    "An ultra-luxury 3D architectural exhibition showcasing world-class private estates and monolithic residences by Siddhatva Design.",
  keywords: [
    "Luxury Architecture",
    "Siddhatva Design",
    "Architectural Showcase",
    "3D Architecture",
    "Private Estates",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#f5f4f2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-[#f5f4f2]">
      <body
        className="font-sans min-h-screen m-0 p-0 bg-[#f5f4f2] text-[#111111] selection:bg-[#111111] selection:text-[#f5f4f2] antialiased"
      >
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <SmoothScrollProvider>
            <CursorProvider>{children}</CursorProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}