"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  gradient: string;
}

export const themes: Record<string, Theme> = {
  blue: {
    name: "Ocean Blue",
    primary: "from-blue-500 to-blue-600",
    secondary: "from-cyan-500 to-cyan-600", 
    accent: "from-blue-400 to-purple-500",
    background: "from-slate-900 via-gray-900 to-black",
    surface: "bg-gray-800/50 border-gray-700",
    text: "text-white",
    textSecondary: "text-gray-400",
    border: "border-gray-700",
    gradient: "bg-gradient-to-r from-blue-400 to-purple-500"
  },
  purple: {
    name: "Royal Purple",
    primary: "from-purple-600 to-purple-700",
    secondary: "from-pink-600 to-pink-700",
    accent: "from-purple-400 to-pink-500",
    background: "from-purple-900 via-gray-900 to-black",
    surface: "bg-purple-800/30 border-purple-700",
    text: "text-white",
    textSecondary: "text-purple-200",
    border: "border-purple-700",
    gradient: "bg-gradient-to-r from-purple-400 to-pink-500"
  },
  green: {
    name: "Forest Green",
    primary: "from-green-600 to-green-700",
    secondary: "from-emerald-600 to-emerald-700",
    accent: "from-green-400 to-emerald-500",
    background: "from-green-900 via-gray-900 to-black",
    surface: "bg-green-800/30 border-green-700",
    text: "text-white",
    textSecondary: "text-green-200",
    border: "border-green-700",
    gradient: "bg-gradient-to-r from-green-400 to-emerald-500"
  },
  orange: {
    name: "Sunset Orange",
    primary: "from-orange-600 to-orange-700",
    secondary: "from-red-600 to-red-700",
    accent: "from-orange-400 to-red-500",
    background: "from-orange-900 via-gray-900 to-black",
    surface: "bg-orange-800/30 border-orange-700",
    text: "text-white",
    textSecondary: "text-orange-200",
    border: "border-orange-700",
    gradient: "bg-gradient-to-r from-orange-400 to-red-500"
  },
  cyan: {
    name: "Electric Cyan",
    primary: "from-cyan-500 to-cyan-600",
    secondary: "from-teal-500 to-teal-600",
    accent: "from-cyan-400 to-teal-500",
    background: "from-cyan-900 via-gray-900 to-black",
    surface: "bg-cyan-800/30 border-cyan-700",
    text: "text-white",
    textSecondary: "text-cyan-200",
    border: "border-cyan-700",
    gradient: "bg-gradient-to-r from-cyan-400 to-teal-500"
  }
};

interface ThemeContextType {
  currentTheme: string;
  theme: Theme;
  setTheme: (themeName: string) => void;
  availableThemes: Record<string, Theme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState("blue");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem("portfolio-theme", themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    setTheme,
    availableThemes: themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}