import React, { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  active: boolean;
  speedMs?: number;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  showCaretWhileTyping?: boolean;
  agentLabel?: string;
  runKey?: number;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  active,
  speedMs = 45,
  className = "",
  as = "span",
  showCaretWhileTyping = true,
  runKey = 0,
}) => {
  const [displayedCount, setDisplayedCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setDisplayedCount(0);
      return;
    }

    setDisplayedCount(0);
    let current = 0;
    let timeoutId: number;

    const step = () => {
      current += 1;
      setDisplayedCount(current);
      if (current < text.length) {
        const variance = Math.random() * 22;
        timeoutId = window.setTimeout(step, speedMs + variance);
      }
    };

    timeoutId = window.setTimeout(step, 70);
    return () => window.clearTimeout(timeoutId);
  }, [text, active, speedMs, runKey]);

  const isTyping = active && displayedCount < text.length;
  const visibleText = active ? text.slice(0, displayedCount) : "";
  const Tag = as;

  return (
    <Tag className={`relative inline-block ${className}`}>
      {/* Invisible reserve so layout never jumps during typing */}
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {text}
      </span>

      <span
        className={`absolute inset-0 ${
          className.includes("hero-heading") ? "hero-heading" : ""
        }`}
      >
        {visibleText}
        {showCaretWhileTyping && isTyping && (
          <span
            data-active-caret="true"
            className="inline-block align-middle ml-1 w-[3px] h-[0.82em] bg-[#D7E2EA] shadow-[0_0_8px_rgba(182,0,168,0.65)]"
          />
        )}
      </span>
    </Tag>
  );
};

export default TypingText;
