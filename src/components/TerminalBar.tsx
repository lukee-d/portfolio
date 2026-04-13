"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";

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

export default function TerminalBar() {
  const [expanded, setExpanded] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome to luke's terminal. Type 'help' to get started." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [hasAutoTyped, setHasAutoTyped] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    setLines((prev) => {
      const newLines: Line[] = [
        ...prev,
        { type: "input", text: `$ ${cmd}` },
      ];

      if (trimmed === "clear") return [];

      const response = COMMANDS[trimmed];
      if (response) {
        response.forEach((line) => {
          newLines.push({ type: "output", text: line });
        });
      } else if (trimmed !== "") {
        newLines.push({ type: "output", text: `command not found: ${trimmed}. Type 'help' for options.` });
      }

      newLines.push({ type: "output", text: "" });
      return newLines;
    });
  }, []);

  // Auto-type "help" on first visit after a delay
  useEffect(() => {
    if (hasAutoTyped) return;

    const delayTimer = setTimeout(() => {
      setExpanded(true);
      setIsAutoTyping(true);
      setHasAutoTyped(true);

      const word = "help";
      let i = 0;

      const typeInterval = setInterval(() => {
        if (i < word.length) {
          setInput(word.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          // Small pause then "press enter"
          setTimeout(() => {
            setInput("");
            runCommand("help");
            setIsAutoTyping(false);
          }, 400);
        }
      }, 120);
    }, 2500);

    return () => clearTimeout(delayTimer);
  }, [hasAutoTyped, runCommand]);

  useEffect(() => {
    if (expanded && !isAutoTyping) {
      inputRef.current?.focus();
    }
  }, [expanded, isAutoTyping]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = (cmd: string) => {
    runCommand(cmd);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isAutoTyping) return;

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
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Terminal body - expandable */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? "h-64" : "h-0"
        }`}
      >
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto bg-gray-900 px-4 pt-3 pb-2 font-mono text-sm"
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
              onChange={(e) => {
                if (!isAutoTyping) setInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              readOnly={isAutoTyping}
            />
          </div>
        </div>
      </div>

      {/* Title bar - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between bg-gray-800 px-4 py-2 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-400 font-mono">
            luke@portfolio ~ %
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-gray-500 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
