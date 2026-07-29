import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import StatsBand from "@/components/StatsBand";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <Hero />
        <StatsBand />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
