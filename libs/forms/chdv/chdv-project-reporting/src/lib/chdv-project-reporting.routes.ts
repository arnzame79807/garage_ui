import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { ChdvProjectReportingFlowComponent } from './chdv-project-reporting-flow.component';
import { ChdvProjectReportingState } from './chdv-project-reporting.state';
import { ProjectStepComponent } from './steps/project/project-step.component';
import { VehiclesStepComponent } from './steps/vehicles/vehicles-step.component';
import { InfrastructureStepComponent } from './steps/infrastructure/infrastructure-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(ChdvProjectReportingState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const chdvProjectReportingRoutes: Route[] = [
  {
    path: '',
    component: ChdvProjectReportingFlowComponent,
    providers: [ChdvProjectReportingState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'project' },
      {
        path: 'project',
        component: ProjectStepComponent,
        title: 'Project · CHDV Project Reporting',
      },
      {
        path: 'vehicles',
        component: VehiclesStepComponent,
        canActivate: [requireStep('project')],
        title: 'Vehicles · CHDV Project Reporting',
      },
      {
        path: 'infrastructure',
        component: InfrastructureStepComponent,
        canActivate: [requireStep('vehicles')],
        title: 'Infrastructure · CHDV Project Reporting',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('infrastructure')],
        title: 'Review · CHDV Project Reporting',
      },
    ],
  },
];
