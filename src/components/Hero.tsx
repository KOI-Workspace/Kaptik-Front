"use client";

import { useCallback } from "react";
import WaitlistForm from "./WaitlistForm";

interface HeroProps {
  onWaitlistSuccess: () => void;
}

export default function Hero({
  onWaitlistSuccess,
}: HeroProps) {
  // 하단 가이드 클릭 시 다음 섹션으로 부드럽게 스크롤
  const scrollToNext = useCallback(() => {
    document
      .getElementById("fan-problems")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden px-6 pb-6 pt-[100px] md:px-12 md:pt-[124px] lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col justify-center">
        {/* 상단: 헤드라인 + 휴대폰 영상 mockup */}
        <div className="grid w-full min-w-0 grid-cols-1 items-center gap-7 md:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] xl:gap-16">
          {/* 왼쪽: 헤드라인 */}
          <div className="flex w-full min-w-0 flex-col items-start text-left max-xl:items-center max-xl:text-center">
            <h1
              className="w-full max-w-[760px] text-[clamp(30px,7vw,56px)] font-bold leading-[1.08] xl:text-[clamp(48px,5vw,72px)] xl:leading-[1.05]"
              style={{
                color: "#0A0A0A",
              }}
            >
              Sick of confusing K-pop subtitles?{" "}
              <span style={{ color: "#A3A3A3" }}>
                Catch every moment in your language.
              </span>
            </h1>
            <WaitlistForm onSuccess={onWaitlistSuccess} />
          </div>

          {/* 오른쪽: 휴대폰 프레임 안에 재생되는 제품 영상 */}
          <div className="relative flex justify-center xl:justify-end">
            <div
              className="relative z-10 w-auto"
              aria-label="Kaptik app preview video"
            >
              {/* 배경 이미지들: 휴대폰 mockup 좌우 가장자리에 직접 붙임 (PNG 여백과 무관하게 양쪽 대칭) */}
              {/* 왼쪽 이미지: right-full로 mockup 왼쪽 끝에 붙이고, 왼쪽으로 갈수록 페이드 아웃 */}
              <div
                className="pointer-events-none absolute right-full top-1/2 z-0 h-[min(52vh,440px)] w-max -translate-y-1/2 opacity-50 blur-[0.5px] max-xl:hidden"
                style={{
                  maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
                }}
              >
                <img src="/image/herosection_mockupsideimages/compile 1.png" alt="" className="h-full w-auto object-contain object-right" />
              </div>

              {/* 오른쪽 이미지: left-full로 mockup 오른쪽 끝에 붙이고, 오른쪽으로 갈수록 페이드 아웃 */}
              <div
                className="pointer-events-none absolute left-full top-1/2 z-0 h-[min(52vh,440px)] w-max -translate-y-1/2 opacity-50 blur-[0.5px] max-xl:hidden"
                style={{
                  maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
                }}
              >
                <img src="/image/herosection_mockupsideimages/compile 2.png" alt="" className="h-full w-auto object-contain object-left" />
              </div>

              <div className="relative z-10 aspect-[9/19.5] h-[min(40vh,520px)] rounded-[28px] bg-[#050505] p-[6px] shadow-[0_28px_80px_rgba(10,10,10,0.24),0_8px_22px_rgba(10,10,10,0.16)] ring-1 ring-[#262626] sm:rounded-[32px] sm:p-[7px] xl:h-[min(72vh,600px)]">
                <div className="pointer-events-none absolute left-1/2 top-[7px] z-20 h-[18px] w-[30%] -translate-x-1/2 rounded-b-[14px] bg-[#050505]" />
                <div className="relative h-full overflow-hidden rounded-[24px] bg-[#050505] sm:rounded-[27px]">
                  {/* 영상에 박힌 화면녹화 표시(hotspot 알약·record 원)를 시간과 신호 사이 통째로 가림 */}
                  <div className="pointer-events-none absolute left-[24%] top-0 z-10 h-[6%] w-[53.5%] bg-[#000000]" />
                  <video
                    className="h-full w-full object-cover"
                    src="/videos/MockupVid_HeroSection.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 하단 스크롤 가이드 — 다음 섹션으로 유도 */}
      <button
        onClick={scrollToNext}
        className="group mx-auto flex shrink-0 flex-col items-center gap-2 pt-4 focus:outline-none"
        aria-label="See how it works"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A3A3A3] transition-colors group-hover:text-[#525252]">
          See how it works
        </span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="animate-bounce text-[#A3A3A3] transition-colors group-hover:text-[#525252]"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
