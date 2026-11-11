import React, { useEffect, useRef } from "react";

export const CursorSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId = 0;
    const render = () => {
      curX += (mouseX - curX) * 0.14;
      curY += (mouseY - curY) * 0.14;
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(520px circle at ${curX}px ${curY}px, rgba(187, 204, 215, 0.045), rgba(118, 33, 176, 0.03) 40%, transparent 72%)`;
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
};

export default CursorSpotlight;
