import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { CleanPortsClimatePlanningReportingFlowComponent } from './clean-ports-climate-planning-reporting-flow.component';
import { CleanPortsClimatePlanningReportingState } from './clean-ports-climate-planning-reporting.state';
import { ProjectStepComponent } from './steps/project/project-step.component';
import { PlanningActivitiesStepComponent } from './steps/planning-activities/planning-activities-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(CleanPortsClimatePlanningReportingState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const cleanPortsClimatePlanningReportingRoutes: Route[] = [
  {
    path: '',
    component: CleanPortsClimatePlanningReportingFlowComponent,
    providers: [CleanPortsClimatePlanningReportingState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'project' },
      {
        path: 'project',
        component: ProjectStepComponent,
        title: 'Project · Clean Ports Climate and Air Quality Planning Reporting',
      },
      {
        path: 'planning-activities',
        component: PlanningActivitiesStepComponent,
        canActivate: [requireStep('project')],
        title: 'Planning Activities · Clean Ports Climate and Air Quality Planning Reporting',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('planningActivities')],
        title: 'Review · Clean Ports Climate and Air Quality Planning Reporting',
      },
    ],
  },
];
