import Hero from "@/components/landing/Hero";
import MetricsStrip from "@/components/landing/MetricsStrip";
import EstateShowcase from "@/components/landing/EstateShowcase";
import ValueProps from "@/components/landing/ValueProps";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <MetricsStrip />
      <EstateShowcase />
      <ValueProps />
      <CTASection />
    </main>
  );
}
