"use client";

/* ──────────────────────────────────────────────────────────────
   "Available on any devices" 기능 목업.
   왼쪽: PC 브라우저 창 + Kaptik 크롬 확장 팝업
   오른쪽 앞: 모바일 폰에 떠 있는 자막 화면
   다른 데모들과 동일한 다크 자막 톤·보라 강조를 재사용한다.
   ────────────────────────────────────────────────────────────── */

// 크롬 확장 팝업에 쓰는 짧은 자막 샘플
const captions = [
  { name: "V", color: "#3B82F6", text: "The 40-kilometers march." },
  { name: "Jin", color: "#EC4899", text: "Ahaha, around this time of year?" },
];

// 모바일 폰에 표시하는 화자별 자막 — LinkSubtitleDemo의 채팅형 뷰와 톤을 맞춘다.
const mobileTranscript = [
  { name: "Jin", initial: "JN", color: "#EC4899", text: "Military, military." },
  { name: "V", initial: "V", color: "#3B82F6", text: "The 40-kilometers march.", highlight: true },
  { name: "Jin", initial: "JN", color: "#EC4899", text: "Ahaha, around this time of year?" },
];

export default function DevicesDemo() {
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-[560px] pb-16 pr-10 sm:pb-12 sm:pr-16">
        {/* ── PC 브라우저 창 ── */}
        <div className="relative z-10 overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white shadow-[0_28px_80px_rgba(10,10,10,0.16),0_8px_22px_rgba(10,10,10,0.08)]">
          {/* 브라우저 툴바 */}
          <div className="flex items-center gap-3 border-b border-[#ECECEC] bg-[#F6F6F6] px-4 py-2.5">
            {/* 신호등 버튼 */}
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            {/* 주소창 */}
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 ring-1 ring-[#E5E5E5]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#A3A3A3]">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span className="truncate text-[11px] text-[#737373]">youtube.com/watch?v=bts-live</span>
            </div>
            {/* 핀 고정된 Kaptik 확장 아이콘 (활성 강조) */}
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-sm ring-2 ring-[#DDD6FE]">
              <span className="text-[12px] font-extrabold leading-none text-white">k</span>
            </span>
          </div>

          {/* 영상 영역 */}
          <div className="relative aspect-[16/10] bg-[#0A0A0A]">
            <img 
              src="/image/herosection_mockupsideimages/cortis.jpg" 
              alt="Cortis Performance" 
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            {/* 화면 하단 Kaptik 자막 오버레이 */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center px-4">
              <span className="rounded-[8px] bg-black/65 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur-sm">
                <span className="text-[#60A5FA]">Martin </span>
                We are so excited to perform <span className="text-[#A78BFA] underline decoration-[#8B5CF6]/70 decoration-2 underline-offset-2">our new single</span> for you today!
              </span>
            </div>

            {/* 크롬 확장 팝업 — 확장 아이콘 아래에 떠 있는 형태 */}
            <div className="absolute right-3 top-3 w-[200px] overflow-hidden rounded-[12px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
              {/* 팝업 헤더 */}
              <div className="flex items-center gap-2 border-b border-[#F0F0F0] px-3 py-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]">
                  <span className="text-[10px] font-extrabold leading-none text-white">k</span>
                </span>
                <span className="text-[12px] font-bold tracking-tight text-[#0A0A0A]">Kaptik</span>
                <span className="ml-auto flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EF4444]" />
                  <span className="text-[9px] font-bold uppercase tracking-wide text-[#EF4444]">Live</span>
                </span>
              </div>
              {/* 자막 리스트 */}
              <div className="space-y-2 px-3 py-2.5">
                <div className="text-[11px] leading-snug">
                  <span className="font-bold text-[#3B82F6]">Martin </span>
                  <span className="text-[#404040]">We are so excited to perform...</span>
                </div>
                <div className="text-[11px] leading-snug">
                  <span className="font-bold text-[#EC4899]">James </span>
                  <span className="text-[#404040]">Hope you guys like it!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 모바일 폰 (앞에 겹쳐 배치) — 데모 영상의 자막 뷰와 유사하게 ── */}
        <div className="absolute -bottom-2 right-0 z-20 w-[132px] sm:w-[152px]">
          <div className="relative aspect-[9/19.5] rounded-[22px] bg-[#050505] p-[5px] shadow-[0_20px_50px_rgba(10,10,10,0.3)] ring-1 ring-[#262626]">
            {/* 노치 */}
            <div className="pointer-events-none absolute left-1/2 top-[6px] z-30 h-[10px] w-[30%] -translate-x-1/2 rounded-b-[8px] bg-[#050505]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[18px] bg-[#0A0A0A]">
              {/* 상단 앱 헤더 */}
              <div className="flex items-center gap-1.5 px-2.5 pt-3.5 pb-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9]">
                  <span className="text-[7px] font-extrabold leading-none text-white">k</span>
                </span>
                <span className="text-[8px] font-bold tracking-tight text-white">Kaptik</span>
                <span className="ml-auto flex items-center gap-0.5">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-[#EF4444]" />
                  <span className="text-[6px] font-bold uppercase tracking-wide text-[#EF4444]">Live</span>
                </span>
              </div>

              {/* 영상 썸네일 영역 */}
              <div className="relative mx-2 aspect-[16/10] overflow-hidden rounded-[8px] bg-[#0A0A0A]">
                <img 
                  src="/image/herosection_mockupsideimages/cortis.jpg" 
                  alt="Cortis Live" 
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                />
                {/* Weverse 출처 배지 */}
                <span className="absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-[3px] bg-black/55 px-1 py-0.5 backdrop-blur-sm">
                  <img src="/image/fandom platform logos_png/Weverse_logo 1.png" alt="Weverse" className="h-2 w-2 object-contain" />
                  <span className="text-[5px] font-semibold uppercase tracking-wide text-white/90">Weverse</span>
                </span>
              </div>

              {/* 화자별 자막 리스트 (채팅형) */}
              <div className="flex-1 space-y-2 px-2.5 pt-2.5">
                <div className="flex items-start gap-1.5">
                  <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[6px] font-bold text-white bg-[#3B82F6]">MT</span>
                  <div className="min-w-0">
                    <span className="text-[7px] font-bold text-[#3B82F6]">Martin</span>
                    <p className="text-[8px] leading-snug font-semibold text-[#A78BFA] underline decoration-[#8B5CF6]/70 decoration-1 underline-offset-1">
                      We are so excited to perform...
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[6px] font-bold text-white bg-[#EC4899]">JM</span>
                  <div className="min-w-0">
                    <span className="text-[7px] font-bold text-[#EC4899]">James</span>
                    <p className="text-[8px] leading-snug font-medium text-white/95">
                      Hope you guys like it!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
