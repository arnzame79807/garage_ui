# CHDV (`@garage/chdv`)

Feature library for the CHDV grant program, lazy-loaded at `/chdv` behind `authGuard`.

| EPA form | Title                                    | Type        |
| -------- | ---------------------------------------- | ----------- |
| 5900-682 | CHDV Eligibility and Scrappage Statement | eligibility |
| 5900-685 | Utility Partnership Agreement            | agreement   |
| 5900-683 | CHDV Project Reporting Template          | reporting   |

- Program identity (name, summary, path) comes from `GRANT_PROGRAMS` in `@garage/ui-lib`.
- The form list lives in `src/lib/chdv.forms.ts`. Add a `route` to a form once its online flow exists.

Run `nx test chdv` and `nx lint chdv`.
