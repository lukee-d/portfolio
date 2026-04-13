import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Currently from "@/components/Currently";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ScrollReveal>
        <Hero />
      </ScrollReveal>
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Currently />
      </ScrollReveal>
      <ScrollReveal>
        <Projects />
      </ScrollReveal>
      <ScrollReveal>
        <Skills />
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </main>
  );
}
