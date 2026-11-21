import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { site } from "@/data/site";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { personJsonLd } from "@/lib/seo";
import { jsonLd } from "@/lib/utils";

const jakarta = localFont({
  src: "../fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.positioning}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Jinal Dodiya",
    "Digital Marketing Manager Ahmedabad",
    "SEO",
    "AI-assisted development",
    "Website development",
    "CRM development",
    "SaaS",
    "Android apps",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} · ${site.positioning}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.positioning}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd()) }} />
      </body>
    </html>
  );
}
