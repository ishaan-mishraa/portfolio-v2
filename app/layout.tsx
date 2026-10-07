import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CommandMenu } from "@/components/command-menu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- GLOBAL SEO & OPEN GRAPH METADATA ---
export const metadata: Metadata = {
  metadataBase: new URL("https://ishaanm.dev"),
  title: "Ishaan Mishra",
  description: "Ishaan Mishra builds reliable backends and trains computer-vision models, lately for deepfake detection.",
  keywords: [
    "Ishaan Mishra",
    "Software Engineer",
    "Backend",
    "Spring Boot",
    "Computer Vision",
    "Deepfake Detection",
    "Machine Learning",
  ],
  authors: [{ name: "Ishaan Mishra", url: "https://github.com/ishaan-mishraa" }],
  creator: "Ishaan Mishra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishaanm.dev",
    title: "Ishaan Mishra",
    description: "Backend engineering and computer vision. Projects, research and experience.",
    siteName: "Ishaan Mishra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishaan Mishra",
    description: "Backend engineering and computer vision. Projects, research and experience.",
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
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-slate-950`}>
        {children}
        <CommandMenu />
      </body>
    </html>
  );
}