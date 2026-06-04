import type { Metadata } from "next";
import PricingPage from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Pricing — Kaptik",
  description:
    "Explore Kaptik pricing plans for K-pop subtitle translation, live subtitles, speaker context, and 30+ language support.",
};

export default function Pricing() {
  return <PricingPage />;
}
