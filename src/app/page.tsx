"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PageLoader } from "@/components/ui/page-loader";
import { PageTransition } from "@/components/ui/page-transition";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { ParticleField } from "@/components/ui/particle-field";
import { MorphingBlob } from "@/components/ui/morphing-blob";
import { InteractiveCursor } from "@/components/ui/interactive-cursor";
import { FloatingNav } from "@/components/ui/floating-navbar";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { Home as HomeIcon, User, Code, Mail } from "lucide-react";

const navItems = [
  {
    name: "Home",
    link: "#hero",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    name: "Skills",
    link: "#skills",
    icon: <User className="h-4 w-4" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <Code className="h-4 w-4" />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <Mail className="h-4 w-4" />,
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader onLoadComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <PageTransition>
          <div className="relative min-h-screen">
            {/* Enhanced Background */}
            <AnimatedBackground />
            <ParticleField />
            <MorphingBlob />
            <InteractiveCursor />
            
            <FloatingNav navItems={navItems} />
            <ThemeSwitcher />
            
            <main className="relative z-10">
              <section id="hero">
                <HeroSection />
              </section>
              
              <section id="skills">
                <SkillsSection />
              </section>
              
              <section id="projects">
                <ProjectsSection />
              </section>
              
              <section id="contact">
                <ContactSection />
              </section>
            </main>

            {/* Enhanced Footer */}
            <footer className="relative z-10 bg-gradient-to-r from-black via-slate-900 to-black border-t border-blue-500/20 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="flex justify-center space-x-8 mb-6">
                    <a 
                      href="https://github.com/mithun9421" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/mithun-muraleedharan/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="mailto:mithunmuralee94@gmail.com"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      Email
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    © 2024 Mithun Muraleedharan. Built with Next.js, Three.js, and modern web technologies.
                  </p>
                  <p className="text-gray-500 text-xs">
                    Privacy-first design • Enterprise-ready • Open source friendly
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </PageTransition>
      )}
    </>
  );
}