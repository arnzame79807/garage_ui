/** Values captured on the "Equipment" step. TODO: replace `example` with real fields. */
export interface EquipmentStepValue {
  example: string;
}

/** Values captured on the "Scrappage Evidence" step. TODO: replace `example` with real fields. */
export interface ScrappageEvidenceStepValue {
  example: string;
}

export interface CleanPortsScrappageEvidenceData {
  equipment: EquipmentStepValue;
  scrappageEvidence: ScrappageEvidenceStepValue;
}
