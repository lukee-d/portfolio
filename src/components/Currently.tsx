// =============================================
// UPDATE THIS SECTION — just edit the items below
// =============================================
const currently = [
  { emoji: "📚", label: "Learning", value: "React & Next.js" },
  { emoji: "🔨", label: "Building", value: "This portfolio" },
  { emoji: "🎓", label: "Studying", value: "Algorithms, Diff Eq, OOP" },
];
// =============================================

export default function Currently() {
  return (
    <section id="currently" className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Currently
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {currently.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl bg-gray-50 px-5 py-4 dark:bg-gray-900"
          >
            <span className="text-lg" role="img" aria-label={item.label}>
              {item.emoji}
            </span>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {item.label}
              </p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
