"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PageLoader } from "@/components/ui/page-loader";
import { PageTransition } from "@/components/ui/page-transition";
import { FloatingNav } from "@/components/ui/floating-navbar";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
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
          <div className="relative">
            <FloatingNav navItems={navItems} />
            
            <main>
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

            {/* Footer */}
            <footer className="bg-black border-t border-gray-800 py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    © 2024 Full-Stack Developer Portfolio. Built with Next.js, Three.js, and modern web technologies.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
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