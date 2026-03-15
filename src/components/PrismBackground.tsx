"use client";

import Prism from "./Prism";

/**
 * 전체 페이지 배경용 Prism 레이어
 * - 세로: 하단 빛나는 막대 약하게
 * - 가로: 움직이는 양옆 막대 진하게
 */
export default function PrismBackground() {
  return (
    <div
      className="fixed inset-0 z-[1]"
      style={{
        pointerEvents: "none",
        opacity: 0.75,
        isolation: "isolate",
        // 세로: 하단 페이드 | 가로: 양옆 막대 강조 (중앙 약간 완화)
        maskImage: `linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 95%),
          linear-gradient(to right, black 0%, black 22%, rgba(0,0,0,0.8) 50%, black 78%, black 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 95%),
          linear-gradient(to right, black 0%, black 22%, rgba(0,0,0,0.8) 50%, black 78%, black 100%)`,
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
        glow={0.7}
        bloom={0.9}
        suspendWhenOffscreen
        transparent
      />
    </div>
  );
}
