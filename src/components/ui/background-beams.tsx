"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beams = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className={cn(
        "absolute top-0 h-full w-px bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent",
        "animate-pulse",
        className
      )}
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
      }}
    />
  ));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beams}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
    </div>
  );
};