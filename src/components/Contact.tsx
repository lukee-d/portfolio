const socials = [
  { label: "GitHub", href: "https://github.com/lukee-d" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luke-doudna/" },
  { label: "Email", href: "mailto:lukedoudna06@gmail.com" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl border-t border-gray-100 px-6 py-12 dark:border-gray-800"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400 dark:text-gray-500">Let&apos;s connect</p>
        <div className="flex gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
