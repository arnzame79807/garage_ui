import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { DeraEligibilityFlowComponent } from './dera-eligibility-flow.component';
import { DeraEligibilityState } from './dera-eligibility.state';
import { ApplicantStepComponent } from './steps/applicant/applicant-step.component';
import { FleetStepComponent } from './steps/fleet/fleet-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(DeraEligibilityState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const deraEligibilityRoutes: Route[] = [
  {
    path: '',
    component: DeraEligibilityFlowComponent,
    providers: [DeraEligibilityState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'applicant' },
      {
        path: 'applicant',
        component: ApplicantStepComponent,
        title: 'Applicant · DERA Eligibility Statement',
      },
      {
        path: 'fleet',
        component: FleetStepComponent,
        canActivate: [requireStep('applicant')],
        title: 'Fleet · DERA Eligibility Statement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('fleet')],
        title: 'Review · DERA Eligibility Statement',
      },
    ],
  },
];
