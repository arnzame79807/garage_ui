import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CHDV_PROJECT_REPORTING_STEPS } from './chdv-project-reporting.steps';

@Component({
  selector: 'garage-chdv-project-reporting-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="CHDV Project Reporting" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChdvProjectReportingFlowComponent {
  protected readonly steps = CHDV_PROJECT_REPORTING_STEPS;
}
