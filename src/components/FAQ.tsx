"use client";

import { useState } from "react";
import { faqItems } from "@/lib/mockData";

interface FAQProps {
  onJoinWaitlist: () => void;
}

export default function FAQ({ onJoinWaitlist }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [questionEmail, setQuestionEmail] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  const handleOpenQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  const handleCloseThankYouModal = () => {
    setIsThankYouModalOpen(false);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: 나중에 Supabase로 연동해서 실제로 DB에 저장하도록 변경 예정
    // eslint-disable-next-line no-console
    console.log("FAQ Question Submitted", {
      email: questionEmail,
      content: questionContent,
    });

    setQuestionEmail("");
    setQuestionContent("");
    setIsQuestionModalOpen(false);
    setIsThankYouModalOpen(true);
  };

  return (
    <section id="faq" className="relative px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[800px]">
        <h2
          className="mb-4 text-center text-sm font-semibold uppercase tracking-widest"
          style={{
            color: "#6E7284",
          }}
        >
          FAQ
        </h2>

        <h3
          className="mb-6 text-center text-[clamp(28px,3.5vw,38px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#111327",
            letterSpacing: "-0.03em",
          }}
        >
          About Kaptik
        </h3>

        <p
          className="mx-auto mb-12 max-w-[540px] text-center text-base leading-relaxed"
          style={{ color: "#6F7385" }}
        >
          Find out what Kaptik is, how it connects with your favorite K-pop
          platforms, and how you can bring studio-quality subtitles into your
          daily fandom life.
        </p>

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

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleOpenQuestionModal}
            className="rounded-[999px] bg-[#111327] px-7 py-3 text-sm font-medium text-white shadow-[0_10px_26px_rgba(11,15,40,0.28)] transition-all hover:-translate-y-[1px] hover:shadow-[0_14px_32px_rgba(11,15,40,0.35)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
          >
            질문하기
          </button>
        </div>
      </div>

      {isQuestionModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-question-modal-title"
        >
          <button
            type="button"
            onClick={handleCloseQuestionModal}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            aria-label="Close modal"
          />

          <div
            className="relative w-full max-w-[480px] rounded-[24px] p-7"
            style={{
              background: "#FFFFFF",
              boxShadow: "0 18px 48px rgba(17,23,39,0.14)",
            }}
          >
            <button
              type="button"
              onClick={handleCloseQuestionModal}
              className="absolute right-5 top-5 text-sm text-gray-400 transition hover:text-gray-600"
              aria-label="닫기"
            >
              ✕
            </button>

            <h2
              id="faq-question-modal-title"
              className="mb-2 text-[22px] font-bold"
              style={{ color: "#111327", letterSpacing: "-0.03em" }}
            >
              궁금한 점을 보내주세요
            </h2>
            <p
              className="mb-6 text-[15px]"
              style={{ color: "#6F7385" }}
            >
              남겨주신 이메일로 답변을 보내드릴게요.
            </p>

            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="faq-question-email"
                  className="text-sm font-medium"
                  style={{ color: "#23263A" }}
                >
                  답변받을 이메일 주소
                </label>
                <input
                  id="faq-question-email"
                  type="email"
                  required
                  value={questionEmail}
                  onChange={(e) => setQuestionEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--violet-glow)] focus:ring-opacity-40"
                  style={{
                    borderColor: "#E9EAF2",
                    color: "#111327",
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="faq-question-content"
                  className="text-sm font-medium"
                  style={{ color: "#23263A" }}
                >
                  문의 내용
                </label>
                <textarea
                  id="faq-question-content"
                  required
                  rows={5}
                  value={questionContent}
                  onChange={(e) => setQuestionContent(e.target.value)}
                  placeholder="궁금하신 점을 자유롭게 작성해주세요."
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--violet-glow)] focus:ring-opacity-40"
                  style={{
                    borderColor: "#E9EAF2",
                    color: "#111327",
                  }}
                />
              </div>

              <div className="mt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-[999px] bg-[#5E4CE6] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_28px_rgba(94,76,230,0.35)] transition-all hover:-translate-y-[1px] hover:shadow-[0_14px_32px_rgba(94,76,230,0.45)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
                >
                  질문 보내기
                </button>
                <button
                  type="button"
                  onClick={handleCloseQuestionModal}
                  className="flex-1 rounded-[999px] border px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: "#E9EAF2",
                    color: "#23263A",
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isThankYouModalOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-question-thankyou-title"
        >
          <button
            type="button"
            onClick={handleCloseThankYouModal}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            aria-label="Close modal"
          />

          <div
            className="relative w-full max-w-[360px] rounded-[24px] p-7 text-center"
            style={{
              background: "#FFFFFF",
              boxShadow: "0 18px 48px rgba(17,23,39,0.14)",
            }}
          >
            <button
              type="button"
              onClick={handleCloseThankYouModal}
              className="absolute right-5 top-5 text-sm text-gray-400 transition hover:text-gray-600"
              aria-label="닫기"
            >
              ✕
            </button>

            <h2
              id="faq-question-thankyou-title"
              className="mb-2 text-[20px] font-bold"
              style={{ color: "#111327", letterSpacing: "-0.03em" }}
            >
              문의가 접수되었어요
            </h2>
            <p
              className="mb-6 text-[14px]"
              style={{ color: "#6F7385" }}
            >
              남겨주신 이메일로 최대한 빠르게 답변 드릴게요.
            </p>

            <button
              type="button"
              onClick={handleCloseThankYouModal}
              className="w-full rounded-[999px] bg-[#111327] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_26px_rgba(11,15,40,0.28)] transition-all hover:-translate-y-[1px] hover:shadow-[0_14px_32px_rgba(11,15,40,0.35)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
