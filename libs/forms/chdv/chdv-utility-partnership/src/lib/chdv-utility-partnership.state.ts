import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { ChdvUtilityPartnershipData } from './chdv-utility-partnership.model';
import { CHDV_UTILITY_PARTNERSHIP_STEPS } from './chdv-utility-partnership.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class ChdvUtilityPartnershipState extends FormFlowState<ChdvUtilityPartnershipData> {
  protected readonly stepKeys = CHDV_UTILITY_PARTNERSHIP_STEPS.filter(
    (s) => s.key !== 'review',
  ).map((s) => s.key);

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
