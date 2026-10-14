import Link from "next/link";

const tools = [
  {
    title: "Arithmetic Calculator",
    description: "Add, subtract, multiply, and divide.",
    href: "/calculator",
    color: "blue",
  },
  {
    title: "Trigonometry",
    description: "Convert angles and calculate trig functions.",
    href: "/trigonometry",
    color: "emerald",
  },
  {
    title: "Shapes Calculator",
    description: "Find areas, perimeters, volumes, and surface areas.",
    href: "/shapes",
    color: "purple",
  },
  {
    title: "Roots & Powers",
    description: "Calculate square roots and squares.",
    href: "/roots",
    color: "orange",
  },
  {
    title: "Randomizer",
    description: "Generate a number or choose from a list.",
    href: "/random",
    color: "pink",
  },
] as const;

const hoverColors = {
  blue: "hover:border-blue-400 hover:shadow-blue-500/10 focus-visible:border-blue-400",
  emerald:
    "hover:border-emerald-400 hover:shadow-emerald-500/10 focus-visible:border-emerald-400",
  purple:
    "hover:border-purple-400 hover:shadow-purple-500/10 focus-visible:border-purple-400",
  orange:
    "hover:border-orange-400 hover:shadow-orange-500/10 focus-visible:border-orange-400",
  pink: "hover:border-pink-400 hover:shadow-pink-500/10 focus-visible:border-pink-400",
};

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-10 sm:px-8 sm:py-14">
      <section className="my-auto py-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
            A little math goes a long way
          </p>
          <h1 className="bg-gradient-to-r from-blue-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            Multi-Functional Calculator
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            Choose a tool to get started.
          </p>
        </div>

        <nav
          aria-label="Calculator tools"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 ${hoverColors[tool.color]}`}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="text-lg font-semibold text-slate-100">
                  {tool.title}
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl text-slate-500 transition group-hover:translate-x-1 group-hover:text-slate-200"
                >
                  →
                </span>
              </span>
              <span className="mt-2 block text-sm leading-6 text-slate-400">
                {tool.description}
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <footer className="mt-auto flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-center text-sm text-slate-400 sm:flex-row sm:text-left">
        <p>Developed by Himanshu Shekhar / LunarLimits0</p>
        <div className="flex items-center gap-5">
          <a
            href="https://discord.gg/kQ7bCDAFQ"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            Discord
          </a>
          <a
            href="mailto:himanshu20119567@gmail.com"
            className="transition hover:text-white"
          >
            Email
          </a>
        </div>
      </footer>
    </main>
  );
}
