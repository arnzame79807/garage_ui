import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { ChdvUtilityPartnershipFlowComponent } from './chdv-utility-partnership-flow.component';
import { ChdvUtilityPartnershipState } from './chdv-utility-partnership.state';
import { ApplicantStepComponent } from './steps/applicant/applicant-step.component';
import { UtilityStepComponent } from './steps/utility/utility-step.component';
import { CommitmentsStepComponent } from './steps/commitments/commitments-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(ChdvUtilityPartnershipState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const chdvUtilityPartnershipRoutes: Route[] = [
  {
    path: '',
    component: ChdvUtilityPartnershipFlowComponent,
    providers: [ChdvUtilityPartnershipState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'applicant' },
      {
        path: 'applicant',
        component: ApplicantStepComponent,
        title: 'Applicant · CHDV Utility Partnership Agreement',
      },
      {
        path: 'utility',
        component: UtilityStepComponent,
        canActivate: [requireStep('applicant')],
        title: 'Utility · CHDV Utility Partnership Agreement',
      },
      {
        path: 'commitments',
        component: CommitmentsStepComponent,
        canActivate: [requireStep('utility')],
        title: 'Commitments · CHDV Utility Partnership Agreement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('commitments')],
        title: 'Review · CHDV Utility Partnership Agreement',
      },
    ],
  },
];
