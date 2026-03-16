"use client";

import { useState, useCallback } from "react";
import Header from "./Header";
import Hero from "./Hero";
import WhyKaptik from "./WhyKaptik";
import AvailableDevices from "./AvailableDevices";
import AvailablePlatforms from "./AvailablePlatforms";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import WaitlistModal from "./WaitlistModal";
import ThankYouModal from "./ThankYouModal";

export default function LandingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);

  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), []);

  const handleWaitlistSuccess = useCallback(() => {
    setThankYouOpen(true);
  }, []);

  const scrollToFeatures = useCallback(() => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative z-10 min-h-screen">
      <Header onJoinWaitlist={openWaitlist} />
      <main>
        <Hero
          onJoinWaitlist={openWaitlist}
          onHowToUse={scrollToFeatures}
        />
        <WhyKaptik />
        <AvailableDevices />
        <AvailablePlatforms />
        <FAQ onJoinWaitlist={openWaitlist} />
        <Testimonials />
      </main>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={closeWaitlist}
        onSuccess={handleWaitlistSuccess}
      />
      <ThankYouModal isOpen={thankYouOpen} onClose={() => setThankYouOpen(false)} />
    </div>
  );
}
