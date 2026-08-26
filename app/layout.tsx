import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CommandMenu } from "@/components/command-menu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- GLOBAL SEO & OPEN GRAPH METADATA ---
export const metadata: Metadata = {
  title: "Ishaan Mishra",
  description: "Portfolio of Ishaan Mishra, Systems Engineer (Digital) at TCS. Architecting robust backend infrastructure and machine learning solutions.",
  keywords: [
    "Ishaan Mishra", 
    "Systems Engineer", 
    "TCS", 
    "Backend Developer", 
    "Machine Learning", 
    "Next.js", 
    "KIIT University"
  ],
  authors: [{ name: "Ishaan Mishra", url: "https://github.com/ishaan-mishraa" }],
  creator: "Ishaan Mishra",
openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishaanmishra.dev", 
    title: "Ishaan Mishra | Systems Engineer",
    description: "Systems Engineer (Digital) at TCS. Architecting robust backend infrastructure and machine learning solutions.",
    siteName: "Ishaan Mishra Portfolio",
    // Next.js handles images automatically now!
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishaan Mishra | Systems Engineer",
    description: "Systems Engineer (Digital) at TCS. Architecting robust backend infrastructure and machine learning solutions.",
    creator: "@ishaanmishraa",
    // Next.js handles images automatically now!
  },
  icons: {
    icon: "/icon.svg", // This points to the SVG favicon we created earlier
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-slate-950`}>
        {children}
        <CommandMenu />
      </body>
    </html>
  );
}