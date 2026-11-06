import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { DeraEligibilityData } from './dera-eligibility.model';
import { DERA_ELIGIBILITY_STEPS } from './dera-eligibility.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class DeraEligibilityState extends FormFlowState<DeraEligibilityData> {
  protected readonly stepKeys = DERA_ELIGIBILITY_STEPS.filter((s) => s.key !== 'review').map(
    (s) => s.key,
  );

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
