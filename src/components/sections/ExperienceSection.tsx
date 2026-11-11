import React from "react";
import { FadeIn } from "../common/FadeIn";
import { BuildBlock } from "../common/BuildBlock";
import type { ConstructionStep, ExperienceItem } from "../../types/portfolio";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  currentStep: ConstructionStep;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  currentStep,
}) => {
  return (
    <section
      id="experience"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="text-[#0C0C0C] font-black uppercase leading-none text-center mb-16 sm:mb-20 md:mb-24 select-none"
            style={{ fontSize: "clamp(2.8rem, 11vw, 145px)" }}
          >
            Experience
          </h2>
        </FadeIn>

        <BuildBlock
          currentStep={currentStep}
          unlockStep={8}
          targetId="experience-list"
        >
          <div className="border-t border-[#0C0C0C]/15">
            {experience.map((item, idx) => (
              <div
                key={item.id}
                className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-14">
                  <div
                    className="font-black text-[#0C0C0C] leading-none shrink-0 select-none"
                    style={{ fontSize: "clamp(2.5rem, 8vw, 110px)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/60">
                        {item.organization} · {item.type}
                      </span>
                      <span className="text-xs sm:text-sm font-medium uppercase tracking-wider px-3 py-1 rounded-full border border-[#0C0C0C]/20">
                        {item.period}
                      </span>
                    </div>

                    <h3
                      className="font-medium uppercase text-[#0C0C0C] leading-tight mb-3"
                      style={{ fontSize: "clamp(1.1rem, 2.2vw, 2rem)" }}
                    >
                      {item.role}
                    </h3>

                    <ul className="space-y-2 text-[#0C0C0C]/70 font-light text-sm sm:text-base leading-relaxed">
                      {item.highlights.map((bullet, bIdx) => (
                        <li key={bIdx}>• {bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BuildBlock>
      </div>
    </section>
  );
};

export default ExperienceSection;
