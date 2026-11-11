import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import type { ActivityLogEntry, ConstructionStep } from "../../types/portfolio";

interface AgentActivityPanelProps {
  logs: ActivityLogEntry[];
  currentStep: ConstructionStep;
  agentsVisible: boolean;
  onToggleAgents: () => void;
  onReplay: () => void;
  onOpenEditor: () => void;
}

export const AgentActivityPanel: React.FC<AgentActivityPanelProps> = ({
  logs,
  currentStep,
  agentsVisible,
  onToggleAgents,
  onReplay,
  onOpenEditor,
}) => {
  const [minimized, setMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && !minimized) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, minimized]);

  // Collapse automatically by default on very narrow mobile screens after completion so reading isn't blocked
  useEffect(() => {
    if (currentStep === 10 && window.innerWidth < 640) {
      const timer = window.setTimeout(() => setMinimized(true), 2500);
      return () => window.clearTimeout(timer);
    }
  }, [currentStep]);

  const progressPercent = Math.round((currentStep / 10) * 100);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-40 w-[calc(100vw-2rem)] sm:w-[370px] rounded-2xl glass-panel-glow overflow-hidden shadow-2xl"
    >
      {/* Header Bar */}
      <div className="px-3.5 py-2.5 bg-white/[0.03] border-b border-[#D7E2EA]/15 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex h-2.5 w-2.5 shrink-0">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                currentStep < 10 ? "bg-[#D7E2EA]" : "bg-[#B600A8]"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                currentStep < 10 ? "bg-[#D7E2EA]" : "bg-[#B600A8]"
              }`}
            />
          </div>
          <Terminal className="w-3.5 h-3.5 text-[#BBCCD7] shrink-0" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D7E2EA] truncate">
            Ghost AI Activity
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#7621B0]/30 border border-[#D7E2EA]/25 text-[#D7E2EA] shrink-0">
            {currentStep < 10 ? `${progressPercent}%` : "LIVE"}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleAgents}
            title={agentsVisible ? "Hide Ghost Cursors" : "Show Ghost Cursors"}
            className="p-1.5 rounded-lg text-[#D7E2EA]/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {agentsVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onReplay}
            title="Watch Agents Work Again"
            className="p-1.5 rounded-lg text-[#D7E2EA]/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenEditor}
            title="Configure Portfolio Live"
            className="p-1.5 rounded-lg text-[#D7E2EA]/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMinimized((v) => !v)}
            title={minimized ? "Expand Activity Panel" : "Minimize Activity Panel"}
            className="p-1.5 rounded-lg text-[#D7E2EA]/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {minimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Progress Strip */}
      <div className="h-[2px] w-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#7621B0] via-[#D7E2EA] to-[#BE4C00]"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.45 }}
        />
      </div>

      {/* Streaming Terminal Body */}
      <AnimatePresence initial={false}>
        {!minimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              ref={scrollRef}
              className="p-3 h-[175px] overflow-y-auto space-y-1.5 font-mono text-[11px] leading-relaxed bg-[#0C0C0C]/90"
            >
              {logs.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-1.5 animate-fadeIn"
                >
                  <span className="text-[#646973] shrink-0 text-[10px] mt-[1px]">
                    {entry.timestamp}
                  </span>
                  <span className="font-semibold shrink-0 text-[#BBCCD7]">
                    [{entry.agent}]
                  </span>
                  <span
                    className={
                      entry.type === "complete"
                        ? "text-white font-semibold"
                        : "text-[#D7E2EA]/80"
                    }
                  >
                    {entry.message}
                  </span>
                </div>
              ))}
              {currentStep < 10 && (
                <div className="flex items-center gap-1.5 text-[#D7E2EA]/60 pt-1">
                  <Sparkles className="w-3 h-3 animate-spin" />
                  <span>Agents coordinating next build operation...</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default AgentActivityPanel;
