"use client";

import { useState, useCallback } from "react";
import { testimonials } from "@/lib/mockData";

const TOTAL = testimonials.length;

function getTestimonialIndex(currentIndex: number, slotIndex: number): number {
  return (currentIndex + slotIndex + TOTAL) % TOTAL;
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
    <section id="testimonials" className="relative px-5 py-16 md:px-12 md:py-20 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <h2
          className="mx-auto mb-14 max-w-[820px] text-center text-[clamp(30px,8vw,44px)] font-bold leading-tight tracking-tight md:text-[clamp(34px,4vw,48px)]"
          style={{
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
          }}
        >
          What our demo users are saying
        </h2>

        {/* 캐러셀 영역 */}
        <div className="relative flex items-center justify-center gap-4 md:gap-6">
          <button
            onClick={goPrev}
            type="button"
            aria-label="Previous testimonial"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all hover:bg-[#FAFAFA] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 focus:ring-offset-2"
            style={{
              background: "#FFFFFF",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid #EAEAEA",
              color: "#0A0A0A",
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
                  className={`min-w-0 flex-1 flex-col rounded-[16px] px-5 py-5 transition-all duration-300 md:min-w-[280px] md:max-w-[360px] md:px-6 md:py-6 ${
                    slotIndex === 0
                      ? "flex"
                      : slotIndex === 1
                        ? "hidden md:flex"
                        : "hidden lg:flex"
                  }`}
                  style={{
                    background: "#FFFFFF",
                    boxShadow: "var(--shadow-sm)",
                    border: "1px solid #EAEAEA",
                  }}
                >
                  <blockquote
                    className="mb-5 flex-1 text-[15px] leading-relaxed md:text-base"
                    style={{ color: "#525252" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="border-t pt-4" style={{ borderColor: "#EAEAEA" }}>
                    <p
                      className="text-base font-semibold"
                      style={{ color: "#0A0A0A" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-[13px]" style={{ color: "#A3A3A3" }}>
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
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all hover:bg-[#FAFAFA] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 focus:ring-offset-2"
            style={{
              background: "#FFFFFF",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid #EAEAEA",
              color: "#0A0A0A",
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
                background: i === currentIndex ? "#8B5CF6" : "#D4D4D4",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
