import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { CleanPortsClimatePlanningReportingData } from './clean-ports-climate-planning-reporting.model';
import { CLEAN_PORTS_CLIMATE_PLANNING_REPORTING_STEPS } from './clean-ports-climate-planning-reporting.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class CleanPortsClimatePlanningReportingState extends FormFlowState<CleanPortsClimatePlanningReportingData> {
  protected readonly stepKeys = CLEAN_PORTS_CLIMATE_PLANNING_REPORTING_STEPS.filter(
    (s) => s.key !== 'review',
  ).map((s) => s.key);

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
