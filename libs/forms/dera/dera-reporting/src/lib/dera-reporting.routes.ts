import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { DeraReportingFlowComponent } from './dera-reporting-flow.component';
import { DeraReportingState } from './dera-reporting.state';
import { ProjectStepComponent } from './steps/project/project-step.component';
import { VehiclesStepComponent } from './steps/vehicles/vehicles-step.component';
import { CostsStepComponent } from './steps/costs/costs-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(DeraReportingState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const deraReportingRoutes: Route[] = [
  {
    path: '',
    component: DeraReportingFlowComponent,
    providers: [DeraReportingState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'project' },
      {
        path: 'project',
        component: ProjectStepComponent,
        title: 'Project · DERA Reporting',
      },
      {
        path: 'vehicles',
        component: VehiclesStepComponent,
        canActivate: [requireStep('project')],
        title: 'Vehicles · DERA Reporting',
      },
      {
        path: 'costs',
        component: CostsStepComponent,
        canActivate: [requireStep('vehicles')],
        title: 'Costs · DERA Reporting',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('costs')],
        title: 'Review · DERA Reporting',
      },
    ],
  },
];
