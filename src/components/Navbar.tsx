"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-medium tracking-tight">
          Luke
        </a>

        <div className="flex items-center gap-6">
          {/* Desktop links */}
          <div className="hidden gap-8 sm:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            className="text-gray-500 sm:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 px-6 py-4 dark:border-gray-800 sm:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
