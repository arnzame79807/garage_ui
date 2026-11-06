import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { CleanPortsScrappageEligibilityData } from './clean-ports-scrappage-eligibility.model';
import { CLEAN_PORTS_SCRAPPAGE_ELIGIBILITY_STEPS } from './clean-ports-scrappage-eligibility.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class CleanPortsScrappageEligibilityState extends FormFlowState<CleanPortsScrappageEligibilityData> {
  protected readonly stepKeys = CLEAN_PORTS_SCRAPPAGE_ELIGIBILITY_STEPS.filter(
    (s) => s.key !== 'review',
  ).map((s) => s.key);

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
