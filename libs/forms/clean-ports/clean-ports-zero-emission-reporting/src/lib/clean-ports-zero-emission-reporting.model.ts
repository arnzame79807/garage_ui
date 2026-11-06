/** Values captured on the "Project" step. TODO: replace `example` with real fields. */
export interface ProjectStepValue {
  example: string;
}

/** Values captured on the "Technology" step. TODO: replace `example` with real fields. */
export interface TechnologyStepValue {
  example: string;
}

/** Values captured on the "Emissions" step. TODO: replace `example` with real fields. */
export interface EmissionsStepValue {
  example: string;
}

export interface CleanPortsZeroEmissionReportingData {
  project: ProjectStepValue;
  technology: TechnologyStepValue;
  emissions: EmissionsStepValue;
}
