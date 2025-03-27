import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  // Initialize with null to detect the first render
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Function to apply theme to DOM
  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
  };

  // On first load, determine and apply theme immediately
  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    // Check for system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    let initialTheme: "light" | "dark";

    // Determine initial theme
    if (savedTheme === "light" || savedTheme === "dark") {
      initialTheme = savedTheme;
    } else {
      initialTheme = prefersDark ? "dark" : "light";
    }

    // Apply theme immediately to avoid flicker and first-click issue
    applyTheme(initialTheme);

    // Update state
    setTheme(initialTheme);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (!theme) return; // Safety check

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Return null during initial load to avoid showing incorrect icon
  if (theme === null) {
    return <div className="w-5 h-5"></div>; // Placeholder while determining theme
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 transition-theme hover:bg-primary-200 dark:hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
      aria-label={`Schimbă la tema ${theme === "light" ? "dark" : "light"}`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-primary-700 dark:text-primary-200" />
      ) : (
        <Sun className="h-5 w-5 text-primary-200 dark:text-primary-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
