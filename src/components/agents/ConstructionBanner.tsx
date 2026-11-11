import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, FastForward, CheckCircle2, X } from "lucide-react";
import type { ConstructionStep } from "../../types/portfolio";
import { CONSTRUCTION_SCRIPT } from "../../data/agents";

interface ConstructionBannerProps {
  currentStep: ConstructionStep;
  dismissed: boolean;
  onDismiss: () => void;
  onReplay: () => void;
  onSkip: () => void;
}

export const ConstructionBanner: React.FC<ConstructionBannerProps> = ({
  currentStep,
  dismissed,
  onDismiss,
  onReplay,
  onSkip,
}) => {
  const phaseInfo = CONSTRUCTION_SCRIPT.find((p) => p.step === currentStep);
  const isComplete = currentStep === 10;

  if (dismissed && isComplete) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] sm:max-w-md pointer-events-auto">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="building-status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="glass-panel-glow rounded-2xl px-4 py-3 flex items-center justify-between gap-4 shadow-2xl"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#7621B0]/25 border border-[#D7E2EA]/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#D7E2EA] animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#BBCCD7]">
                  Live Build • Step {currentStep}/10
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#D7E2EA] truncate">
                  {phaseInfo?.label || "Assembling Portfolio..."}
                </div>
              </div>
            </div>

            <button
              onClick={onSkip}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#D7E2EA]/25 text-[11px] font-mono text-[#D7E2EA] hover:text-white transition-colors cursor-pointer"
            >
              <span>Skip</span>
              <FastForward className="w-3 h-3" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="completed-status"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className="glass-panel-glow rounded-2xl p-4 shadow-2xl border border-[#D7E2EA]/35"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#D7E2EA] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    Portfolio successfully materialized by Ghost AI Agents.
                  </p>
                  <p className="text-[11px] text-[#D7E2EA]/60 mt-1 font-mono">
                    All agents finished building.
                  </p>
                </div>
              </div>
              <button
                onClick={onDismiss}
                aria-label="Close message"
                className="text-[#D7E2EA]/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={onReplay}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-xs font-semibold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                style={{
                  background:
                    "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  outline: "1.5px solid #FFFFFF",
                  outlineOffset: "-2px",
                }}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Watch Agents Work Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConstructionBanner;
