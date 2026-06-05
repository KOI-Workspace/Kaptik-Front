"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

interface WaitlistFormProps {
  onSuccess: () => void;
}

const WAITLIST_DISPLAY_OFFSET = 200;
const WAITLIST_LIMIT = 1000;

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      const supabase = getSupabaseClient();
      const { count, error: countError } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      if (countError) {
        console.error(countError);
        return;
      }

      if (typeof count === "number") {
        setWaitlistCount(WAITLIST_DISPLAY_OFFSET + count);
      }
    };

    fetchWaitlistCount();
  }, []);

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

    if ((waitlistCount ?? WAITLIST_DISPLAY_OFFSET) >= WAITLIST_LIMIT) {
      setError("The waitlist is full.");
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
      setWaitlistCount((current) => (current === null ? current : current + 1));
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
      className="mt-6 w-full max-w-[560px] min-w-0 sm:mt-8"
    >
      <div className="flex min-w-0 flex-col gap-3 rounded-[18px] border border-[#EAEAEA] bg-white p-2 shadow-[0_16px_45px_rgba(10,10,10,0.08)] sm:flex-row">
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isSubmitting}
          className="min-h-[48px] min-w-0 flex-1 rounded-[12px] px-4 text-base text-[#0A0A0A] outline-none placeholder:text-[#A3A3A3] disabled:opacity-60 sm:min-h-[52px]"
          aria-invalid={!!error}
          aria-describedby={error ? "waitlist-email-error" : "waitlist-meta"}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-[48px] shrink-0 rounded-[999px] bg-[#0A0A0A] px-6 text-base font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 sm:min-h-[52px]"
        >
          {isSubmitting ? "Joining..." : "Join Waitlist"}
        </button>
      </div>

      {error && (
        <p id="waitlist-email-error" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <p id="waitlist-meta" className="mt-2 text-sm leading-5 text-[#525252] sm:mt-3 sm:leading-6">
        <span className="font-semibold text-[#0A0A0A]">
          {(waitlistCount ?? WAITLIST_DISPLAY_OFFSET).toLocaleString()}
        </span>{" "}
        people have joined. Only{" "}
        <span className="font-semibold text-[#0A0A0A]">
          {WAITLIST_LIMIT.toLocaleString()}
        </span>{" "}
        spots are available until June 30.
      </p>
    </form>
  );
}
