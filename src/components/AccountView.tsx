"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InstallExtensionButton from "./InstallExtensionButton";
import { getAuth, clearAuth, type AuthUser } from "@/lib/auth";

const SUBTITLE_LANGUAGES = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "zh", label: "中文" },
];

export default function AccountView() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subtitleLanguage, setSubtitleLanguage] = useState("ko");

  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      router.replace("/login");
      return;
    }
    setUser(auth.user);
  }, [router]);

  function handleSignOut() {
    clearAuth();
    router.push("/");
  }

  if (!user) return null;

  return (
    <div className="min-h-svh bg-white">
      <header className="flex h-[64px] items-center border-b border-[#EAEAEA] px-5 md:px-10">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          style={{ color: "#0A0A0A", letterSpacing: "-0.04em" }}
        >
          Kaptik
        </Link>
      </header>

      <main className="mx-auto max-w-[560px] px-6 py-12 md:py-16">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
        >
          Account
        </h1>

        <div
          className="mt-8 divide-y divide-[#EAEAEA] rounded-[24px] border border-[#EAEAEA]"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <span className="text-[14px] font-medium text-[#525252]">Email</span>
            <span className="text-[15px] text-[#0A0A0A]">{user.email}</span>
          </div>

          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <span className="text-[14px] font-medium text-[#525252]">Plan</span>
            <span className="rounded-[999px] border border-[#EAEAEA] bg-[#FAFAFA] px-3 py-1 text-[13px] font-medium text-[#0A0A0A] capitalize">
              {user.plan}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <label
              htmlFor="subtitle-language"
              className="text-[14px] font-medium text-[#525252]"
            >
              Subtitle language
            </label>
            <select
              id="subtitle-language"
              value={subtitleLanguage}
              onChange={(e) => setSubtitleLanguage(e.target.value)}
              className="rounded-lg border border-[#EAEAEA] px-3 py-2 text-[14px] text-[#0A0A0A] outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
            >
              {SUBTITLE_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <span className="text-[14px] font-medium text-[#525252]">Billing</span>
            <button
              type="button"
              className="whitespace-nowrap rounded-[999px] border border-[#EAEAEA] bg-white px-5 py-2 text-[14px] font-medium text-[#0A0A0A] transition-colors hover:bg-[#FAFAFA] active:scale-[0.99] focus:outline-none"
            >
              Manage billing
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <span className="text-[14px] font-medium text-[#525252]">Chrome extension</span>
            <InstallExtensionButton />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-8 text-[14px] font-medium text-[#525252] transition-colors hover:text-[#0A0A0A]"
        >
          Sign out
        </button>
      </main>
    </div>
  );
}
