"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { algorithms, AlgorithmName } from "@/lib/sorting";
import Link from "next/link";

const algoNames: AlgorithmName[] = ["Bubble Sort", "Insertion Sort", "Quick Sort", "Merge Sort"];

function generateArray(size: number): number[] {
  const arr = Array.from({ length: size }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function AmbientVisualizer() {
  const [algoIndex, setAlgoIndex] = useState(0);
  const [steps, setSteps] = useState<ReturnType<typeof algorithms[AlgorithmName]>>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const playingRef = useRef(true);

  const startNewSort = useCallback((index: number) => {
    const name = algoNames[index % algoNames.length];
    const arr = generateArray(16);
    const newSteps = algorithms[name](arr);
    setSteps(newSteps);
    setStepIndex(0);
  }, []);

  useEffect(() => {
    startNewSort(0);
  }, [startNewSort]);

  useEffect(() => {
    const tick = () => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          // Start next algorithm after a pause
          setTimeout(() => {
            setAlgoIndex((ai) => {
              const next = ai + 1;
              startNewSort(next);
              return next;
            });
          }, 1500);
          return prev;
        }
        return prev + 1;
      });
    };

    const id = setInterval(tick, 80);
    return () => clearInterval(id);
  }, [steps.length, startNewSort]);

  const current = steps[stepIndex] || { array: [], comparing: [], swapping: [], sorted: [] };
  const maxVal = Math.max(...current.array, 1);
  const currentAlgoName = algoNames[algoIndex % algoNames.length];

  const getBarColor = (index: number): string => {
    if (current.sorted.includes(index)) return "bg-emerald-400/80 dark:bg-emerald-500/80";
    if (current.swapping.includes(index)) return "bg-rose-400/80 dark:bg-rose-500/80";
    if (current.comparing.includes(index)) return "bg-amber-400/80 dark:bg-amber-500/80";
    return "bg-blue-400/60 dark:bg-blue-500/60";
  };

  return (
    <Link href="/visualizer" className="group block">
      <div className="rounded-xl bg-gray-50 p-4 transition-colors group-hover:bg-gray-100 dark:bg-gray-900 dark:group-hover:bg-gray-800">
        <div className="flex items-end gap-[2px] h-24">
          {current.array.map((val, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm transition-all duration-75 ${getBarColor(i)}`}
              style={{ height: `${(val / maxVal) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            {currentAlgoName}
          </p>
          <p className="text-[11px] text-blue-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
            Try it →
          </p>
        </div>
      </div>
    </Link>
  );
}
