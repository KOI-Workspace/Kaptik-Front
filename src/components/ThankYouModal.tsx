"use client";

import { useState } from "react";
import { MOCK_SITE_LINK } from "@/lib/mockData";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MOCK_SITE_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = MOCK_SITE_LINK;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="thankyou-modal-title"
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
          id="thankyou-modal-title"
          className="mb-2 text-2xl font-bold"
          style={{ color: "#111327", letterSpacing: "-0.03em" }}
        >
          Thank you!
        </h2>
        <p
          className="mb-6 text-[15px]"
          style={{ color: "#6F7385" }}
        >
          You&apos;re on the list. We&apos;ll be in touch soon.
        </p>
        <p
          className="mb-4 text-[15px] font-medium"
          style={{ color: "#111327" }}
        >
          Would you like to share with friends?
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            readOnly
            value={MOCK_SITE_LINK}
            className="flex-1 rounded-xl border px-4 py-3 text-sm text-gray-600 bg-gray-50"
            style={{
              borderColor: "#E9EAF2",
            }}
          />
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-[999px] px-6 py-3 text-sm font-medium transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
            style={{
              background: "#111327",
              color: "#FFFFFF",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-[999px] border px-8 py-3 text-base font-medium transition-all hover:bg-black/[0.04] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
          style={{
            borderColor: "rgba(17,19,39,0.14)",
            color: "#111327",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
