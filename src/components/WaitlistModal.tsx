"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WaitlistModal({
  isOpen,
  onClose,
  onSuccess,
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setError("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

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
        setWaitlistCount(200 + count);
      }
    };

    fetchWaitlistCount();
  }, [isOpen]);

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
        // 이미 같은 이메일이 waitlist 에 있는 경우(UNIQUE 제약조건 위반)는
        // 에러로 보지 말고 "이미 웨이틀리스트에 있음"으로 처리
        // Postgres unique_violation: code 23505
        const duplicateError = insertError as { code?: string; message?: string };
        if (
          duplicateError.code === "23505" ||
          duplicateError.message?.includes("duplicate key value")
        ) {
          onSuccess();
          onClose();
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

      // 새 이메일이 실제로 추가됐을 때만 버블 인원수를 즉시 +1 하도록 알린다.
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("waitlist:joined"));
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
    >
      {/* Backdrop */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
        aria-label="Close modal"
      />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-[440px] rounded-[24px] p-8"
        style={{
          background: "#FFFFFF",
          boxShadow: "var(--shadow-modal)",
        }}
      >
        <h2
          id="waitlist-modal-title"
          className="mb-2 text-2xl font-bold"
          style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
        >
          Join the Waitlist
        </h2>
        <p
          className="mb-6 text-[15px]"
          style={{ color: "#525252" }}
        >
          Be the first to know when Kaptik launches.
          <br />
          Sign up now to get an exclusive launch promo code by email.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isSubmitting}
            className="mb-4 w-full rounded-lg border px-4 py-3.5 text-base transition-colors placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 disabled:opacity-60"
            style={{
              borderColor: "#EAEAEA",
              color: "#0A0A0A",
            }}
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
          />
          {error && (
            <p id="email-error" className="mb-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <p
            className="mb-6 text-sm"
            style={{ color: "#525252" }}
          >
            <span className="underline">
              {(waitlistCount ?? 200).toLocaleString()}
            </span>{" "}
            people have joined the waitlist so far.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mb-4 w-full rounded-[999px] bg-[#0A0A0A] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none"
          >
            {isSubmitting ? "Joining..." : "Join Waitlist"}
          </button>
        </form>
      </div>
    </div>
  );
}
