"use client";

import { useState, useCallback } from "react";
import { testimonials } from "@/lib/mockData";

const TOTAL = testimonials.length;

function getTestimonialIndex(currentIndex: number, slotIndex: number): number {
  return (currentIndex + slotIndex + TOTAL) % TOTAL;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** 이름에서 아바타용 색상 해시 */
function getAvatarColor(name: string): string {
  const colors = ["#7FB2FF", "#5E9CFF", "#E36A8B", "#5E4CE6", "#F28B52", "#CFE9C8", "#F6C9B1"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[Math.abs(hash) % colors.length];
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL) % TOTAL);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL);
  }, []);

  return (
    <section id="testimonials" className="relative px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <h2
          className="mb-4 text-center text-sm font-semibold uppercase tracking-widest"
          style={{ color: "#6E7284" }}
        >
          Reviews
        </h2>
        <h3
          className="mb-6 text-center text-[clamp(28px,3.5vw,38px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#111327",
            letterSpacing: "-0.03em",
          }}
        >
          What our demo users are saying?
        </h3>
        <p
          className="mx-auto mb-14 max-w-[560px] text-center text-base leading-relaxed"
          style={{ color: "#6F7385" }}
        >
          Real K-pop fans from around the world share how Kaptik helps them enjoy Bubble, Fromm, Weverse, and more.
        </p>

        {/* 캐러셀 영역 */}
        <div className="relative flex items-center justify-center gap-4 md:gap-6">
          <button
            onClick={goPrev}
            type="button"
            aria-label="Previous testimonial"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5E4CE6]/40 focus:ring-offset-2"
            style={{
              background: "rgba(255,255,255,0.90)",
              boxShadow: "0 6px 20px rgba(26,31,56,0.08)",
              border: "1px solid rgba(255,255,255,0.7)",
              color: "#111327",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex flex-1 items-stretch justify-center gap-4">
            {[0, 1, 2].map((slotIndex) => {
              const t = testimonials[getTestimonialIndex(currentIndex, slotIndex)];

              return (
                <div
                  key={`${currentIndex}-${slotIndex}`}
                  className={`min-w-0 flex-1 flex-col rounded-[22px] px-5 py-5 transition-all duration-300 md:min-w-[280px] md:max-w-[360px] md:px-6 md:py-6 ${
                    slotIndex === 0
                      ? "flex"
                      : slotIndex === 1
                        ? "hidden md:flex"
                        : "hidden lg:flex"
                  }`}
                  style={{
                    background: "rgba(255,255,255,0.78)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 12px 30px rgba(26,31,56,0.08)",
                    border: "1px solid rgba(255,255,255,0.55)",
                  }}
                >
                  {/* 아바타 (이니셜) */}
                  <div
                    className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white"
                    style={{ backgroundColor: getAvatarColor(t.name) }}
                  >
                    {getInitials(t.name)}
                  </div>

                  <blockquote
                    className="mb-5 flex-1 text-[15px] leading-relaxed md:text-base"
                    style={{ color: "#6F7385" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="border-t pt-4" style={{ borderColor: "rgba(17,19,39,0.08)" }}>
                    <p
                      className="text-base font-semibold"
                      style={{ color: "#111327" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-[13px]" style={{ color: "#9AA0B2" }}>
                      {t.nationality} · {t.idolFan}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={goNext}
            type="button"
            aria-label="Next testimonial"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5E4CE6]/40 focus:ring-offset-2"
            style={{
              background: "rgba(255,255,255,0.90)",
              boxShadow: "0 6px 20px rgba(26,31,56,0.08)",
              border: "1px solid rgba(255,255,255,0.7)",
              color: "#111327",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* 인디케이터 (선택 사항) */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              className="h-2 rounded-full transition-all focus:outline-none"
              style={{
                width: i === currentIndex ? 24 : 8,
                background: i === currentIndex ? "#5E4CE6" : "rgba(17,19,39,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
