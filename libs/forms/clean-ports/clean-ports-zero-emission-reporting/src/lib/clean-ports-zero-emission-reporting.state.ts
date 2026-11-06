import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { CleanPortsZeroEmissionReportingData } from './clean-ports-zero-emission-reporting.model';
import { CLEAN_PORTS_ZERO_EMISSION_REPORTING_STEPS } from './clean-ports-zero-emission-reporting.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class CleanPortsZeroEmissionReportingState extends FormFlowState<CleanPortsZeroEmissionReportingData> {
  protected readonly stepKeys = CLEAN_PORTS_ZERO_EMISSION_REPORTING_STEPS.filter(
    (s) => s.key !== 'review',
  ).map((s) => s.key);

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
