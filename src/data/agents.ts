import type { GhostAgentDef, ConstructionStep } from "../types/portfolio";

export const GHOST_AGENTS: GhostAgentDef[] = [
  { id: "a1", label: "Ghost-01", role: "Architect", color: "#22D3EE", glow: "rgba(34,211,238,0.8)", assignedTarget: "navbar", speed: 1.0 },
  { id: "a2", label: "Design-Agent", role: "Styling", color: "#A855F7", glow: "rgba(168,85,247,0.85)", assignedTarget: "hero-portrait", speed: 0.92 },
  { id: "a3", label: "Code-Agent", role: "Builder", color: "#60A5FA", glow: "rgba(96,165,250,0.85)", assignedTarget: "project-01", speed: 1.08 },
  { id: "a4", label: "UI-Agent", role: "Layout", color: "#E879F9", glow: "rgba(232,121,249,0.8)", assignedTarget: "hero-card", speed: 0.95 },
  { id: "a5", label: "Creative-Agent", role: "VFX", color: "#38BDF8", glow: "rgba(56,189,248,0.85)", assignedTarget: "hero-portrait", speed: 1.12 },
  { id: "a6", label: "Content-Agent", role: "Copy", color: "#FFFFFF", glow: "rgba(255,255,255,0.75)", assignedTarget: "hero-title", speed: 0.88 },
  { id: "a7", label: "Ghost-07", role: "Verifier", color: "#C084FC", glow: "rgba(192,132,252,0.8)", assignedTarget: "skills-grid", speed: 1.05 },
  { id: "a8", label: "Layout-Agent", role: "Grid", color: "#2DD4BF", glow: "rgba(45,212,191,0.8)", assignedTarget: "about-card", speed: 0.96 },
  { id: "a9", label: "Motion-Agent", role: "GSAP", color: "#818CF8", glow: "rgba(129,140,248,0.85)", assignedTarget: "project-02", speed: 1.15 },
  { id: "a10", label: "Firmware-Agent", role: "ECE", color: "#22D3EE", glow: "rgba(34,211,238,0.8)", assignedTarget: "project-03", speed: 0.9 },
  { id: "a11", label: "Ghost-02", role: "DOM", color: "#A855F7", glow: "rgba(168,85,247,0.8)", assignedTarget: "navbar", speed: 1.02 },
  { id: "a12", label: "Shader-Agent", role: "Glow", color: "#3B82F6", glow: "rgba(59,130,246,0.85)", assignedTarget: "hero-cta", speed: 1.1 },
  { id: "a13", label: "Syntax-Agent", role: "TSX", color: "#67E8F9", glow: "rgba(103,232,249,0.8)", assignedTarget: "skills-grid", speed: 0.94 },
  { id: "a14", label: "Ghost-04", role: "Tokens", color: "#D946EF", glow: "rgba(217,70,239,0.8)", assignedTarget: "experience-list", speed: 1.07 },
  { id: "a15", label: "Grid-Agent", role: "Snap", color: "#93C5FD", glow: "rgba(147,197,253,0.8)", assignedTarget: "education-card", speed: 0.89 },
  { id: "a16", label: "Ghost-09", role: "Hydrate", color: "#C4B5FD", glow: "rgba(196,181,253,0.8)", assignedTarget: "achievements-grid", speed: 1.04 },
  { id: "a17", label: "Vector-Agent", role: "SVG", color: "#06B6D4", glow: "rgba(6,182,212,0.85)", assignedTarget: "contact-card", speed: 0.98 },
  { id: "a18", label: "Perf-Agent", role: "60fps", color: "#E2E8F0", glow: "rgba(226,232,240,0.75)", assignedTarget: "hero-card", speed: 1.16 },
  { id: "a19", label: "Ghost-11", role: "Wire", color: "#A855F7", glow: "rgba(168,85,247,0.8)", assignedTarget: "about-card", speed: 0.91 },
  { id: "a20", label: "Logic-Agent", role: "C++", color: "#38BDF8", glow: "rgba(56,189,248,0.8)", assignedTarget: "project-02", speed: 1.03 },
  { id: "a21", label: "Pixel-Agent", role: "Align", color: "#F0ABFC", glow: "rgba(240,171,252,0.8)", assignedTarget: "project-01", speed: 0.97 },
  { id: "a22", label: "Circuit-Agent", role: "Hardware", color: "#22D3EE", glow: "rgba(34,211,238,0.85)", assignedTarget: "project-03", speed: 1.09 },
  { id: "a23", label: "Ghost-14", role: "Sync", color: "#60A5FA", glow: "rgba(96,165,250,0.8)", assignedTarget: "contact-card", speed: 0.93 },
  { id: "a24", label: "Theme-Agent", role: "Dark", color: "#8B5CF6", glow: "rgba(139,92,246,0.85)", assignedTarget: "skills-grid", speed: 1.06 },
  { id: "a25", label: "Ghost-18", role: "State", color: "#2DD4BF", glow: "rgba(45,212,191,0.8)", assignedTarget: "experience-list", speed: 1.01 },
  { id: "a26", label: "Deploy-Agent", role: "Edge", color: "#3B82F6", glow: "rgba(59,130,246,0.8)", assignedTarget: "achievements-grid", speed: 0.95 },
  { id: "a27", label: "Ghost-21", role: "Audit", color: "#E879F9", glow: "rgba(232,121,249,0.8)", assignedTarget: "education-card", speed: 1.11 },
  { id: "a28", label: "Neural-09", role: "Polish", color: "#FFFFFF", glow: "rgba(255,255,255,0.85)", assignedTarget: "hero-title", speed: 1.0 },
  { id: "a29", label: "Ghost-22", role: "Align", color: "#D7E2EA", glow: "rgba(215,226,234,0.8)", assignedTarget: "navbar", speed: 0.94 },
  { id: "a30", label: "Ghost-23", role: "Measure", color: "#A855F7", glow: "rgba(168,85,247,0.8)", assignedTarget: "hero-card", speed: 1.07 },
  { id: "a31", label: "Ghost-24", role: "Snap", color: "#60A5FA", glow: "rgba(96,165,250,0.8)", assignedTarget: "hero-portrait", speed: 0.99 },
  { id: "a32", label: "Ghost-25", role: "Type", color: "#22D3EE", glow: "rgba(34,211,238,0.8)", assignedTarget: "hero-title", speed: 1.13 },
  { id: "a33", label: "Ghost-26", role: "Render", color: "#E2E8F0", glow: "rgba(226,232,240,0.8)", assignedTarget: "about-card", speed: 0.91 },
  { id: "a34", label: "Ghost-27", role: "Verify", color: "#C084FC", glow: "rgba(192,132,252,0.8)", assignedTarget: "skills-grid", speed: 1.04 },
  { id: "a35", label: "Ghost-28", role: "Trace", color: "#38BDF8", glow: "rgba(56,189,248,0.8)", assignedTarget: "project-01", speed: 0.96 },
  { id: "a36", label: "Ghost-29", role: "Bind", color: "#818CF8", glow: "rgba(129,140,248,0.8)", assignedTarget: "project-02", speed: 1.08 },
  { id: "a37", label: "Ghost-30", role: "Wire", color: "#2DD4BF", glow: "rgba(45,212,191,0.8)", assignedTarget: "project-03", speed: 0.93 },
  { id: "a38", label: "Ghost-31", role: "Frame", color: "#F0ABFC", glow: "rgba(240,171,252,0.8)", assignedTarget: "experience-list", speed: 1.05 },
  { id: "a39", label: "Ghost-32", role: "Lock", color: "#93C5FD", glow: "rgba(147,197,253,0.8)", assignedTarget: "education-card", speed: 1.02 },
  { id: "a40", label: "Ghost-33", role: "Sync", color: "#D7E2EA", glow: "rgba(215,226,234,0.85)", assignedTarget: "contact-card", speed: 0.97 },
];

export interface PhaseScript {
  step: ConstructionStep;
  durationMs: number;
  label: string;
  logs: { agent: string; color: string; message: string; type: "build" | "style" | "code" | "complete" | "think" }[];
}

export const CONSTRUCTION_SCRIPT: PhaseScript[] = [
  {
    step: 0,
    durationMs: 700,
    label: "Booting Ghost OS Canvas...",
    logs: [
      { agent: "Ghost-01", color: "#22D3EE", message: "Initializing deep black #050505 workspace...", type: "build" },
      { agent: "Theme-Agent", color: "#8B5CF6", message: "Calibrating cyber grid & neon shaders...", type: "style" },
    ],
  },
  {
    step: 1,
    durationMs: 900,
    label: "Deploying 28 Ghost AI Agents...",
    logs: [
      { agent: "Ghost-02", color: "#A855F7", message: "28 autonomous cursor agents entering canvas...", type: "build" },
      { agent: "UI-Agent", color: "#E879F9", message: "Acquiring DOM geometry & viewport coordinates...", type: "think" },
    ],
  },
  {
    step: 2,
    durationMs: 1100,
    label: "Constructing Navigation Bar...",
    logs: [
      { agent: "Ghost-01", color: "#22D3EE", message: "Building glassmorphic navigation bar...", type: "build" },
      { agent: "Design-Agent", color: "#A855F7", message: "Binding smooth anchor links & edit trigger...", type: "style" },
    ],
  },
  {
    step: 3,
    durationMs: 1100,
    label: "Assembling Hero Architecture...",
    logs: [
      { agent: "UI-Agent", color: "#E879F9", message: "Building Hero Section container & grid locks...", type: "build" },
      { agent: "Shader-Agent", color: "#3B82F6", message: "Injecting electric purple & cyan edge glow...", type: "style" },
    ],
  },
  {
    step: 4,
    durationMs: 1700,
    label: "Synthesizing Identity & Typography...",
    logs: [
      { agent: "Content-Agent", color: "#FFFFFF", message: "Typing Hero headline: \"Hi, I'm Rohit\"...", type: "code" },
      { agent: "Design-Agent", color: "#A855F7", message: "Adjusting futuristic gradient typography...", type: "style" },
    ],
  },
  {
    step: 5,
    durationMs: 1300,
    label: "Materializing Portrait Hologram...",
    logs: [
      { agent: "Creative-Agent", color: "#38BDF8", message: "Materializing Rohit portrait & magnetic field...", type: "build" },
      { agent: "Perf-Agent", color: "#E2E8F0", message: "Attaching 60fps magnetic cursor tracking...", type: "code" },
    ],
  },
  {
    step: 6,
    durationMs: 900,
    label: "Preparing About & Technical Skills...",
    logs: [
      { agent: "Layout-Agent", color: "#2DD4BF", message: "Constructing About Me & ECE background...", type: "build" },
      { agent: "Syntax-Agent", color: "#67E8F9", message: "Populating C/C++, Web & Embedded skills...", type: "code" },
    ],
  },
  {
    step: 7,
    durationMs: 900,
    label: "Assembling Project Showcase Cards...",
    logs: [
      { agent: "Code-Agent", color: "#60A5FA", message: "Generating Project 01–03 showcase cards...", type: "code" },
      { agent: "Circuit-Agent", color: "#22D3EE", message: "Arranging Hardware & Sensor visual assets...", type: "build" },
    ],
  },
  {
    step: 8,
    durationMs: 850,
    label: "Mounting Experience, Education & Achievements...",
    logs: [
      { agent: "Ghost-18", color: "#2DD4BF", message: "Rendering B.Tech ECE timeline & milestones...", type: "build" },
      { agent: "Ghost-09", color: "#C4B5FD", message: "Adding glassmorphism cards & metrics...", type: "style" },
    ],
  },
  {
    step: 9,
    durationMs: 800,
    label: "Wiring Contact Interface...",
    logs: [
      { agent: "Vector-Agent", color: "#06B6D4", message: "Creating interactive Contact & GitHub links...", type: "build" },
      { agent: "Ghost-14", color: "#60A5FA", message: "Binding rohit.pt03@gmail.com telemetry...", type: "code" },
    ],
  },
  {
    step: 10,
    durationMs: 600,
    label: "Final Polish Complete",
    logs: [
      { agent: "Creative-Agent", color: "#38BDF8", message: "Running final visual glow & polish sweep...", type: "style" },
      { agent: "Ghost-07", color: "#C084FC", message: "Portfolio successfully materialized by Ghost AI Agents.", type: "complete" },
    ],
  },
];

export const AUTONOMOUS_IDLE_LOGS: { agent: string; color: string; message: string; type: "build" | "style" | "code" | "think" }[] = [
  { agent: "Design-Agent", color: "#A855F7", message: "Fine-tuning glassmorphism border luminance...", type: "style" },
  { agent: "Code-Agent", color: "#60A5FA", message: "Verifying React & GSAP timeline integrity...", type: "code" },
  { agent: "UI-Agent", color: "#E879F9", message: "Optimizing responsive card spacing...", type: "build" },
  { agent: "Firmware-Agent", color: "#22D3EE", message: "Checking Embedded & C++ project telemetry...", type: "think" },
  { agent: "Creative-Agent", color: "#38BDF8", message: "Refreshing neon cursor trail gradients...", type: "style" },
  { agent: "Perf-Agent", color: "#E2E8F0", message: "Maintaining 60fps canvas animation budget...", type: "code" },
  { agent: "Ghost-01", color: "#22D3EE", message: "Monitoring user scroll & hover interactions...", type: "think" },
  { agent: "Content-Agent", color: "#FFFFFF", message: "Live editor schema synchronized & ready.", type: "code" },
];
