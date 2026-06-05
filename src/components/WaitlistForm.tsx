"use client";

import { FormEvent, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import WaitlistBubble from "./WaitlistBubble";

interface WaitlistFormProps {
  onSuccess: () => void;
  // 폼 하단의 보라 버블(인원수) 노출 여부. 기본은 노출.
  showBubble?: boolean;
}

export default function WaitlistForm({
  onSuccess,
  showBubble = true,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = getSupabaseClient();
      const { error: insertError } = await supabase.from("waitlist").insert({
        email: trimmed,
      });

      if (insertError) {
        // 이미 등록된 이메일은 실패가 아니라 신청 완료로 처리한다.
        const duplicateError = insertError as { code?: string; message?: string };
        if (
          duplicateError.code === "23505" ||
          duplicateError.message?.includes("duplicate key value")
        ) {
          onSuccess();
          setEmail("");
          return;
        }

        console.error(insertError);
        setError("Something went wrong. Please try again.");
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
              eventName: "Lead",
              userEmail: trimmed,
              eventSourceUrl: window.location.href,
            }),
          });
        }
      } catch (conversionError) {
        console.error("Meta conversion API call failed (waitlist):", conversionError);
      }

      setEmail("");
      // 새 이메일이 실제로 추가됐을 때만 버블 인원수를 즉시 +1 하도록 알린다.
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("waitlist:joined"));
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id="waitlist-form"
      onSubmit={handleSubmit}
      className="mt-5 w-full max-w-[560px] min-w-0 sm:mt-8"
    >
      <div className="flex min-w-0 flex-row gap-2 rounded-[18px] border border-[#EAEAEA] bg-white p-2 shadow-[0_16px_45px_rgba(10,10,10,0.08)] sm:gap-3">
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isSubmitting}
          className="min-h-[48px] min-w-0 flex-1 rounded-[12px] px-3 text-[15px] text-[#0A0A0A] outline-none placeholder:text-[#A3A3A3] disabled:opacity-60 sm:min-h-[52px] sm:px-4 sm:text-base"
          aria-invalid={!!error}
          aria-describedby={error ? "waitlist-email-error" : "waitlist-meta"}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-[48px] shrink-0 whitespace-nowrap rounded-[999px] bg-[#0A0A0A] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none sm:min-h-[52px] sm:px-6 sm:text-base"
        >
          {isSubmitting ? "Joining..." : "Join Waitlist"}
        </button>
      </div>

      {error && (
        <p id="waitlist-email-error" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {showBubble && (
        <div id="waitlist-meta" className="mt-7 flex justify-center md:mt-10">
          <WaitlistBubble />
        </div>
      )}
    </form>
  );
}
