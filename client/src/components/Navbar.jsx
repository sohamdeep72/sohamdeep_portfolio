// client/src/components/Navbar.jsx
import React, { useState, useEffect } from "react";

export default function Navbar({ onNavigate = () => {}, page = "home" }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const resumeUrl =
    "https://drive.google.com/file/d/109s1Tyd4Tyy8v-ZIfv01M8y5io5nZOaQ/view?usp=sharing";

  const handleNavigate = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      // preserve current scroll position, then lock
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.dataset.scrollY = String(scrollY);
      document.body.style.width = "100%";
    } else {
      const prev = document.body.dataset.scrollY;
      if (prev) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(prev, 10) || 0);
        delete document.body.dataset.scrollY;
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
      }
    }
    return () => {
      // cleanup in case component unmounts
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      delete document.body.dataset.scrollY;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 glass backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div
          onClick={() => handleNavigate("home")}
          className="text-xl font-bold tracking-wide cursor-pointer hover:text-teal-400 transition"
        >
          Sohamdeep<span className="text-teal-400">.</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNavigate(n.id)}
              className={`capitalize hover:text-teal-400 transition ${
                page === n.id ? "text-teal-400" : "text-gray-300"
              }`}
            >
              {n.label}
            </button>
          ))}

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 border rounded text-sm text-gray-200 border-white/10 hover:border-teal-400 hover:text-teal-300 transition"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-md border border-white/10 hover:border-teal-400 transition"
          >
            <svg className="w-6 h-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu — FIXED overlay + panel */}
      {open && (
        <>
          {/* full-screen backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* right-side panel (fixed) */}
          <aside
            className="fixed top-0 right-0 z-60 h-full mobile-menu-panel p-6 shadow-2xl border-l border-white/6"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => handleNavigate("home")}
                className="text-white font-semibold text-lg"
              >
                Sohamdeep
              </button>
              <button onClick={() => setOpen(false)} className="p-2 rounded-md border border-white/10">
                <svg className="w-6 h-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNavigate(n.id)}
                  className="text-lg text-gray-100 text-left hover:text-teal-300 transition"
                >
                  {n.label}
                </button>
              ))}

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-4 py-2 rounded text-sm text-gray-100 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-teal-300 transition"
              >
                View Resume
              </a>
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}
