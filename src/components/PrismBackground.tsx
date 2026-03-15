"use client";

import Prism from "./Prism";

/**
 * 원본 Prism 의도대로 전체 페이지 배경
 * - 마스크 없음, glow 1, bloom 1
 */
export default function PrismBackground() {
  return (
    <div
      className="fixed inset-0 z-[1] w-full h-full"
      style={{
        pointerEvents: "none",
        isolation: "isolate",
      }}
      aria-hidden
    >
      <Prism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0}
        glow={1}
        bloom={1}
        lowerFadeMin={1}
        suspendWhenOffscreen
        transparent
      />
    </div>
  );
}
