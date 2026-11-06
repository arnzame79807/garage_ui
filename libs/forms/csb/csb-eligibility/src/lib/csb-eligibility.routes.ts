import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { CsbEligibilityFlowComponent } from './csb-eligibility-flow.component';
import { CsbEligibilityState } from './csb-eligibility.state';
import { ApplicantStepComponent } from './steps/applicant/applicant-step.component';
import { BusesStepComponent } from './steps/buses/buses-step.component';
import { DispositionStepComponent } from './steps/disposition/disposition-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(CsbEligibilityState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const csbEligibilityRoutes: Route[] = [
  {
    path: '',
    component: CsbEligibilityFlowComponent,
    providers: [CsbEligibilityState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'applicant' },
      {
        path: 'applicant',
        component: ApplicantStepComponent,
        title: 'Applicant · CSB Eligibility and Scrap, Sell, Donate Statement',
      },
      {
        path: 'buses',
        component: BusesStepComponent,
        canActivate: [requireStep('applicant')],
        title: 'Buses · CSB Eligibility and Scrap, Sell, Donate Statement',
      },
      {
        path: 'disposition',
        component: DispositionStepComponent,
        canActivate: [requireStep('buses')],
        title: 'Disposition · CSB Eligibility and Scrap, Sell, Donate Statement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('disposition')],
        title: 'Review · CSB Eligibility and Scrap, Sell, Donate Statement',
      },
    ],
  },
];
