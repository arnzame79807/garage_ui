import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { ChdvEligibilityData } from './chdv-eligibility.model';
import { CHDV_ELIGIBILITY_STEPS } from './chdv-eligibility.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class ChdvEligibilityState extends FormFlowState<ChdvEligibilityData> {
  protected readonly stepKeys = CHDV_ELIGIBILITY_STEPS.filter((s) => s.key !== 'review').map(
    (s) => s.key,
  );

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
