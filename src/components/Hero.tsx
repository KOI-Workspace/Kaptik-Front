"use client";

import { useState, FormEvent } from "react";
import SplitText from "./SplitText";

interface HeroProps {
  onJoinWaitlist: () => void;
  onHowToUse: () => void;
  onEmailSubmit?: (email: string) => Promise<void>;
}

export default function Hero({
  onJoinWaitlist,
  onHowToUse,
  onEmailSubmit,
}: HeroProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return;

    setIsSubmitting(true);
    if (onEmailSubmit) {
      await onEmailSubmit(trimmed);
    }
    setIsSubmitting(false);
  };

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

          {/* Email input - 박스형 텍스트 필드, 시인성 개선 */}
          <form
            onSubmit={handleEmailSubmit}
            className="mt-10 w-full max-w-[420px]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isSubmitting}
              className="w-full rounded-2xl border-2 border-[#E9EAF2] bg-white px-6 py-4 text-left text-[clamp(16px,2vw,18px)] text-[#111327] shadow-[0_4px_20px_rgba(17,19,39,0.08)] placeholder:text-[#9AA0B2] transition-all duration-200 focus:border-[#5E4CE6] focus:outline-none focus:ring-2 focus:ring-[#5E4CE6]/25 focus:ring-offset-2 disabled:opacity-60"
            />
            <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-[999px] px-8 py-4 text-base font-medium transition-all hover:opacity-95 hover:shadow-[0 10px 28px rgba(94,76,230,0.35)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 disabled:opacity-45 sm:w-auto"
                style={{
                  background: "#5E4CE6",
                  color: "#FFFFFF",
                  boxShadow: "0 6px 20px rgba(94,76,230,0.25)",
                }}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </button>
              <button
                type="button"
                onClick={onHowToUse}
                className="w-full rounded-[999px] border px-8 py-4 text-base font-medium transition-all hover:bg-[rgba(94,76,230,0.14)] hover:border-[rgba(94,76,230,0.55)] hover:shadow-[0 6px 20px rgba(94,76,230,0.12)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 sm:w-auto"
                style={{
                  borderColor: "rgba(94,76,230,0.4)",
                  color: "#5E4CE6",
                  background: "rgba(94,76,230,0.08)",
                  boxShadow: "0 2px 8px rgba(94,76,230,0.06)",
                }}
              >
                About
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
