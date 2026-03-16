"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AskQuestion() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedQuestion = question.trim();

    if (!trimmedEmail || !trimmedQuestion) {
      setError("Email and question are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const locale =
        typeof navigator !== "undefined" ? navigator.language : undefined;
      const userAgent =
        typeof navigator !== "undefined" ? navigator.userAgent : undefined;
      const referrer =
        typeof document !== "undefined" && document.referrer
          ? document.referrer
          : undefined;
      const country = undefined;
      const contextPage =
        typeof window !== "undefined" ? window.location.pathname : undefined;

      // ask_questions.id 가 uuid 이고 기본값이 없을 수 있으므로, 클라이언트에서 직접 생성
      const generatedId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : undefined;

      const payload: Record<string, any> = {
        email: trimmedEmail,
        name: name || null,
        question: trimmedQuestion,
      };

      if (generatedId) {
        payload.id = generatedId;
      }

      const { error: insertError } = await supabase
        .from("ask_questions")
        .insert(payload);

      if (insertError) {
        console.error("ask_questions insert error:", insertError);
        setError(
          insertError.message ||
            "Something went wrong while saving your question. Please try again."
        );
        return;
      }

      setSuccess(true);
      setEmail("");
      setQuestion("");
      setName("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative px-6 pb-20 pt-6 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[720px] rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur">
        <h2 className="mb-3 text-2xl font-bold" style={{ color: "#111327" }}>
          Ask a question
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#6F7385" }}>
          궁금한 점이 있다면 언제든지 남겨주세요. 이메일로 답변을 보내드릴게요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: "#111327" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled={isSubmitting}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--violet-glow)] focus:ring-opacity-40 disabled:opacity-60"
              style={{ borderColor: "#E9EAF2", color: "#111327" }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: "#111327" }}
            >
              Name (optional)
            </label>
            <input
              type="text"
              value={name}
              disabled={isSubmitting}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--violet-glow)] focus:ring-opacity-40 disabled:opacity-60"
              style={{ borderColor: "#E9EAF2", color: "#111327" }}
              placeholder="Your name or nickname"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: "#111327" }}
            >
              Question
            </label>
            <textarea
              value={question}
              disabled={isSubmitting}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[120px] w-full rounded-xl border px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--violet-glow)] focus:ring-opacity-40 disabled:opacity-60"
              style={{ borderColor: "#E9EAF2", color: "#111327" }}
              placeholder="What would you like to ask about Kaptik?"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && (
            <p className="text-sm text-emerald-600">
              감사합니다! 질문이 접수되었어요. 가능한 빨리 이메일로 답변을
              드릴게요.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-[999px] px-8 py-3.5 text-sm font-medium transition-all hover:opacity-95 hover:shadow-[0 10px 28px rgba(94,76,230,0.35)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
            style={{
              background: "#5E4CE6",
              color: "#FFFFFF",
              boxShadow: "0 6px 20px rgba(94,76,230,0.25)",
            }}
          >
            {isSubmitting ? "Sending..." : "Send question"}
          </button>
        </form>
      </div>
    </section>
  );
}

