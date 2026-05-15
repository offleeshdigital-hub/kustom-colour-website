import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kustom Colour Design | Bespoke Signage & Branding — Hervey Bay",
  description:
    "30 years of craft. Zero compromise. Bespoke signage, vehicle wraps, airbrushing, pinstriping and hand-painted signs in Hervey Bay, Queensland.",
  keywords:
    "signage Hervey Bay, vehicle wraps, airbrushing, pinstriping, hand painted signs, graphic design, bespoke signage Queensland",
  openGraph: {
    title: "Kustom Colour Design | Bespoke Signage & Branding",
    description:
      "30 years of craft. Bespoke signage, vehicle wraps, airbrushing and hand-painted signs — Hervey Bay, QLD.",
    url: "https://kustomcolour.com.au",
    siteName: "Kustom Colour Design",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bungee&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col grain-overlay">{children}</body>
    </html>
  );
}
