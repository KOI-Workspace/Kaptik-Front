"use client";

const beforeProblems = [
  "누가 부르는지 알 수 없음",
  "문맥 없는 직역",
  "발음 정보 없음",
];

const afterBenefits = [
  "Indicates the person speaking",
  "Highly accurate Real time Subtitles",
];

export default function WhyKaptik() {
  return (
    <section id="features" className="relative px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <h2
          className="mb-16 text-center text-[clamp(30px,4vw,42px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#111327",
            letterSpacing: "-0.03em",
          }}
        >
          Why Kaptik?
        </h2>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* BEFORE */}
          <div
            className="rounded-[24px] p-8 backdrop-blur-[14px]"
            style={{
              background: "rgba(255,255,255,0.78)",
              boxShadow: "0 12px 30px rgba(26,31,56,0.08)",
              border: "1px solid rgba(255,255,255,0.55)",
            }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <h3
                className="text-xl font-bold"
                style={{ color: "#111327" }}
              >
                BEFORE
              </h3>
              <span
                className="rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  background: "rgba(110, 114, 132, 0.2)",
                  color: "#6E7284",
                }}
              >
                일반 자막
              </span>
            </div>
            <div
              className="mb-6 overflow-hidden rounded-2xl"
              style={{
                boxShadow: "0 8px 24px rgba(26,31,56,0.1)",
              }}
            >
              <video
                src="/videos/BTS subtitle Before.mp4"
                controls
                playsInline
                className="h-auto w-full"
              />
            </div>
            <ul className="space-y-3">
              {beforeProblems.map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[15px] leading-relaxed"
                  style={{ color: "#23263A" }}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ color: "#E36A8B", background: "rgba(227,106,139,0.12)" }}
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M2 2l8 8M10 2L2 10" />
                    </svg>
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER */}
          <div
            className="rounded-[24px] p-8 backdrop-blur-[14px]"
            style={{
              background: "rgba(255,255,255,0.78)",
              boxShadow: "0 12px 30px rgba(26,31,56,0.08)",
              border: "1px solid rgba(255,255,255,0.55)",
            }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <h3
                className="text-xl font-bold"
                style={{ color: "#111327" }}
              >
                AFTER
              </h3>
              <span
                className="rounded-full px-3 py-1 text-sm font-semibold text-white"
                style={{
                  background: "#E36A8B",
                }}
              >
                Kaptik
              </span>
            </div>
            <div
              className="mb-6 overflow-hidden rounded-2xl"
              style={{
                boxShadow: "0 8px 24px rgba(26,31,56,0.1)",
              }}
            >
              <video
                src="/videos/BTSsubtitleAfter_mp4.mp4"
                controls
                playsInline
                className="h-auto w-full"
              />
            </div>
            <ul className="space-y-3">
              {afterBenefits.map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[15px] leading-relaxed"
                  style={{ color: "#23263A" }}
                >
                  <span
                    className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "#5E4CE6" }}
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
