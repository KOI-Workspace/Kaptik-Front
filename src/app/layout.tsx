import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const PrismBackground = dynamic(
  () => import("@/components/PrismBackground"),
  { ssr: false }
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaptik — Ultimate Subtitle for Kpop Fans",
  description:
    "For every Kpop moment. Accurate subtitles with speaker identification, fandom glossary, and support across Bubble, Weverse, YouTube & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrismBackground />
        {children}
      </body>
    </html>
  );
}
