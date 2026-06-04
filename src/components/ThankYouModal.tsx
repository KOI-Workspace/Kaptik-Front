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
          id="thankyou-modal-title"
          className="mb-2 text-2xl font-bold"
          style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
        >
          Thank you!
        </h2>
        <p
          className="mb-6 text-[15px]"
          style={{ color: "#525252" }}
        >
          You&apos;re on the list. We&apos;ll be in touch soon.
        </p>
        <p
          className="mb-4 text-[15px] font-medium"
          style={{ color: "#0A0A0A" }}
        >
          Would you like to share with friends?
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            readOnly
            value={MOCK_SITE_LINK}
            className="flex-1 rounded-lg border bg-[#FAFAFA] px-4 py-3 text-sm text-[#525252]"
            style={{
              borderColor: "#EAEAEA",
            }}
          />
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-[999px] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
            style={{
              background: "#0A0A0A",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-[999px] border px-8 py-3 text-base font-medium transition-colors hover:bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
          style={{
            borderColor: "#EAEAEA",
            color: "#0A0A0A",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
