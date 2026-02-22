import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import CareerPathSection from "@/sections/CareerPathSection";
import AbilitySection from "@/sections/AbilitySection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <CareerPathSection />
      <AbilitySection />
      <ContactSection />
    </div>
  );
}
