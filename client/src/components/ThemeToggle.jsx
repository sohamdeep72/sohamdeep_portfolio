import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="btn border-gray-500 hover:bg-gray-700 text-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
