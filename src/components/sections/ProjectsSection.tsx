import React from "react";
import { FadeIn } from "../common/FadeIn";
import { BuildBlock } from "../common/BuildBlock";
import { ProjectCard } from "./ProjectCard";
import type { ConstructionStep, ProjectItem } from "../../types/portfolio";

interface ProjectsSectionProps {
  projects: ProjectItem[];
  currentStep: ConstructionStep;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  currentStep,
}) => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
    >
      <div className="max-w-7xl mx-auto">
        <BuildBlock
          currentStep={currentStep}
          unlockStep={7}
          targetId="projects-header"
        >
          <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              Project
            </h2>
          </FadeIn>
        </BuildBlock>

        {/* Original Sticky Stacking Project Cards */}
        <div className="flex flex-col items-center">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projects.length}
              currentStep={currentStep}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
