import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Kaptik",
  description:
    "How Kaptik collects, uses, shares, stores, and protects your data across the Kaptik website and Chrome extension.",
};

/** 최종 수정일 — 데이터 처리 방식이 바뀌면 반드시 갱신할 것 */
const LAST_UPDATED = "June 30, 2026";

/** 문의 이메일 — Footer의 연락처와 동일하게 유지 */
const CONTACT_EMAIL = "wethekoi@gmail.com";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="bg-white px-6 pb-24 pt-32 text-[#0A0A0A] md:px-12 lg:px-16">
        <article className="mx-auto max-w-[760px]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
            Legal
          </p>
          <h1
            className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-[#737373]">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-12 space-y-12 text-lg leading-relaxed text-[#404040]">
            {/* 개요 */}
            <section>
              <p>
                Kaptik (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                provides real-time subtitles, translation, and cultural context
                for Korean content through our website (kaptik.site) and our
                Chrome extension. This policy explains what data we handle, why
                we handle it, who we share it with, how we protect it, and the
                choices you have. By using Kaptik you agree to the practices
                described here.
              </p>
            </section>

            {/* 1. 수집하는 데이터 */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                1. Data we collect
              </h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Account information.
                  </strong>{" "}
                  When you sign in with Google, we receive your email address,
                  name, and profile picture from your Google account.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Content you are watching.
                  </strong>{" "}
                  To generate subtitles, the extension reads the URL, title, and
                  related metadata of the video page you are viewing on
                  supported sites (YouTube, Weverse, and Instagram).
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Audio for live subtitles.
                  </strong>{" "}
                  For live streams, the extension captures the audio of the
                  active browser tab and sends it to a speech-to-text service so
                  it can be transcribed into subtitles. We do not access your
                  microphone.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Usage and diagnostic data.
                  </strong>{" "}
                  We collect basic, aggregated analytics (such as page visits and
                  feature usage) and error logs to keep the service running and
                  improve it.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Reports you submit.
                  </strong>{" "}
                  If you report a subtitle issue, we collect the text you submit
                  along with the related video reference.
                </li>
              </ul>
              <p className="mt-5">
                We do <strong>not</strong> collect health, financial, or other
                sensitive personal information, and we do not knowingly collect
                data from children.
              </p>
            </section>

            {/* 2. 사용 목적 */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                2. Why we use your data
              </h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Account information
                  </strong>{" "}
                  is used to create and secure your account, keep you signed in,
                  and apply your plan and settings.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Video content and audio
                  </strong>{" "}
                  are used solely to generate, translate, and display subtitles
                  and cultural annotations for what you are watching.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Usage and diagnostic data
                  </strong>{" "}
                  is used to operate, troubleshoot, and improve the service.
                </li>
              </ul>
              <p className="mt-5">
                We do <strong>not</strong> sell your personal data, and we do{" "}
                <strong>not</strong> use it for advertising profiling or any
                purpose unrelated to providing Kaptik.
              </p>
            </section>

            {/* 3. 제3자 공유 */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                3. Third parties we share data with
              </h2>
              <p className="mt-5">
                To provide Kaptik we rely on the following service providers.
                Data is shared only to the extent needed to deliver the feature
                described, and each provider processes it under its own privacy
                policy.
              </p>
              <ul className="mt-5 space-y-4">
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Google
                  </strong>{" "}
                  — sign-in (authentication) and YouTube video metadata.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    OpenAI
                  </strong>{" "}
                  — subtitle translation and cultural annotation. Subtitle text
                  and video titles/tags are sent for processing.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Soniox
                  </strong>{" "}
                  — speech-to-text. Captured live-stream audio is sent for
                  transcription.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Amazon Web Services (AWS)
                  </strong>{" "}
                  — secure cloud storage and hosting of account and subtitle
                  data (Seoul region).
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Vercel
                  </strong>{" "}
                  — website hosting and aggregated visitor analytics.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Meta
                  </strong>{" "}
                  — aggregated marketing analytics on our website only.
                </li>
              </ul>
              <p className="mt-5">
                We may also disclose data if required by law or to protect the
                rights and safety of our users and service.
              </p>
            </section>

            {/* 4. 저장 및 보안 */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                4. How we store and protect your data
              </h2>
              <p className="mt-5">
                Account and subtitle data is stored on secure AWS
                infrastructure. Data is encrypted in transit (HTTPS/WSS) and
                access is restricted to authorized systems and personnel. We
                retain your data for as long as your account is active. We keep
                personal data only as long as needed for the purposes described
                in this policy, after which it is deleted or anonymized.
              </p>
            </section>

            {/* 5. 사용자 권리 */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                5. Your rights and choices
              </h2>
              <p className="mt-5">
                You can request access to, correction of, or deletion of your
                personal data at any time. To do so, email us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-[#7C3AED] underline underline-offset-2 hover:text-[#6D28D9]"
                >
                  {CONTACT_EMAIL}
                </a>
                . You can also uninstall the extension at any time to stop all
                data collection by it. We will respond to verified requests
                within a reasonable timeframe.
              </p>
            </section>

            {/* 6. 확장 프로그램 권한 */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                6. Chrome extension permissions
              </h2>
              <p className="mt-5">
                The Kaptik extension requests only the permissions required for
                its features:
              </p>
              <ul className="mt-5 space-y-4">
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Tab access and audio capture
                  </strong>{" "}
                  — to detect the video you are watching and capture tab audio
                  for live subtitles.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Storage and cookies
                  </strong>{" "}
                  — to save your settings and keep you signed in.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Notifications and alarms
                  </strong>{" "}
                  — to alert you when subtitles are ready and manage background
                  tasks.
                </li>
                <li>
                  <strong className="font-semibold text-[#0A0A0A]">
                    Site access (YouTube, Weverse, Instagram)
                  </strong>{" "}
                  — to display the subtitle overlay on supported video pages.
                </li>
              </ul>
            </section>

            {/* 7. 변경 */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                7. Changes to this policy
              </h2>
              <p className="mt-5">
                We may update this policy as Kaptik evolves. When we do, we will
                revise the &quot;Last updated&quot; date above. Significant
                changes will be communicated through the service.
              </p>
            </section>

            {/* 8. 문의 */}
            <section>
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                8. Contact us
              </h2>
              <p className="mt-5">
                If you have any questions about this policy or your data, contact
                us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-[#7C3AED] underline underline-offset-2 hover:text-[#6D28D9]"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-16 border-t border-[#EAEAEA] pt-8">
            <Link
              href="/"
              className="text-base font-medium text-[#7C3AED] underline underline-offset-2 hover:text-[#6D28D9]"
            >
              ← Back to home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
