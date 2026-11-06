import { GrantProgram, ProgramCode } from './program.model';

/**
 * Program identity shared across the app (dashboard links, headers, feature
 * pages). Each program's forms and flows live in its own feature library.
 */
export const GRANT_PROGRAMS: readonly GrantProgram[] = [
  {
    code: 'chdv',
    shortName: 'CHDV',
    name: 'Clean Heavy-Duty Vehicles',
    summary: 'Replace eligible Class 6 and 7 heavy-duty vehicles with zero-emission vehicles.',
    path: '/chdv',
  },
  {
    code: 'clean-ports',
    shortName: 'Clean Ports',
    name: 'Clean Ports',
    summary:
      'Deploy zero-emission port equipment and technology, and plan for climate and air quality.',
    path: '/clean-ports',
  },
  {
    code: 'dera',
    shortName: 'DERA',
    name: 'Diesel Emissions Reduction Act',
    summary:
      'Reduce emissions from existing diesel engines through replacement and retrofit projects.',
    path: '/dera',
  },
  {
    code: 'csb',
    shortName: 'CSB',
    name: 'Clean School Bus',
    summary: 'Replace existing school buses with zero-emission and clean school buses.',
    path: '/csb',
  },
];

export function getProgram(code: ProgramCode): GrantProgram {
  const program = GRANT_PROGRAMS.find((p) => p.code === code);
  if (!program) throw new Error(`Unknown program: ${code}`);
  return program;
}
