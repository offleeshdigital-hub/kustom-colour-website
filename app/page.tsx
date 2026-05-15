import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServicesTicker from "@/components/ServicesTicker";
import Services from "@/components/Services";
import PinstripeAccent from "@/components/PinstripeAccent";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ServicesTicker />
      <Services />
      <PinstripeAccent variant={2} />
      <About />
      <PinstripeAccent variant={3} inverted />
      <Reviews />
      <ContactCTA />
      <Footer />
    </main>
  );
}
