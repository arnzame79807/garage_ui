import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { CleanPortsScrappageEligibilityFlowComponent } from './clean-ports-scrappage-eligibility-flow.component';
import { CleanPortsScrappageEligibilityState } from './clean-ports-scrappage-eligibility.state';
import { ApplicantStepComponent } from './steps/applicant/applicant-step.component';
import { EquipmentStepComponent } from './steps/equipment/equipment-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(CleanPortsScrappageEligibilityState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const cleanPortsScrappageEligibilityRoutes: Route[] = [
  {
    path: '',
    component: CleanPortsScrappageEligibilityFlowComponent,
    providers: [CleanPortsScrappageEligibilityState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'applicant' },
      {
        path: 'applicant',
        component: ApplicantStepComponent,
        title: 'Applicant · Clean Ports Scrappage Eligibility Statement',
      },
      {
        path: 'equipment',
        component: EquipmentStepComponent,
        canActivate: [requireStep('applicant')],
        title: 'Equipment · Clean Ports Scrappage Eligibility Statement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('equipment')],
        title: 'Review · Clean Ports Scrappage Eligibility Statement',
      },
    ],
  },
];
