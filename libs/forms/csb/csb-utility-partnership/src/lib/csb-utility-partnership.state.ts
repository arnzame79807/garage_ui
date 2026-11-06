import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { CsbUtilityPartnershipData } from './csb-utility-partnership.model';
import { CSB_UTILITY_PARTNERSHIP_STEPS } from './csb-utility-partnership.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class CsbUtilityPartnershipState extends FormFlowState<CsbUtilityPartnershipData> {
  protected readonly stepKeys = CSB_UTILITY_PARTNERSHIP_STEPS.filter((s) => s.key !== 'review').map(
    (s) => s.key,
  );

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
