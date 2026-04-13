import AmbientVisualizer from "./AmbientVisualizer";

export default function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-24">
      <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-between">
        {/* Text side */}
        <div className="text-center sm:text-left">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-xl font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            L
          </div>
          <h1 className="mb-3 text-3xl font-semibold tracking-tight">
            Hey, I&apos;m Luke
          </h1>
          <p className="mb-8 max-w-sm text-base leading-relaxed text-gray-500 dark:text-gray-400">
            CS student, problem solver, and builder. I like understanding how things
            work under the hood.
          </p>
          <div className="flex gap-3 sm:justify-start justify-center">
            <a
              href="#projects"
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-100"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm text-white transition-colors hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Ambient visualizer */}
        <div className="w-full max-w-[240px] shrink-0">
          <AmbientVisualizer />
        </div>
      </div>
    </section>
  );
}
