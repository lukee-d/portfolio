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
    "  clear       — Clear the terminal",
    "",
    "Try typing something...",
  ],
  about: [
    "CS major at Texas A&M University.",
    "Passionate about software development, machine",
    "learning, and building things that actually work.",
    "",
    "I care about understanding systems deeply — from",
    "algorithms down to how bits move through hardware.",
  ],
  projects: [
    "Featured projects:",
    "",
    "  01  Sift                  — Client-side search engine",
    "      sift-khaki.vercel.app",
    "",
    "  02  Chess Dashboard       — Chess.com analytics",
    "      chess-dashboard-two.vercel.app",
    "",
    "  03  Sorting Visualizer    — Algorithm viz tool",
    "      /visualizer",
    "",
    "  04  Portfolio Site         — You're looking at it",
  ],
  skills: [
    "Languages:   Python, Java, C/C++, C#, JS, TS",
    "Frontend:    React, Next.js, Tailwind, HTML/CSS",
    "Backend:     SQL, MongoDB, Firebase, REST APIs",
    "Tools:       Git, Linux, Docker, AWS",
    "ML:          TensorFlow, PyTorch, OpenCV",
  ],
  contact: [
    "Let's connect:",
    "",
    "  GitHub     → github.com/lukee-d",
    "  LinkedIn   → linkedin.com/in/luke-doudna",
    "  Email      → lukedoudna06@gmail.com",
  ],
  currently: [
    "📚 Learning    React & Next.js",
    "🔨 Building    This portfolio",
    "🎓 Studying    Algorithms, Diff Eq, OOP",
  ],
  sudo: [
    "Nice try. You don't have permission here.",
    "This incident will be reported. 🚨",
  ],
  ls: [
    "about.txt    projects/    skills.json",
    "contact.md   resume.pdf   secrets/",
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
    "    /'\\_   _/`\\      Terminal: v1.0",
    "    \\___)=(___/      Uptime: since you got here",
  ],
};

export default function InlineTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome! Type 'help' to see what I can do." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = (cmd: string) => {
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
        newLines.push({
          type: "output",
          text: `command not found: ${trimmed}. Type 'help' for options.`,
        });
      }

      newLines.push({ type: "output", text: "" });
      return newLines;
    });
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
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Terminal
      </p>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        {/* Title bar */}
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2.5 dark:bg-gray-800">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-500 font-mono dark:text-gray-400">
            luke@portfolio ~ %
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="h-64 overflow-y-auto bg-gray-950 px-4 pt-3 pb-2 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={line.type === "input" ? "text-green-400" : "text-gray-300"}
            >
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
              placeholder="type a command..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
