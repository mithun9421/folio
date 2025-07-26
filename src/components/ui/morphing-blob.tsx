"use client";
import React from "react";
import { motion } from "framer-motion";

export const MorphingBlob = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main morphing blob */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ x: "10%", y: "20%" }}
      />

      {/* Secondary morphing blob */}
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)",
          filter: "blur(30px)",
        }}
        animate={{
          x: [0, -80, 120, 0],
          y: [0, 80, -60, 0],
          scale: [0.8, 1.3, 0.9, 0.8],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        initial={{ x: "70%", y: "60%" }}
      />

      {/* Tertiary morphing blob */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(239, 68, 68, 0.2) 50%, transparent 100%)",
          filter: "blur(25px)",
        }}
        animate={{
          x: [0, 60, -90, 0],
          y: [0, -40, 70, 0],
          scale: [0.9, 1.1, 1.4, 0.9],
          rotate: [0, 90, 270, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        initial={{ x: "40%", y: "10%" }}
      />

      {/* Floating geometric shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 border border-blue-400/30"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
            rotate: i * 45,
          }}
          animate={{
            rotate: [i * 45, i * 45 + 360],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Pulsing rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute border border-purple-500/20 rounded-full"
          style={{
            width: `${(i + 1) * 100}px`,
            height: `${(i + 1) * 100}px`,
            left: `${30 + i * 20}%`,
            top: `${40 + i * 10}%`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
};