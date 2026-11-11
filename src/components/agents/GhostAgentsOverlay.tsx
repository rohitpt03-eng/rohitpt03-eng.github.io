import React, { useEffect, useRef, useState } from "react";
import { GHOST_AGENTS } from "../../data/agents";
import type { ConstructionStep } from "../../types/portfolio";

interface GhostAgentsOverlayProps {
  currentStep: ConstructionStep;
  visible: boolean;
  runKey: number;
}

type CursorKind = "arrow" | "hand" | "text" | "resize";

interface TrailPoint {
  x: number;
  y: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface ActiveMarquee {
  originX: number;
  originY: number;
  agentIdx: number;
  color: string;
  expiresAt: number;
}

interface AgentSim {
  x: number;
  y: number;
  startX: number;
  startY: number;
  ctrlX: number;
  ctrlY: number;
  destX: number;
  destY: number;
  moveStartTime: number;
  moveDuration: number;
  holdUntil: number;
  phase: "moving" | "holding" | "dragging_box";
  cursorKind: CursorKind;
  draggingFromX: number;
  draggingFromY: number;
  clickingUntil: number;
  pendingClickEl: HTMLElement | null;
  didClickOnArrive: boolean;
  trail: TrailPoint[];
  assignedBlockId: string | null;
  retireAtStep: number;
  wakeUntil: number;
}

const STEP_PRIORITY_TARGETS: Record<ConstructionStep, string[]> = {
  0: [],
  1: ["navbar", "hero-card"],
  2: ["navbar"],
  3: ["hero-card", "hero-badge", "navbar"],
  4: ["hero-title", "hero-subtitle", "hero-cta", "hero-badge"],
  5: ["hero-portrait", "hero-card", "hero-cta"],
  6: ["about-card", "skills-grid", "hero-card", "hero-portrait"],
  7: ["project-01", "project-02", "project-03", "projects-header"],
  8: ["experience-list", "education-card", "achievements-grid"],
  9: ["contact-card", "navbar", "hero-card"],
  10: ["navbar", "hero-card", "hero-portrait", "hero-cta"],
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function flashDomElement(el: HTMLElement | null) {
  if (!el || !el.isConnected) return;
  el.classList.add("agent-touch-active");
  window.setTimeout(() => {
    el.classList.remove("agent-touch-active");
  }, 340);
}

export const GhostAgentsOverlay: React.FC<GhostAgentsOverlayProps> = ({
  currentStep,
  visible,
  runKey,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spriteArrowRefs = useRef<(SVGSVGElement | null)[]>([]);
  const spriteHandRefs = useRef<(SVGSVGElement | null)[]>([]);
  const spriteTextRefs = useRef<(SVGSVGElement | null)[]>([]);
  const spriteResizeRefs = useRef<(SVGSVGElement | null)[]>([]);

  const stepRef = useRef<ConstructionStep>(currentStep);
  const visibleRef = useRef<boolean>(visible);
  stepRef.current = currentStep;
  visibleRef.current = visible;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeAgents = isMobile ? GHOST_AGENTS.slice(0, 18) : GHOST_AGENTS;
  const simsRef = useRef<AgentSim[]>([]);
  const ripplesRef = useRef<ClickRipple[]>([]);
  const marqueesRef = useRef<ActiveMarquee[]>([]);
  const pendingBuildQueueRef = useRef<string[]>([]);

  // Listen for live block construction dispatches (initial build + scrolled sections)
  useEffect(() => {
    const onConstruct = (e: Event) => {
      const detail = (e as CustomEvent<{ targetId?: string }>).detail;
      if (detail?.targetId) {
        pendingBuildQueueRef.current.push(detail.targetId);
      }
    };
    window.addEventListener("ghost-construct-block", onConstruct);
    return () => window.removeEventListener("ghost-construct-block", onConstruct);
  }, []);

  // Immediately silence waking cursors if user hits Skip
  useEffect(() => {
    const onSkip = () => {
      simsRef.current.forEach((sim) => {
        sim.wakeUntil = 0;
        sim.phase = "holding";
      });
    };
    window.addEventListener("ghost-skip", onSkip);
    return () => window.removeEventListener("ghost-skip", onSkip);
  }, []);

  // Initialize / Reset starting positions outside screen edges on runKey change
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const now = performance.now();
    const total = activeAgents.length;

    simsRef.current = activeAgents.map((_agent, idx) => {
      const edge = idx % 4;
      let startX = w / 2;
      let startY = h / 2;
      if (edge === 0) {
        startX = (w * ((idx * 17) % 90 + 5)) / 100;
        startY = -40;
      } else if (edge === 1) {
        startX = w + 40;
        startY = (h * ((idx * 23) % 85 + 8)) / 100;
      } else if (edge === 2) {
        startX = (w * ((idx * 29) % 90 + 5)) / 100;
        startY = h + 40;
      } else {
        startX = -40;
        startY = (h * ((idx * 31) % 85 + 8)) / 100;
      }

      const initDestX = w * (0.14 + ((idx * 13) % 72) / 100);
      const initDestY = h * (0.12 + ((idx * 19) % 70) / 100);

      // Keep all 40 cursors active through initial Hero/Portrait build, then progressively retire cleanly
      const ratio = idx / Math.max(1, total);
      const retireAtStep =
        ratio >= 0.75 ? 6 : ratio >= 0.5 ? 7 : ratio >= 0.25 ? 8 : 10;

      return {
        x: startX,
        y: startY,
        startX,
        startY,
        ctrlX: (startX + initDestX) / 2,
        ctrlY: (startY + initDestY) / 2,
        destX: initDestX,
        destY: initDestY,
        moveStartTime: now + idx * 24,
        moveDuration: 500 + (idx % 5) * 60,
        holdUntil: now + 700 + idx * 35,
        phase: "moving",
        cursorKind: "arrow",
        draggingFromX: 0,
        draggingFromY: 0,
        clickingUntil: 0,
        pendingClickEl: null,
        didClickOnArrive: false,
        trail: [],
        assignedBlockId: null,
        retireAtStep,
        wakeUntil: 0,
      };
    });

    ripplesRef.current = [];
    marqueesRef.current = [];
    pendingBuildQueueRef.current = [];
  }, [runKey, activeAgents.length]);

  // Burst click confirmation ripples cleanly upon final polish (Step 10)
  useEffect(() => {
    if (currentStep === 10 && visible) {
      simsRef.current.slice(0, 12).forEach((sim, i) => {
        ripplesRef.current.push({
          x: sim.x,
          y: sim.y,
          radius: 2,
          maxRadius: 30,
          alpha: 0.7,
          color: GHOST_AGENTS[i]?.color || "#22D3EE",
        });
      });
    }
  }, [currentStep, visible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const scheduleMove = (
      sim: AgentSim,
      destX: number,
      destY: number,
      now: number,
      durationMs: number,
      holdMs: number,
      kind: CursorKind,
      clickEl: HTMLElement | null = null,
      shouldClick = false
    ) => {
      const dist = Math.hypot(destX - sim.x, destY - sim.y);
      const midX = (sim.x + destX) / 2;
      const midY = (sim.y + destY) / 2;
      // Slight gentle natural curve (never looping!)
      const perpX = -(destY - sim.y) / (dist || 1);
      const perpY = (destX - sim.x) / (dist || 1);
      const bow = clamp(dist * 0.08, 4, 22) * (Math.random() < 0.5 ? 1 : -1);

      sim.startX = sim.x;
      sim.startY = sim.y;
      sim.destX = destX;
      sim.destY = destY;
      sim.ctrlX = midX + perpX * bow;
      sim.ctrlY = midY + perpY * bow;
      sim.moveStartTime = now;
      sim.moveDuration = clamp(durationMs, 180, 900);
      sim.holdUntil = now + sim.moveDuration + holdMs;
      sim.phase = "moving";
      sim.cursorKind = kind;
      sim.pendingClickEl = clickEl;
      sim.didClickOnArrive = shouldClick;
    };

    const dispatchBlockConstructionSquad = (targetId: string, now: number) => {
      const el = document.querySelector(`[data-agent-target="${targetId}"]`);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (r.width <= 0 || r.height <= 0 || r.bottom < 0 || r.top > h) return;

      const clampedLeft = clamp(r.left + 4, 14, w - 60);
      const clampedTop = clamp(r.top + 4, 14, h - 60);
      const clampedRight = clamp(r.right - 4, clampedLeft + 40, w - 18);
      const clampedBottom = clamp(r.bottom - 4, clampedTop + 30, h - 18);

      const sims = simsRef.current;
      if (sims.length === 0) return;

      // Pick 4 available agents (or rotating slice) to physically construct this card
      const baseIdx = Math.floor(Math.random() * Math.max(1, sims.length - 4));

      // 1. Primary Wireframe Box Drawer (drags top-left -> bottom-right marquee on canvas)
      const drawer = sims[baseIdx];
      if (drawer) {
        drawer.wakeUntil = now + 850;
        drawer.startX = drawer.x;
        drawer.startY = drawer.y;
        drawer.destX = clampedLeft;
        drawer.destY = clampedTop;
        drawer.ctrlX = (drawer.x + clampedLeft) / 2;
        drawer.ctrlY = (drawer.y + clampedTop) / 2;
        drawer.moveStartTime = now;
        drawer.moveDuration = 160;
        drawer.holdUntil = now + 160;
        drawer.phase = "dragging_box";
        drawer.cursorKind = "resize";
        drawer.draggingFromX = clampedLeft;
        drawer.draggingFromY = clampedTop;
        drawer.assignedBlockId = targetId;
        // Encode actual final corner in trail metadata / marquee
        marqueesRef.current.push({
          originX: clampedLeft,
          originY: clampedTop,
          agentIdx: baseIdx,
          color: activeAgents[baseIdx]?.color || "#22D3EE",
          expiresAt: now + 720,
        });
        // Jump straight to dragging toward bottom-right after 160ms
        drawer.destX = clampedRight;
        drawer.destY = clampedBottom;
        drawer.ctrlX = (clampedLeft + clampedRight) / 2;
        drawer.ctrlY = (clampedTop + clampedBottom) / 2;
        drawer.moveStartTime = now + 150;
        drawer.moveDuration = 440;
        drawer.holdUntil = now + 660;
      }

      // 2, 3, 4. Corner Resize Handle Agents grip all 3 remaining corners
      const cornerCoords: [number, number][] = [
        [clampedRight, clampedTop],
        [clampedLeft, clampedBottom],
        [clampedRight, clampedBottom],
      ];
      cornerCoords.forEach(([cx, cy], offset) => {
        const helper = sims[(baseIdx + 1 + offset) % sims.length];
        if (!helper) return;
        helper.wakeUntil = now + 850;
        scheduleMove(helper, cx, cy, now, 280 + offset * 50, 420, "resize", el as HTMLElement, true);
      });

      // 5..10. Multi-Cursor Interactive Clickers distributed across real elements inside this block
      const innerInteractive = Array.from(
        el.querySelectorAll<HTMLElement>("a, button, h1, h2, h3, p, span, img, li")
      ).filter((node) => {
        const nr = node.getBoundingClientRect();
        return nr.width > 12 && nr.height > 10 && nr.top > 8 && nr.bottom < h - 8;
      });

      for (let k = 0; k < 6; k++) {
        const pick =
          innerInteractive.length > 0
            ? innerInteractive[k % innerInteractive.length]
            : (el as HTMLElement);
        const pr = pick.getBoundingClientRect();
        if (pr.width > 0 && pr.height > 0 && pr.top > 8 && pr.bottom < h - 8) {
          const clicker = sims[(baseIdx + 4 + k) % sims.length];
          if (clicker) {
            clicker.wakeUntil = now + 880;
            const kind: CursorKind =
              pick.tagName === "A" || pick.tagName === "BUTTON"
                ? "hand"
                : pick.tagName === "H1" || pick.tagName === "H2" || pick.tagName === "P"
                ? "text"
                : "arrow";
            scheduleMove(
              clicker,
              clamp(pr.left + pr.width * (0.25 + ((k * 19) % 50) / 100), 16, w - 24),
              clamp(pr.top + pr.height * 0.5, 16, h - 24),
              now,
              260 + k * 40,
              460,
              kind,
              pick,
              true
            );
          }
        }
      }
    };

    const assignNextPurposefulTask = (agentIdx: number, sim: AgentSim, now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const step = stepRef.current;

      if (step === 0) return;

      // Once this cursor's cohort finishes its work (and isn't woken for a scrolled section), retire cleanly
      if (step >= sim.retireAtStep && now > sim.wakeUntil) {
        sim.phase = "holding";
        sim.holdUntil = now + 500;
        return;
      }

      // Priority 1: Live character-by-character caret tracking during Hero typing!
      const activeCaret = document.querySelector<HTMLElement>('[data-active-caret="true"]');
      if (activeCaret && (agentIdx === 1 || agentIdx === 5)) {
        const cr = activeCaret.getBoundingClientRect();
        if (cr.width >= 0 && cr.top > 0 && cr.bottom < h) {
          scheduleMove(
            sim,
            clamp(cr.right + 3, 12, w - 20),
            clamp(cr.top + cr.height * 0.55, 12, h - 20),
            now,
            90,
            110,
            "text",
            null,
            false
          );
          return;
        }
      }

      // Priority 2: Build visible elements matching current step or currently scrolled viewport
      const stepTargets = STEP_PRIORITY_TARGETS[step] || [];
      const visibleInteractive: { rect: DOMRect; el: HTMLElement; kind: CursorKind }[] = [];

      // First look inside step-priority blocks that are genuinely inside viewport
      for (const tid of stepTargets) {
        const block = document.querySelector<HTMLElement>(`[data-agent-target="${tid}"]`);
        if (!block) continue;
        const br = block.getBoundingClientRect();
        if (br.width <= 0 || br.height <= 0 || br.bottom < 20 || br.top > h - 20) continue;

        // Collect interactive sub-elements or structural corners
        const children = block.querySelectorAll<HTMLElement>("a, button, h1, h2, h3, img");
        children.forEach((child) => {
          const cr = child.getBoundingClientRect();
          if (cr.width > 12 && cr.height > 10 && cr.top > 12 && cr.bottom < h - 14) {
            const isBtn = child.tagName === "A" || child.tagName === "BUTTON";
            const isTxt = child.tagName === "H1" || child.tagName === "H2" || child.tagName === "H3";
            visibleInteractive.push({
              rect: cr,
              el: child,
              kind: isBtn ? "hand" : isTxt ? "text" : "resize",
            });
          }
        });

        // Also add exact block bounding corners
        if (visibleInteractive.length === 0) {
          visibleInteractive.push({ rect: br, el: block, kind: "resize" });
        }
      }

      // Fallback: collect ANY built interactive element currently inside viewport
      if (visibleInteractive.length === 0) {
        const allBuilt = document.querySelectorAll<HTMLElement>(
          '[data-agent-target] a, [data-agent-target] button, [data-agent-target] article, [data-agent-target="hero-portrait"]'
        );
        allBuilt.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 12 && r.height > 10 && r.top > 16 && r.bottom < h - 18) {
            const isBtn = el.tagName === "A" || el.tagName === "BUTTON";
            visibleInteractive.push({
              rect: r,
              el,
              kind: isBtn ? "hand" : "arrow",
            });
          }
        });
      }

      // Calm rhythm post-build (Step 10): half of cursors rest smoothly without hectic jumping
      const isPostBuild = step === 10;
      if (isPostBuild && agentIdx % 2 === 1) {
        sim.phase = "holding";
        sim.cursorKind = "arrow";
        sim.holdUntil = now + 2600 + Math.random() * 2600;
        return;
      }

      if (visibleInteractive.length > 0) {
        const choice =
          visibleInteractive[(agentIdx * 7 + Math.floor(Math.random() * visibleInteractive.length)) % visibleInteractive.length];
        const r = choice.rect;

        let destX = r.left + r.width * (0.25 + Math.random() * 0.5);
        let destY = r.top + r.height * (0.25 + Math.random() * 0.5);
        let kind = choice.kind;

        // Corner inspection vs button click
        if (choice.kind === "resize") {
          const corner = agentIdx % 4;
          destX = corner === 0 || corner === 3 ? r.left + 6 : r.right - 6;
          destY = corner < 2 ? r.top + 6 : r.bottom - 6;
        }

        destX = clamp(destX, 16, w - 24);
        destY = clamp(destY, 16, h - 24);

        const moveMs = isPostBuild ? 520 + Math.random() * 340 : 280 + Math.random() * 240;
        const holdMs = isPostBuild ? 1400 + Math.random() * 1900 : 450 + Math.random() * 650;
        const shouldClick = choice.kind === "hand" || Math.random() < 0.45;

        scheduleMove(sim, destX, destY, now, moveMs, holdMs, kind, choice.el, shouldClick);
      } else {
        // Gentle edge staging only when no built items are in viewport
        const col = (agentIdx % 6) / 6;
        const row = Math.floor(agentIdx / 6) / 5;
        scheduleMove(
          sim,
          w * (0.14 + col * 0.72),
          h * (0.16 + row * 0.65),
          now,
          480,
          900,
          "arrow"
        );
      }
    };

    let rafId = 0;

    const tick = (now: number) => {
      const sims = simsRef.current;

      // Consume any queued block constructions and immediately dispatch 4-agent builder squads
      while (pendingBuildQueueRef.current.length > 0) {
        const nextBlockId = pendingBuildQueueRef.current.shift();
        if (nextBlockId && visibleRef.current) {
          dispatchBlockConstructionSquad(nextBlockId, now);
        }
      }

      // Continually keep primary typing I-beam cursor synced right to moving caret
      const liveCaret = document.querySelector<HTMLElement>('[data-active-caret="true"]');
      if (liveCaret && sims[1] && visibleRef.current && stepRef.current < 10) {
        const cr = liveCaret.getBoundingClientRect();
        if (cr.top > 0 && cr.bottom < window.innerHeight) {
          const tx = clamp(cr.right + 2, 12, window.innerWidth - 20);
          const ty = clamp(cr.top + cr.height * 0.52, 12, window.innerHeight - 20);
          sims[1].x += (tx - sims[1].x) * 0.45;
          sims[1].y += (ty - sims[1].y) * 0.45;
          sims[1].destX = tx;
          sims[1].destY = ty;
          sims[1].cursorKind = "text";
          sims[1].holdUntil = now + 180;
          sims[1].wakeUntil = now + 220;
          sims[1].phase = "holding";
        }
      }

      if (ctx && canvas) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }

      if (visibleRef.current) {
        // 1. Update all agents along Minimum-Jerk trajectories
        for (let i = 0; i < sims.length; i++) {
          const sim = sims[i];
          const def = activeAgents[i];
          if (!def) continue;

          if (stepRef.current > 0) {
            if (sim.phase === "dragging_box") {
              if (now < sim.moveStartTime) {
                // Quickly snap/move into starting top-left corner
                const tPre = clamp((now - (sim.moveStartTime - 150)) / 150, 0, 1);
                const e = easeOutCubic(tPre);
                sim.x = sim.startX + (sim.draggingFromX - sim.startX) * e;
                sim.y = sim.startY + (sim.draggingFromY - sim.startY) * e;
                if (tPre >= 0.85 && !sim.didClickOnArrive) {
                  sim.didClickOnArrive = true;
                  ripplesRef.current.push({
                    x: sim.draggingFromX,
                    y: sim.draggingFromY,
                    radius: 2,
                    maxRadius: 20,
                    alpha: 0.85,
                    color: def.color,
                  });
                }
              } else if (now <= sim.moveStartTime + sim.moveDuration) {
                sim.didClickOnArrive = false;
                const t = clamp((now - sim.moveStartTime) / sim.moveDuration, 0, 1);
                const e = easeInOutQuad(t);
                sim.x = sim.draggingFromX + (sim.destX - sim.draggingFromX) * e;
                sim.y = sim.draggingFromY + (sim.destY - sim.draggingFromY) * e;
              } else if (now < sim.holdUntil) {
                sim.x = sim.destX;
                sim.y = sim.destY;
              } else {
                ripplesRef.current.push({
                  x: sim.x,
                  y: sim.y,
                  radius: 2,
                  maxRadius: 26,
                  alpha: 0.9,
                  color: def.color,
                });
                sim.assignedBlockId = null;
                assignNextPurposefulTask(i, sim, now);
              }
            } else if (sim.phase === "moving") {
              if (now >= sim.moveStartTime) {
                const rawT = (now - sim.moveStartTime) / sim.moveDuration;
                const t = clamp(rawT, 0, 1);
                const e = easeOutCubic(t);
                // Quadratic Bezier curve with clean zero-overshoot stop
                const inv = 1 - e;
                sim.x = inv * inv * sim.startX + 2 * inv * e * sim.ctrlX + e * e * sim.destX;
                sim.y = inv * inv * sim.startY + 2 * inv * e * sim.ctrlY + e * e * sim.destY;

                if (t >= 1) {
                  sim.x = sim.destX;
                  sim.y = sim.destY;
                  sim.phase = "holding";
                  if (sim.didClickOnArrive) {
                    sim.clickingUntil = now + 180;
                    ripplesRef.current.push({
                      x: sim.x,
                      y: sim.y,
                      radius: 2,
                      maxRadius: 22,
                      alpha: 0.85,
                      color: def.color,
                    });
                    flashDomElement(sim.pendingClickEl);
                    sim.pendingClickEl = null;
                    sim.didClickOnArrive = false;
                  }
                }
              }
            } else {
              // Holding cleanly at exact spot until holdUntil expires (zero jitter!)
              if (now >= sim.holdUntil) {
                assignNextPurposefulTask(i, sim, now);
              }
            }

            // Record subtle crisp motion trail ONLY while moving quickly
            const isActivelyMoving =
              sim.phase === "dragging_box" ||
              (sim.phase === "moving" && now >= sim.moveStartTime);
            if (isActivelyMoving) {
              sim.trail.push({ x: sim.x, y: sim.y });
              if (sim.trail.length > 9) sim.trail.shift();
            } else if (sim.trail.length > 0) {
              sim.trail.shift();
            }
          }

          // 2. Determine if cursor is still actively working or has completed its work
          const isRetired =
            stepRef.current === 0 ||
            (stepRef.current >= sim.retireAtStep &&
              now > sim.wakeUntil &&
              sim.phase !== "dragging_box" &&
              (sim.phase !== "moving" || now >= sim.moveStartTime + sim.moveDuration));

          // Draw subtle clean cursor trail on canvas while cursor is active
          if (ctx && sim.trail.length > 1 && !isRetired) {
            for (let t = 1; t < sim.trail.length; t++) {
              const p0 = sim.trail[t - 1];
              const p1 = sim.trail[t];
              const progress = t / sim.trail.length;
              ctx.beginPath();
              ctx.moveTo(p0.x + 1, p0.y + 1);
              ctx.lineTo(p1.x + 1, p1.y + 1);
              ctx.strokeStyle = def.color;
              ctx.globalAlpha = progress * 0.28;
              ctx.lineWidth = progress * 1.6;
              ctx.lineCap = "round";
              ctx.stroke();
            }
            ctx.globalAlpha = 1;
          }

          // 3. Apply transform + auto-hide completed cursors cleanly (0 React renders)
          const el = cursorRefs.current[i];
          if (el) {
            const pressing = now < sim.clickingUntil;
            const scale = pressing ? 0.82 : 1;
            el.style.transform = `translate3d(${sim.x.toFixed(1)}px, ${sim.y.toFixed(1)}px, 0) scale(${scale})`;
            el.style.opacity = isRetired ? "0" : "0.96";
          }

          const aSp = spriteArrowRefs.current[i];
          const hSp = spriteHandRefs.current[i];
          const tSp = spriteTextRefs.current[i];
          const rSp = spriteResizeRefs.current[i];
          if (aSp) aSp.style.display = sim.cursorKind === "arrow" ? "block" : "none";
          if (hSp) hSp.style.display = sim.cursorKind === "hand" ? "block" : "none";
          if (tSp) tSp.style.display = sim.cursorKind === "text" ? "block" : "none";
          if (rSp) rSp.style.display = sim.cursorKind === "resize" ? "block" : "none";
        }

        // 4. Draw Live Figma Marquee Wireframe Boxes pulled by active Builder Cursors
        if (ctx) {
          for (let m = marqueesRef.current.length - 1; m >= 0; m--) {
            const mq = marqueesRef.current[m];
            const builder = sims[mq.agentIdx];
            if (!builder || now > mq.expiresAt) {
              marqueesRef.current.splice(m, 1);
              continue;
            }
            if (now < builder.moveStartTime) continue;

            const boxW = Math.max(4, builder.x - mq.originX);
            const boxH = Math.max(4, builder.y - mq.originY);
            const fade = clamp((mq.expiresAt - now) / 180, 0, 1);

            ctx.save();
            ctx.globalAlpha = fade * 0.9;
            // Subtle silver-mist wireframe blueprint interior
            ctx.fillStyle = "rgba(215, 226, 234, 0.045)";
            ctx.fillRect(mq.originX, mq.originY, boxW, boxH);

            // Dashed marquee border matching original silver mist
            ctx.strokeStyle = "#D7E2EA";
            ctx.lineWidth = 1.2;
            ctx.setLineDash([5, 3]);
            ctx.strokeRect(mq.originX, mq.originY, boxW, boxH);

            // Subtle alignment hairlines
            ctx.setLineDash([]);
            ctx.strokeStyle = "rgba(118, 33, 176, 0.45)";
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(0, mq.originY);
            ctx.lineTo(window.innerWidth, mq.originY);
            ctx.moveTo(mq.originX, 0);
            ctx.lineTo(mq.originX, window.innerHeight);
            ctx.stroke();

            // Corner handle squares
            const handlePts = [
              [mq.originX, mq.originY],
              [mq.originX + boxW, mq.originY],
              [mq.originX + boxW, mq.originY + boxH],
              [mq.originX, mq.originY + boxH],
            ];
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = "#7621B0";
            ctx.lineWidth = 1;
            handlePts.forEach(([hx, hy]) => {
              ctx.fillRect(hx - 2.5, hy - 2.5, 5, 5);
              ctx.strokeRect(hx - 2.5, hy - 2.5, 5, 5);
            });
            ctx.restore();
          }

          // 5. Render click ripples
          for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
            const rip = ripplesRef.current[r];
            rip.radius += 1.5;
            rip.alpha *= 0.89;
            ctx.beginPath();
            ctx.arc(rip.x + 1, rip.y + 1, rip.radius, 0, Math.PI * 2);
            ctx.strokeStyle = rip.color;
            ctx.globalAlpha = rip.alpha;
            ctx.lineWidth = 1.4;
            ctx.stroke();
            ctx.globalAlpha = 1;
            if (rip.alpha < 0.04 || rip.radius >= rip.maxRadius) {
              ripplesRef.current.splice(r, 1);
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [activeAgents]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 60fps Canvas: Live Figma Marquee Drag Boxes, Subtle Trails, Click Ripples */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Real High-DPI OS Mouse Pointers (Zero floating text labels) */}
      {activeAgents.map((agent, idx) => (
        <div
          key={agent.id}
          ref={(el) => {
            cursorRefs.current[idx] = el;
          }}
          className="fixed top-0 left-0 will-change-transform transition-opacity duration-300"
          style={{
            opacity: currentStep === 0 ? 0 : 0.96,
            transform: "translate3d(-100px, -100px, 0)",
            filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 4px ${agent.color}66)`,
          }}
        >
          {/* 1. Authentic OS Classic Arrow Pointer */}
          <svg
            ref={(el) => {
              spriteArrowRefs.current[idx] = el;
            }}
            width="18"
            height="22"
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <path
              d="M1.5 1.5L1.5 17.2L5.3 13.5L8.1 19.6L10.2 18.6L7.4 12.5L12.8 12.5L1.5 1.5Z"
              fill="#09090E"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>

          {/* 2. Authentic OS Pointing Hand Pointer (buttons/links) */}
          <svg
            ref={(el) => {
              spriteHandRefs.current[idx] = el;
            }}
            width="20"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1.5 -mt-0.5"
            style={{ display: "none" }}
          >
            <path
              d="M9 3.5C9 2.67 9.67 2 10.5 2C11.33 2 12 2.67 12 3.5V10.5H13.2C13.7 10.5 14.1 10.9 14.1 11.4V11.8C14.7 11.4 15.6 11.6 16 12.3C16.6 12 17.5 12.2 17.8 12.9C18.5 12.8 19.2 13.3 19.2 14.1V17.4C19.2 19.9 17.2 22 14.7 22H11.4C9.7 22 8.1 21.2 7.1 19.8L4.5 16.2C4 15.5 4.2 14.5 4.9 14C5.6 13.5 6.6 13.7 7.1 14.4L9 16.8V3.5Z"
              fill="#FFFFFF"
              stroke="#09090E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* 3. Authentic OS Text I-Beam Caret Cursor */}
          <svg
            ref={(el) => {
              spriteTextRefs.current[idx] = el;
            }}
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1.5 -mt-2"
            style={{ display: "none" }}
          >
            <path
              d="M4 2.5H10M4 17.5H10M7 2.5V17.5"
              stroke="#09090E"
              strokeWidth="3.0"
              strokeLinecap="round"
            />
            <path
              d="M4 2.5H10M4 17.5H10M7 2.5V17.5"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>

          {/* 4. Authentic OS Diagonal Resize Cursor */}
          <svg
            ref={(el) => {
              spriteResizeRefs.current[idx] = el;
            }}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-2 -mt-2"
            style={{ display: "none" }}
          >
            <path
              d="M3 3L3 8M3 3L8 3M3 3L15 15M15 15L15 10M15 15L10 15"
              stroke="#09090E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 3L3 8M3 3L8 3M3 3L15 15M15 15L15 10M15 15L10 15"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default GhostAgentsOverlay;
