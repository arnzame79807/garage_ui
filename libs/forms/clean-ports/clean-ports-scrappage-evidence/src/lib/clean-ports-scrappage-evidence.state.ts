import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { CleanPortsScrappageEvidenceData } from './clean-ports-scrappage-evidence.model';
import { CLEAN_PORTS_SCRAPPAGE_EVIDENCE_STEPS } from './clean-ports-scrappage-evidence.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class CleanPortsScrappageEvidenceState extends FormFlowState<CleanPortsScrappageEvidenceData> {
  protected readonly stepKeys = CLEAN_PORTS_SCRAPPAGE_EVIDENCE_STEPS.filter(
    (s) => s.key !== 'review',
  ).map((s) => s.key);

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
