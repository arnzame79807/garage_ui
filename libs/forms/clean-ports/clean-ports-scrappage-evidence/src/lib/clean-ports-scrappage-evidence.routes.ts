import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { CleanPortsScrappageEvidenceFlowComponent } from './clean-ports-scrappage-evidence-flow.component';
import { CleanPortsScrappageEvidenceState } from './clean-ports-scrappage-evidence.state';
import { EquipmentStepComponent } from './steps/equipment/equipment-step.component';
import { ScrappageEvidenceStepComponent } from './steps/scrappage-evidence/scrappage-evidence-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(CleanPortsScrappageEvidenceState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const cleanPortsScrappageEvidenceRoutes: Route[] = [
  {
    path: '',
    component: CleanPortsScrappageEvidenceFlowComponent,
    providers: [CleanPortsScrappageEvidenceState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'equipment' },
      {
        path: 'equipment',
        component: EquipmentStepComponent,
        title: 'Equipment · Clean Ports Scrappage Evidence Statement',
      },
      {
        path: 'scrappage-evidence',
        component: ScrappageEvidenceStepComponent,
        canActivate: [requireStep('equipment')],
        title: 'Scrappage Evidence · Clean Ports Scrappage Evidence Statement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('scrappageEvidence')],
        title: 'Review · Clean Ports Scrappage Evidence Statement',
      },
    ],
  },
];
