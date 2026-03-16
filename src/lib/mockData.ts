/**
 * Mock data for Kaptik landing page
 */

export const MOCK_WAITLIST_COUNT = 1247;

export const MOCK_SITE_LINK = "https://kaptik.app";

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
    name: "Yuki Tanaka",
    nationality: "Japan",
    idolFan: "Bunny (NewJeans)",
    quote:
      "When I watch NewJeans' Fromm lives, Kaptik makes the subtitles so accurate. It actually understands how young Koreans talk—things like '착' and '쩝' get translated properly. As a Japanese Bunny, I finally feel like I'm not missing anything!",
  },
  {
    id: "4",
    name: "Maria Santos",
    nationality: "Philippines",
    idolFan: "CARAT (SEVENTEEN)",
    quote:
      "SEVENTEEN's going Seventeen episodes are so fun but the subs used to be hit or miss. Kaptik keeps their English when they mix languages—so important! Now I catch every joke. Filipino CARATs, you need this.",
  },
  {
    id: "5",
    name: "Emma Schmidt",
    nationality: "Germany",
    idolFan: "MOA (TOMORROW X TOGETHER)",
    quote:
      "I watch TXT on Bubble and YouTube every day. What I love most is that Kaptik doesn't over-translate—when they say '사랑해' it stays heartfelt, not stiff. The glossary for idol-specific terms is amazing. Perfect for international MOAs.",
  },
  {
    id: "6",
    name: "Pim Rattanaporn",
    nationality: "Thailand",
    idolFan: "MY (aespa)",
    quote:
      "aespa's content on Weverse and YouTube—Kaptik makes it so easy to follow. The translations feel like a friend explaining, not Google Translate. I can finally understand Ningning's jokes and Winter's random English mix-ins. Thai MYs, seriously try it!",
  },
  {
    id: "7",
    name: "Dewi Kusuma",
    nationality: "Indonesia",
    idolFan: "DIVE (IVE)",
    quote:
      "IVE's Bubble messages and lives—Kaptik gets the tone right. When Wonyoung writes in aegyo style, it actually sounds cute in English. Speaker ID means I never confuse Rei and Leeseo. Best tool for DIVEs who want to feel closer to the members.",
  },
] as const;
