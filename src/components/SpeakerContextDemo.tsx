"use client";

/* ──────────────────────────────────────────────────────────────
   "Speaker and context" 기능을 보여주는 UI 데모.
   화자별 대사 + 그 아래에 떠 있는 cultural context 카드 두 세트를
   실제 Kaptik 자막 화면(다크)처럼 보여준다.
   ────────────────────────────────────────────────────────────── */

// 대사 한 줄을 일반 텍스트와 보라 밑줄 강조 구간으로 나눠 표현한다.
type Segment = { text: string; highlight?: boolean };

type Dialogue = {
  name: string; // 화자 이름
  initial: string; // 아바타에 표시할 이니셜
  color: string; // 화자 컬러 (이름·아바타)
  line: Segment[];
  context: { title: string; body: string };
};

const dialogues: Dialogue[] = [
  {
    name: "V",
    initial: "V",
    color: "#3B82F6",
    line: [
      { text: "The " },
      { text: "40-kilometers march", highlight: true },
      { text: "." },
    ],
    context: {
      title: "40km March",
      body: 'A grueling January basic-training march. V\'s "this time of year" instantly triggered military flashbacks.',
    },
  },
  {
    name: "Jin",
    initial: "JN",
    color: "#EC4899",
    line: [
      {
        text: "But if something feels weird, shouldn't you go to the dentist? Hahaha.",
        highlight: true,
      },
    ],
    context: {
      title: 'Dad joke on "이상하다"',
      body: '"Weird" in Korean (이상하다) sounds like a dental complaint. Jin turned J-Hope\'s observation into a dentist joke.',
    },
  },
];

export default function SpeakerContextDemo() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[480px] rounded-[24px] bg-[#0A0A0A] p-6 shadow-[0_28px_80px_rgba(10,10,10,0.24)] ring-1 ring-[#262626] md:p-8">
        <div className="space-y-8">
          {dialogues.map((d) => (
            <div key={d.name}>
              {/* 화자 헤더 — 아바타 + 이름 */}
              <div className="mb-2 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
                  style={{
                    color: d.color,
                    background: `${d.color}1A`, // 12% 불투명 배경
                    boxShadow: `inset 0 0 0 1.5px ${d.color}66`,
                  }}
                >
                  {d.initial}
                </span>
                <span
                  className="text-[15px] font-bold"
                  style={{ color: d.color }}
                >
                  {d.name}
                </span>
              </div>

              {/* 대사 — 강조 구간은 보라 밑줄 */}
              <p className="pl-12 text-[17px] font-semibold leading-snug text-white">
                {d.line.map((seg, i) =>
                  seg.highlight ? (
                    <span
                      key={i}
                      className="text-[#A78BFA] underline decoration-[#8B5CF6]/70 decoration-2 underline-offset-[3px]"
                    >
                      {seg.text}
                    </span>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  )
                )}
              </p>

              {/* cultural context 카드 — 대사 아래에 떠 있는 형태 */}
              <div className="ml-12 mt-3 rounded-[16px] border border-[#8B5CF6]/40 bg-[#15101F] p-4">
                <div className="mb-1.5 flex items-start justify-between gap-3">
                  <h5 className="text-[14px] font-bold text-[#A78BFA]">
                    {d.context.title}
                  </h5>
                  {/* 닫기 아이콘 (장식) */}
                  <svg
                    className="mt-0.5 shrink-0 text-[#6B7280]"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[13.5px] leading-relaxed text-[#D1D5DB]">
                  {d.context.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
