import SortingVisualizer from "@/components/SortingVisualizer";
import Link from "next/link";

export const metadata = {
  title: "Sorting Visualizer | Luke",
  description: "Interactive sorting algorithm visualizer — bubble sort, merge sort, quick sort, and insertion sort.",
};

export default function VisualizerPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
        >
          ← Back home
        </Link>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          Sorting visualizer
        </h1>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          Watch sorting algorithms work step by step. Pick an algorithm, hit play
          or step through manually, and adjust the speed.
        </p>
        <SortingVisualizer />
      </div>
    </main>
  );
}