"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check for the user's theme preference on load
  useEffect(() => {
    const userPreferredTheme = localStorage.getItem("theme");

    if (userPreferredTheme) {
      setIsDarkMode(userPreferredTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Apply theme changes dynamically
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={() => setIsDarkMode((prev) => !prev)}
        className="sr-only peer"
      />
      {/* Toggle Switch */}
      <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative peer-checked:bg-blue-600 transition-all">
        {/* Sun Icon */}
        <Sun className="absolute left-1 top-1 w-4 h-4 text-yellow-500 transition-transform duration-300 peer-checked:translate-x-6" />
        {/* Moon Icon */}
        <Moon className="absolute right-1 top-1 w-4 h-4 text-gray-300 transition-transform duration-300 peer-checked:-translate-x-6" />
      </div>
    </label>
  );
}
