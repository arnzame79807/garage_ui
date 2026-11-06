import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { CsbProjectReportingData } from './csb-project-reporting.model';
import { CSB_PROJECT_REPORTING_STEPS } from './csb-project-reporting.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class CsbProjectReportingState extends FormFlowState<CsbProjectReportingData> {
  protected readonly stepKeys = CSB_PROJECT_REPORTING_STEPS.filter((s) => s.key !== 'review').map(
    (s) => s.key,
  );

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
