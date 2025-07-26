"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, currentTheme } = useTheme();

  // Theme-specific color palettes
  const getThemeColors = (themeName: string) => {
    switch (themeName) {
      case "blue":
        return {
          particles: ["59, 130, 246", "139, 92, 246", "6, 182, 212"],
          connections: "59, 130, 246",
          orbs: ["rgba(59, 130, 246, 0.3)", "rgba(139, 92, 246, 0.3)"],
          background: "from-slate-950 via-blue-950/50 via-purple-950/30 to-black",
          grid: "rgba(59, 130, 246, 0.1)"
        };
      case "purple":
        return {
          particles: ["139, 92, 246", "236, 72, 153", "168, 85, 247"],
          connections: "139, 92, 246",
          orbs: ["rgba(139, 92, 246, 0.3)", "rgba(236, 72, 153, 0.3)"],
          background: "from-slate-950 via-purple-950/50 via-pink-950/30 to-black",
          grid: "rgba(139, 92, 246, 0.1)"
        };
      case "green":
        return {
          particles: ["34, 197, 94", "16, 185, 129", "5, 150, 105"],
          connections: "34, 197, 94",
          orbs: ["rgba(34, 197, 94, 0.3)", "rgba(16, 185, 129, 0.3)"],
          background: "from-slate-950 via-green-950/50 via-emerald-950/30 to-black",
          grid: "rgba(34, 197, 94, 0.1)"
        };
      case "orange":
        return {
          particles: ["249, 115, 22", "239, 68, 68", "245, 158, 11"],
          connections: "249, 115, 22",
          orbs: ["rgba(249, 115, 22, 0.3)", "rgba(239, 68, 68, 0.3)"],
          background: "from-slate-950 via-orange-950/50 via-red-950/30 to-black",
          grid: "rgba(249, 115, 22, 0.1)"
        };
      case "cyan":
        return {
          particles: ["6, 182, 212", "20, 184, 166", "14, 165, 233"],
          connections: "6, 182, 212",
          orbs: ["rgba(6, 182, 212, 0.3)", "rgba(20, 184, 166, 0.3)"],
          background: "from-slate-950 via-cyan-950/50 via-teal-950/30 to-black",
          grid: "rgba(6, 182, 212, 0.1)"
        };
      default:
        return {
          particles: ["59, 130, 246", "139, 92, 246", "6, 182, 212"],
          connections: "59, 130, 246",
          orbs: ["rgba(59, 130, 246, 0.3)", "rgba(139, 92, 246, 0.3)"],
          background: "from-slate-950 via-blue-950/50 via-purple-950/30 to-black",
          grid: "rgba(59, 130, 246, 0.1)"
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;
    const themeColors = getThemeColors(currentTheme);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = this.getRandomColor();
        this.alpha = Math.random() * 0.5 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
      }

      getRandomColor() {
        return themeColors.particles[Math.floor(Math.random() * themeColors.particles.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Fade in and out
        if (this.life < this.maxLife * 0.1) {
          this.alpha = (this.life / (this.maxLife * 0.1)) * 0.5;
        } else if (this.life > this.maxLife * 0.9) {
          this.alpha = (1 - (this.life - this.maxLife * 0.9) / (this.maxLife * 0.1)) * 0.5;
        }

        // Reset particle if it goes off screen or dies
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life >= this.maxLife) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.life = 0;
          this.color = this.getRandomColor();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.save();
            ctx.strokeStyle = `rgba(${themeColors.connections}, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentTheme]);

  const themeColors = getThemeColors(currentTheme);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Dynamic Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${themeColors.background}`} />
      
      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
      />

      {/* Theme-specific Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`${currentTheme}-${i}`}
            className="absolute w-96 h-96 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                themeColors.orbs[i % themeColors.orbs.length]
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Theme-specific Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(${themeColors.grid} 1px, transparent 1px),
            linear-gradient(90deg, ${themeColors.grid} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};