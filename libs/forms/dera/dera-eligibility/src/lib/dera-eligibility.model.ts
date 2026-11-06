/** Values captured on the "Applicant" step. TODO: replace `example` with real fields. */
export interface ApplicantStepValue {
  example: string;
}

/** Values captured on the "Fleet" step. TODO: replace `example` with real fields. */
export interface FleetStepValue {
  example: string;
}

export interface DeraEligibilityData {
  applicant: ApplicantStepValue;
  fleet: FleetStepValue;
}
