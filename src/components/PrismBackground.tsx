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
        opacity: 0.72,
        isolation: "isolate",
        maskImage: "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.08) 80%, transparent 95%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.08) 80%, transparent 95%)",
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
        glow={0.68}
        bloom={0.82}
        lowerFadeMin={0.15}
        suspendWhenOffscreen
        transparent
      />
    </div>
  );
}
