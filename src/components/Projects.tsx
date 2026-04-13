const projects = [
  {
    number: "01",
    title: "Project name",
    description:
      "Short description of what this project does and why it's interesting.",
    tags: ["Java", "React"],
    link: "#",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    number: "02",
    title: "Project name",
    description:
      "Another project with a concise explanation of the problem it solves.",
    tags: ["Python", "SQL"],
    link: "#",
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  },
  {
    number: "03",
    title: "Project name",
    description:
      "A third project — maybe something systems-level or low-level.",
    tags: ["Hack ASM", "HDL"],
    link: "#",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    number: "04",
    title: "Project name",
    description:
      "A fourth project — algorithms, tools, or something creative.",
    tags: ["JavaScript"],
    link: "#",
    color: "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Featured projects
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.number}
            href={project.link}
            className="group rounded-xl bg-gray-50 p-5 transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:shadow-lg dark:hover:shadow-black/20"
          >
            <div className="mb-3 flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium ${project.color}`}
              >
                {project.number}
              </div>
              <h3 className="text-sm font-medium">{project.title}</h3>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-200/60 px-2.5 py-0.5 text-[11px] text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
