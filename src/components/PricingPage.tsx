"use client";

import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

const pricingPlans = [
  {
    name: "Basic",
    price: "$2.9",
    description: "For fans who just want to catch every live moment.",
    features: [
      "Unlimited live video viewing",
      "Get notified for new lives",
    ],
  },
  {
    name: "Pro",
    price: "$7.9",
    description: "For fans who want subtitles on everything, everywhere.",
    features: [
      "Unlimited subtitles for any video, on every platform",
      "Notification included",
      "Unlimited live video viewing",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="relative z-10 min-h-screen bg-white">
      <Header />

      <main className="px-6 pb-24 pt-[152px] md:px-12 lg:px-16">
        <section className="mx-auto max-w-[1360px]">
          <div className="mx-auto mb-8 max-w-[760px] text-center">
            <h1
              className="text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-tight"
              style={{
                color: "#0A0A0A",
                letterSpacing: "-0.03em",
              }}
            >
              Choose the plan that fits your fandom life.
            </h1>
          </div>

          {/* 베타 안내 보라 버블 — 클릭하면 구글 로그인(/login)으로 이동 */}
          <div className="mx-auto mb-10 flex max-w-[760px] justify-center sm:mb-12">
            <p className="waitlist-bubble relative whitespace-nowrap rounded-[999px] border border-[#C4B5FD] bg-[#8B5CF6] px-3.5 py-2 text-center text-[11px] font-medium leading-none text-white shadow-[0_10px_24px_rgba(139,92,246,0.22)] sm:px-5 sm:py-2.5 sm:text-sm">
              All plans are free right now — start your{" "}
              <Link
                href="/login"
                className="font-bold text-white underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Beta Testing
              </Link>{" "}
              today.
            </p>
          </div>

          <div className="mx-auto grid max-w-[760px] grid-cols-1 justify-center gap-3 sm:grid-cols-2 sm:gap-5">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className="mx-auto flex w-full flex-col rounded-[16px] border border-[#EAEAEA] bg-white p-5 sm:min-h-[440px] sm:max-w-[360px] sm:p-7"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div className="mb-6 sm:mb-8">
                  <h2
                    className="mb-3 text-xl font-bold tracking-tight text-[#0A0A0A] sm:mb-4 sm:text-2xl"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {plan.name}
                  </h2>
                  <p className="mb-5 text-[13px] leading-relaxed text-[#525252] sm:mb-6 sm:text-[15px]">
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-1.5 sm:gap-2">
                    <span
                      className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
                      style={{ letterSpacing: "-0.04em" }}
                    >
                      {plan.price}
                    </span>
                    <span className="pb-0.5 text-xs text-[#737373] sm:pb-1 sm:text-sm">
                      / month
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2.5 text-[13px] leading-relaxed text-[#0A0A0A] sm:gap-3 sm:text-[15px]"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6] sm:mt-2"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
