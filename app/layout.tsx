import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/data";
import { websiteJsonLd, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "NBABite — NBA Scores, Schedule, Teams, Stars & Where to Watch",
    template: "%s | NBABite",
  },
  description: SITE.description,
  applicationName: "NBABite",
  keywords: [
    "NBA",
    "NBA schedule",
    "NBA scores",
    "NBA teams",
    "NBA players",
    "LeBron James",
    "Stephen Curry",
    "Victor Wembanyama",
    "where to watch NBA",
    "NBA news",
  ],
  authors: [{ name: "NBABite Editorial" }],
  creator: "NBABite",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "NBABite — NBA Scores, Schedule, Teams, Stars & Where to Watch",
    description: SITE.description,
    url: SITE.domain,
    locale: "en_US",
    images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NBABite — NBA Scores, Schedule, Teams, Stars & Where to Watch",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/icon.svg" },
  category: "sports",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1D428A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-slate-900">
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
