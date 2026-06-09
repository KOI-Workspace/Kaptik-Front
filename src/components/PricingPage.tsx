"use client";

import { useCallback, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WaitlistBubble from "./WaitlistBubble";
import WaitlistForm from "./WaitlistForm";
import ThankYouModal from "./ThankYouModal";

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
  const [thankYouOpen, setThankYouOpen] = useState(false);

  // 헤더 CTA 클릭 시 페이지 하단 웨이트리스트 폼으로 스크롤 + 포커스
  const focusWaitlist = useCallback(() => {
    const form = document.getElementById("waitlist-form");
    const input = document.getElementById("waitlist-email") as HTMLInputElement | null;

    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => input?.focus(), 350);
  }, []);

  const handleWaitlistSuccess = useCallback(() => {
    setThankYouOpen(true);
  }, []);

  return (
    <div className="relative z-10 min-h-screen bg-white">
      <Header onJoinWaitlist={focusWaitlist} />

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

          <div className="mb-10 flex justify-center">
            <WaitlistBubble />
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

          <div className="mt-6 flex justify-center">
            <WaitlistForm onSuccess={handleWaitlistSuccess} showBubble={false} />
          </div>
        </section>
      </main>
      <Footer />

      <ThankYouModal isOpen={thankYouOpen} onClose={() => setThankYouOpen(false)} />
    </div>
  );
}
