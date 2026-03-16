"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { MOCK_WAITLIST_COUNT, PRIVACY_POLICY_LINK } from "@/lib/mockData";

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

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setError("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
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
      // Mock API call - in production would hit real endpoint
      await new Promise((r) => setTimeout(r, 800));
      onSuccess();
      onClose();
    } catch {
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
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        aria-label="Close modal"
      />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-[440px] rounded-[24px] p-8"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 18px 48px rgba(17,23,39,0.14)",
        }}
      >
        <h2
          id="waitlist-modal-title"
          className="mb-2 text-2xl font-bold"
          style={{ color: "#111327", letterSpacing: "-0.03em" }}
        >
          Join the Waitlist
        </h2>
        <p
          className="mb-6 text-[15px]"
          style={{ color: "#6F7385" }}
        >
          Be the first to know when Kaptik launches. Sign up now and we'll email you a promo code when we launch.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={isSubmitting}
            className="mb-4 w-full rounded-xl border px-4 py-3.5 text-base transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--violet-glow)] focus:ring-opacity-40 disabled:opacity-60"
            style={{
              borderColor: "#E9EAF2",
              color: "#111327",
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
            style={{ color: "#6F7385" }}
          >
            {MOCK_WAITLIST_COUNT.toLocaleString()} people have joined the waitlist
            so far.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mb-4 w-full rounded-[999px] px-8 py-4 text-base font-medium transition-all hover:opacity-95 hover:shadow-[0 10px 28px rgba(94,76,230,0.35)] active:scale-[0.99] disabled:opacity-45 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
            style={{
              background: "#5E4CE6",
              color: "#FFFFFF",
              boxShadow: "0 6px 20px rgba(94,76,230,0.25)",
            }}
          >
            {isSubmitting ? "Joining..." : "Join Waitlist"}
          </button>
        </form>
      </div>
    </div>
  );
}
