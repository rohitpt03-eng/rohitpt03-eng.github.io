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
      className="h-[88vh] relative flex items-start justify-center w-full"
    >
      <motion.div
        style={{
          scale,
          top: `calc(var(--card-top) + ${index * 28}px)`,
        }}
        className="sticky [--card-top:5.5rem] md:[--card-top:7rem] w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
            {/* Huge Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none select-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              {project.number}
            </span>

            {/* Category + Title + Subtitle */}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium uppercase text-[#D7E2EA] tracking-wide">
                {project.title}
              </h3>
              {project.subtitle && (
                <span className="text-xs sm:text-sm text-[#D7E2EA]/50 font-light hidden sm:inline-block">
                  {project.subtitle}
                </span>
              )}
            </div>
          </div>

          {/* Live Project Button */}
          <LiveProjectButton href={project.link} />
        </div>

        {/* Bottom Row: Showcase Image or 2-Column Grid */}
        {project.image ? (
          <div className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[48px] overflow-hidden bg-[#16171a] border border-[#D7E2EA]/15 shadow-2xl group">
            <img
              src={project.image}
              alt={`${project.title} Showcase`}
              loading="lazy"
              className="w-full h-auto max-h-[54vh] object-cover sm:object-contain md:object-cover object-center rounded-[30px] sm:rounded-[40px] md:rounded-[48px] transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 items-stretch">
            {/* Left Column (40% width) */}
            <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-6">
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

            {/* Right Column (60% width) */}
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
        )}
      </motion.div>
    </div>
  );
};

export default ProjectCard;
