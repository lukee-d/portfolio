"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { algorithms, AlgorithmName, StepState } from "@/lib/sorting";

function generateArray(size: number): number[] {
  const arr = Array.from({ length: size }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface SortingVisualizerProps {
  compact?: boolean;
}

export default function SortingVisualizer({ compact = false }: SortingVisualizerProps) {
  const arraySize = compact ? 20 : 30;
  const [algo, setAlgo] = useState<AlgorithmName>("Bubble Sort");
  const [steps, setSteps] = useState<StepState[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const playingRef = useRef(playing);
  const speedRef = useRef(speed);

  playingRef.current = playing;
  speedRef.current = speed;

  const reset = useCallback((algorithm?: AlgorithmName) => {
    const a = algorithm ?? algo;
    const arr = generateArray(arraySize);
    const newSteps = algorithms[a](arr);
    setSteps(newSteps);
    setStepIndex(0);
    setPlaying(false);
  }, [algo, arraySize]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!playing) return;

    const tick = () => {
      if (!playingRef.current) return;
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
      const delay = Math.max(10, 500 - speedRef.current * 4.5);
      timeoutId = setTimeout(tick, delay);
    };

    let timeoutId = setTimeout(tick, Math.max(10, 500 - speed * 4.5));
    return () => clearTimeout(timeoutId);
  }, [playing, steps.length, speed]);

  const current = steps[stepIndex] || { array: [], comparing: [], swapping: [], sorted: [], label: "" };
  const maxVal = Math.max(...current.array, 1);

  const handleAlgoChange = (name: AlgorithmName) => {
    setAlgo(name);
    reset(name);
  };

  const stepForward = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((s) => s + 1);
    }
  };

  const stepBack = () => {
    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
    }
  };

  const getBarColor = (index: number): string => {
    if (current.sorted.includes(index)) return "bg-emerald-400 dark:bg-emerald-500";
    if (current.swapping.includes(index)) return "bg-rose-400 dark:bg-rose-500";
    if (current.comparing.includes(index)) return "bg-amber-400 dark:bg-amber-500";
    return "bg-blue-400 dark:bg-blue-500";
  };

  return (
    <div className={compact ? "" : "mx-auto max-w-3xl"}>
      {/* Controls */}
      {!compact && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select
            value={algo}
            onChange={(e) => handleAlgoChange(e.target.value as AlgorithmName)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          >
            {Object.keys(algorithms).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <button
            onClick={() => setPlaying(!playing)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {playing ? "Pause" : "Play"}
          </button>

          <button
            onClick={stepBack}
            disabled={playing || stepIndex === 0}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:bg-gray-100 disabled:opacity-30 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            ← Step
          </button>

          <button
            onClick={stepForward}
            disabled={playing || stepIndex >= steps.length - 1}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors hover:bg-gray-100 disabled:opacity-30 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Step →
          </button>

          <button
            onClick={() => reset()}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Shuffle
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-400">Speed</span>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 accent-blue-500"
            />
          </div>
        </div>
      )}

      {/* Compact controls */}
      {compact && (
        <div className="mb-3 flex items-center gap-2">
          <select
            value={algo}
            onChange={(e) => handleAlgoChange(e.target.value as AlgorithmName)}
            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-900"
          >
            {Object.keys(algorithms).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <button
            onClick={() => setPlaying(!playing)}
            className="rounded-md border border-gray-200 px-2 py-1 text-xs transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {playing ? "Pause" : "Play"}
          </button>

          <button
            onClick={() => reset()}
            className="rounded-md border border-gray-200 px-2 py-1 text-xs transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Shuffle
          </button>
        </div>
      )}

      {/* Bars */}
      <div
        className={`flex items-end gap-[2px] rounded-xl bg-gray-50 p-4 dark:bg-gray-900 ${
          compact ? "h-40" : "h-72"
        }`}
      >
        {current.array.map((val, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm transition-all duration-100 ${getBarColor(i)}`}
            style={{ height: `${(val / maxVal) * 100}%` }}
          />
        ))}
      </div>

      {/* Step info */}
      <div className="mt-3 flex items-center justify-between">
        <p className={`text-gray-500 dark:text-gray-400 ${compact ? "text-xs" : "text-sm"}`}>
          {current.label}
        </p>
        <p className={`text-gray-400 dark:text-gray-500 ${compact ? "text-[10px]" : "text-xs"}`}>
          Step {stepIndex} / {steps.length - 1}
        </p>
      </div>

      {/* Legend */}
      {!compact && (
        <div className="mt-4 flex gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-blue-400" /> Default
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-400" /> Comparing
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-rose-400" /> Swapping
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-400" /> Sorted
          </span>
        </div>
      )}
    </div>
  );
}
