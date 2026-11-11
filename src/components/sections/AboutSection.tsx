import React from "react";
import { FadeIn } from "../common/FadeIn";
import { ContactButton } from "../common/ContactButton";
import { BuildBlock } from "../common/BuildBlock";
import { AnimatedText } from "./AnimatedText";
import type { ConstructionStep, PortfolioConfig } from "../../types/portfolio";

interface AboutSectionProps {
  about: PortfolioConfig["about"];
  currentStep: ConstructionStep;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  currentStep,
}) => {
  const aboutText = about.paragraphs.join(" ");

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Original Decorative Corner 3D Elements */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Geometric Object"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group Icon"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Main Content */}
      <BuildBlock
        currentStep={currentStep}
        unlockStep={6}
        targetId="about-card"
        className="relative z-20 flex flex-col items-center max-w-4xl mx-auto w-full"
      >
        <div className="w-full text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            {about.title}
          </h2>
        </div>

        <div className="mt-10 sm:mt-14 md:mt-16 w-full flex justify-center px-4">
          <div className="max-w-[560px]">
            <AnimatedText
              text={aboutText}
              className="text-[#D7E2EA]"
              style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" } as React.CSSProperties}
            />
          </div>
        </div>

        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton href="#contact" />
        </div>
      </BuildBlock>
    </section>
  );
};

export default AboutSection;
