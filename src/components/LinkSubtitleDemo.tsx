"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   "Any video link" 기능을 보여주는 애니메이션 폰 목업.
   4단계 시퀀스가 무한 반복된다.
   0) 입력   — YouTube/TikTok/Instagram 링크를 붙여넣는 드롭존
   1) 로딩   — 자막을 만드는 동안 진행바가 차오름
   2) 완료   — "Subtitles are ready" 체크 + Watch 버튼 리플
   3) 영상   — 영상 위에 Kaptik 자막이 등장
   ────────────────────────────────────────────────────────────── */

// 각 단계가 유지되는 시간(ms) — 로딩(1)은 진행바 길이, 영상(3)은 대사 stagger 길이에 맞춘다.
const PHASE_DURATIONS = [2800, 2600, 1900, 6000];

// 붙여넣어지는 예시 링크
const PASTED_LINK = "youtube.com/watch?v=illit-live";

/* phase 3에서 한 줄씩 등장하는 ILLIT 유튜브 영상 자막.
   highlight=true 인 줄은 뉘앙스/맥락이 담겨 보라 밑줄로 강조된다. */
const transcript: {
  name: string;
  color: string;
  text: string;
  highlight?: boolean;
}[] = [
  { name: "Wonhee", color: "#EC4899", text: "Unnie, you've still got it!" },
  {
    name: "Minju",
    color: "#3B82F6",
    text: "But if it felt off, shouldn't we just redo the take? Hahaha.",
    highlight: true,
  },
  { name: "Moka", color: "#F59E0B", text: "Hello." },
  { name: "Wonhee", color: "#EC4899", text: "Moka was just saying hi, that's all." },
  { name: "Moka", color: "#F59E0B", text: "My greeting was kinda random though." },
];

export default function LinkSubtitleDemo() {
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
      {/* 폰 프레임 — LiveSubtitleDemo와 동일한 스타일로 톤을 맞춘다 */}
      <div className="relative aspect-[9/19.5] w-[min(44vw,158px)] rounded-[28px] bg-[#050505] p-[5px] shadow-[0_18px_48px_rgba(10,10,10,0.2),0_8px_22px_rgba(10,10,10,0.12)] ring-1 ring-[#262626] sm:w-[min(42vw,250px)] lg:h-[min(62vh,540px)] lg:w-auto lg:rounded-[34px] lg:p-[7px]">
        {/* 노치 */}
        <div className="pointer-events-none absolute left-1/2 top-[7px] z-30 h-[16px] w-[30%] -translate-x-1/2 rounded-b-[12px] bg-[#050505] lg:top-[8px] lg:h-[20px] lg:rounded-b-[14px]" />

        <div className={`relative h-full overflow-hidden rounded-[24px] lg:rounded-[28px] ${phase === 3 ? "bg-black" : "bg-white"}`}>
          {/* ── 단계 0~2: Kaptik 앱의 '링크로 자막 만들기' 화면 ── */}
          {phase < 3 && (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-[#F5F3FF] to-white px-5 pt-12">
              {/* 상단 앱 헤더 */}
              <div className="mb-7 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]">
                  <span className="text-[14px] font-extrabold leading-none text-white">k</span>
                </div>
                <span className="text-[15px] font-bold tracking-tight text-[#0A0A0A]">Kaptik</span>
              </div>

              <h4 className="mb-1.5 text-[19px] font-bold leading-tight tracking-tight text-[#0A0A0A]">
                Add subtitles to any clip
              </h4>
              <p className="mb-6 text-[13px] leading-snug text-[#737373]">
                Paste a YouTube, TikTok, or Instagram link.
              </p>

              {/* 링크 드롭존 / 입력창 */}
              <div
                className="relative flex min-h-[88px] flex-col justify-center rounded-[16px] border-2 border-dashed px-4 py-3 transition-colors duration-300"
                style={{
                  borderColor: phase === 0 ? "#C4B5FD" : "#8B5CF6",
                  background: phase === 0 ? "rgba(139,92,246,0.04)" : "rgba(139,92,246,0.08)",
                }}
              >
                {phase === 0 ? (
                  // 입력 대기: 붙여넣기 안내 + 깜빡이는 커서
                  <div className="flex items-center gap-2 text-[#A78BDA]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M13.5 6H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 3h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M4 9h7m0 0L8 6m3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[13px] font-medium">Paste link here</span>
                    <span className="ml-0.5 h-4 w-[2px] animate-pulse bg-[#8B5CF6]" />
                  </div>
                ) : (
                  // 링크 입력됨 — 붙여넣어진 모양
                  <div key="pasted" className="kdemo-paste-in flex items-center gap-2.5 rounded-[10px] bg-white px-3 py-2.5 shadow-sm ring-1 ring-[#EDE9FE]">
                    {/* YouTube 썸네일 자리 */}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] bg-[#FF0000]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="truncate text-[12.5px] font-medium text-[#404040]">
                      {PASTED_LINK}
                    </span>
                  </div>
                )}
              </div>

              {/* 진행 상태 영역 */}
              <div className="mt-5 min-h-[64px]">
                {phase === 1 && (
                  <div key="loading" className="kdemo-fade-in">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#DDD6FE] border-t-[#8B5CF6]" />
                      <span className="text-[13px] font-semibold text-[#6D28D9]">
                        Generating subtitles…
                      </span>
                    </div>
                    {/* 진행바 */}
                    <div className="h-2 overflow-hidden rounded-full bg-[#EDE9FE]">
                      <div className="kdemo-progress h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9]" />
                    </div>
                    <p className="mt-2 text-[11.5px] text-[#A3A3A3]">
                      Transcribing · Translating · Syncing
                    </p>
                  </div>
                )}

                {phase === 2 && (
                  <div key="ready" className="kdemo-fade-in">
                    <div className="mb-3 flex items-center gap-2">
                      {/* 완료 체크 */}
                      <span className="kdemo-check-pop flex h-5 w-5 items-center justify-center rounded-full bg-[#8B5CF6]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[13px] font-semibold text-[#0A0A0A]">
                        Subtitles are ready
                      </span>
                    </div>
                    {/* Watch 버튼 + 탭 리플 */}
                    <div className="relative">
                      <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#0A0A0A] py-3 text-[14px] font-semibold text-white"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Watch with subtitles
                      </button>
                      <span className="kdemo-ripple pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/40" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── 단계 3: 유튜브 영상 + 화자별 자막 리스트(채팅 형태) ── */}
          {phase === 3 && (
            <div key="video" className="kdemo-rise absolute inset-0 z-20 flex flex-col bg-black">
              {/* 상단 영상 영역 — ILLIT 유튜브 클립 */}
              <div className="px-3 pt-9">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[#111]">
                  <Image
                    src="/image/herosection_mockupsideimages/illit.jpg"
                    alt="ILLIT 유튜브 영상"
                    fill
                    sizes="(max-width: 1024px) 80vw, 30vw"
                    className="object-cover"
                  />
                  {/* 우상단 유튜브 출처 표시 */}
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-[5px] bg-black/55 px-1.5 py-0.5 backdrop-blur-sm">
                    <span className="flex h-3 w-3 items-center justify-center rounded-[3px] bg-[#FF0000]">
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-white/90">YouTube</span>
                  </span>
                </div>
              </div>

              {/* 자막 리스트 — 한 줄씩 stagger로 등장 */}
              <div className="flex-1 space-y-3 overflow-hidden px-4 pt-4">
                {transcript.map((line, i) => (
                  <div
                    key={`${i}-${line.name}`}
                    className="kdemo-sub-in flex items-start gap-2.5"
                    style={{ animationDelay: `${0.25 + i * 0.55}s` }}
                  >
                    {/* 화자 아바타 — 이니셜 + 멤버 컬러 */}
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: line.color }}
                    >
                      {line.name[0]}
                    </span>
                    <div className="min-w-0">
                      <span
                        className="text-[12px] font-bold"
                        style={{ color: line.color }}
                      >
                        {line.name}
                      </span>
                      <p
                        className={`text-[13px] leading-snug ${
                          line.highlight
                            ? "font-semibold text-[#A78BFA] underline decoration-[#8B5CF6]/70 decoration-2 underline-offset-2"
                            : "font-medium text-white/95"
                        }`}
                      >
                        {line.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 하단 Start / Reset 컨트롤(장식) */}
              <div className="flex items-center justify-center gap-2.5 px-4 pb-7 pt-2">
                <span className="flex items-center gap-1.5 rounded-full bg-[#8B5CF6] px-5 py-2 text-[12px] font-bold text-white">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Start
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-5 py-2 text-[12px] font-semibold text-white/80">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Reset
                </span>
              </div>
            </div>
          )}

          {/* 하단 진행 인디케이터 — 현재 단계 표시 */}
          <div className="absolute inset-x-0 bottom-2.5 z-40 flex justify-center gap-1.5">
            {PHASE_DURATIONS.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === phase ? 18 : 6,
                  background:
                    i === phase
                      ? phase === 3
                        ? "#FFFFFF"
                        : "#8B5CF6"
                      : phase === 3
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(139,92,246,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
