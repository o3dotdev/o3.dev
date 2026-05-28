import { githubUrl, SiteShell } from "./_components/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <section className="flex flex-1 flex-col items-center justify-center pb-28 pt-10 text-center sm:pb-36">
        <a
          className="text-2xl font-medium leading-tight tracking-normal transition-opacity hover:opacity-60 sm:text-3xl"
          href={githubUrl}
          rel="noreferrer"
          target="_blank"
        >
          Open-source by default.
        </a>
      </section>
    </SiteShell>
  );
}
