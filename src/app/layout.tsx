import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AppProviders } from "@/context/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PromoBar } from "@/components/layout/PromoBar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `JULEHOME — ${SITE.slogan}`,
    template: `%s · JULEHOME`,
  },
  description: SITE.description,
  keywords: [
    "velas aromáticas",
    "velas decorativas",
    "velas navideñas",
    "difusores",
    "portavelas",
    "decoración para el hogar",
    "regalos originales",
    "JULEHOME",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE.url,
    siteName: SITE.name,
    title: `JULEHOME — ${SITE.slogan}`,
    description: SITE.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `JULEHOME — ${SITE.slogan}`,
    description: SITE.description,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
  category: "ecommerce",
  appleWebApp: {
    title: SITE.name,
    statusBarStyle: "default",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/icon.png`,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bucaramanga, Santander, Colombia",
    addressLocality: "Bucaramanga",
    addressRegion: "Santander",
    addressCountry: "CO",
  },
  sameAs: [SITE.instagram, SITE.pinterest, SITE.facebook, SITE.tiktok],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AppProviders>
          <LoadingScreen />
          <PromoBar />
          <Header />
          <main className="relative min-h-[70vh]">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <SearchOverlay />
          <MobileMenu />
          <FloatingButtons />
        </AppProviders>
      </body>
    </html>
  );
}
