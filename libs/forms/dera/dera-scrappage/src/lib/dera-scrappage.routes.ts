import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { DeraScrappageFlowComponent } from './dera-scrappage-flow.component';
import { DeraScrappageState } from './dera-scrappage.state';
import { VehiclesStepComponent } from './steps/vehicles/vehicles-step.component';
import { ScrappageEvidenceStepComponent } from './steps/scrappage-evidence/scrappage-evidence-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(DeraScrappageState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const deraScrappageRoutes: Route[] = [
  {
    path: '',
    component: DeraScrappageFlowComponent,
    providers: [DeraScrappageState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'vehicles' },
      {
        path: 'vehicles',
        component: VehiclesStepComponent,
        title: 'Vehicles · DERA Scrappage Statement',
      },
      {
        path: 'scrappage-evidence',
        component: ScrappageEvidenceStepComponent,
        canActivate: [requireStep('vehicles')],
        title: 'Scrappage Evidence · DERA Scrappage Statement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('scrappageEvidence')],
        title: 'Review · DERA Scrappage Statement',
      },
    ],
  },
];
