import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CLEAN_PORTS_TECHNOLOGY_DEPLOYMENT_STEPS } from './clean-ports-technology-deployment.steps';

@Component({
  selector: 'garage-clean-ports-technology-deployment-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell
        title="Clean Ports Technology Deployment Evidence Statement"
        [steps]="steps"
      />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CleanPortsTechnologyDeploymentFlowComponent {
  protected readonly steps = CLEAN_PORTS_TECHNOLOGY_DEPLOYMENT_STEPS;
}
