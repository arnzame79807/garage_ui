/** Values captured on the "Project" step. TODO: replace `example` with real fields. */
export interface ProjectStepValue {
  example: string;
}

/** Values captured on the "Vehicles" step. TODO: replace `example` with real fields. */
export interface VehiclesStepValue {
  example: string;
}

/** Values captured on the "Costs" step. TODO: replace `example` with real fields. */
export interface CostsStepValue {
  example: string;
}

export interface DeraReportingData {
  project: ProjectStepValue;
  vehicles: VehiclesStepValue;
  costs: CostsStepValue;
}
