"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Neutral colored icons

export default function Nav() {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  // Load user's theme preference on mount
  useEffect(() => {
    const userPreferredTheme = localStorage.getItem("theme");

    if (userPreferredTheme) {
      setIsDarkMode(userPreferredTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Apply theme changes dynamically
  useEffect(() => {
    if (isDarkMode !== null) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  if (isDarkMode === null) return null; // Prevent hydration mismatch

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 md:py-4 md:px-8 fixed top-0 w-full z-10">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
        <img src="/qr-logo-icon.svg" alt="QR-GEN Logo" className="h-8 w-8" />
        <div className="text-2xl font-bold text-gray-800 dark:text-white leading-normal">
          QR-GEN
        </div>
        </div>
        <div className="hidden md:block text-md font-regular text-gray-600 dark:text-white leading-normal">
          A free QR Code Generator built with React and Next.js.
        </div>

        {/* Dark Mode Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode((prev) => !prev)}
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-gray-200 dark:bg-gray-800 rounded-full relative transition-all">
            {/* Toggle Knob */}
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                isDarkMode ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
            {/* Sun & Moon Icons - Non-selected stays light gray */}
            <Sun
              className={`absolute left-1.5 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-opacity duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-800"
              }`}
            />
            <Moon
              className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-opacity duration-300 ${
                isDarkMode ? "text-gray-800" : "text-gray-400"
              }`}
            />
          </div>
        </label>
      </div>
    </nav>
  );
}
