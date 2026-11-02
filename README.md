# Garage

Nx monorepo for **Garage**, an authenticated Angular application shipped as a single deployable.

```
apps/
  garage/          Deployable app shell: routing, auth wiring, header. Lazy-loads the feature libs.
  garage-e2e/      Playwright tests for the deployable app.
  sandbox/         Design guide + playground for ui-lib components (not deployed).
  sandbox-e2e/     Playwright tests for the sandbox.
libs/
  ui-lib/          Shared design elements, form components, models and services (auth, guards).
  home/            Public landing page.                 → /
  login/           Login flow pages.                     → /login, /login/verify, /login/forgot-password
  dashboard/       Post-login landing page (guarded).   → /dashboard
  forms/           Form-flow libraries created by the generator go here.
tools/
  garage-plugin/   Local Nx plugin with the `form-flow` generator.
```

`home`, `login` and `dashboard` are **libraries, not apps**. That keeps one build and one deployable
(`dist/apps/garage`) while each feature still gets its own lazy-loaded chunk, project
boundary, test target and Nx cache entry.

## Getting started

```bash
npm install
npx playwright install        # browsers for e2e (first time only)

npm start                     # garage   → http://localhost:4200
npm run start:sandbox         # sandbox  → http://localhost:4300
```

Sign in with the mock backend: **demo@garage.dev** / **password**, then code **123456**.

## Common tasks

| Task | Command |
| --- | --- |
| Unit tests (all) | `npx nx run-many -t test` |
| Unit tests (one project) | `npx nx test ui-lib` |
| E2E (all) | `npx nx run-many -t e2e` |
| E2E (one app) | `npx nx e2e garage-e2e` |
| Lint | `npx nx run-many -t lint` |
| Production build | `npx nx build garage` |
| Only what changed | `npx nx affected -t lint test build e2e` |
| Project graph | `npx nx graph` |

Unit tests use **Jest** with `jest-preset-angular`; e2e tests use **Playwright**, which
builds the app and serves the production bundle before running (see each
`playwright.config.ts`). Set `BASE_URL` to run e2e against a deployed environment.

## Architecture rules

Project tags plus `@nx/enforce-module-boundaries` (root `eslint.config.mjs`) keep
dependencies pointing one way, and `nx lint` fails if they don't:

| Tag | May import |
| --- | --- |
| `type:app` | `type:feature`, `type:ui` |
| `type:feature` | `type:ui` (never another feature) |
| `type:ui` | `type:ui` |
| `type:tooling` | `type:tooling` |

## Authentication

`@garage/ui-lib` owns auth so every feature uses the same model:

- `AuthService`: signal-based session state with a two-step login (password, then one-time code).
- `authGuard` / `guestGuard`: functional route guards.
- `authInterceptor`: adds `Authorization: Bearer …` to HTTP calls.
- `AuthBackend`: the transport contract. `MockAuthBackend` is the default.

To connect a real identity provider, implement `AuthBackend` and register it in
`apps/garage/src/app/app.config.ts`:

```ts
provideGarageAuth({ backend: OidcAuthBackend });
```

Unit tests use `provideTestAuth({ signedIn: true })` from `@garage/ui-lib/testing`.

> ⚠️ The mock backend is currently wired into the production build. Swap it out before deploying.

## Generator: new form flow

```bash
npx nx g @garage/plugin:form-flow vehicle-registration --steps=owner,vehicle,documents
# preview without writing files:
npx nx g @garage/plugin:form-flow vehicle-registration --steps=owner,vehicle --dry-run
```

This creates `libs/forms/vehicle-registration` (`@garage/vehicle-registration`), containing:

- a flow shell built on ui-lib's `FormFlowShellComponent` (step indicator + router outlet)
- a `VehicleRegistrationState` (extends `FormFlowState`) shared by every step
- one routed step component per `--steps` entry, plus a review/submit step
- guards that stop users deep-linking past unfinished steps
- unit specs for the state, routes and every step

It also:

- adds the `tsconfig.base.json` path alias
- inserts a lazy, `authGuard`-protected route into `apps/garage/src/app/app.routes.ts` above
  the `// <form-flow-routes>` marker
- adds a Playwright spec, `apps/garage-e2e/src/vehicle-registration.spec.ts`, that signs in
  and walks the whole flow

Options: `--title`, `--directory` (default `libs/forms`), `--app` (default `garage`, `""` to
skip routing), `--route`, `--guarded=false`, `--e2e=false`. Generator code lives in
`tools/garage-plugin/src/generators/form-flow`, and its tests run with `npx nx test garage-plugin`.

## Versions

Pinned to **Nx 21.6 / Angular 20.3**. To move to the latest Nx and Angular with automated
code migrations:

```bash
npx nx migrate latest
npm install
npx nx migrate --run-migrations
```
