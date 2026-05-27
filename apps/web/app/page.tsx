import Link from "next/link";

const codeRepositoryUrl = "https://github.com/o3dotdev/o3-code";

export default function Home() {
  return (
    <main className="min-h-screen bg-[color:var(--background)] px-6 text-[color:var(--foreground)] sm:px-10">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
        <header className="flex h-28 items-center justify-between sm:h-32">
          <Link
            className="text-2xl font-semibold tracking-normal transition-opacity hover:opacity-70"
            href="/"
            aria-label="o3.dev home"
          >
            o3.dev
          </Link>

          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-8 text-base font-medium sm:gap-12"
          >
            <a
              className="transition-opacity hover:opacity-60"
              href={codeRepositoryUrl}
              rel="noreferrer"
              target="_blank"
            >
              O3 / Code
            </a>
            <a
              className="transition-opacity hover:opacity-60"
              href="https://github.com/o3dotdev"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center pb-28 pt-10 text-center sm:pb-36">
          <div className="grid w-fit grid-cols-[max-content_max-content_max-content] items-baseline text-left">
            <h1
              aria-label="o3.dev"
              className="col-span-3 grid grid-cols-subgrid text-6xl font-semibold leading-none tracking-normal sm:text-8xl md:text-[8.75rem] lg:text-[10rem]"
            >
              <span aria-hidden className="justify-self-end">
                o3
              </span>
              <span aria-hidden className="justify-self-center" data-title-dot>
                .
              </span>
              <span aria-hidden className="justify-self-start">
                dev
              </span>
            </h1>
            <a
              aria-label="Open-source by default."
              className="col-start-1 col-end-3 -mt-2 grid grid-cols-subgrid text-2xl font-medium leading-tight tracking-normal transition-opacity hover:opacity-60 sm:text-[2.65rem]"
              href="https://github.com/o3dotdev"
              rel="noreferrer"
              target="_blank"
            >
              <span aria-hidden className="justify-self-end">
                Open-source by default
              </span>
              <span
                aria-hidden
                className="justify-self-center"
                data-subtitle-dot
              >
                .
              </span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
