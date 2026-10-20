import type { Metadata } from "next";
import CursorProvider from "@/components/cursor";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const siteUrl = "https://shiddhatva-design.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Siddhatva Design | Contemporary Architecture & Interior Atelier",
    template: "%s | Siddhatva Design",
  },
  description:
    "Siddhatva Design is a premium architecture and interior design studio crafting luxury contemporary villas, bespoke residential sanctuaries, and interactive 3D spatial simulations.",
  keywords: [
    "Siddhatva Design",
    "Luxury Architecture",
    "Contemporary Villa Architecture",
    "Interior Architecture",
    "3D Architectural Visualization",
    "Architectural Digital Twin",
    "Gujarat Architecture Studio",
    "Residential Architecture India",
  ],
  authors: [{ name: "Siddhatva Design" }],
  creator: "Siddhatva Design",
  publisher: "Siddhatva Design",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Siddhatva Design | Architecture, Experienced Differently",
    description:
      "Thoughtfully designed spaces. Immersive visualizations. Architecture shaped around the way you live. Explore contemporary luxury villas and interactive 3D spatial twins.",
    url: siteUrl,
    siteName: "Siddhatva Design",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Siddhatva Design - Contemporary Architecture & 3D Spatial Experiences",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhatva Design | Contemporary Architecture Atelier",
    description:
      "Bespoke residential architecture, luxury villas, interior curation, and immersive 3D digital twins.",
    images: ["/images/hero.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#f5f4f2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Siddhatva Design",
  description:
    "Contemporary architecture and interior design studio specializing in bespoke luxury villas, residential interiors, and real-time 3D spatial simulations.",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/images/hero.png`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Architectural & Interior Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Architectural Design",
          description: "Concept development, spatial planning, architectural layouts, and construction documentation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior Architecture & Design",
          description: "Custom millwork, lighting architecture, material curation, and spatial coordination.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "3D Architectural Visualization",
          description: "Photorealistic renders and interactive WebGL digital twins.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Renovation & Remodeling",
          description: "Architectural upgrades, structural reconfiguration, and modern spatial remodeling.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-[#f5f4f2]">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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