"use client";

const beforeProblems = [
  "Cannot tell who is speaking",
  "Literal translation without any context",
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
          className="mb-4 text-center text-sm font-semibold uppercase tracking-widest"
          style={{ color: "#A3A3A3" }}
        >
          Why Kaptik?
        </h2>
        <h3
          className="mb-6 text-center text-[clamp(28px,3.5vw,38px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
          }}
        >
          Features
        </h3>
        <p
          className="mx-auto mb-14 max-w-[560px] text-center text-base leading-relaxed"
          style={{ color: "#525252" }}
        >
          K-pop optimized translation model with a cross-device, cross-platform
          experience that truly makes a difference for global K-pop fans.
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* BEFORE */}
          <div
            className="rounded-[16px] border border-[#EAEAEA] bg-white p-8"
            style={{
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <h3
                className="text-xl font-bold"
                style={{ color: "#0A0A0A" }}
              >
                BEFORE
              </h3>
              <span
                className="rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  background: "#F5F5F5",
                  color: "#525252",
                }}
              >
                General subtitle
              </span>
            </div>
            <div
              className="mb-6 overflow-hidden rounded-2xl border border-[#EAEAEA]"
              style={{
                boxShadow: "var(--shadow-sm)",
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
                  style={{ color: "#0A0A0A" }}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ color: "#DC2626", background: "#FEE2E2" }}
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
            className="rounded-[16px] border border-[#EAEAEA] bg-white p-8"
            style={{
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <h3
                className="text-xl font-bold"
                style={{ color: "#0A0A0A" }}
              >
                AFTER
              </h3>
              <span
                className="rounded-full px-3 py-1 text-sm font-semibold"
                style={{
                  background: "#EDE9FE",
                  color: "#5B21B6",
                }}
              >
                Kaptik
              </span>
            </div>
            <div
              className="mb-6 overflow-hidden rounded-2xl border border-[#EAEAEA]"
              style={{
                boxShadow: "var(--shadow-sm)",
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
                  style={{ color: "#0A0A0A" }}
                >
                  <span
                    className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "#8B5CF6" }}
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
