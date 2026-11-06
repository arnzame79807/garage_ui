import { CSB_FORMS } from './csb.forms';

describe('CSB_FORMS', () => {
  it('uses unique EPA 5900-series form numbers', () => {
    const numbers = CSB_FORMS.map((f) => f.formNumber);
    expect(new Set(numbers).size).toBe(numbers.length);
    for (const n of numbers) expect(n).toMatch(/^5900-\d{3}$/);
  });

  it('includes eligibility and reporting forms', () => {
    const kinds = CSB_FORMS.map((f) => f.kind);
    expect(kinds).toContain('eligibility');
    expect(kinds).toContain('reporting');
  });

  it('links every form to an online flow under /csb/', () => {
    for (const form of CSB_FORMS) expect(form.route).toMatch(/^\/csb\/[a-z-]+$/);
  });
});
