import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LiveProjectButton } from "../common/LiveProjectButton";
import type { ProjectItem } from "../../data/projects";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] relative flex items-start justify-center w-full"
    >
      <motion.div
        style={{
          scale,
          top: `calc(var(--card-top) + ${index * 28}px)`,
        }}
        className="sticky [--card-top:6rem] md:[--card-top:8rem] w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
            {/* Huge Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {project.number}
            </span>

            {/* Category + Title */}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium uppercase text-[#D7E2EA] tracking-wide">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Live Project Button */}
          <LiveProjectButton href={project.link} />
        </div>

        {/* Bottom Row: 2-Column Image Grid */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 items-stretch">
          {/* Left Column (40% width) */}
          <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-6">
            {/* Top Image: clamp(130px, 16vw, 230px) */}
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16171a] flex-shrink-0"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.title} Preview 1`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>

            {/* Bottom Image: clamp(160px, 22vw, 340px) */}
            <div
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16171a] flex-shrink-0"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.title} Preview 2`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          </div>

          {/* Right Column (60% width) - 1 Tall Image */}
          <div className="w-full md:w-[60%] flex min-h-[220px] md:min-h-0">
            <div className="w-full h-full min-h-[260px] md:min-h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#16171a]">
              <img
                src={project.col2Image}
                alt={`${project.title} Main Preview`}
                loading="lazy"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
