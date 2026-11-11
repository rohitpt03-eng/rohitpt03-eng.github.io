import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Save, Sparkles, User, Code2, FolderGit2, Mail } from "lucide-react";
import type { PortfolioConfig } from "../../types/portfolio";

interface PortfolioEditorModalProps {
  open: boolean;
  config: PortfolioConfig;
  onClose: () => void;
  onChange: (next: PortfolioConfig, changedSection: string) => void;
  onReset: () => void;
}

type TabKey = "identity" | "about" | "projects" | "contact";

export const PortfolioEditorModal: React.FC<PortfolioEditorModalProps> = ({
  open,
  config,
  onClose,
  onChange,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>("identity");

  if (!open) return null;

  const updateIdentity = (field: keyof PortfolioConfig["identity"], value: string) => {
    onChange(
      {
        ...config,
        identity: { ...config.identity, [field]: value },
      },
      "Identity"
    );
  };

  const updateAboutParagraph = (index: number, value: string) => {
    const next = [...config.about.paragraphs];
    next[index] = value;
    onChange(
      {
        ...config,
        about: { ...config.about, paragraphs: next },
      },
      "About Me"
    );
  };

  const updateProject = (
    index: number,
    field: "title" | "subtitle" | "description" | "link",
    value: string
  ) => {
    const next = config.projects.map((p, idx) =>
      idx === index ? { ...p, [field]: value } : p
    );
    onChange(
      {
        ...config,
        projects: next,
      },
      `Project 0${index + 1}`
    );
  };

  const updateContact = (field: keyof PortfolioConfig["contact"], value: string) => {
    onChange(
      {
        ...config,
        contact: { ...config.contact, [field]: value },
      },
      "Contact"
    );
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "identity", label: "Identity", icon: <User className="w-3.5 h-3.5" /> },
    { key: "about", label: "About", icon: <Code2 className="w-3.5 h-3.5" /> },
    { key: "projects", label: "Projects", icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { key: "contact", label: "Contact", icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="w-full max-w-lg h-full bg-[#090910] border-l border-purple-500/30 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                  Live Portfolio Configurator
                </h2>
                <p className="text-[11px] font-mono text-slate-400">
                  Changes sync dynamically with Ghost AI Agents
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Bar */}
          <div className="px-6 pt-3 pb-2 border-b border-white/10 flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-purple-600/30 to-cyan-500/30 border border-cyan-400/50 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {activeTab === "identity" && (
              <>
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={config.identity.name}
                    onChange={(e) => updateIdentity("name", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    Hero Greeting
                  </label>
                  <input
                    type="text"
                    value={config.identity.greeting}
                    onChange={(e) => updateIdentity("greeting", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    Role Headline
                  </label>
                  <input
                    type="text"
                    value={config.identity.headline}
                    onChange={(e) => updateIdentity("headline", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    Hero Bio / Subheadline
                  </label>
                  <textarea
                    rows={3}
                    value={config.identity.subheadline}
                    onChange={(e) => updateIdentity("subheadline", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    Motto
                  </label>
                  <input
                    type="text"
                    value={config.identity.motto}
                    onChange={(e) => updateIdentity("motto", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </>
            )}

            {activeTab === "about" && (
              <div className="space-y-4">
                {config.about.paragraphs.map((p, idx) => (
                  <div key={idx}>
                    <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                      About Paragraph {idx + 1}
                    </label>
                    <textarea
                      rows={4}
                      value={p}
                      onChange={(e) => updateAboutParagraph(idx, e.target.value)}
                      className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                {config.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3"
                  >
                    <div className="text-xs font-mono text-purple-300 uppercase">
                      Project {proj.number} • {proj.category}
                    </div>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(idx, "title", e.target.value)}
                      placeholder="Project Title"
                      className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(idx, "description", e.target.value)}
                      placeholder="Description"
                      className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      value={proj.link}
                      onChange={(e) => updateProject(idx, "link", e.target.value)}
                      placeholder="Project / GitHub URL"
                      className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    Contact Heading
                  </label>
                  <input
                    type="text"
                    value={config.contact.heading}
                    onChange={(e) => updateContact("heading", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={config.contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={config.contact.github}
                    onChange={(e) => updateContact("github", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan-300 mb-1.5">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={config.contact.linkedin}
                    onChange={(e) => updateContact("linkedin", e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-3">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/15 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-xs font-semibold uppercase tracking-wider text-white shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PortfolioEditorModal;
