const skills = [
  "Python",
  "Java",
  "C/C++",
  "C#",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "HTML/CSS",
  "Tailwind",
  "SQL",
  "Git",
  "Linux",
  "Docker",
  "AWS",
  "Firebase",
  "MongoDB",
  "TensorFlow",
  "REST APIs",
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Skills & tools
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 transition-all duration-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-blue-700 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
