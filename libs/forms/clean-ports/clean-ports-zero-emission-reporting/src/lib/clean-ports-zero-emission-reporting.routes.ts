import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { CleanPortsZeroEmissionReportingFlowComponent } from './clean-ports-zero-emission-reporting-flow.component';
import { CleanPortsZeroEmissionReportingState } from './clean-ports-zero-emission-reporting.state';
import { ProjectStepComponent } from './steps/project/project-step.component';
import { TechnologyStepComponent } from './steps/technology/technology-step.component';
import { EmissionsStepComponent } from './steps/emissions/emissions-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(CleanPortsZeroEmissionReportingState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const cleanPortsZeroEmissionReportingRoutes: Route[] = [
  {
    path: '',
    component: CleanPortsZeroEmissionReportingFlowComponent,
    providers: [CleanPortsZeroEmissionReportingState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'project' },
      {
        path: 'project',
        component: ProjectStepComponent,
        title: 'Project · Clean Ports Zero Emission Technology Project Reporting',
      },
      {
        path: 'technology',
        component: TechnologyStepComponent,
        canActivate: [requireStep('project')],
        title: 'Technology · Clean Ports Zero Emission Technology Project Reporting',
      },
      {
        path: 'emissions',
        component: EmissionsStepComponent,
        canActivate: [requireStep('technology')],
        title: 'Emissions · Clean Ports Zero Emission Technology Project Reporting',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('emissions')],
        title: 'Review · Clean Ports Zero Emission Technology Project Reporting',
      },
    ],
  },
];
