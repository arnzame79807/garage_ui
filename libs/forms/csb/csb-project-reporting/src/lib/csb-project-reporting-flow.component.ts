import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CSB_PROJECT_REPORTING_STEPS } from './csb-project-reporting.steps';

@Component({
  selector: 'garage-csb-project-reporting-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="CSB Project Reporting" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsbProjectReportingFlowComponent {
  protected readonly steps = CSB_PROJECT_REPORTING_STEPS;
}
