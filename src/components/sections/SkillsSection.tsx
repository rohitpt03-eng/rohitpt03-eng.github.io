import React from "react";
import { FadeIn } from "../common/FadeIn";
import { BuildBlock } from "../common/BuildBlock";
import type { ConstructionStep, SkillCategory } from "../../types/portfolio";

interface SkillsSectionProps {
  skills: SkillCategory[];
  currentStep: ConstructionStep;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  currentStep,
}) => {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="text-[#0C0C0C] font-black uppercase leading-none text-center mb-16 sm:mb-20 md:mb-28 select-none"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            What I Do
          </h2>
        </FadeIn>

        <BuildBlock
          currentStep={currentStep}
          unlockStep={6}
          targetId="skills-grid"
        >
          <div className="border-t border-[#0C0C0C]/15">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-16">
                  {/* Large Original Index Number */}
                  <div
                    className="font-black text-[#0C0C0C] leading-none shrink-0 select-none"
                    style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Category + Description + Crisp Tags */}
                  <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                    <h3
                      className="font-medium uppercase text-[#0C0C0C] leading-tight"
                      style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                    >
                      {skill.category}
                    </h3>
                    <p
                      className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl opacity-60"
                      style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                    >
                      {skill.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full border border-[#0C0C0C]/20 text-xs sm:text-sm font-normal text-[#0C0C0C]/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
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

export default SkillsSection;
