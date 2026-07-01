"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { loginWithGoogle, loginAsTester, decodeGoogleIdToken } from "@/lib/auth";

export default function LoginView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 테스터(심사자) 로그인 UI 상태
  const [showTester, setShowTester] = useState(false);
  const [testerName, setTesterName] = useState("");
  const [testerPassword, setTesterPassword] = useState("");

  async function handleGoogleSuccess(credentialResponse: CredentialResponse) {
    const idToken = credentialResponse.credential;
    if (!idToken) return;

    setLoading(true);
    setError(null);
    try {
      const decoded = decodeGoogleIdToken(idToken);
      const { isNewUser } = await loginWithGoogle(idToken, decoded?.email ?? "");
      // 디스코드 안내 모달은 최초 가입자에게만 1회 노출. 재방문 로그인엔 띄우지 않는다.
      if (isNewUser) {
        sessionStorage.setItem("kaptik_show_discord_modal", "1");
      }
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다. 다시 시도해 주세요.");
      setLoading(false);
    }
  }

  async function handleTesterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!testerName.trim() || !testerPassword) return;

    setLoading(true);
    setError(null);
    try {
      await loginAsTester(testerName.trim(), testerPassword);
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid tester name or password.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-white px-6">
      <Link
        href="/"
        className="mb-10 text-xl font-bold tracking-tight"
        style={{ color: "#0A0A0A", letterSpacing: "-0.04em" }}
      >
        Kaptik
      </Link>

      <div
        className="w-full max-w-[400px] rounded-[24px] border border-[#EAEAEA] bg-white p-8 text-center"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#0A0A0A", letterSpacing: "-0.03em" }}
        >
          Sign in to Kaptik
        </h1>
        <p className="mt-2 text-[15px] text-[#525252]">
          Continue with your Google account.
        </p>

        <div className={`mt-7 flex justify-center ${loading ? "pointer-events-none opacity-50" : ""}`}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google 로그인에 실패했습니다. 다시 시도해 주세요.")}
            shape="pill"
            size="large"
            text="continue_with"
            useOneTap={false}
          />
        </div>

        {/* 구분선 */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#EAEAEA]" />
          <span className="text-[12px] font-medium uppercase tracking-wider text-[#A3A3A3]">or</span>
          <span className="h-px flex-1 bg-[#EAEAEA]" />
        </div>

        {/* 테스터 로그인 토글 버튼 */}
        <button
          type="button"
          onClick={() => {
            setShowTester((v) => !v);
            setError(null);
          }}
          aria-expanded={showTester}
          className="mx-auto flex items-center gap-1.5 text-[14px] font-medium text-[#525252] transition-colors hover:text-[#0A0A0A]"
        >
          Log in as a tester
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className={`transition-transform duration-200 ${showTester ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* 펼쳐지는 테스터 로그인 폼 (grid 트릭으로 부드럽게 확장) */}
        <div
          className={`grid transition-all duration-300 ease-out ${
            showTester ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <form onSubmit={handleTesterSubmit} className="flex flex-col gap-3 text-left">
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-[#525252]">Tester name</span>
                <input
                  type="text"
                  value={testerName}
                  onChange={(e) => setTesterName(e.target.value)}
                  autoComplete="username"
                  className="w-full rounded-[12px] border border-[#EAEAEA] px-4 py-2.5 text-[15px] text-[#0A0A0A] outline-none transition-colors focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#EDE9FE]"
                  placeholder="Enter tester name"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-[#525252]">Password</span>
                <input
                  type="password"
                  value={testerPassword}
                  onChange={(e) => setTesterPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-[12px] border border-[#EAEAEA] px-4 py-2.5 text-[15px] text-[#0A0A0A] outline-none transition-colors focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#EDE9FE]"
                  placeholder="Enter password"
                />
              </label>

              <button
                type="submit"
                disabled={loading || !testerName.trim() || !testerPassword}
                className="mt-1 w-full rounded-full bg-[#0A0A0A] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Log in
              </button>
            </form>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-[13px] text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
