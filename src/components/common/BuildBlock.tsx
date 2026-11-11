import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ConstructionStep } from "../../types/portfolio";

interface BuildBlockProps {
  children: React.ReactNode;
  currentStep: ConstructionStep;
  unlockStep: ConstructionStep;
  targetId: string;
  agentLabel?: string;
  actionLabel?: string;
  className?: string;
}

export const BuildBlock: React.FC<BuildBlockProps> = ({
  children,
  currentStep,
  unlockStep,
  targetId,
  className = "",
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"hidden" | "building" | "built">("hidden");
  const hasTriggeredRef = useRef(false);

  // Reset build state cleanly when replay triggers
  useEffect(() => {
    const onReplay = () => {
      hasTriggeredRef.current = false;
      setPhase("hidden");
    };
    window.addEventListener("ghost-replay", onReplay);
    return () => window.removeEventListener("ghost-replay", onReplay);
  }, []);

  useEffect(() => {
    if (currentStep === 0 || currentStep === 1) {
      hasTriggeredRef.current = false;
      setPhase("hidden");
    }
  }, [currentStep]);

  // Synchronize step unlock + viewport entry so below-the-fold sections build live as you scroll
  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const unlocked = currentStep >= unlockStep;
    if (!unlocked) {
      setPhase("hidden");
      return;
    }

    if (hasTriggeredRef.current) return;

    const triggerBuildAnimation = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setPhase("building");

      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight) {
        window.dispatchEvent(
          new CustomEvent("ghost-construct-block", {
            detail: { targetId },
          })
        );
      }

      window.setTimeout(() => {
        setPhase("built");
      }, 650);
    };

    // Initial above-the-fold sections (navbar, hero) build immediately on step unlock
    if (unlockStep <= 5) {
      triggerBuildAnimation();
      return;
    }

    // For lower sections: if already visible now, build immediately; otherwise wait for scroll into view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      triggerBuildAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            triggerBuildAnimation();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [currentStep, unlockStep, targetId]);

  const isUnbuilt = phase === "hidden";
  const isBuildingNow = phase === "building";
  const isFinalPolish = currentStep === 10 && phase === "built";

  return (
    <motion.div
      ref={blockRef}
      data-agent-target={targetId}
      data-build-phase={phase}
      initial={false}
      animate={{
        opacity: isUnbuilt ? 0 : 1,
        scale: isUnbuilt ? 0.94 : 1,
        y: isUnbuilt ? 10 : 0,
        clipPath: isUnbuilt
          ? "inset(0% 100% 100% 0%)"
          : "inset(-24px -24px -24px -24px)",
      }}
      transition={{
        duration: 0.58,
        delay: isBuildingNow ? 0.14 : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative ${
        isBuildingNow ? "agent-building-highlight rounded-2xl" : ""
      } ${className}`}
    >
      {/* Crisp Studio Wireframe Box & 4 Corner Handles while Cursors Construct It */}
      <AnimatePresence>
        {isBuildingNow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute -inset-[2px] z-30 pointer-events-none rounded-2xl border border-[#D7E2EA]/70"
          >
            <span className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#7621B0] rounded-[1px]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#7621B0] rounded-[1px]" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#7621B0] rounded-[1px]" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#7621B0] rounded-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Polish Shimmer */}
      {isFinalPolish && (
        <motion.div
          initial={{ x: "-100%", opacity: 0.55 }}
          animate={{ x: "200%", opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden"
        >
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D7E2EA]/20 to-transparent skew-x-[-20deg]" />
        </motion.div>
      )}

      {children}
    </motion.div>
  );
};

export default BuildBlock;
