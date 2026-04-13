"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface Line {
  type: "input" | "output";
  text: string;
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "",
    "  about       — Who I am",
    "  projects    — What I've built",
    "  skills      — What I work with",
    "  contact     — How to reach me",
    "  currently   — What I'm up to",
    "  chess       — ♟️",
    "  clear       — Clear the terminal",
    "  exit        — Close the terminal",
    "",
    "Try typing something...",
  ],
  about: [
    "CS student who cares about understanding systems",
    "deeply — from high-level algorithms down to how",
    "bits move through hardware.",
    "",
    "I like building things, solving problems, and",
    "figuring out how stuff works under the hood.",
  ],
  projects: [
    "Featured projects:",
    "",
    "  01  Sorting Visualizer    — Interactive algorithm viz",
    "  02  Portfolio Site         — You're looking at it",
    "",
    "More coming soon. Type 'contact' to collaborate.",
  ],
  skills: [
    "Languages:   Java, Python, JavaScript, TypeScript",
    "Frontend:    React, Next.js, Tailwind CSS",
    "Tools:       Git, SQL, HTML/CSS",
    "Concepts:    Algorithms, Systems, Architecture",
    "",
    "Always learning more.",
  ],
  contact: [
    "Let's connect:",
    "",
    "  GitHub     → github.com",
    "  LinkedIn   → linkedin.com",
    "  Email      → luke@example.com",
  ],
  currently: [
    "📚 Learning    React & Next.js",
    "🔨 Building    This portfolio",
    "♟️  Playing     Chess (~1200 ELO)",
    "🎓 Studying    Algorithms, Diff Eq, OOP",
  ],
  chess: [
    "♟️ Current rating: ~1200 ELO",
    "",
    "Fun fact: there are more possible chess games",
    "than atoms in the observable universe.",
    "",
    "1. e4 is the best opening. Fight me.",
  ],
  sudo: [
    "Nice try. You don't have permission here.",
    "This incident will be reported. 🚨",
  ],
  ls: [
    "about.txt    projects/    skills.json",
    "contact.md   chess.pgn    secrets/",
  ],
  cd: [
    "You're already where you need to be.",
  ],
  pwd: [
    "/home/luke/portfolio",
  ],
  whoami: [
    "luke",
  ],
  "rm -rf": [
    "🔥 Deleting everything...",
    "Just kidding. That would be bad.",
  ],
  hello: [
    "Hey! 👋 Type 'help' to see what I can do.",
  ],
  hi: [
    "Hey! 👋 Type 'help' to see what I can do.",
  ],
  neofetch: [
    "        .--.         luke@portfolio",
    "       |o_o |        ----------------",
    "       |:_/ |        OS: Next.js on Vercel",
    "      //   \\ \\       Shell: React 19",
    "     (|     | )      Theme: Tailwind CSS",
    "    /'\\_   _/`\\      Terminal: Easter egg v1.0",
    "    \\___)=(___/      Uptime: since you got here",
  ],
};

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome to luke's terminal. Type 'help' to get started." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [
      ...lines,
      { type: "input", text: `$ ${cmd}` },
    ];

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    if (trimmed === "exit" || trimmed === "quit" || trimmed === "q") {
      onClose();
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      response.forEach((line) => {
        newLines.push({ type: "output", text: line });
      });
    } else if (trimmed === "") {
      // do nothing
    } else {
      newLines.push({ type: "output", text: `command not found: ${trimmed}. Type 'help' for options.` });
    }

    newLines.push({ type: "output", text: "" });
    setLines(newLines);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      if (input.trim()) {
        setHistory((h) => [input, ...h]);
      }
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Title bar */}
        <div className="flex items-center justify-between rounded-t-xl bg-gray-800 px-4 py-2.5">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="h-3 w-3 rounded-full bg-red-500 transition-opacity hover:opacity-80"
              aria-label="Close terminal"
            />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-400">luke@portfolio — bash</span>
          <div className="w-12" />
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto rounded-b-xl bg-gray-900 p-4 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className={line.type === "input" ? "text-green-400" : "text-gray-300"}>
              {line.text || "\u00A0"}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center text-green-400">
            <span className="mr-2 select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
