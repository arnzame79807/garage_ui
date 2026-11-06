import { CHDV_FORMS } from './chdv.forms';

describe('CHDV_FORMS', () => {
  it('uses unique EPA 5900-series form numbers', () => {
    const numbers = CHDV_FORMS.map((f) => f.formNumber);
    expect(new Set(numbers).size).toBe(numbers.length);
    for (const n of numbers) expect(n).toMatch(/^5900-\d{3}$/);
  });

  it('includes eligibility and reporting forms', () => {
    const kinds = CHDV_FORMS.map((f) => f.kind);
    expect(kinds).toContain('eligibility');
    expect(kinds).toContain('reporting');
  });

  it('links every form to an online flow under /chdv/', () => {
    for (const form of CHDV_FORMS) expect(form.route).toMatch(/^\/chdv\/[a-z-]+$/);
  });
});
