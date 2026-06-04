"use client";

const solutionFeatures = [
  {
    eyebrow: "Live subtitles",
    title: "Follow every live moment without waiting",
    description:
      "Kaptik delivers high-quality subtitles alongside K-pop live videos, so global fans can understand what is happening as it happens.",
    imageSide: "right",
  },
  {
    eyebrow: "Any video link",
    title: "Turn any YouTube or TikTok clip into a subtitled video",
    description:
      "Paste the link to a video you have always wanted to watch, wait a few minutes, and get polished subtitles ready to follow.",
    imageSide: "left",
  },
  {
    eyebrow: "Speaker and context",
    title: "Know who said what and why it matters",
    description:
      "Kaptik labels speakers and explains fandom slang, cultural references, and hidden nuance that general subtitles often miss.",
    imageSide: "right",
  },
  {
    eyebrow: "30+ languages",
    title: "Share the same moment in 30+ languages",
    description:
      "Translate subtitles into more than 30 languages so fans around the world can follow K-pop content in their own language.",
    imageSide: "left",
  },
  {
    eyebrow: "Any device",
    title: "Available on any devices",
    description:
      "Use Kaptik across desktop browsers, iOS, and Android with the same focused subtitle experience.",
    imageSide: "right",
  },
];

export default function WhyKaptik() {
  return (
    <section id="features" className="relative px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <h2
          className="mb-14 text-center text-[clamp(30px,4vw,48px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
          }}
        >
          How we solve the problem
        </h2>

        <div className="space-y-16">
          {solutionFeatures.map((feature) => {
            const imagePlaceholder = (
              <div
                className="flex aspect-[4/3] min-h-[320px] w-full items-center justify-center rounded-[16px] border border-dashed border-[#D4D4D4] bg-[#FAFAFA]"
                aria-hidden
              >
                <span className="text-sm text-[#A3A3A3]">이미지 자리</span>
              </div>
            );

            const textContent = (
              <div className="flex flex-col justify-center">
                <span
                  className="mb-6 w-fit rounded-[999px] px-5 py-2 text-sm font-semibold"
                  style={{
                    background: "#F5F3FF",
                    color: "#6D28D9",
                  }}
                >
                  {feature.eyebrow}
                </span>
                <h3
                  className="mb-6 text-[clamp(30px,4.2vw,56px)] font-bold leading-[1.05] tracking-tight"
                  style={{
                    color: "#0A0A0A",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {feature.title}
                </h3>
                <p className="max-w-[560px] text-lg leading-relaxed text-[#525252]">
                  {feature.description}
                </p>
              </div>
            );

            return (
              <article
                key={feature.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {feature.imageSide === "left" ? imagePlaceholder : textContent}
                {feature.imageSide === "left" ? textContent : imagePlaceholder}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
