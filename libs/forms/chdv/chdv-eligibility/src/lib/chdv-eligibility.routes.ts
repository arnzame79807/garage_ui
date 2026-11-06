import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { ChdvEligibilityFlowComponent } from './chdv-eligibility-flow.component';
import { ChdvEligibilityState } from './chdv-eligibility.state';
import { ApplicantStepComponent } from './steps/applicant/applicant-step.component';
import { VehiclesStepComponent } from './steps/vehicles/vehicles-step.component';
import { ScrappageStepComponent } from './steps/scrappage/scrappage-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(ChdvEligibilityState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const chdvEligibilityRoutes: Route[] = [
  {
    path: '',
    component: ChdvEligibilityFlowComponent,
    providers: [ChdvEligibilityState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'applicant' },
      {
        path: 'applicant',
        component: ApplicantStepComponent,
        title: 'Applicant · CHDV Eligibility and Scrappage Statement',
      },
      {
        path: 'vehicles',
        component: VehiclesStepComponent,
        canActivate: [requireStep('applicant')],
        title: 'Vehicles · CHDV Eligibility and Scrappage Statement',
      },
      {
        path: 'scrappage',
        component: ScrappageStepComponent,
        canActivate: [requireStep('vehicles')],
        title: 'Scrappage · CHDV Eligibility and Scrappage Statement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('scrappage')],
        title: 'Review · CHDV Eligibility and Scrappage Statement',
      },
    ],
  },
];
