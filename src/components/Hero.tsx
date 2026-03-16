"use client";
import SplitText from "./SplitText";

interface HeroProps {
  onJoinWaitlist: () => void;
  onHowToUse: () => void;
}

export default function Hero({
  onJoinWaitlist,
  onHowToUse,
}: HeroProps) {
  return (
    <section
      className="relative px-6 pt-[150px] pb-24 md:px-12 lg:px-16"
      style={{ paddingTop: "calc(88px + 80px)" }}
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-col items-center text-center">
          {/* Headline - SplitText 글자별 애니메이션 */}
          <SplitText
            text="Understand everything your bias says"
            tag="h1"
            className="max-w-[90%] text-[clamp(36px,6vw,72px)] font-bold leading-[1.02] tracking-tight md:max-w-[70%]"
            style={{
              color: "#111327",
              letterSpacing: "-0.04em",
            }}
            splitType="chars"
            delay={50}
            duration={1.25}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />

          {/* Subcopy */}
          <p
            className="mt-6 max-w-[600px] text-[clamp(18px,2.2vw,22px)] leading-relaxed"
            style={{ color: "#6F7385" }}
          >
            Kaptik turns chaotic live subtitles into clear, real-time translation with context, speaker labels, and K-pop-aware accuracy.
          </p>

          <div className="mt-10 w-full max-w-[420px]">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-4">
              <button
                type="button"
                onClick={onJoinWaitlist}
                className="w-full rounded-[999px] px-8 py-4 text-base font-medium transition-all hover:opacity-95 hover:shadow-[0 10px 28px rgba(94,76,230,0.35)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 sm:w-auto"
                style={{
                  background: "#5E4CE6",
                  color: "#FFFFFF",
                  boxShadow: "0 6px 20px rgba(94,76,230,0.25)",
                }}
              >
                Join Waitlist
              </button>
            </div>
            <p
              className="mt-4 text-sm"
              style={{ color: "#5E4CE6" }}
            >
              Sign up now to get an exclusive launch promo code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
