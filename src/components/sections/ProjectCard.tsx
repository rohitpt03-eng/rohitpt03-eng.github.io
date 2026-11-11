import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { BuildBlock } from "../common/BuildBlock";
import { LiveProjectButton } from "../common/LiveProjectButton";
import type { ConstructionStep, ProjectItem } from "../../types/portfolio";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  currentStep: ConstructionStep;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  currentStep,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-[88vh] relative flex items-start justify-center w-full"
      >
        <motion.div
          style={{
            scale,
            top: `calc(var(--card-top) + ${index * 28}px)`,
          }}
          className="sticky [--card-top:5.5rem] md:[--card-top:7rem] w-full max-w-6xl"
        >
          <BuildBlock
            currentStep={currentStep}
            unlockStep={7}
            targetId={`project-${project.number}`}
          >
            <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
              {/* Top Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
                  <span
                    className="font-black text-[#D7E2EA] leading-none select-none tracking-tight"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                  >
                    {project.number}
                  </span>

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

                <LiveProjectButton href={project.link} />
              </div>

              {/* Project Showcase Asset */}
              <div
                onClick={() => setZoomed(true)}
                className="relative w-full rounded-[30px] sm:rounded-[40px] md:rounded-[48px] overflow-hidden bg-[#16171a] border border-[#D7E2EA]/15 shadow-2xl group cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={`${project.title} Showcase`}
                  loading="lazy"
                  className="w-full h-auto max-h-[52vh] object-cover sm:object-contain md:object-cover object-center rounded-[30px] sm:rounded-[40px] md:rounded-[48px] transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-[#0C0C0C]/80 border border-[#D7E2EA]/30 text-[#D7E2EA]">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </BuildBlock>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-50 bg-[#0C0C0C]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-7 shadow-2xl"
            >
              <button
                onClick={() => setZoomed(false)}
                aria-label="Close Preview"
                className="absolute top-4 right-4 p-2 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mb-4 pr-10">
                <div className="text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                  {project.number} — {project.category}
                </div>
                <h4 className="text-2xl font-bold uppercase text-[#D7E2EA] mt-1">
                  {project.title}
                </h4>
                <p className="text-sm text-[#D7E2EA]/75 font-light mt-1">
                  {project.description}
                </p>
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[65vh] object-contain rounded-2xl bg-[#16171a]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
