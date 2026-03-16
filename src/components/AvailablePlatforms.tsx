"use client";

import LogoLoop from "./LogoLoop";

const PLATFORM_LOGOS = [
  { src: "/fandom platform logo/Weverse_logo 1.png", alt: "Weverse" },
  { src: "/fandom platform logo/bubble logo 1.png", alt: "Bubble" },
  { src: "/fandom platform logo/fromm logo 1.png", alt: "Fromm" },
  { src: "/fandom platform logo/instagram logo 1.png", alt: "Instagram" },
  { src: "/fandom platform logo/youtube logo 1-Photoroom 1.png", alt: "YouTube" },
  { src: "/fandom platform logo/Berriz Logo 1.png", alt: "Berriz" },
];

export default function AvailablePlatforms() {
  return (
    <section className="relative px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <h2
          className="mb-10 text-center text-[clamp(24px,3vw,32px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#111327",
            letterSpacing: "-0.03em",
          }}
        >
          Available on any platform
        </h2>
        <div
          className="overflow-hidden rounded-2xl py-6"
          style={{
            minHeight: "120px",
            background: "rgba(255,255,255,0.6)",
            boxShadow: "0 8px 24px rgba(26,31,56,0.06)",
            border: "1px solid rgba(255,255,255,0.5)",
          }}
        >
          <LogoLoop
            logos={PLATFORM_LOGOS}
            speed={80}
            direction="left"
            logoHeight={48}
            gap={56}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#f4eaf4"
            scaleOnHover
            ariaLabel="Supported platforms"
          />
        </div>
      </div>
    </section>
  );
}
