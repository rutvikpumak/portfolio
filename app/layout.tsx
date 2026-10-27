import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { KEYWORDS, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, personJsonLd } from "@/lib/seo";
import { profile } from "@/lib/data";
import "./globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // trailing slash so relative metadata URLs resolve under the GitHub Pages sub-path
  metadataBase: new URL(`${SITE_URL}/`),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: profile.linkedin || undefined }],
  creator: profile.name,
  alternates: { canonical: "./" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "profile",
    url: "./",
    siteName: `${profile.name} — Portfolio`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    firstName: "Rutvik",
    lastName: "Umak",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f1e1d",
  colorScheme: "dark",
};

const themeInit = `(function(){try{var t=localStorage.getItem("portfolio-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
