"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const isDark = document.documentElement.classList.contains("dark");
        const opacity = isDark ? 0.15 : 0.08;
        glow.style.opacity = "1";
        glow.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(55, 138, 221, ${opacity}), transparent 40%)`;
      });
    };

    const handleMouseLeave = () => {
      glow.style.opacity = "0";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300"
      style={{ opacity: 0 }}
    />
  );
}
