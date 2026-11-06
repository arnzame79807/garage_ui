import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { CsbUtilityPartnershipFlowComponent } from './csb-utility-partnership-flow.component';
import { CsbUtilityPartnershipState } from './csb-utility-partnership.state';
import { ApplicantStepComponent } from './steps/applicant/applicant-step.component';
import { UtilityStepComponent } from './steps/utility/utility-step.component';
import { CommitmentsStepComponent } from './steps/commitments/commitments-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(CsbUtilityPartnershipState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const csbUtilityPartnershipRoutes: Route[] = [
  {
    path: '',
    component: CsbUtilityPartnershipFlowComponent,
    providers: [CsbUtilityPartnershipState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'applicant' },
      {
        path: 'applicant',
        component: ApplicantStepComponent,
        title: 'Applicant · CSB Electric Utility Partnership Agreement',
      },
      {
        path: 'utility',
        component: UtilityStepComponent,
        canActivate: [requireStep('applicant')],
        title: 'Utility · CSB Electric Utility Partnership Agreement',
      },
      {
        path: 'commitments',
        component: CommitmentsStepComponent,
        canActivate: [requireStep('utility')],
        title: 'Commitments · CSB Electric Utility Partnership Agreement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('commitments')],
        title: 'Review · CSB Electric Utility Partnership Agreement',
      },
    ],
  },
];
