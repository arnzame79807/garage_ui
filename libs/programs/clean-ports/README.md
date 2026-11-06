# Clean Ports (`@garage/clean-ports`)

Feature library for the Clean Ports grant program, lazy-loaded at `/clean-ports` behind `authGuard`.

| EPA form | Title                                                           | Type        |
| -------- | --------------------------------------------------------------- | ----------- |
| 5900-718 | Clean Ports Scrappage Eligibility Statement                     | eligibility |
| 5900-684 | Clean Ports Scrappage Evidence Statement                        | evidence    |
| 5900-719 | Clean Ports Technology Deployment Evidence Statement            | evidence    |
| 5900-720 | Clean Ports Climate and Air Quality Planning Reporting Template | reporting   |
| 5900-721 | Clean Ports Zero Emission Technology Project Reporting Template | reporting   |

- Program identity (name, summary, path) comes from `GRANT_PROGRAMS` in `@garage/ui-lib`.
- The form list lives in `src/lib/clean-ports.forms.ts`. Add a `route` to a form once its online flow exists.

Run `nx test clean-ports` and `nx lint clean-ports`.
