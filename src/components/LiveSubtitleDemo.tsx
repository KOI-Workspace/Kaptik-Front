"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   "Live subtitles" 기능을 보여주는 애니메이션 폰 목업.
   3단계 시퀀스가 무한 반복된다.
   0) 알림   — Kaptik 앱에서 "BTS is now LIVE" 푸시 알림이 도착
   1) 홈     — 알림을 누르면 홈 화면(실제 앱 UI)으로 진입, Play 버튼에 탭 리플
   2) 영상   — 영상을 누르면 라이브 플레이어에 Kaptik 자막이 등장
   ────────────────────────────────────────────────────────────── */

// 각 단계가 유지되는 시간(ms)
const PHASE_DURATIONS = [3000, 2800, 4400];

export default function LiveSubtitleDemo() {
  const [phase, setPhase] = useState(0);

  // 단계별 시간이 다르므로 setTimeout으로 순환시킨다.
  useEffect(() => {
    const id = window.setTimeout(
      () => setPhase((p) => (p + 1) % PHASE_DURATIONS.length),
      PHASE_DURATIONS[phase]
    );
    return () => window.clearTimeout(id);
  }, [phase]);

  return (
    <div className="flex w-full justify-center">
      {/* 폰 프레임 — Hero의 목업 스타일을 재사용해 톤을 맞춘다 */}
      <div className="relative aspect-[9/19.5] w-[min(44vw,158px)] rounded-[28px] bg-[#050505] p-[5px] shadow-[0_18px_48px_rgba(10,10,10,0.2),0_8px_22px_rgba(10,10,10,0.12)] ring-1 ring-[#262626] sm:w-[min(42vw,250px)] lg:h-[min(62vh,540px)] lg:w-auto lg:rounded-[34px] lg:p-[7px]">
        {/* 노치 */}
        <div className="pointer-events-none absolute left-1/2 top-[7px] z-30 h-[16px] w-[30%] -translate-x-1/2 rounded-b-[12px] bg-[#050505] lg:top-[8px] lg:h-[20px] lg:rounded-b-[14px]" />

        <div className="relative h-full overflow-hidden rounded-[24px] bg-black lg:rounded-[28px]">
          {/* ── 단계 0 배경: 실제 아이폰 홈 화면 위로 알림이 도착 ──
              이미지가 없을 때를 대비해 다크 월페이퍼 그라데이션을 깔아둔다. */}
          {phase === 0 && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundColor: "#2b3640",
                backgroundImage:
                  "linear-gradient(160deg, rgba(58,74,82,0) 0%, rgba(43,54,64,0) 100%), url('/image/features/iphone-home.png')",
              }}
            />
          )}

          {/* ── 단계 1·2 배경: Kaptik 앱 홈 화면(실제 스크린샷) ── */}
          {phase !== 0 && (
            <Image
              src="/image/features/home exmaple UI.PNG"
              alt="Kaptik 홈 화면"
              fill
              sizes="(max-width: 1024px) 80vw, 30vw"
              className="object-cover transition-transform duration-500"
              style={{ transform: phase === 1 ? "scale(1)" : "scale(1.02)" }}
              priority
            />
          )}

          {/* ── 단계 0: 푸시 알림 ── */}
          {phase === 0 && (
            <div className="absolute inset-x-0 top-0 z-20 px-3 pt-11">
              <div
                key="notif"
                className="kdemo-notif-in flex items-start gap-3 rounded-[20px] border border-white/40 bg-white/85 px-3.5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              >
                {/* 앱 아이콘 */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-sm">
                  <span className="text-[20px] font-extrabold leading-none text-white">k</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[#525252]">
                      Kaptik
                    </span>
                    <span className="text-[11px] text-[#737373]">now</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EF4444]" />
                    <p className="truncate text-[13px] font-bold text-[#0A0A0A]">
                      BTS is now LIVE
                    </p>
                  </div>
                  <p className="mt-0.5 truncate text-[12px] leading-snug text-[#525252]">
                    아미랑 아리랑 · Tap to watch with subtitles
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── 단계 1: 홈 화면 + Play Subtitle 버튼 탭 리플 ── */}
          {phase === 1 && (
            <div className="pointer-events-none absolute inset-0 z-20">
              {/* 스크린샷의 보라색 'Play Subtitle' 버튼 위치(세로 약 83%)에 리플 */}
              <span
                key="ripple"
                className="kdemo-ripple absolute left-1/2 top-[83%] h-12 w-12 rounded-full bg-white/70"
              />
            </div>
          )}

          {/* ── 단계 2: 영상 + 화자별 Kaptik 자막(실제 앱 스크린샷) ── */}
          {phase === 2 && (
            <div key="video" className="kdemo-rise absolute inset-0 z-20 bg-black">
              <Image
                src="/image/features/firstfeature_finalanimation.PNG"
                alt="Kaptik 자막 화면 — 화자별 라이브 자막"
                fill
                sizes="(max-width: 1024px) 80vw, 30vw"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
