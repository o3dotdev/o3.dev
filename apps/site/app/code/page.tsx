import type { Metadata } from "next";
import { SiteShell } from "../_components/site-shell";
import { CodeComposer } from "./code-composer";

export const metadata: Metadata = {
  title: "O3 Code",
  description: "O3 Code is an open-source coding agent interface from o3.dev.",
  alternates: {
    canonical: "/code",
  },
  openGraph: {
    title: "O3 Code",
    description:
      "O3 Code is an open-source coding agent interface from o3.dev.",
    url: "https://o3.dev/code",
  },
  twitter: {
    title: "O3 Code",
    description:
      "O3 Code is an open-source coding agent interface from o3.dev.",
  },
};

export default function CodePage() {
  return (
    <SiteShell>
      <section className="o3-code-surface flex flex-1 flex-col items-center justify-center pb-24 pt-8">
        <div className="flex w-full max-w-[728px] flex-col">
          <h1 className="text-center text-[28px] font-normal leading-[1.2] tracking-normal text-[#1a1c1f]">
            What should we build in o3-code?
          </h1>

          <CodeComposer />
        </div>
      </section>
    </SiteShell>
  );
}
