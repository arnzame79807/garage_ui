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
  programs/        EPA grant program features (guarded):
    chdv/          Clean Heavy-Duty Vehicles            → /chdv
    clean-ports/   Clean Ports                          → /clean-ports
    dera/          Diesel Emissions Reduction Act       → /dera
    csb/           Clean School Bus                     → /csb
  forms/           Form-flow libraries (one per EPA form), grouped by program.
tools/
  garage-plugin/   Local Nx plugin with the `form-flow` generator.
```

`home`, `login`, `dashboard` and the program libraries are **libraries, not apps**. That keeps one build and one deployable
(`dist/apps/garage`) while each feature still gets its own lazy-loaded chunk, project
boundary, test target and Nx cache entry.

## Getting started

Requires Node `^20.19`, `^22.12` or `>=24` (Angular 20's supported range); `.nvmrc` pins 22 LTS.

```bash
nvm install && nvm use        # reads .nvmrc
npm install
npx playwright install        # browsers for e2e (first time only)

npm start                     # garage   → http://localhost:4200
npm run start:sandbox         # sandbox  → http://localhost:4300
```

Sign in with the mock backend: **demo@garage.dev** / **password**, then code **123456**.

## Common tasks

| Task                     | Command                                  |
| ------------------------ | ---------------------------------------- |
| Unit tests (all)         | `npx nx run-many -t test`                |
| Unit tests (one project) | `npx nx test ui-lib`                     |
| E2E (all)                | `npx nx run-many -t e2e`                 |
| E2E (one app)            | `npx nx e2e garage-e2e`                  |
| Lint                     | `npx nx run-many -t lint`                |
| Production build         | `npx nx build garage`                    |
| Only what changed        | `npx nx affected -t lint test build e2e` |
| Project graph            | `npx nx graph`                           |

Unit tests use **Jest** with `jest-preset-angular`; e2e tests use **Playwright**, which
builds the app and serves the production bundle before running (see each
`playwright.config.ts`). Set `BASE_URL` to run e2e against a deployed environment.

## Linting & formatting

| Tool      | Covers                                                                | Config                                       | Run                       |
| --------- | --------------------------------------------------------------------- | -------------------------------------------- | ------------------------- |
| ESLint    | TypeScript, Angular templates, Nx module boundaries, Playwright specs | `eslint.config.mjs` (root + one per project) | `npx nx run-many -t lint` |
| Stylelint | `.scss` files (`stylelint-config-standard-scss`, BEM class names)     | `stylelint.config.mjs`                       | `npm run lint:styles`     |
| Prettier  | Formatting for everything                                             | `.prettierrc`                                | `npm run format`          |

`npm run lint` runs ESLint and Stylelint together. Add `-- --fix` to `lint:styles` to autofix.

**Pre-commit hook:** Husky runs lint-staged (`.lintstagedrc.mjs`) on every commit. It formats the
staged files, runs `stylelint --fix` on staged SCSS, then runs ESLint on the Nx projects those
files belong to. The commit is blocked if lint fails. To skip it in an emergency, use
`git commit --no-verify`.

Component styles written inline in `.ts` files aren't covered by Stylelint.

## Architecture rules

Project tags plus `@nx/enforce-module-boundaries` (root `eslint.config.mjs`) keep
dependencies pointing one way, and `nx lint` fails if they don't:

| Tag            | May import                        |
| -------------- | --------------------------------- |
| `type:app`     | `type:feature`, `type:ui`         |
| `type:feature` | `type:ui` (never another feature) |
| `type:ui`      | `type:ui`                         |
| `type:tooling` | `type:tooling`                    |

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

## Grant programs

Program identity (code, name, summary, route) is defined once in `GRANT_PROGRAMS`
(`libs/ui-lib/src/lib/models/programs.ts`) and used by the dashboard and each program page.
Each program library owns its EPA form list (`src/lib/<program>.forms.ts`), shown with
ui-lib's `garage-form-catalog`.

| Program     | Library               | EPA forms                                        |
| ----------- | --------------------- | ------------------------------------------------ |
| CHDV        | `@garage/chdv`        | 5900-682, 5900-683, 5900-685                     |
| Clean Ports | `@garage/clean-ports` | 5900-684, 5900-718, 5900-719, 5900-720, 5900-721 |
| DERA        | `@garage/dera`        | 5900-687, 5900-688, 5900-691                     |
| CSB         | `@garage/csb`         | 5900-686, 5900-692, 5900-693                     |

Every form has a placeholder online flow in `libs/forms/<program>/<form>` (e.g.
`@garage/dera-eligibility` at `/dera/eligibility`), generated by the `form-flow` generator
and linked from the program page through `route` in the program's `*.forms.ts`. Each
step starts with one placeholder `example` field: replace it with the form's real fields
in the step component and `<form>.model.ts`.

To add another program form:

```bash
npx nx g @garage/plugin:form-flow dera-new-form --directory=libs/forms/dera \
  --route=dera/new-form --title="DERA New Form" --steps=applicant,details
```

then add the form, with its `route`, to `DERA_FORMS`.

Feature libraries can't import each other, so programs link to their flows by URL.

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
