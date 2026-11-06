import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { CsbEligibilityData } from './csb-eligibility.model';
import { CSB_ELIGIBILITY_STEPS } from './csb-eligibility.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class CsbEligibilityState extends FormFlowState<CsbEligibilityData> {
  protected readonly stepKeys = CSB_ELIGIBILITY_STEPS.filter((s) => s.key !== 'review').map(
    (s) => s.key,
  );

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
