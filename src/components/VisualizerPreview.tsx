import Link from "next/link";
import SortingVisualizer from "./SortingVisualizer";

export default function VisualizerPreview() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Interactive project
      </p>
      <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium">Sorting visualizer</h3>
          <Link
            href="/visualizer"
            className="text-xs text-blue-500 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Full version →
          </Link>
        </div>
        <SortingVisualizer compact />
      </div>
    </section>
  );
}