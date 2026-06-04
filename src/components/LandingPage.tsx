"use client";

import { useState, useCallback } from "react";
import Header from "./Header";
import Hero from "./Hero";
import FanProblems from "./FanProblems";
import WhyKaptik from "./WhyKaptik";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import ThankYouModal from "./ThankYouModal";
import Footer from "./Footer";

export default function LandingPage() {
  const [thankYouOpen, setThankYouOpen] = useState(false);

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
    <div className="relative z-10 min-h-screen">
      <Header onJoinWaitlist={focusWaitlist} />
      <main>
        <Hero
          onWaitlistSuccess={handleWaitlistSuccess}
        />
        <FanProblems />
        <WhyKaptik />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />

      <ThankYouModal isOpen={thankYouOpen} onClose={() => setThankYouOpen(false)} />
    </div>
  );
}
