# CSB (`@garage/csb`)

Feature library for the CSB grant program, lazy-loaded at `/csb` behind `authGuard`.

| EPA form | Title                                             | Type        |
| -------- | ------------------------------------------------- | ----------- |
| 5900-686 | CSB Eligibility and Scrap, Sell, Donate Statement | eligibility |
| 5900-693 | CSB Electric Utility Partnership Agreement        | agreement   |
| 5900-692 | CSB Project Reporting Template                    | reporting   |

- Program identity (name, summary, path) comes from `GRANT_PROGRAMS` in `@garage/ui-lib`.
- The form list lives in `src/lib/csb.forms.ts`. Add a `route` to a form once its online flow exists.

Run `nx test csb` and `nx lint csb`.
