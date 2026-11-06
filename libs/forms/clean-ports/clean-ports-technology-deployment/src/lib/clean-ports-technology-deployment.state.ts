import { Injectable } from '@angular/core';
import { FormFlowState } from '@garage/ui-lib';
import { Observable, of } from 'rxjs';
import { CleanPortsTechnologyDeploymentData } from './clean-ports-technology-deployment.model';
import { CLEAN_PORTS_TECHNOLOGY_DEPLOYMENT_STEPS } from './clean-ports-technology-deployment.steps';

/** Provided on the flow's route, so every step shares one instance. */
@Injectable()
export class CleanPortsTechnologyDeploymentState extends FormFlowState<CleanPortsTechnologyDeploymentData> {
  protected readonly stepKeys = CLEAN_PORTS_TECHNOLOGY_DEPLOYMENT_STEPS.filter(
    (s) => s.key !== 'review',
  ).map((s) => s.key);

  /** TODO: replace with a call to the real API. */
  submit(): Observable<void> {
    return of(undefined);
  }
}
