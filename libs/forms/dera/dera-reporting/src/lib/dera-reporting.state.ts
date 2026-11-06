import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { DeraReportingData } from './dera-reporting.model';
import { DERA_REPORTING_STEPS } from './dera-reporting.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class DeraReportingState extends FormFlowState<DeraReportingData> {
  protected readonly stepKeys = DERA_REPORTING_STEPS.filter((s) => s.key !== 'review').map(
    (s) => s.key,
  );

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
