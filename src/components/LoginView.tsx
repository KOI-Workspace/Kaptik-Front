import Link from "next/link";

/**
 * 실제 Google OAuth 연동 전 단계의 placeholder 페이지.
 * 버튼 클릭 시 인증 없이 /account로 이동만 한다.
 */
export default function LoginView() {
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

        <Link
          href="/account"
          className="mt-7 flex items-center justify-center gap-3 rounded-[999px] border border-[#EAEAEA] bg-white px-5 py-3 text-[15px] font-medium text-[#0A0A0A] transition-colors hover:bg-[#FAFAFA] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.08-1.81 2.72v2.26h2.92c1.71-1.57 2.69-3.89 2.69-6.62z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.92-2.26c-.81.54-1.84.87-3.04.87-2.34 0-4.32-1.58-5.03-3.71H.96v2.33C2.44 15.98 5.48 18 9 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.97 10.72c-.18-.54-.28-1.12-.28-1.72s.1-1.18.28-1.72V4.95H.96A8.997 8.997 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
            />
          </svg>
          Continue with Google
        </Link>
      </div>
    </div>
  );
}
