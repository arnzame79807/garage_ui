/** Values captured on the "Vehicles" step. TODO: replace `example` with real fields. */
export interface VehiclesStepValue {
  example: string;
}

/** Values captured on the "Scrappage Evidence" step. TODO: replace `example` with real fields. */
export interface ScrappageEvidenceStepValue {
  example: string;
}

export interface DeraScrappageData {
  vehicles: VehiclesStepValue;
  scrappageEvidence: ScrappageEvidenceStepValue;
}
