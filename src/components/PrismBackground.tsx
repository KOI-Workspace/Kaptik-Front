"use client";

import Prism from "./Prism";

/**
 * 전체 페이지 배경용 Prism 레이어
 * - fixed, 전체 뷰포트 커버
 * - z-index 0 (콘텐츠 아래)
 * - pointer-events: none
 * - opacity로 가독성 확보
 */
export default function PrismBackground() {
  return (
    <div
      className="fixed inset-0 z-[1]"
      style={{
        pointerEvents: "none",
        opacity: 0.75,
        isolation: "isolate",
        // 세로: 하단부 더 완화 | 가로: 양옆 막대 아주 약간 세게
        maskImage: `linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 100%),
          linear-gradient(to right, black 0%, rgba(0,0,0,0.92) 25%, rgba(0,0,0,0.86) 50%, rgba(0,0,0,0.92) 75%, black 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 100%),
          linear-gradient(to right, black 0%, rgba(0,0,0,0.92) 25%, rgba(0,0,0,0.86) 50%, rgba(0,0,0,0.92) 75%, black 100%)`,
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
