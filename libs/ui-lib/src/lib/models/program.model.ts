/** EPA grant programs supported by Garage. */
export type ProgramCode = 'chdv' | 'clean-ports' | 'dera' | 'csb';

export interface GrantProgram {
  code: ProgramCode;
  /** Short label used in navigation, e.g. "CHDV". */
  shortName: string;
  name: string;
  summary: string;
  /** Absolute app route for the program's feature library. */
  path: string;
}

export type ProgramFormKind = 'eligibility' | 'evidence' | 'agreement' | 'reporting';

/** A form a grantee completes for a program (EPA Form 5900-xxx). */
export interface ProgramForm {
  /** EPA form number, e.g. "5900-682". */
  formNumber: string;
  title: string;
  kind: ProgramFormKind;
  /** App route of the online form flow, once one exists. */
  route?: string;
}
