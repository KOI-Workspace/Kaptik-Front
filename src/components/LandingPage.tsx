import Header from "./Header";
import Hero from "./Hero";
import FanProblems from "./FanProblems";
import WhyKaptik from "./WhyKaptik";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="relative z-10 min-h-screen">
      <Header />
      <main>
        <Hero />
        <FanProblems />
        <WhyKaptik />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
