import React from "react";

export default function Navbar({ onNavigate, page }) {
  const navItems = ["home", "projects", "resume", "contact"];

  return (
    <header className="sticky top-0 z-50 glass backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        <div
          onClick={() => onNavigate("home")}
          className="text-xl font-bold tracking-wide cursor-pointer hover:text-teal-400 transition"
        >
          Sohamdeep<span className="text-teal-400">.</span>
        </div>

        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => {
            if (item === "resume") {
              return (
                <a
                  key={item}
                  href="https://drive.google.com/file/d/109s1Tyd4Tyy8v-ZIfv01M8y5io5nZOaQ/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capitalize hover:text-teal-400 transition text-gray-300"
                >
                  {item}
                </a>
              );
            }
            return (
              <button
                key={item}
                onClick={() => onNavigate(item)}
                className={`capitalize hover:text-teal-400 transition ${
                  page === item ? "text-teal-400" : "text-gray-300"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
