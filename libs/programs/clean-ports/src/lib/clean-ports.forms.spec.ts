import { CLEAN_PORTS_FORMS } from './clean-ports.forms';

describe('CLEAN_PORTS_FORMS', () => {
  it('uses unique EPA 5900-series form numbers', () => {
    const numbers = CLEAN_PORTS_FORMS.map((f) => f.formNumber);
    expect(new Set(numbers).size).toBe(numbers.length);
    for (const n of numbers) expect(n).toMatch(/^5900-\d{3}$/);
  });

  it('includes eligibility and reporting forms', () => {
    const kinds = CLEAN_PORTS_FORMS.map((f) => f.kind);
    expect(kinds).toContain('eligibility');
    expect(kinds).toContain('reporting');
  });

  it('links every form to an online flow under /clean-ports/', () => {
    for (const form of CLEAN_PORTS_FORMS) expect(form.route).toMatch(/^\/clean-ports\/[a-z-]+$/);
  });
});
