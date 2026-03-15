"use client";

import Prism from "./Prism";

/**
 * 전체 페이지 배경용 Prism 레이어
 * - 텍스트 가독성: opacity 낮게, 하단 빛 약하게
 * - 세로: 하단 페이드 (40%↓ 강하게, 80%↓ 8%, 95%↓ 투명)
 * - 가로: 중앙 청록빛 띠 유지
 */
export default function PrismBackground() {
  return (
    <div
      className="fixed inset-0 z-[1] w-full h-full"
      style={{
        pointerEvents: "none",
        opacity: 0.92,
        isolation: "isolate",
        maskImage: "linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 88%, transparent 100%)",
      }}
      aria-hidden
    >
      <Prism
        animationType="rotate"
        timeScale={0.4}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0.12}
        colorFrequency={0.7}
        noise={0}
        glow={1.0}
        bloom={1.0}
        lowerFadeMin={0.25}
        suspendWhenOffscreen
        transparent
      />
    </div>
  );
}
