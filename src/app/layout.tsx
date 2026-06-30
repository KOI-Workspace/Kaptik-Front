import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import GoogleOAuthProviderWrapper from "@/components/GoogleOAuthProviderWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaptik.site"),
  title: "Kaptik — Watch Korean content with real context",
  description:
    "For every Kpop moment. Accurate subtitles with speaker identification, fandom glossary, and support across Bubble, Weverse, YouTube & more.",
  openGraph: {
    title: "Kaptik — Watch Korean content with real context",
    description:
      "For every Kpop moment. Accurate subtitles with speaker identification, fandom glossary, and support across Bubble, Weverse, YouTube & more.",
    url: "https://kaptik.site/",
    type: "website",
    // OG 이미지는 src/app/opengraph-image.tsx 에서 동적 생성 → 자동으로 og:image 주입
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Pretendard Variable — Lavender Pulse 단일 폰트 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="antialiased">
        <MetaPixel />
        <GoogleOAuthProviderWrapper>
          {children}
        </GoogleOAuthProviderWrapper>
        {/* Vercel Analytics — 방문자 수 + signup 전환 이벤트 집계 */}
        <Analytics />
      </body>
    </html>
  );
}
