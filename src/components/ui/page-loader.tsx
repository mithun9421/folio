"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  onLoadComplete: () => void;
  className?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoadComplete, className }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing portfolio...",
    "Loading skills matrix...",
    "Rendering 3D visualizations...",
    "Preparing user experience...",
    "Almost ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onLoadComplete, loadingTexts.length]);

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900",
        className
      )}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-8">
        {/* Animated Logo/Icon */}
        <motion.div
          className="relative w-24 h-24 mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
          <div className="absolute inset-2 border-4 border-purple-500/50 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 border-4 border-cyan-500/70 rounded-full"></div>
        </motion.div>

        {/* Loading Text */}
        <div className="space-y-4">
          <motion.h2
            key={currentText}
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {loadingTexts[currentText]}
          </motion.h2>
          
          {/* Progress Bar */}
          <div className="w-80 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Progress Percentage */}
          <motion.p
            className="text-gray-300 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};