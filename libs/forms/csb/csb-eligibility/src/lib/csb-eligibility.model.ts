/** Values captured on the "Applicant" step. TODO: replace `example` with real fields. */
export interface ApplicantStepValue {
  example: string;
}

/** Values captured on the "Buses" step. TODO: replace `example` with real fields. */
export interface BusesStepValue {
  example: string;
}

/** Values captured on the "Disposition" step. TODO: replace `example` with real fields. */
export interface DispositionStepValue {
  example: string;
}

export interface CsbEligibilityData {
  applicant: ApplicantStepValue;
  buses: BusesStepValue;
  disposition: DispositionStepValue;
}
