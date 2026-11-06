import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { CleanPortsTechnologyDeploymentFlowComponent } from './clean-ports-technology-deployment-flow.component';
import { CleanPortsTechnologyDeploymentState } from './clean-ports-technology-deployment.state';
import { ProjectStepComponent } from './steps/project/project-step.component';
import { TechnologyStepComponent } from './steps/technology/technology-step.component';
import { DeploymentEvidenceStepComponent } from './steps/deployment-evidence/deployment-evidence-step.component';
import { ReviewStepComponent } from './steps/review/review-step.component';

/** Blocks deep links to a step until the step before it is complete. */
function requireStep(stepKey: string): CanActivateFn {
  return (route) => {
    if (inject(CleanPortsTechnologyDeploymentState).isStepComplete(stepKey)) return true;
    const flowRoot = route.parent?.pathFromRoot.flatMap((r) => r.url.map((s) => s.path)) ?? [];
    return inject(Router).createUrlTree(['/', ...flowRoot]);
  };
}

export const cleanPortsTechnologyDeploymentRoutes: Route[] = [
  {
    path: '',
    component: CleanPortsTechnologyDeploymentFlowComponent,
    providers: [CleanPortsTechnologyDeploymentState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'project' },
      {
        path: 'project',
        component: ProjectStepComponent,
        title: 'Project · Clean Ports Technology Deployment Evidence Statement',
      },
      {
        path: 'technology',
        component: TechnologyStepComponent,
        canActivate: [requireStep('project')],
        title: 'Technology · Clean Ports Technology Deployment Evidence Statement',
      },
      {
        path: 'deployment-evidence',
        component: DeploymentEvidenceStepComponent,
        canActivate: [requireStep('technology')],
        title: 'Deployment Evidence · Clean Ports Technology Deployment Evidence Statement',
      },
      {
        path: 'review',
        component: ReviewStepComponent,
        canActivate: [requireStep('deploymentEvidence')],
        title: 'Review · Clean Ports Technology Deployment Evidence Statement',
      },
    ],
  },
];
