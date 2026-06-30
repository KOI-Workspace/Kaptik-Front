import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// OG 이미지 메타 — 공유 시 1200×630 PNG로 자동 노출
export const alt = "Kaptik — Watch Korean content with real context";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 브랜드 토큰 (Kaptik 확장 프로그램 자막 UI와 동일)
const BRAND = "#8353EB"; // 브랜드 퍼플
const JK_COLOR = "#B488FF"; // 멤버(Jungkook) 시그니처 컬러

/**
 * Google Fonts에서 지정 weight의 Inter TTF를 받아온다.
 * (Satori는 woff2 가변폰트를 못 읽으므로 정적 ttf로 로드)
 */
async function loadInter(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`,
      )
    ).text();
    const url = css.match(
      /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
    )?.[1];
    if (!url) return null;
    const res = await fetch(url);
    if (res.status !== 200) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  // 폰트 로드 (실패해도 기본 폰트로 렌더되도록 방어)
  const [regular, semibold, bold, extrabold] = await Promise.all([
    loadInter(400),
    loadInter(600),
    loadInter(700),
    loadInter(800),
  ]);

  const fonts = [
    regular && { name: "Inter", data: regular, weight: 400 as const },
    semibold && { name: "Inter", data: semibold, weight: 600 as const },
    bold && { name: "Inter", data: bold, weight: 700 as const },
    extrabold && { name: "Inter", data: extrabold, weight: 800 as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600 | 700 | 800 }[];

  // 화자 프로필 사진을 data URI로 임베드 (next/og는 외부/상대경로 대신 인라인 권장)
  const avatarData = await readFile(
    join(process.cwd(), "public/image/jungkook profile.jpeg"),
  );
  const avatarSrc = `data:image/jpeg;base64,${avatarData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "#FFFFFF",
          // 우상단 은은한 퍼플 글로우 (흰 캔버스 우선 + 브랜드 포인트)
          backgroundImage:
            "radial-gradient(1100px 520px at 88% -10%, rgba(131,83,235,0.12), rgba(255,255,255,0))",
          fontFamily: "Inter",
        }}
      >
        {/* 헤드라인 — 새 포지셔닝 문구 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#0A0A0A",
          }}
        >
          <span>Watch Korean content with&nbsp;</span>
          <span style={{ color: BRAND }}>real context</span>
        </div>

        {/* 자막 데모 카드 — 검은 박스 (확장 프로그램 오버레이 재현) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginTop: 44,
            padding: "26px 30px",
            background: "#0A0A0A",
            borderRadius: 20,
            boxShadow: "0 24px 60px rgba(10,10,10,0.18)",
          }}
        >
          {/* 화자 아바타 — 프로필 사진 */}
          <img
            src={avatarSrc}
            width={80}
            height={80}
            alt="Jungkook"
            style={{
              width: 80,
              height: 80,
              borderRadius: 999,
              objectFit: "cover",
              border: "3px solid #FFFFFF",
            }}
          />

          {/* 화자명 + 자막 텍스트 (맥락 강조어 포함) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 600, color: JK_COLOR }}>
              Jungkook
            </span>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 500, color: "#FFFFFF" }}>
              <span>Hyung, I&apos;m eating&nbsp;</span>
              <span
                style={{
                  color: "#C9A9FF",
                  textDecoration: "underline",
                  textDecorationColor: BRAND,
                }}
              >
                Gamjatang
              </span>
              <span>&nbsp;now.</span>
            </div>
          </div>
        </div>

        {/* 문화 맥락 주석 카드 — 연한 라벤더 박스 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 18,
            marginLeft: 102,
            padding: "20px 24px",
            background: "rgba(131,83,235,0.10)",
            border: `2px solid rgba(131,83,235,0.35)`,
            borderRadius: 16,
          }}
        >
          <span style={{ fontSize: 19, fontWeight: 700, color: BRAND }}>
            Gamjatang · Cultural context
          </span>
          <span style={{ fontSize: 24, fontWeight: 400, color: "#3F3654", lineHeight: 1.4 }}>
            A hearty pork-bone &amp; potato soup — a classic late-night comfort
            food in Korea.
          </span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
