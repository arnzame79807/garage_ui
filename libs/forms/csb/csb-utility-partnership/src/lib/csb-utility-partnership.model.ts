/** Values captured on the "Applicant" step. TODO: replace `example` with real fields. */
export interface ApplicantStepValue {
  example: string;
}

/** Values captured on the "Utility" step. TODO: replace `example` with real fields. */
export interface UtilityStepValue {
  example: string;
}

/** Values captured on the "Commitments" step. TODO: replace `example` with real fields. */
export interface CommitmentsStepValue {
  example: string;
}

export interface CsbUtilityPartnershipData {
  applicant: ApplicantStepValue;
  utility: UtilityStepValue;
  commitments: CommitmentsStepValue;
}
