# DERA (`@garage/dera`)

Feature library for the DERA grant program, lazy-loaded at `/dera` behind `authGuard`.

| EPA form | Title                      | Type        |
| -------- | -------------------------- | ----------- |
| 5900-687 | DERA Eligibility Statement | eligibility |
| 5900-688 | DERA Scrappage Statement   | evidence    |
| 5900-691 | DERA Reporting Template    | reporting   |

- Program identity (name, summary, path) comes from `GRANT_PROGRAMS` in `@garage/ui-lib`.
- The form list lives in `src/lib/dera.forms.ts`. Add a `route` to a form once its online flow exists.

Run `nx test dera` and `nx lint dera`.
