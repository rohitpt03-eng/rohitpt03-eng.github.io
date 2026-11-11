import React, { useEffect, useRef, useState } from "react";
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from "../../data/marquee";
import { BuildBlock } from "../common/BuildBlock";
import type { ConstructionStep } from "../../types/portfolio";

interface MarqueeSectionProps {
  currentStep?: ConstructionStep;
}

export const MarqueeSection: React.FC<MarqueeSectionProps> = ({
  currentStep = 10,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const row1Images = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  const row2Images = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const currentOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(currentOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <BuildBlock
        currentStep={currentStep}
        unlockStep={6}
        targetId="marquee-strip"
      >
        <div className="flex flex-col gap-3">
          {/* Row 1: Moves RIGHT on scroll */}
          <div
            className="flex gap-3 whitespace-nowrap"
            style={{
              transform: `translateX(${offset - 200}px)`,
              willChange: "transform",
            }}
          >
            {row1Images.map((src, index) => (
              <div
                key={`row1-${index}-${src}`}
                className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#16171a] flex-shrink-0 shadow-lg"
              >
                <img
                  src={src}
                  alt="Project Showcase Preview"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>

          {/* Row 2: Moves LEFT on scroll */}
          <div
            className="flex gap-3 whitespace-nowrap"
            style={{
              transform: `translateX(${-(offset - 200)}px)`,
              willChange: "transform",
            }}
          >
            {row2Images.map((src, index) => (
              <div
                key={`row2-${index}-${src}`}
                className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#16171a] flex-shrink-0 shadow-lg"
              >
                <img
                  src={src}
                  alt="Project Showcase Preview"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </BuildBlock>
    </section>
  );
};

export default MarqueeSection;
