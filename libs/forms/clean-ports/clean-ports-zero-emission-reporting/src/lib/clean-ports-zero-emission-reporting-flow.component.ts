import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CLEAN_PORTS_ZERO_EMISSION_REPORTING_STEPS } from './clean-ports-zero-emission-reporting.steps';

@Component({
  selector: 'garage-clean-ports-zero-emission-reporting-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell
        title="Clean Ports Zero Emission Technology Project Reporting"
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
export class CleanPortsZeroEmissionReportingFlowComponent {
  protected readonly steps = CLEAN_PORTS_ZERO_EMISSION_REPORTING_STEPS;
}
