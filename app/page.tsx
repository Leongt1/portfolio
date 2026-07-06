import Armory from "@/components/Armory";
import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Ticker />
        <Experience />
        <Skills />
        <Education />
        <Armory />
        <Ticker reversed />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
