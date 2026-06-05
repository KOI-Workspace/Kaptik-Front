"use client";

const problemCards = [
  {
    label: "01",
    title: "Weverse Live",
    description: "Layout placeholder for live subtitles and speaker context.",
  },
  {
    label: "02",
    title: "YouTube Video",
    description: "Layout placeholder for video subtitles and translation flow.",
  },
  {
    label: "03",
    title: "Another Platform",
    description: "Layout placeholder for the third K-pop fan problem.",
  },
];

export default function FanProblems() {
  return (
    <section className="relative px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <h2
          className="mx-auto mb-12 max-w-[760px] text-center text-[clamp(28px,3.6vw,44px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
          }}
        >
          These are the problems K-pop fans&nbsp;face.
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {problemCards.map((card) => (
            <article
              key={card.title}
              className="min-h-[260px] rounded-[16px] border border-[#EAEAEA] bg-white p-7"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#A3A3A3" }}
                >
                  {card.label}
                </span>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "#8B5CF6" }}
                  aria-hidden
                />
              </div>

              <h3
                className="mb-4 text-2xl font-bold tracking-tight"
                style={{
                  color: "#0A0A0A",
                  letterSpacing: "-0.02em",
                }}
              >
                {card.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#525252]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
