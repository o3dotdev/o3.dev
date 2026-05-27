# AGENTS.md

## Project

- `o3.dev` is a pnpm monorepo for the root landing page and future subdomain apps.
- The current deployable app is `apps/web`, a static-first Next.js App Router site for the root domain.
- Keep shared code in `packages/*` only when there is a real second consumer; `packages/.gitkeep` is intentional for now.

## Stack

- Use Node `24.x` and pnpm from the root `packageManager` field.
- Use pnpm workspaces and Turborepo commands from the repository root.
- `apps/web` uses Next.js, React, TypeScript, Tailwind CSS, ESLint flat config, and Prettier.

## Commands

- Install: `pnpm install`
- Develop: `pnpm dev`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Format check: `pnpm format:check`
- Build: `pnpm build`

## Working Rules

- Prefer small, focused changes that preserve the monorepo layout.
- Do not add production dependencies, new apps, or deployment config without a clear reason in the task.
- Keep TypeScript strict; avoid weakening `tsconfig.base.json` to make code pass.
- Keep generated outputs and caches untracked.
- After code changes, run the smallest relevant check first, then `pnpm lint`, `pnpm typecheck`, and `pnpm build` when behavior or build output may be affected.

## Frontend Rules

- Default to server components in `apps/web`; add client components only when interactivity requires them.
- Keep the landing page simple until product copy and content are provided.
- Preserve good metadata, accessible landmarks, responsive layout, and static rendering for the root page.
- Avoid inventing claims about projects, products, or timelines.

## Deployment

- Vercel project root is `apps/web`.
- Production domain is intended to be `o3.dev`.
- Future independently deployed surfaces should be separate apps under `apps/*`.
