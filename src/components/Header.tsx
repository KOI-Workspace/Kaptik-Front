"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const scrollToSection = useCallback((id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 h-[64px] border-b border-[#EAEAEA] bg-white"
    >
      <div className="relative mx-auto flex h-full max-w-[1360px] items-center justify-between px-5 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Kaptik Home">
          <span
            className="text-xl font-bold tracking-tight"
            style={{
              color: "#0A0A0A",
              letterSpacing: "-0.04em",
            }}
          >
            Kaptik
          </span>
        </Link>

        {/* Desktop Nav - Center */}
        <nav
          className="absolute left-[calc(50%+6px)] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex"
          aria-label="Main navigation"
        >
          <button
            onClick={() => scrollToSection("features")}
            className="text-[15px] font-medium transition-colors hover:text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 rounded-sm"
            style={{ color: "#525252", letterSpacing: "-0.01em" }}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-[15px] font-medium transition-colors hover:text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 rounded-sm"
            style={{ color: "#525252", letterSpacing: "-0.01em" }}
          >
            FAQ
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-[15px] font-medium transition-colors hover:text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 rounded-sm"
            style={{ color: "#525252", letterSpacing: "-0.01em" }}
          >
            Reviews
          </button>
        </nav>

        {/* CTA - Right */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-4">
          <Link
            href="/pricing"
            className="hidden rounded-[999px] border border-[#EAEAEA] bg-white px-5 py-2.5 text-[14px] font-medium text-[#0A0A0A] transition-colors hover:bg-[#FAFAFA] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 sm:block"
          >
            Pricing
          </Link>
          {/* Sign in: 모바일에서도 항상 노출 (모바일은 패딩·폰트를 살짝 줄여 햄버거와 나란히 배치) */}
          <Link
            href="/login"
            className="rounded-[999px] bg-[#0A0A0A] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#262626] active:scale-[0.99] focus:outline-none sm:px-6 sm:py-2.5 sm:text-[14px]"
          >
            Sign in
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[64px] z-40 bg-white/95 backdrop-blur-sm md:hidden"
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="flex flex-col gap-6 px-8 py-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-left text-lg font-medium"
              style={{ color: "#525252" }}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left text-lg font-medium"
              style={{ color: "#525252" }}
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-left text-lg font-medium"
              style={{ color: "#525252" }}
            >
              Reviews
            </button>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-lg font-medium"
              style={{ color: "#525252" }}
            >
              Pricing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
