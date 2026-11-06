import { GRANT_PROGRAMS, getProgram } from './programs';

describe('GRANT_PROGRAMS', () => {
  it('has unique codes and paths', () => {
    expect(new Set(GRANT_PROGRAMS.map((p) => p.code)).size).toBe(GRANT_PROGRAMS.length);
    expect(new Set(GRANT_PROGRAMS.map((p) => p.path)).size).toBe(GRANT_PROGRAMS.length);
  });

  it('looks programs up by code', () => {
    expect(getProgram('dera').shortName).toBe('DERA');
  });
});
