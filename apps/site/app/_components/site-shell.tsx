import Link from "next/link";
import type { ReactNode } from "react";

export const codeRepositoryUrl = "https://github.com/o3dotdev/o3-code";
export const githubUrl = "https://github.com/o3dotdev";

export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="min-h-screen bg-[color:var(--background)] px-6 text-[color:var(--foreground)] sm:px-10">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
        <header className="flex h-20 items-center justify-between sm:h-32">
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
            <Link className="transition-opacity hover:opacity-60" href="/code">
              O3 / Code
            </Link>
            <a
              className="transition-opacity hover:opacity-60"
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}
