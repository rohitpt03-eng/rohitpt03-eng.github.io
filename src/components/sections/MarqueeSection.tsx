import React, { useEffect, useRef, useState } from "react";
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from "../../data/marquee";

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  // Triple each row for seamless scrolling
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
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll (translateX(offset - 200)) */}
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
                alt="3D Project Preview"
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll (translateX(-(offset - 200))) */}
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
                alt="3D Project Preview"
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
