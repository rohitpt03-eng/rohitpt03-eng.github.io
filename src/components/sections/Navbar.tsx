import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, SlidersHorizontal, RotateCcw, Menu, X } from "lucide-react";
import { BuildBlock } from "../common/BuildBlock";
import type { ConstructionStep } from "../../types/portfolio";

interface NavbarProps {
  name: string;
  currentStep: ConstructionStep;
  onReplay: () => void;
  onOpenEditor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  currentStep,
  onReplay,
  onOpenEditor,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-3">
      <BuildBlock
        currentStep={currentStep}
        unlockStep={2}
        targetId="navbar"
        agentLabel="Ghost-01"
        actionLabel="Constructing NavBar..."
        className="max-w-7xl mx-auto"
      >
        <nav className="glass-panel-glow rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group text-white no-underline shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600/40 to-cyan-500/40 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-kanit font-bold tracking-wider uppercase text-sm sm:text-base text-white">
                {name}
                <span className="text-cyan-400">.AI</span>
              </span>
              <span className="font-mono text-[9px] text-purple-300/80 tracking-widest uppercase">
                Ghost Builder
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium uppercase tracking-widest text-slate-300 hover:text-cyan-300 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onReplay}
              title="Watch Agents Work Again"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/50 text-[11px] font-mono uppercase tracking-wider text-slate-200 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-purple-300" />
              <span>Replay AI</span>
            </button>

            <button
              onClick={onOpenEditor}
              title="Customize Portfolio Content"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-cyan-500/30 hover:from-purple-600/50 hover:to-cyan-500/50 border border-cyan-400/40 text-[11px] font-mono uppercase tracking-wider text-cyan-200 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Edit</span>
            </button>

            {/* Mobile Burger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle Menu"
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white cursor-pointer"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass-panel-glow rounded-2xl p-4 flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-medium uppercase tracking-widest text-slate-200 hover:bg-white/10 hover:text-cyan-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onReplay();
                }}
                className="mt-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-purple-600/20 border border-purple-400/40 text-xs font-mono uppercase text-purple-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Watch Agents Work Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </BuildBlock>
    </header>
  );
};

export default Navbar;
