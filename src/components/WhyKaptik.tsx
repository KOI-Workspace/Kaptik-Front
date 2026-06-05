"use client";

import LiveSubtitleDemo from "./LiveSubtitleDemo";
import LinkSubtitleDemo from "./LinkSubtitleDemo";
import LanguagesDemo from "./LanguagesDemo";
import SpeakerContextDemo from "./SpeakerContextDemo";
import DevicesDemo from "./DevicesDemo";

const solutionFeatures = [
  {
    id: "live",
    eyebrow: "Live subtitles",
    title: "Follow every live moment without waiting",
    description:
      "Kaptik delivers high-quality subtitles alongside K-pop live videos, so global fans can understand what is happening as it happens.",
    imageSide: "right",
  },
  {
    id: "link",
    eyebrow: "Any video link",
    title: "Turn any YouTube or TikTok clip into a subtitled video",
    description:
      "Paste the link to a video you have always wanted to watch, wait a few minutes, and get polished subtitles ready to follow.",
    imageSide: "left",
  },
  {
    id: "context",
    eyebrow: "Speaker and context",
    title: "Know who said what and why it matters",
    description:
      "Kaptik labels speakers and explains fandom slang, cultural references, and hidden nuance that general subtitles often miss.",
    imageSide: "right",
  },
  {
    id: "languages",
    eyebrow: "30+ languages",
    title: "Share the same moment in 30+ languages",
    description:
      "Translate subtitles into more than 30 languages so fans around the world can follow K-pop content in their own language.",
    imageSide: "left",
  },
  {
    id: "devices",
    eyebrow: "Any device",
    title: "Available on any devices",
    description:
      "Use Kaptik across desktop browsers, iOS, and Android with the same focused subtitle experience.",
    imageSide: "right",
  },
];

export default function WhyKaptik() {
  return (
    <section id="features" className="relative py-16 md:py-20">
      <div className="mx-auto max-w-[1120px] px-5 md:px-12 lg:px-16">
        <h2
          className="mx-auto mb-8 hidden max-w-[820px] text-center text-[clamp(30px,8vw,44px)] font-bold leading-tight tracking-tight md:mb-12 md:block md:text-[clamp(34px,4vw,48px)]"
          style={{
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
          }}
        >
          How we solve the problem
        </h2>
      </div>

      <div>
        {solutionFeatures.map((feature, index) => {
          // 각 기능별 실제 사용 장면을 보여주는 데모 목업.
          const media =
            feature.id === "live" ? (
              <LiveSubtitleDemo />
            ) : feature.id === "link" ? (
              <LinkSubtitleDemo />
            ) : feature.id === "languages" ? (
              <LanguagesDemo />
            ) : feature.id === "context" ? (
              <SpeakerContextDemo />
            ) : feature.id === "devices" ? (
              <DevicesDemo />
            ) : (
              <div
                className="flex aspect-[4/3] min-h-[280px] w-full items-center justify-center rounded-[16px] border border-dashed border-[#D4D4D4] bg-[#FAFAFA]"
                aria-hidden
              >
                <span className="text-sm text-[#A3A3A3]">이미지 자리</span>
              </div>
            );

          const textContent = (
            <div className="mx-auto flex max-w-[520px] flex-col items-center text-center md:mx-0 md:items-start md:text-left">
              <span
                className="mb-4 w-fit rounded-[999px] px-4 py-1.5 text-xs font-bold md:mb-5 md:px-5 md:py-2 md:text-sm"
                style={{
                  background: "#F5F3FF",
                  color: "#6D28D9",
                }}
              >
                {feature.eyebrow}
              </span>
              <h3
                className="mb-4 text-[clamp(30px,8.4vw,44px)] font-bold leading-[1.03] tracking-tight md:text-[clamp(36px,4vw,52px)]"
                style={{
                  color: "#0A0A0A",
                  letterSpacing: "-0.03em",
                }}
              >
                {feature.title}
              </h3>
              <p className="max-w-[460px] text-[15px] leading-relaxed text-[#525252] md:text-base">
                {feature.description}
              </p>
            </div>
          );

          const textOrder =
            feature.imageSide === "left" ? "md:order-2" : "md:order-1";
          const mediaOrder =
            feature.imageSide === "left" ? "md:order-1" : "md:order-2";

          return (
            <article
              key={feature.title}
              className={`${index % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"} px-5 py-16 md:px-12 md:py-24 lg:px-16`}
            >
              <div className="mx-auto grid max-w-[1120px] items-center gap-10 md:min-h-[520px] md:grid-cols-2 md:gap-14 lg:gap-20">
                <div className={textOrder}>{textContent}</div>
                <div className={`flex justify-center ${mediaOrder}`}>{media}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
