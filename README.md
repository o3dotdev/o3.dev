# o3.dev

Monorepo for `o3.dev`, starting with a single Next.js landing page in `apps/web`.

## Stack

- pnpm workspaces
- Turborepo
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint and Prettier

## Structure

```txt
apps/
  web/        # Root-domain landing page for o3.dev
packages/    # Shared packages will live here when needed
```

## Commands

Install dependencies:

```sh
pnpm install
```

Run the web app locally:

```sh
pnpm dev
```

Run checks:

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

## Vercel

Import this repository as a monorepo project and set the Vercel project root directory to `apps/web`.

Recommended settings:

- Framework preset: Next.js
- Node.js version: `24.x`
- Package manager: pnpm, detected from `pnpm-lock.yaml`
- Production domain: `o3.dev`

Future subdomain deployments can be added as separate apps under `apps/` and imported as separate Vercel projects from the same repository.
