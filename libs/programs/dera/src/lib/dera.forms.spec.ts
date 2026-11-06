import { DERA_FORMS } from './dera.forms';

describe('DERA_FORMS', () => {
  it('uses unique EPA 5900-series form numbers', () => {
    const numbers = DERA_FORMS.map((f) => f.formNumber);
    expect(new Set(numbers).size).toBe(numbers.length);
    for (const n of numbers) expect(n).toMatch(/^5900-\d{3}$/);
  });

  it('includes eligibility and reporting forms', () => {
    const kinds = DERA_FORMS.map((f) => f.kind);
    expect(kinds).toContain('eligibility');
    expect(kinds).toContain('reporting');
  });

  it('links every form to an online flow under /dera/', () => {
    for (const form of DERA_FORMS) expect(form.route).toMatch(/^\/dera\/[a-z-]+$/);
  });
});
