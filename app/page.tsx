import HeroSection from "@/components/home/hero-section";
import DemoSection from "@/components/home/demo-section";
import HowItWorksSection from "@/components/home/how-it-works";
import PricingSection from "@/components/home/pricing-section";
import CTASection from "@/components/home/CTA-section";
export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Unified Background System */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-white dark:bg-[#0c0d1f]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-600/5" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/10 blur-[150px] dark:bg-purple-600/5" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-600/5" />
      </div>

      <div className="relative w-full">
        <HeroSection />
        <DemoSection/>
        <HowItWorksSection/>
        <PricingSection/>
        <CTASection/>
      </div>
    </main>
  );
}
