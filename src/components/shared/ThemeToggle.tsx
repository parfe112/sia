import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // La prima încărcare, verificăm tema din localStorage și dinpreferred browser
  useEffect(() => {
    // Verificăm dacă există o temă salvată
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    // Verificăm dacă browser-ul preferă tema întunecată
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Setăm tema în funcție de ce am găsit
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  // Actualizăm clasa pe documentul HTML și localStorage la schimbarea temei
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Comutăm între temele light și dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
