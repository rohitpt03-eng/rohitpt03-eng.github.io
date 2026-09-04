import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder for natural layout sizing */}
      <span className="opacity-0 select-none pointer-events-none">
        {char === " " ? "\u00A0" : char}
      </span>
      {/* Absolute positioned animated span */}
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center select-none"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const totalLength = text.length;

  // Split into words so lines break gracefully
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <p
      ref={containerRef}
      style={style}
      className={`text-center font-medium leading-relaxed ${className}`}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split("");
        const elements = (
          <span key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const charIdx = globalCharIndex++;
              const start = charIdx / totalLength;
              const end = Math.min(1, (charIdx + 1) / totalLength);

              return (
                <Character
                  key={`char-${charIdx}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        // Account for trailing space
        if (wordIdx < words.length - 1) {
          const spaceIdx = globalCharIndex++;
          const start = spaceIdx / totalLength;
          const end = Math.min(1, (spaceIdx + 1) / totalLength);

          return (
            <React.Fragment key={`frag-${wordIdx}`}>
              {elements}
              <Character
                key={`space-${spaceIdx}`}
                char=" "
                progress={scrollYProgress}
                range={[start, end]}
              />
            </React.Fragment>
          );
        }

        return elements;
      })}
    </p>
  );
};

export default AnimatedText;
