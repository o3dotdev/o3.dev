import Link from "next/link";

const futureSurfaces = [
  {
    label: "Landing",
    text: "A concise root page for the domain.",
  },
  {
    label: "Projects",
    text: "Dedicated spaces for individual releases.",
  },
  {
    label: "Writing",
    text: "Notes and longer-form updates when they are ready.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between border-b border-[color:var(--line)] pb-5">
          <Link
            className="font-serif text-2xl font-semibold tracking-normal"
            href="/"
          >
            o3.dev
          </Link>
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-5 text-sm text-[color:var(--muted)]"
          >
            <a
              className="transition hover:text-[color:var(--foreground)]"
              href="#projects"
            >
              Projects
            </a>
            <a
              className="transition hover:text-[color:var(--foreground)]"
              href="#writing"
            >
              Writing
            </a>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
              o3.dev
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-normal text-balance sm:text-6xl lg:text-7xl">
              A quiet starting point for what comes next.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              The root domain for upcoming software projects, notes, and
              experiments.
            </p>
          </div>

          <aside
            aria-label="Planned structure"
            className="border border-[color:var(--line)] bg-[color:var(--panel)] p-5 shadow-[0_24px_80px_rgb(23_22_21/0.08)]"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-4">
              <p className="text-sm font-medium text-[color:var(--foreground)]">
                Initial structure
              </p>
              <p className="text-sm text-[color:var(--muted)]">v0</p>
            </div>
            <div className="space-y-4 pt-5">
              {futureSurfaces.map((surface) => (
                <div
                  key={surface.label}
                  className="grid grid-cols-[6rem_1fr] gap-4"
                >
                  <p className="text-sm font-medium text-[color:var(--accent-strong)]">
                    {surface.label}
                  </p>
                  <p className="text-sm leading-6 text-[color:var(--muted)]">
                    {surface.text}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section
          id="projects"
          className="grid gap-6 border-t border-[color:var(--line)] py-8 sm:grid-cols-2"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              Projects
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-normal">
              Separate surfaces when needed.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[color:var(--muted)]">
            Future project pages can live as dedicated apps in the monorepo and
            deploy independently on Vercel.
          </p>
        </section>

        <section
          id="writing"
          className="grid gap-6 border-t border-[color:var(--line)] py-8 sm:grid-cols-2"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              Writing
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-normal">
              A place for notes later.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[color:var(--muted)]">
            The first version keeps the domain simple while leaving room for a
            blog or documentation surface.
          </p>
        </section>
      </div>
    </main>
  );
}
