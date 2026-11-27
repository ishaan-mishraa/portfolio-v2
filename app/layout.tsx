import type { Metadata } from "next";
import { Inter, Geist_Mono, Instrument_Serif } from "next/font/google";
import { CommandMenu } from "@/components/command-menu";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif" });

const DESCRIPTION =
  "Ishaan Mishra is a data engineer who builds pipelines on AWS and trains computer-vision models, lately for deepfake detection.";

// --- GLOBAL SEO & OPEN GRAPH METADATA ---
export const metadata: Metadata = {
  metadataBase: new URL("https://ishaanm.dev"),
  title: "Ishaan Mishra",
  description: DESCRIPTION,
  keywords: [
    "Ishaan Mishra",
    "Data Engineer",
    "Machine Learning",
    "Computer Vision",
    "Deepfake Detection",
    "AWS",
    "PyTorch",
  ],
  authors: [{ name: "Ishaan Mishra", url: "https://github.com/ishaan-mishraa" }],
  creator: "Ishaan Mishra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishaanm.dev",
    title: "Ishaan Mishra",
    description: "Data engineering and computer vision. Projects, publications and experience.",
    siteName: "Ishaan Mishra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishaan Mishra",
    description: "Data engineering and computer vision. Projects, publications and experience.",
    creator: "@ishaanmishraa",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} ${mono.variable} ${serif.variable} antialiased bg-slate-950`}>
        <SiteNav />
        {children}
        <CommandMenu />
      </body>
    </html>
  );
}
