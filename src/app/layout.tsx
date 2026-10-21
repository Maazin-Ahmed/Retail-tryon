import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { storeMetadata } from "@/data/products";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${storeMetadata.domain}`),
  title: `${storeMetadata.storeName} — ${storeMetadata.tagline}`,
  description: storeMetadata.description,
  keywords: [
    "virtual try-on",
    "minimal wardrobe",
    "camera try-on",
    "RETAIL",
    "Maazin Ahmed",
  ],
  authors: [{ name: storeMetadata.curator, url: `https://${storeMetadata.parentDomain}` }],
  creator: storeMetadata.curator,
  publisher: storeMetadata.storeName,
  alternates: {
    canonical: `https://${storeMetadata.domain}`,
  },
  openGraph: {
    title: `${storeMetadata.storeName} — ${storeMetadata.tagline}`,
    description: storeMetadata.description,
    url: `https://${storeMetadata.domain}`,
    siteName: storeMetadata.storeName,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${storeMetadata.storeName} — ${storeMetadata.tagline}`,
    description: storeMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: storeMetadata.storeName,
    url: `https://${storeMetadata.domain}`,
    applicationCategory: "LifestyleApplication",
    description: storeMetadata.description,
    author: {
      "@type": "Person",
      name: storeMetadata.curator,
      url: `https://${storeMetadata.parentDomain}`,
    },
  };

  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="w-full h-full min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
