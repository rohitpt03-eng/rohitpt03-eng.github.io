import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { Magnet } from "../common/Magnet";
import { ContactButton } from "../common/ContactButton";
import { BuildBlock } from "../common/BuildBlock";
import { TypingText } from "../common/TypingText";
import type { ConstructionStep, PortfolioConfig } from "../../types/portfolio";

interface HeroSectionProps {
  identity: PortfolioConfig["identity"];
  currentStep: ConstructionStep;
  runKey: number;
  onReplay: () => void;
  onOpenEditor: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  identity,
  currentStep,
  runKey,
  onReplay,
  onOpenEditor,
}) => {
  const portraitRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    if (currentStep >= 5 && portraitRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          portraitRef.current,
          {
            scaleX: 0.3,
            scaleY: 0.3,
            transformOrigin: "top left",
            opacity: 0,
            filter: "brightness(1.4) blur(4px)",
          },
          {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            filter: "brightness(1) blur(0px)",
            duration: 0.85,
            ease: "power3.out",
          }
        );
      });
      return () => ctx.revert();
    }
  }, [currentStep >= 5, runKey]);

  const portraitVisible = currentStep >= 5;

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]"
    >
      {/* Original Minimal Top Navbar */}
      <BuildBlock
        currentStep={currentStep}
        unlockStep={2}
        targetId="navbar"
        className="w-full z-30"
      >
        <header className="px-6 md:px-10 pt-6 md:pt-8">
          <nav className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center justify-between flex-1 gap-4 sm:gap-8 md:gap-12 max-w-4xl">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Discreet Studio Controls matching Original Theme */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={onReplay}
                title="Watch Agents Work Again"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-[#D7E2EA]/25 hover:border-[#D7E2EA]/70 text-[#D7E2EA]/80 hover:text-white text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden xs:inline sm:inline">Replay</span>
              </button>
              <button
                type="button"
                onClick={onOpenEditor}
                title="Edit Portfolio Live"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-[#D7E2EA]/25 hover:border-[#D7E2EA]/70 text-[#D7E2EA]/80 hover:text-white text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span className="hidden xs:inline sm:inline">Edit</span>
              </button>
            </div>
          </nav>
        </header>
      </BuildBlock>

      {/* Massive Original Chrome Heading Typed Live */}
      <div className="w-full overflow-x-clip text-center z-0 px-2">
        <BuildBlock
          currentStep={currentStep}
          unlockStep={4}
          targetId="hero-title"
          className="inline-block w-full"
        >
          <TypingText
            as="h1"
            text={identity.greeting}
            active={currentStep >= 4}
            speedMs={75}
            runKey={runKey}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none"
          />
        </BuildBlock>
      </div>

      {/* Original Centered Overlapping Portrait with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[270px] sm:w-[350px] md:w-[420px] lg:w-[480px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto flex items-end justify-center">
        <BuildBlock
          currentStep={currentStep}
          unlockStep={5}
          targetId="hero-portrait"
          className="w-full flex justify-center"
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <div
              ref={portraitRef}
              className="w-full flex justify-center"
              style={{ opacity: portraitVisible ? 1 : 0 }}
            >
              <img
                src={identity.portraitUrl}
                alt={`${identity.name} - ${identity.headline}`}
                className="w-full h-auto object-contain select-none drop-shadow-[0_20px_50px_rgba(118,33,176,0.35)] rounded-2xl sm:rounded-3xl border border-[#7621B0]/30"
                draggable={false}
              />
            </div>
          </Magnet>
        </BuildBlock>
      </div>

      {/* Original Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <BuildBlock
          currentStep={currentStep}
          unlockStep={3}
          targetId="hero-card"
        >
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[280px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            {identity.subheadline}
          </p>
        </BuildBlock>

        <BuildBlock
          currentStep={currentStep}
          unlockStep={3}
          targetId="hero-cta"
        >
          <ContactButton href="#contact" />
        </BuildBlock>
      </div>
    </section>
  );
};

export default HeroSection;
