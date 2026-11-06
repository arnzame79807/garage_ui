/** Values captured on the "Project" step. TODO: replace `example` with real fields. */
export interface ProjectStepValue {
  example: string;
}

/** Values captured on the "Planning Activities" step. TODO: replace `example` with real fields. */
export interface PlanningActivitiesStepValue {
  example: string;
}

export interface CleanPortsClimatePlanningReportingData {
  project: ProjectStepValue;
  planningActivities: PlanningActivitiesStepValue;
}
