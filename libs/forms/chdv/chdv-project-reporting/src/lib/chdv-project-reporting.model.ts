/** Values captured on the "Project" step. TODO: replace `example` with real fields. */
export interface ProjectStepValue {
  example: string;
}

/** Values captured on the "Vehicles" step. TODO: replace `example` with real fields. */
export interface VehiclesStepValue {
  example: string;
}

/** Values captured on the "Infrastructure" step. TODO: replace `example` with real fields. */
export interface InfrastructureStepValue {
  example: string;
}

export interface ChdvProjectReportingData {
  project: ProjectStepValue;
  vehicles: VehiclesStepValue;
  infrastructure: InfrastructureStepValue;
}
