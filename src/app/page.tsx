import { HeroSection } from "@/components/home/hero-section";
import { EnterprisePainSection } from "@/components/home/enterprise-pain-section";
import { EnterpriseSolutionSection } from "@/components/home/enterprise-solution-section";
import { EnterpriseScenesSection } from "@/components/home/enterprise-scenes-section";
import { EnterpriseValueSection } from "@/components/home/enterprise-value-section";
import { ApiSection } from "@/components/home/api-section";
import { AiryBuddySection } from "@/components/home/airybuddy-section";
import { TrainingSection } from "@/components/home/training-section";
import { TrustSection } from "@/components/home/trust-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EnterprisePainSection />
      <EnterpriseSolutionSection />
      <EnterpriseScenesSection />
      <EnterpriseValueSection />
      <ApiSection />
      <AiryBuddySection />
      <TrainingSection />
      <TrustSection />
      <CtaSection />
    </>
  );
}
