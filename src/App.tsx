import React, { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_PORTFOLIO_CONFIG } from "./data/portfolioConfig";
import { CONSTRUCTION_SCRIPT } from "./data/agents";
import type { ConstructionStep, PortfolioConfig } from "./types/portfolio";
import { CursorSpotlight } from "./components/common/CursorSpotlight";
import { GhostAgentsOverlay } from "./components/agents/GhostAgentsOverlay";
import { PortfolioEditorModal } from "./components/agents/PortfolioEditorModal";
import { HeroSection } from "./components/sections/HeroSection";
import { MarqueeSection } from "./components/sections/MarqueeSection";
import { AboutSection } from "./components/sections/AboutSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { EducationSection } from "./components/sections/EducationSection";
import { AchievementsSection } from "./components/sections/AchievementsSection";
import { ContactSection } from "./components/sections/ContactSection";

const STORAGE_KEY = "ghost_ai_rohit_portfolio_v2";

function loadStoredConfig(): PortfolioConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_CONFIG;
    const parsed = JSON.parse(raw) as Partial<PortfolioConfig>;
    return {
      ...DEFAULT_PORTFOLIO_CONFIG,
      ...parsed,
      identity: {
        ...DEFAULT_PORTFOLIO_CONFIG.identity,
        ...(parsed.identity ?? {}),
      },
      about: {
        ...DEFAULT_PORTFOLIO_CONFIG.about,
        ...(parsed.about ?? {}),
      },
      contact: {
        ...DEFAULT_PORTFOLIO_CONFIG.contact,
        ...(parsed.contact ?? {}),
      },
      skills: parsed.skills ?? DEFAULT_PORTFOLIO_CONFIG.skills,
      projects: parsed.projects ?? DEFAULT_PORTFOLIO_CONFIG.projects,
      experience: parsed.experience ?? DEFAULT_PORTFOLIO_CONFIG.experience,
      education: parsed.education ?? DEFAULT_PORTFOLIO_CONFIG.education,
      achievements: parsed.achievements ?? DEFAULT_PORTFOLIO_CONFIG.achievements,
    };
  } catch {
    return DEFAULT_PORTFOLIO_CONFIG;
  }
}

export const App: React.FC = () => {
  const [config, setConfig] = useState<PortfolioConfig>(loadStoredConfig);
  const [currentStep, setCurrentStep] = useState<ConstructionStep>(0);
  const [runKey, setRunKey] = useState<number>(1);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  const timersRef = useRef<number[]>([]);

  const clearScheduledTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  // Run the 10-step live portfolio construction choreography
  useEffect(() => {
    clearScheduledTimers();
    setCurrentStep(0);

    let elapsed = 0;

    CONSTRUCTION_SCRIPT.forEach((phase, index) => {
      const enterTimeout = window.setTimeout(() => {
        setCurrentStep(phase.step);
      }, index === 0 ? 0 : elapsed);

      timersRef.current.push(enterTimeout);
      elapsed += phase.durationMs;
    });

    return clearScheduledTimers;
  }, [runKey, clearScheduledTimers]);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("ghost-replay"));
    setRunKey((prev) => prev + 1);
  }, []);

  const handleConfigChange = useCallback(
    (next: PortfolioConfig, _changedSection: string) => {
      setConfig(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
    },
    []
  );

  const handleResetConfig = useCallback(() => {
    setConfig(DEFAULT_PORTFOLIO_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage removal errors
    }
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-[#0C0C0C] font-kanit text-[#D7E2EA] relative"
      style={{ overflowX: "clip" }}
    >
      {/* Subtle studio cursor ambient light */}
      <CursorSpotlight />

      {/* 28 animated desktop / 14 mobile real OS pointers (auto-hide as sections finish) */}
      <GhostAgentsOverlay
        currentStep={currentStep}
        visible={true}
        runKey={runKey}
      />

      {/* Main Portfolio Modules matching original layout & theme */}
      <main className="relative z-10">
        <HeroSection
          identity={config.identity}
          currentStep={currentStep}
          runKey={runKey}
          onReplay={handleReplay}
          onOpenEditor={() => setEditorOpen(true)}
        />

        <MarqueeSection currentStep={currentStep} />

        <AboutSection about={config.about} currentStep={currentStep} />

        <SkillsSection skills={config.skills} currentStep={currentStep} />

        <ProjectsSection
          projects={config.projects}
          currentStep={currentStep}
        />

        <ExperienceSection
          experience={config.experience}
          currentStep={currentStep}
        />

        <EducationSection
          education={config.education}
          currentStep={currentStep}
        />

        <AchievementsSection
          achievements={config.achievements}
          currentStep={currentStep}
        />
      </main>

      <ContactSection
        contact={config.contact}
        name={config.identity.name}
        motto={config.identity.motto}
        currentStep={currentStep}
      />

      {/* Live Content Configuration Drawer */}
      <PortfolioEditorModal
        open={editorOpen}
        config={config}
        onClose={() => setEditorOpen(false)}
        onChange={handleConfigChange}
        onReset={handleResetConfig}
      />
    </div>
  );
};

export default App;
