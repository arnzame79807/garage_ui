import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { ChdvProjectReportingData } from './chdv-project-reporting.model';
import { CHDV_PROJECT_REPORTING_STEPS } from './chdv-project-reporting.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class ChdvProjectReportingState extends FormFlowState<ChdvProjectReportingData> {
  protected readonly stepKeys = CHDV_PROJECT_REPORTING_STEPS.filter((s) => s.key !== 'review').map(
    (s) => s.key,
  );

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
