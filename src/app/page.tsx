import Header from "@/components/Header";
import HeroScene from "@/components/hero/HeroScene";
import ServicesSection from "@/components/services/ServicesSection";
import FounderSection from "@/components/founder/FounderSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroScene />
        <ServicesSection />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
