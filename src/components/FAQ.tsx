"use client";

import { useState } from "react";
import { faqItems } from "@/lib/mockData";

interface FAQProps {
  onJoinWaitlist: () => void;
}

export default function FAQ({ onJoinWaitlist }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="relative px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[800px]">
        <h2
          className="mb-12 text-center text-[clamp(30px,4vw,42px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#111327",
            letterSpacing: "-0.03em",
          }}
        >
          FAQ
        </h2>

        <div className="space-y-2">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[24px]"
              style={{
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 12px 30px rgba(26,31,56,0.08)",
                border: "1px solid rgba(255,255,255,0.55)",
              }}
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/30 focus:outline-none"
                aria-expanded={openId === item.id}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-question-${item.id}`}
              >
                <span
                  className="text-base font-medium md:text-[17px]"
                  style={{ color: "#23263A" }}
                >
                  {item.question}
                </span>
                <span
                  className="ml-4 shrink-0 transition-transform"
                  style={{
                    transform: openId === item.id ? "rotate(180deg)" : "rotate(0)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
                className="grid transition-[grid-template-rows] duration-200 ease-in-out"
                style={{
                  gridTemplateRows: openId === item.id ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <p
                    className="border-t px-6 py-5"
                    style={{
                      color: "#6F7385",
                      borderColor: "rgba(17,19,39,0.08)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={onJoinWaitlist}
            className="rounded-[999px] px-8 py-4 text-base font-medium transition-all hover:shadow-[var(--shadow-button-hover)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
            style={{
              background: "#FFFFFF",
              color: "#111327",
              boxShadow: "0 6px 20px rgba(17,19,39,0.06)",
            }}
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}
