import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { DERA_REPORTING_STEPS } from './dera-reporting.steps';

@Component({
  selector: 'garage-dera-reporting-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="DERA Reporting" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeraReportingFlowComponent {
  protected readonly steps = DERA_REPORTING_STEPS;
}
