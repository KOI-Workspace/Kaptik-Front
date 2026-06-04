"use client";

import Header from "./Header";
import Footer from "./Footer";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "For fans who want to try Kaptik before launch.",
    features: [
      "Limited subtitle previews",
      "Waitlist launch updates",
      "Basic platform support",
    ],
    highlighted: false,
  },
  {
    name: "Fan",
    price: "$9",
    description: "For everyday K-pop fans who watch lives and clips often.",
    features: [
      "High-quality subtitles for live videos",
      "YouTube and TikTok link subtitle generation",
      "Speaker labels and cultural context",
      "30+ language subtitle translation",
    ],
    highlighted: true,
  },
  {
    name: "Pro Fan",
    price: "$19",
    description: "For fans who want faster processing and more saved videos.",
    features: [
      "Everything in Fan",
      "Priority subtitle generation",
      "More monthly video minutes",
      "Early access to new platform support",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  const goToWaitlist = () => {
    window.location.href = "/#waitlist-form";
  };

  return (
    <div className="relative z-10 min-h-screen bg-white">
      <Header onJoinWaitlist={goToWaitlist} />

      <main className="px-6 pb-24 pt-[152px] md:px-12 lg:px-16">
        <section className="mx-auto max-w-[1360px]">
          <div className="mx-auto mb-14 max-w-[760px] text-center">
            <p
              className="mb-4 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#A3A3A3" }}
            >
              Pricing
            </p>
            <h1
              className="mb-6 text-[clamp(36px,5vw,64px)] font-bold leading-tight tracking-tight"
              style={{
                color: "#0A0A0A",
                letterSpacing: "-0.03em",
              }}
            >
              Choose the plan that fits your fandom life.
            </h1>
            <p className="text-lg leading-relaxed text-[#525252]">
              Kaptik is currently preparing launch pricing. Join the waitlist to get
              early access and an exclusive launch promo code.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className="flex min-h-[520px] flex-col rounded-[16px] border p-7"
                style={{
                  borderColor: plan.highlighted ? "#0A0A0A" : "#EAEAEA",
                  background: plan.highlighted ? "#0A0A0A" : "#FFFFFF",
                  boxShadow: plan.highlighted ? "var(--shadow-lg)" : "var(--shadow-sm)",
                }}
              >
                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2
                      className="text-2xl font-bold tracking-tight"
                      style={{
                        color: plan.highlighted ? "#FFFFFF" : "#0A0A0A",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {plan.name}
                    </h2>
                    {plan.highlighted && (
                      <span className="rounded-[999px] bg-white px-3 py-1 text-xs font-semibold text-[#0A0A0A]">
                        Best for fans
                      </span>
                    )}
                  </div>
                  <p
                    className="mb-6 text-[15px] leading-relaxed"
                    style={{ color: plan.highlighted ? "#D4D4D4" : "#525252" }}
                  >
                    {plan.description}
                  </p>
                  <div className="flex items-end gap-2">
                    <span
                      className="text-5xl font-bold tracking-tight"
                      style={{
                        color: plan.highlighted ? "#FFFFFF" : "#0A0A0A",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="pb-1 text-sm"
                      style={{ color: plan.highlighted ? "#D4D4D4" : "#737373" }}
                    >
                      / month
                    </span>
                  </div>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-[15px] leading-relaxed"
                      style={{ color: plan.highlighted ? "#F5F5F5" : "#0A0A0A" }}
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: plan.highlighted ? "#A78BFA" : "#8B5CF6" }}
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={goToWaitlist}
                  className="mt-auto rounded-[999px] px-7 py-3.5 text-[15px] font-medium transition-colors active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
                  style={{
                    background: plan.highlighted ? "#FFFFFF" : "#0A0A0A",
                    color: plan.highlighted ? "#0A0A0A" : "#FFFFFF",
                  }}
                >
                  Join Waitlist
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
