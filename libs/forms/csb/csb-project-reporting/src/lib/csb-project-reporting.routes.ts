import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { CsbProjectReportingFlowComponent } from './csb-project-reporting-flow.component';
import { CsbProjectReportingState } from './csb-project-reporting.state';
import { ProjectStepComponent } from './steps/project/project-step.component';
import { BusesStepComponent } from './steps/buses/buses-step.component';
import { InfrastructureStepComponent } from './steps/infrastructure/infrastructure-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(CsbProjectReportingState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const csbProjectReportingRoutes: Route[] = [
  {
    path: '',
    component: CsbProjectReportingFlowComponent,
    providers: [CsbProjectReportingState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'project' },
      {
        path: 'project',
        component: ProjectStepComponent,
        title: 'Project · CSB Project Reporting',
      },
      {
        path: 'buses',
        component: BusesStepComponent,
        canActivate: [requireStep('project')],
        title: 'Buses · CSB Project Reporting',
      },
      {
        path: 'infrastructure',
        component: InfrastructureStepComponent,
        canActivate: [requireStep('buses')],
        title: 'Infrastructure · CSB Project Reporting',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('infrastructure')],
        title: 'Review · CSB Project Reporting',
      },
    ],
  },
];
