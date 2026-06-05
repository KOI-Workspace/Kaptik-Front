"use client";

import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   K-pop 팬들이 겪는 3대 자막 문제를 "실제 화면 목업"으로 보여주는 섹션.
   각 카드는 단순 이미지가 아니라 진짜 동작하는 듯한 UI를 재현한다.
   ────────────────────────────────────────────────────────────── */

// 카드 셸 — 흰 캔버스 + 제목 + 하단 UI 목업 슬롯
function ProblemCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#EAEAEA] bg-white"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="flex min-h-[132px] items-center justify-center px-7 py-8">
        <h3
          className="max-w-[280px] text-center text-[clamp(26px,2.4vw,34px)] font-bold leading-[1.05] tracking-tight"
          style={{ color: "#0A0A0A", letterSpacing: "-0.02em" }}
        >
          {title}
        </h3>
      </div>

      {/* 하단 UI 목업 영역 — 세 카드의 목업 높이를 동일하게 고정한다. */}
      <div className="mt-auto h-[224px] px-5 pb-5">{children}</div>
    </article>
  );
}

/* 목업 1 — 자막 지연: 실제 팬 불만을 X(트위터) 화면처럼 재현 */
function DelayMock() {
  return (
    <div className="h-full space-y-2.5 overflow-hidden rounded-[14px] border border-[#2F3336] bg-[#000000] p-2.5">
      {/* 트윗 A — 일반 트윗 */}
      <div className="rounded-[12px] bg-[#16181C] px-3.5 py-3">
        <div className="flex gap-2.5">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[13px] leading-none">
              <span className="truncate font-bold text-[#E7E9EA]">yuki</span>
              <span className="truncate text-[#71767B]">@yu_kof7</span>
              <span className="text-[#71767B]">· Mar 22</span>
            </div>
            <p className="mt-1.5 text-[13px] leading-snug text-[#E7E9EA]">
              bts variety runs get me so irritated — all of them need atleast{" "}
              <span className="font-semibold">3 months</span> to{" "}
              <span className="font-semibold">subtitle</span> things 😭
            </p>
          </div>
        </div>
      </div>

      {/* 트윗 B — 리플라이 */}
      <div className="rounded-[12px] bg-[#16181C] px-3.5 py-3">
        <div className="flex gap-2.5">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#6366F1]" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[13px] leading-none">
              <span className="truncate font-bold text-[#E7E9EA]">hana</span>
              <span className="truncate text-[#71767B]">@hyeonie_com</span>
              <span className="text-[#71767B]">· Aug 25</span>
            </div>
            <div className="mt-1 text-[12px] text-[#71767B]">
              Replying to{" "}
              <span className="text-[#1D9BF0]">@cortis_bighit</span>
            </div>
            <p className="mt-1 text-[13px] leading-snug text-[#E7E9EA]">
              add english <span className="font-semibold">subtitle</span> please
              😭😭
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 목업 2 — 과한 의역: 원문(한국어) → 편집 자막 비교 */
function ParaphraseMock() {
  return (
    <div className="flex h-full flex-col justify-center space-y-2 rounded-[14px] border border-[#EAEAEA] bg-[#FAFAFA] p-4">
      {/* 아티스트가 의도한 의미 */}
      <div className="rounded-[10px] border border-[#EAEAEA] bg-white px-3.5 py-3">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8B5CF6]">
            What the artist meant
          </span>
        </div>
        <p className="text-[14px] leading-snug text-[#0A0A0A]">
          I love you, ARMY.
        </p>
      </div>

      {/* 변환 화살표 */}
      <div className="flex justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M12 19l-6-6M12 19l6-6" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 문화적 맥락이 빠진 번역 */}
      <div className="rounded-[10px] border border-[#F1D4D4] bg-white px-3.5 py-3">
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#DC2626]">
            What it translates
          </span>
        </div>
        <p className="text-[14px] leading-snug text-[#0A0A0A]">
          I love going to the Army.
        </p>
      </div>
    </div>
  );
}

/* 목업 3 — Weverse 자동자막 오역: 라이브 플레이어 + 엉터리 자막 */
function WeverseMock() {
  return (
    <div className="h-full overflow-hidden rounded-[14px] bg-black">
      <div className="relative h-full w-full">
        {/* 실제 인물 캡처 — 상단(얼굴)만 노출하고 원본 자막은 가린다 */}
        <Image
          src="/image/problems/weverse-mistranslation.png"
          alt="Weverse Live auto-caption"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          style={{ objectPosition: "top" }}
        />
        {/* 좌상단 LIVE 배지 */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-white">
            Live
          </span>
        </div>

        {/* 하단 자동자막 오버레이 */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-3 pt-8">
          <div className="inline-flex max-w-[92%] bg-black/85 px-3 py-2.5">
            <p className="text-center text-[13px] font-medium leading-snug text-white">
              It&apos;s been a long time since I met my mother-in-law.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FanProblems() {
  return (
    <section id="fan-problems" className="relative scroll-mt-[88px] px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <h2
          className="mx-auto mb-12 max-w-[760px] text-center text-[clamp(28px,3.6vw,44px)] font-bold leading-tight tracking-tight"
          style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
        >
          These are the subtitle problems you know too well
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <ProblemCard
            title="Subtitles arrive days late."
          >
            <DelayMock />
          </ProblemCard>

          <ProblemCard
            title="Cultural Context gets lost"
          >
            <ParaphraseMock />
          </ProblemCard>

          <ProblemCard
            title="Auto translations make no sense."
          >
            <WeverseMock />
          </ProblemCard>
        </div>
      </div>
    </section>
  );
}
