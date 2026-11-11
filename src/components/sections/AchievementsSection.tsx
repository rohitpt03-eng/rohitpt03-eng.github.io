import React from "react";
import { FadeIn } from "../common/FadeIn";
import { BuildBlock } from "../common/BuildBlock";
import type { AchievementItem, ConstructionStep } from "../../types/portfolio";

interface AchievementsSectionProps {
  achievements: AchievementItem[];
  currentStep: ConstructionStep;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  currentStep,
}) => {
  return (
    <section
      id="achievements"
      className="bg-[#0C0C0C] text-[#D7E2EA] relative z-30 px-5 sm:px-8 md:px-10 py-16 sm:py-24"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={30} className="w-full text-center mb-12 sm:mb-16">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(2.4rem, 9vw, 120px)" }}
          >
            Milestones
          </h2>
        </FadeIn>

        <BuildBlock
          currentStep={currentStep}
          unlockStep={8}
          targetId="achievements-grid"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] sm:rounded-[36px] border border-[#D7E2EA]/25 bg-[#0C0C0C] p-6 sm:p-7 hover:border-[#D7E2EA]/70 transition-colors"
              >
                <div className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 mb-3">
                  {item.category}
                </div>
                <div
                  className="hero-heading font-black leading-none mb-3"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {item.metric}
                </div>
                <h3 className="text-lg sm:text-xl font-medium uppercase text-[#D7E2EA] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#D7E2EA]/65 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </BuildBlock>
      </div>
    </section>
  );
};

export default AchievementsSection;
