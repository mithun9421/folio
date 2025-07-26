"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ThemeSwitcher = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeColors: Record<string, string> = {
    blue: "from-blue-500 to-purple-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-red-500",
    cyan: "from-cyan-500 to-teal-500"
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        {/* Theme Switcher Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-gray-900/80 border-gray-700 backdrop-blur-sm hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          aria-label="Open theme selector"
        >
          <Palette className="w-5 h-5 text-gray-300" />
        </Button>

        {/* Theme Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-0 w-64"
            >
              <Card className="bg-gray-900/95 border-gray-700 backdrop-blur-md">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-4 text-sm">Choose Color Theme</h3>
                  <div className="space-y-2">
                    {Object.entries(availableThemes).map(([key, theme]) => (
                      <motion.button
                        key={key}
                        onClick={() => {
                          setTheme(key);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                          currentTheme === key 
                            ? "bg-gray-700/50 ring-2 ring-blue-500" 
                            : "hover:bg-gray-800/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Switch to ${theme.name} theme`}
                      >
                        <div 
                          className={`w-6 h-6 rounded-full bg-gradient-to-r ${themeColors[key]} mr-3 ring-2 ring-white/20`}
                        />
                        <span className="text-gray-200 font-medium text-sm flex-1 text-left">
                          {theme.name}
                        </span>
                        {currentTheme === key && (
                          <Check className="w-4 h-4 text-blue-400" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;