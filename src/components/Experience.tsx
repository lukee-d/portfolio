// =============================================
// UPDATE THIS SECTION — just edit the items below
// =============================================
const experience = [
  {
    role: "Software Engineer Intern",
    company: "Hynes & Khater",
    period: "Jun. 2026 – Present",
    bullets: [
      "Built a full-stack PASS Travel application in React, Express, and SQLite, handling everything from the database layer to the user-facing interface.",
      "Developed an AI-driven QA automation pipeline that tests application flows automatically, saving the team over 10 hours per week.",
    ],
    tags: ["React", "Express", "SQLite", "LLMs"],
  },
  {
    role: "Software Engineer Intern",
    company: "Geophysical Technology, Inc.",
    period: "Summers 2023 & 2025",
    bullets: [
      "Built Windows-based C++ and C# applications for RFID reader integration, ensuring stable real-time connectivity and tag management.",
      "Automated a previously manual data-processing and analysis workflow with Python scripts, cutting turnaround from ~2 hours to minutes per run.",
    ],
    tags: ["C++", "C#", "Python", "RFID"],
  },
];
// =============================================

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Experience
      </p>
      <div className="space-y-4">
        {experience.map((job) => (
          <div
            key={`${job.company}-${job.period}`}
            className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900"
          >
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <div>
                <h3 className="text-sm font-medium">{job.role}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {job.company}
                </p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {job.period}
              </span>
            </div>
            <ul className="mb-4 space-y-1.5">
              {job.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400"
                >
                  <span className="select-none text-gray-300 dark:text-gray-600">
                    ·
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-200/60 px-2.5 py-0.5 text-[11px] text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
