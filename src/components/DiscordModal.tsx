"use client";

import { useState } from "react";
import { DISCORD_INVITE_LINK } from "@/lib/mockData";

interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 로그인한 구글 이메일. Discord에서 그대로 공유해야 Pro 권한 매칭이 됨 */
  email: string;
}

/**
 * 로그인 직후 노출되는 디스코드 가입 안내 모달.
 * 베타 테스터는 확장프로그램 설치만으로 끝이 아니라, 디스코드에 들어와
 * 본인 이메일을 공유해야 Pro 권한을 받을 수 있다는 점을 안내한다.
 */
export default function DiscordModal({ isOpen, onClose, email }: DiscordModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 구형 브라우저 폴백
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  // 안내 단계 (1·2·3)
  const steps = [
    "Join our Discord",
    "Share the email you signed in with",
    "We match it and unlock Pro for you",
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="discord-modal-title"
    >
      {/* 백드롭 (클릭 시 닫기) */}
      <button
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
        aria-label="Close modal"
      />

      {/* 모달 패널 */}
      <div
        className="relative w-full max-w-[440px] rounded-[24px] p-8"
        style={{ background: "#FFFFFF", boxShadow: "var(--shadow-modal)" }}
      >
        {/* 닫기(X) */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#737373] transition-colors hover:bg-[#FAFAFA] hover:text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2
          id="discord-modal-title"
          className="mb-2 pr-8 text-2xl font-bold"
          style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
        >
          One last step to unlock Pro
        </h2>
        <p className="mb-6 text-[15px] leading-relaxed" style={{ color: "#525252" }}>
          Installing the extension isn&apos;t enough. We grant Pro access manually to
          beta testers who join our Discord.
        </p>

        {/* 안내 단계 */}
        <ol className="mb-6 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ background: "#8B5CF6" }}
                aria-hidden
              >
                {index + 1}
              </span>
              <span className="text-[14px] leading-snug text-[#0A0A0A]">{step}</span>
            </li>
          ))}
        </ol>

        {/* 로그인 이메일 + 복사 */}
        <p className="mb-2 text-[13px] font-medium text-[#525252]">
          Your sign-in email
        </p>
        <div className="mb-6 flex gap-3">
          <input
            type="text"
            readOnly
            value={email}
            className="flex-1 rounded-lg border bg-[#FAFAFA] px-4 py-3 text-sm text-[#0A0A0A]"
            style={{ borderColor: "#EAEAEA" }}
          />
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-[999px] border px-5 py-3 text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#FAFAFA] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
            style={{ borderColor: "#EAEAEA" }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* 메인 CTA: 디스코드 참여 (검정 pill, 새 탭) */}
        <a
          href={DISCORD_INVITE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-[999px] px-8 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
          style={{ background: "#0A0A0A" }}
        >
          Join our Discord
        </a>

        <p className="mt-4 text-center text-[13px] leading-relaxed text-[#737373]">
          Already done? You can close this — we&apos;ll unlock Pro once we match your
          email in Discord.
        </p>
      </div>
    </div>
  );
}
