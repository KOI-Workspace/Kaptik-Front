/**
 * Mock data for Kaptik landing page
 */

export const MOCK_WAITLIST_COUNT = 1247;

export const MOCK_SITE_LINK = "https://kaptik-subtitle.vercel.app/";

export const PRIVACY_POLICY_LINK = "https://notion.so/kaptik-privacy"; // Placeholder - user will provide later

export const faqItems = [
  {
    id: "1",
    question: "Where can I use Kaptik?",
    answer:
      "Kaptik works across Bubble, Fromm, Weverse, YouTube, and all other platforms. You can enjoy accurate subtitles wherever you watch K-pop content.",
  },
  {
    id: "2",
    question: "Is it free?",
    answer:
      "We're working on a pricing plan, but nothing is finalized yet. We'll share details when we launch. Stay tuned!",
  },
  {
    id: "3",
    question: "How does Kaptik achieve high translation quality?",
    answer:
      "We use a K-pop glossary built from fandom vocabulary and slang commonly used by young Koreans. This improves word accuracy significantly. When members speak in English, we detect and keep the English as-is. We also use member voice data for speaker identification, so you always know who's saying what.",
  },
] as const;

export const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    nationality: "United States",
    idolFan: "BTS ARMY",
    quote:
      "Finally a subtitle tool that actually gets the slang right! Weverse Live wouldn't even translate ARMY right, but now I can understand way better than before!",
  },
  {
    id: "2",
    name: "Lucas Oliveira",
    nationality: "Brazil",
    idolFan: "STAY (Stray Kids)",
    quote:
      "As a Brazilian STAY, I watch so much content on YouTube and Weverse. The speaker identification is incredible and now I always know who's talking. No more guessing if it's Han or Lee Know!",
  },
  {
    id: "3",
    name: "Maho Kato",
    nationality: "Japan",
    idolFan: "NSWER (NMIXX)",
    quote:
      "Bubble didn't have translation, but now with Kaptik I am able to understand what they are saying! Works perfectly on my Galaxy.",
  },
  {
    id: "4",
    name: "Bea Mendoza",
    nationality: "Philippines",
    idolFan: "CARAT (SEVENTEEN)",
    quote:
      "SEVENTEEN's going Seventeen episodes are so fun, and with Kaptik I finally catch every joke.",
  },
  {
    id: "5",
    name: "Emma Schmidt",
    nationality: "Germany",
    idolFan: "MOA (TOMORROW X TOGETHER)",
    quote:
      "I watch TXT on Bubble and YouTube every day, and Kaptik keeps Korean sounding heartfelt, not stiff.",
  },
  {
    id: "6",
    name: "Pim Rattanaporn",
    nationality: "Thailand",
    idolFan: "MY (aespa)",
    quote:
      "Kaptik even translates Korean slang like '칼군무' and '국룰' correctly, so it actually helps me study Korean too.",
  },
] as const;
