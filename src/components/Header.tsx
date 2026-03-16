"use client";

import { useState, useCallback } from "react";

interface HeaderProps {
  onJoinWaitlist: () => void;
}

export default function Header({ onJoinWaitlist }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 h-[88px]"
      style={{
        background: "transparent",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-8 md:px-12">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" aria-label="Kaptik Home">
          <span
            className="text-xl font-bold tracking-tight"
            style={{
              color: "#111327",
              letterSpacing: "-0.04em",
            }}
          >
            Kaptik
          </span>
        </a>

        {/* Desktop Nav - Center */}
        <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
          <button
            onClick={() => scrollToSection("features")}
            className="text-[15px] font-medium transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 rounded-sm"
            style={{ color: "#23263A", letterSpacing: "-0.01em" }}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-[15px] font-medium transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 rounded-sm"
            style={{ color: "#23263A", letterSpacing: "-0.01em" }}
          >
            FAQ
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-[15px] font-medium transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 rounded-sm"
            style={{ color: "#23263A", letterSpacing: "-0.01em" }}
          >
            Reviews
          </button>
        </nav>

        {/* CTA - Right */}
        <div className="flex items-center gap-4">
          <button
            onClick={onJoinWaitlist}
            className="hidden rounded-[999px] px-7 py-3.5 text-[15px] font-medium transition-all hover:opacity-95 hover:shadow-[0 10px 28px rgba(94,76,230,0.35)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2 disabled:opacity-45 disabled:cursor-not-allowed sm:block"
            style={{
              background: "#5E4CE6",
              color: "#FFFFFF",
              boxShadow: "0 6px 20px rgba(94,76,230,0.25)",
            }}
          >
            Join Waitlist
          </button>

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
          className="fixed inset-0 top-[88px] z-40 bg-white/95 backdrop-blur-sm md:hidden"
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="flex flex-col gap-6 px-8 py-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-left text-lg font-medium"
              style={{ color: "#23263A" }}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left text-lg font-medium"
              style={{ color: "#23263A" }}
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-left text-lg font-medium"
              style={{ color: "#23263A" }}
            >
              Reviews
            </button>
            <button
              onClick={() => {
                onJoinWaitlist();
                setMobileMenuOpen(false);
              }}
              className="mt-4 w-fit rounded-[999px] px-7 py-3.5 text-[15px] font-medium transition-all hover:opacity-95 hover:shadow-[0 10px 28px rgba(94,76,230,0.35)]"
              style={{
                background: "#5E4CE6",
                color: "#FFFFFF",
                boxShadow: "0 6px 20px rgba(94,76,230,0.25)",
              }}
            >
              Join Waitlist
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
