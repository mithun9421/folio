"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export const ParticleField = () => {
  const { currentTheme } = useTheme();

  const getThemeParticleColors = (themeName: string) => {
    switch (themeName) {
      case "blue":
        return ["#3b82f6", "#8b5cf6", "#06b6d4"];
      case "purple":
        return ["#8b5cf6", "#ec4899", "#a855f7"];
      case "green":
        return ["#22c55e", "#10b981", "#059669"];
      case "orange":
        return ["#f97316", "#ef4444", "#f59e0b"];
      case "cyan":
        return ["#06b6d4", "#14b8a6", "#0ea5e9"];
      default:
        return ["#3b82f6", "#8b5cf6", "#06b6d4"];
    }
  };

  const themeColors = getThemeParticleColors(currentTheme);
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none">
      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`${currentTheme}-particle-${i}`}
          className="absolute w-1 h-1 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: themeColors[i % themeColors.length],
            boxShadow: `0 0 10px ${themeColors[i % themeColors.length]}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`${currentTheme}-glow-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              themeColors[i % themeColors.length]
            } 0%, transparent 70%)`,
            filter: "blur(1px)",
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};