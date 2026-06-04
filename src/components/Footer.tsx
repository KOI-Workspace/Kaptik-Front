import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] px-6 py-16 text-white md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] lg:grid-cols-[1.7fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="mb-6 inline-block text-2xl font-bold tracking-tight text-white"
              style={{ letterSpacing: "-0.04em" }}
            >
              Kaptik
            </Link>
            <p className="max-w-[520px] text-lg leading-relaxed text-[#A3A3A3]">
              Understand every K-pop moment with high-quality subtitles, speaker
              context, and translation across 30+ languages.
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#737373]">
              Product
            </h2>
            <nav className="flex flex-col gap-4 text-lg text-[#A3A3A3]">
              <Link href="/#features" className="transition-colors hover:text-white">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-white">
                Pricing
              </Link>
              <Link href="/#faq" className="transition-colors hover:text-white">
                FAQ
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#737373]">
              Contact
            </h2>
            <nav className="flex flex-col gap-4 text-lg text-[#A3A3A3]">
              <a href="mailto:hello@kaptik.app" className="transition-colors hover:text-white">
                hello@kaptik.app
              </a>
              <Link href="/#waitlist-form" className="transition-colors hover:text-white">
                Join Waitlist
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-base text-[#525252] md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Kaptik. All rights reserved.</p>
          <p>Made for global K-pop fans everywhere</p>
        </div>
      </div>
    </footer>
  );
}
