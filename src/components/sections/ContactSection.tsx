import React from "react";
import { FadeIn } from "../common/FadeIn";
import { BuildBlock } from "../common/BuildBlock";
import { ContactButton } from "../common/ContactButton";
import type { ConstructionStep, PortfolioConfig } from "../../types/portfolio";

interface ContactSectionProps {
  contact: PortfolioConfig["contact"];
  name: string;
  motto: string;
  currentStep: ConstructionStep;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  name,
  motto,
  currentStep,
}) => {
  return (
    <footer
      id="contact"
      className="w-full bg-[#0C0C0C] py-20 px-6 md:px-10 border-t border-[#D7E2EA]/10 relative z-30 flex flex-col items-center text-center"
    >
      <BuildBlock
        currentStep={currentStep}
        unlockStep={9}
        targetId="contact-card"
        className="max-w-3xl flex flex-col items-center w-full"
      >
        <FadeIn delay={0} y={30} className="w-full flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-3">
            {motto}
          </span>
          <h3
            className="hero-heading font-black uppercase tracking-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 5rem)" }}
          >
            {contact.heading}
          </h3>
          <p className="text-sm sm:text-base text-[#D7E2EA]/70 max-w-lg mb-4 font-light leading-relaxed">
            {contact.subheading}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="text-base sm:text-lg text-[#BBCCD7] hover:text-white font-medium tracking-wide underline decoration-[#7621B0] decoration-2 underline-offset-4 mb-8 transition-colors"
          >
            {contact.email}
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <ContactButton href={`mailto:${contact.email}`} />
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:border-white hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm hover:border-white hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              LinkedIn
            </a>
          </div>

          <div className="pt-8 border-t border-[#D7E2EA]/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7E2EA]/50 uppercase tracking-wider">
            <span>
              &copy; {new Date().getFullYear()} {name} — B.Tech ECE | Programmer | Web Developer
            </span>
            <div className="flex gap-6">
              <a href="#about" className="hover:text-[#D7E2EA] transition-colors">
                About
              </a>
              <a href="#skills" className="hover:text-[#D7E2EA] transition-colors">
                Skills
              </a>
              <a href="#projects" className="hover:text-[#D7E2EA] transition-colors">
                Projects
              </a>
              <a href="#experience" className="hover:text-[#D7E2EA] transition-colors">
                Experience
              </a>
            </div>
          </div>
        </FadeIn>
      </BuildBlock>
    </footer>
  );
};

export default ContactSection;
