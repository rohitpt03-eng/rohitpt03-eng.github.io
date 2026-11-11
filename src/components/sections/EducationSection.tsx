import React from "react";
import { FadeIn } from "../common/FadeIn";
import { BuildBlock } from "../common/BuildBlock";
import type { ConstructionStep, EducationItem } from "../../types/portfolio";

interface EducationSectionProps {
  education: EducationItem[];
  currentStep: ConstructionStep;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  currentStep,
}) => {
  return (
    <section
      id="education"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-16"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40} className="w-full text-center mb-14 sm:mb-20">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(2.8rem, 11vw, 145px)" }}
          >
            Education
          </h2>
        </FadeIn>

        <BuildBlock
          currentStep={currentStep}
          unlockStep={8}
          targetId="education-card"
        >
          <div className="space-y-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-[32px] sm:rounded-[44px] border-2 border-[#D7E2EA]/40 bg-[#0C0C0C] p-6 sm:p-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60">
                    {edu.degree}
                  </span>
                  <span className="text-xs sm:text-sm uppercase tracking-wider px-4 py-1 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]">
                    {edu.status}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase text-[#D7E2EA] tracking-wide mb-4">
                  {edu.field}
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-[#D7E2EA]/70 font-light leading-relaxed mb-6 max-w-3xl">
                  {edu.description}
                </p>

                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-[#D7E2EA]/15">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-4 py-1.5 rounded-full border border-[#D7E2EA]/25 text-xs sm:text-sm text-[#D7E2EA]/85 font-light"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BuildBlock>
      </div>
    </section>
  );
};

export default EducationSection;
