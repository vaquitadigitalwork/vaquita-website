"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // Read theme from localStorage or document element
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme === "light" || document.documentElement.classList.contains("light")) {
      setThemeState("light");
      document.documentElement.classList.add("light");
    } else {
      setThemeState("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    // Add transition class for smooth theme shift across all variables
    document.documentElement.classList.add("theme-transition");
    
    setThemeState((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      if (nextTheme === "light") {
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
      return nextTheme;
    });

    // Remove transition class after animation completes to keep normal animations responsive
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 450);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
