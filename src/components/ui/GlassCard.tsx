"use client";

import { useRef, useCallback } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  role?: string;
}

export default function GlassCard({ children, className = "", role }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    if (!card || !spotlight) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.1) 0%, transparent 55%)`;
  }, []);

  const onMouseEnter = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
  }, []);

  const onMouseLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-card border-border relative overflow-hidden rounded-lg border shadow-sm ${className}`}
      role={role}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
      />
      {children}
    </div>
  );
}
