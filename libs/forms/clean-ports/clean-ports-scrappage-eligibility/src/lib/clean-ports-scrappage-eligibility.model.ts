/** Values captured on the "Applicant" step. TODO: replace `example` with real fields. */
export interface ApplicantStepValue {
  example: string;
}

/** Values captured on the "Equipment" step. TODO: replace `example` with real fields. */
export interface EquipmentStepValue {
  example: string;
}

export interface CleanPortsScrappageEligibilityData {
  applicant: ApplicantStepValue;
  equipment: EquipmentStepValue;
}
