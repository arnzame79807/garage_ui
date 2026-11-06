/** Values captured on the "Project" step. TODO: replace `example` with real fields. */
export interface ProjectStepValue {
  example: string;
}

/** Values captured on the "Technology" step. TODO: replace `example` with real fields. */
export interface TechnologyStepValue {
  example: string;
}

/** Values captured on the "Deployment Evidence" step. TODO: replace `example` with real fields. */
export interface DeploymentEvidenceStepValue {
  example: string;
}

export interface CleanPortsTechnologyDeploymentData {
  project: ProjectStepValue;
  technology: TechnologyStepValue;
  deploymentEvidence: DeploymentEvidenceStepValue;
}
