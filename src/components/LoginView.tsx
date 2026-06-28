"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { loginWithGoogle, decodeGoogleIdToken } from "@/lib/auth";

export default function LoginView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSuccess(credentialResponse: CredentialResponse) {
    const idToken = credentialResponse.credential;
    if (!idToken) return;

    setLoading(true);
    setError(null);
    try {
      const decoded = decodeGoogleIdToken(idToken);
      await loginWithGoogle(idToken, decoded?.email ?? "");
      // 로그인 직후 account에서 디스코드 안내 모달을 띄우기 위한 플래그
      sessionStorage.setItem("kaptik_show_discord_modal", "1");
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다. 다시 시도해 주세요.");
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

        {error && (
          <p className="mt-4 text-[13px] text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
