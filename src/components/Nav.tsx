"use client";

import { useState, useEffect } from "react";

// Dark Mode Toggle Component
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user's theme preference
  useEffect(() => {
    const userPreferredTheme = localStorage.getItem("theme");
    if (userPreferredTheme) {
      setIsDarkMode(userPreferredTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded"
    >
      {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

// Nav Component
export default function Nav() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 fixed top-0 w-full z-10">
      <div className="flex items-center justify-between">
        {/* Logo or Site Name */}
        <div className="text-2xl font-semibold text-gray-800 dark:text-white">
          My Website
        </div>

     

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>
    </nav>
  );
}
