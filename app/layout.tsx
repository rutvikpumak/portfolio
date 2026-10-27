import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Rutvik Umak — Senior Frontend Engineer",
  description:
    "Portfolio of Rutvik Umak, Senior Frontend Engineer in Pune. React.js, TypeScript, Next.js, D3.js, AG Grid and AI chat UIs.",
  openGraph: {
    title: "Rutvik Umak — Senior Frontend Engineer",
    description: "React.js · TypeScript · Next.js · AI chat UIs.",
    images: ["/portrait-wide.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
