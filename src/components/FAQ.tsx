"use client";

import { FormEvent, useState } from "react";
import { faqItems } from "@/lib/mockData";
import { getSupabaseClient } from "@/lib/supabaseClient";

// crypto.randomUUID 를 지원하지 않는 브라우저에서도 항상 UUID 형태의 id 를 만들기 위한 헬퍼
function generateUUID() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  // 간단한 폴백 구현 (충분히 유니크하면 됨, 완벽한 UUID 스펙을 따를 필요는 없음)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface FAQProps {
  onJoinWaitlist: () => void;
}

export default function FAQ({ onJoinWaitlist }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [questionEmail, setQuestionEmail] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const shareUrl = "https://kaptik-subtitle.vercel.app/";

  const handleOpenQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    if (isSubmitting) return;
    setIsQuestionModalOpen(false);
  };

  const handleCloseThankYouModal = () => {
    setIsThankYouModalOpen(false);
  };

  const handleSubmitQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const trimmedEmail = questionEmail.trim().toLowerCase();
    const trimmedContent = questionContent.trim();

    if (!trimmedEmail || !trimmedContent) {
      setSubmitError("이메일과 질문 내용을 모두 입력해 주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setSubmitError("유효한 이메일 주소를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Record<string, any> = {
        id: generateUUID(),
        email: trimmedEmail,
        question: trimmedContent,
      };

      const supabase = getSupabaseClient();
      const { error } = await supabase.from("ask_questions").insert(payload);

      if (error) {
        // eslint-disable-next-line no-console
        console.error("FAQ ask_questions insert error:", error);
        setSubmitError(
          error.message ||
            "질문을 저장하는 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
        );
        return;
      }

      try {
        if (typeof window !== "undefined") {
          void fetch("/api/meta/conversion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventName: "Contact",
              userEmail: trimmedEmail,
              eventSourceUrl: window.location.href,
            }),
          });
        }
      } catch (conversionError) {
        // eslint-disable-next-line no-console
        console.error("Meta conversion API call failed (ask question):", conversionError);
      }

      setQuestionEmail("");
      setQuestionContent("");
      setIsQuestionModalOpen(false);
      setIsThankYouModalOpen(true);
      setIsLinkCopied(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("FAQ ask_questions unexpected error:", err);
      setSubmitError("알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="faq" className="relative px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[800px]">
        <h2
          className="mb-4 text-center text-sm font-semibold uppercase tracking-widest"
          style={{
            color: "#A3A3A3",
          }}
        >
          FAQ
        </h2>

        <h3
          className="mb-6 text-center text-[clamp(28px,3.5vw,38px)] font-bold leading-tight tracking-tight"
          style={{
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
          }}
        >
          About Kaptik
        </h3>

        <p
          className="mx-auto mb-12 max-w-[540px] text-center text-base leading-relaxed"
          style={{ color: "#525252" }}
        >
          Find out what Kaptik is, how it connects with your favorite K-pop
          platforms, and how you can bring studio-quality subtitles into your
          daily fandom life.
        </p>

        <div className="space-y-2">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[16px] border border-[#EAEAEA] bg-white"
              style={{
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[#FAFAFA] focus:outline-none"
                aria-expanded={openId === item.id}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-question-${item.id}`}
              >
                <span
                  className="text-base font-medium md:text-[17px]"
                  style={{ color: "#0A0A0A" }}
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
                      color: "#525252",
                      borderColor: "#EAEAEA",
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
            className="w-full max-w-[260px] rounded-[999px] bg-[#0A0A0A] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
          >
            Ask a question
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
            className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
            aria-label="Close modal"
          />

          <div
            className="relative w-full max-w-[480px] rounded-[24px] p-7"
            style={{
              background: "#FFFFFF",
              boxShadow: "var(--shadow-modal)",
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
              style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
            >
              Ask anything about Kaptik
            </h2>
            <p
              className="mb-6 text-[15px]"
              style={{ color: "#525252" }}
            >
              Leave your email and question, and we’ll get back to you.
            </p>

            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="faq-question-email"
                  className="text-sm font-medium"
                  style={{ color: "#0A0A0A" }}
                >
                  Email to receive the answer
                </label>
                <input
                  id="faq-question-email"
                  type="email"
                  required
                  value={questionEmail}
                  onChange={(e) => setQuestionEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
                  style={{
                    borderColor: "#EAEAEA",
                    color: "#0A0A0A",
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="faq-question-content"
                  className="text-sm font-medium"
                  style={{ color: "#0A0A0A" }}
                >
                  Your question
                </label>
                <textarea
                  id="faq-question-content"
                  required
                  rows={5}
                  value={questionContent}
                  onChange={(e) => setQuestionContent(e.target.value)}
                  placeholder="Ask us anything you’re curious about."
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
                  style={{
                    borderColor: "#EAEAEA",
                    color: "#0A0A0A",
                  }}
                />
              </div>

              {submitError && (
                <p className="mt-2 text-sm text-red-600">{submitError}</p>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-[999px] bg-[#0A0A0A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#262626] disabled:opacity-45 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
                >
                  {isSubmitting ? "Sending..." : "Send question"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseQuestionModal}
                  disabled={isSubmitting}
                  className="flex-1 rounded-[999px] border px-6 py-3 text-sm font-medium transition-colors hover:bg-[#FAFAFA]"
                  style={{
                    borderColor: "#EAEAEA",
                    color: "#0A0A0A",
                  }}
                >
                  Cancel
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
            className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
            aria-label="Close modal"
          />

          <div
            className="relative w-full max-w-[440px] rounded-[24px] p-8 text-left"
            style={{
              background: "#FFFFFF",
              boxShadow: "var(--shadow-modal)",
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
              className="mb-2 text-[22px] font-bold"
              style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
            >
              Thank you!
            </h2>
            <p
              className="mb-6 text-[15px]"
              style={{ color: "#525252" }}
            >
              We will reach you soon with an answer.
            </p>

            <div className="mb-5">
              <p
                className="mb-3 text-[15px] font-medium"
                style={{ color: "#0A0A0A" }}
              >
                Would you like to share with friends?
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1 rounded-[999px] border border-[#EAEAEA] bg-[#FAFAFA] px-4 py-3 text-sm text-[#525252]">
                  {shareUrl}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(shareUrl).then(() => {
                        setIsLinkCopied(true);
                        setTimeout(() => setIsLinkCopied(false), 2000);
                      });
                    }
                  }}
                  className="rounded-[999px] bg-[#0A0A0A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#262626] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
                >
                  {isLinkCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseThankYouModal}
              className="mt-2 w-full rounded-[999px] border px-8 py-4 text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#FAFAFA]"
              style={{ borderColor: "#EAEAEA" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
