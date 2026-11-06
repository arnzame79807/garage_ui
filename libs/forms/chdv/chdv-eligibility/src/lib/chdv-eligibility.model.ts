/** Values captured on the "Applicant" step. TODO: replace `example` with real fields. */
export interface ApplicantStepValue {
  example: string;
}

/** Values captured on the "Vehicles" step. TODO: replace `example` with real fields. */
export interface VehiclesStepValue {
  example: string;
}

/** Values captured on the "Scrappage" step. TODO: replace `example` with real fields. */
export interface ScrappageStepValue {
  example: string;
}

export interface ChdvEligibilityData {
  applicant: ApplicantStepValue;
  vehicles: VehiclesStepValue;
  scrappage: ScrappageStepValue;
}
