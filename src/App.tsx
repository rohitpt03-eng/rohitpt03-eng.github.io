import React from "react";
import { HeroSection } from "./components/sections/HeroSection";
import { MarqueeSection } from "./components/sections/MarqueeSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ContactButton } from "./components/common/ContactButton";
import { FadeIn } from "./components/common/FadeIn";

export const App: React.FC = () => {
  return (
    <main
      className="w-full min-h-screen bg-[#0C0C0C] font-kanit text-[#D7E2EA] relative"
      style={{ overflowX: "clip" }}
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* Footer / Contact Anchor */}
      {/* Footer / Contact Anchor */}
      <footer
        id="contact"
        className="w-full bg-[#0C0C0C] py-20 px-6 md:px-10 border-t border-[#D7E2EA]/10 relative z-20 flex flex-col items-center text-center"
      >
        <FadeIn delay={0} y={30} className="max-w-3xl flex flex-col items-center w-full">
          <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-3">
            Learn &bull; Build &bull; Improve &bull; Repeat
          </span>
          <h3
            className="hero-heading font-black uppercase tracking-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 5rem)" }}
          >
            Let&apos;s Build Something
          </h3>
          <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-lg mb-4 font-light leading-relaxed">
            Interested in working together, exploring electronics, or discussing a web or programming project?
          </p>
          <a
            href="mailto:rohit.pt03@gmail.com"
            className="text-base sm:text-lg text-[#BBCCD7] hover:text-white font-medium tracking-wide underline decoration-[#7621B0] decoration-2 underline-offset-4 mb-8 transition-colors"
          >
            rohit.pt03@gmail.com
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <ContactButton href="mailto:rohit.pt03@gmail.com" />
            <a
              href="https://github.com/rohitpt03-eng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:border-white hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rohit-kumar-b229aa255"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:border-white hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              LinkedIn
            </a>
          </div>

          <div className="pt-8 border-t border-[#D7E2EA]/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7E2EA]/50 uppercase tracking-wider">
            <span>&copy; {new Date().getFullYear()} Rohit &mdash; B.Tech ECE | Programmer | Web Developer</span>
            <div className="flex gap-6">
              <a href="#about" className="hover:text-[#D7E2EA] transition-colors">
                About
              </a>
              <a href="#services" className="hover:text-[#D7E2EA] transition-colors">
                Skills
              </a>
              <a href="#projects" className="hover:text-[#D7E2EA] transition-colors">
                Projects
              </a>
            </div>
          </div>
        </FadeIn>
      </footer>
    </main>
  );
};

export default App;
