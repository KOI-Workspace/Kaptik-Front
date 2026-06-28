"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import InstallExtensionButton from "./InstallExtensionButton";
import DiscordModal from "./DiscordModal";
import { getAuth, clearAuth, saveAuth, type AuthUser } from "@/lib/auth";
import { DISCORD_INVITE_LINK } from "@/lib/mockData";

const SUBTITLE_LANGUAGES = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "zh-CN", label: "简体中文" },
  { value: "zh-TW", label: "繁體中文" },
  { value: "id", label: "Bahasa Indonesia" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "ru", label: "Русский" },
  { value: "pl", label: "Polski" },
  { value: "cs", label: "Čeština" },
  { value: "uk", label: "Українська" },
  { value: "ro", label: "Română" },
  { value: "th", label: "ภาษาไทย" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "tr", label: "Türkçe" },
  { value: "ar", label: "العربية" },
  { value: "hi", label: "हिन्दी" },
  { value: "ms", label: "Bahasa Melayu" },
  { value: "tl", label: "Filipino" },
  { value: "sv", label: "Svenska" },
  { value: "no", label: "Norsk" },
  { value: "da", label: "Dansk" },
  { value: "fi", label: "Suomi" },
  { value: "nl", label: "Nederlands" },
];

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AccountView() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subtitleLanguage, setSubtitleLanguage] = useState("en");
  const [discordModalOpen, setDiscordModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      router.replace("/login");
      return;
    }
    setUser(auth.user);
    setToken(auth.token);

    // 로그인 직후 최초 1회만 디스코드 안내 모달 노출
    if (sessionStorage.getItem("kaptik_show_discord_modal") === "1") {
      setDiscordModalOpen(true);
      sessionStorage.removeItem("kaptik_show_discord_modal");
    }

    fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          const updatedUser = { ...auth.user };
          if (data.subtitle_lang) {
            updatedUser.subtitleLang = data.subtitle_lang;
            setSubtitleLanguage(data.subtitle_lang);
          }
          if (data.plan) {
            updatedUser.plan = data.plan;
            setUser(updatedUser);
          }
          saveAuth(auth.token, updatedUser);
        }
      })
      .catch(() => {});
  }, [router]);

  async function handleSubtitleLanguageChange(lang: string) {
    setSubtitleLanguage(lang);
    if (!token || !user) return;
    try {
      await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subtitle_lang: lang }),
      });
      saveAuth(token, { ...user, subtitleLang: lang });
    } catch {
      // 저장 실패 시 UI는 낙관적으로 유지
    }
  }

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
        <div className="flex items-center gap-4">
          {user.picture && (
            <Image
              src={user.picture}
              alt={user.name ?? user.email}
              width={48}
              height={48}
              className="rounded-full"
              referrerPolicy="no-referrer"
            />
          )}
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
          >
            {user.name ?? "Account"}
          </h1>
        </div>

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
              onChange={(e) => handleSubtitleLanguageChange(e.target.value)}
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

          <div className="flex items-center justify-between gap-4 px-6 py-5">
            <div>
              <span className="text-[14px] font-medium text-[#525252]">Discord</span>
              <p className="mt-1 text-[13px] text-[#737373]">
                Join and share your email to unlock Pro
              </p>
            </div>
            <a
              href={DISCORD_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-[999px] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
              style={{ background: "#0A0A0A" }}
            >
              Join Discord
            </a>
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

      <DiscordModal
        isOpen={discordModalOpen}
        onClose={() => setDiscordModalOpen(false)}
        email={user.email}
      />
    </div>
  );
}
