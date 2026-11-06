import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CLEAN_PORTS_CLIMATE_PLANNING_REPORTING_STEPS } from './clean-ports-climate-planning-reporting.steps';

@Component({
  selector: 'garage-clean-ports-climate-planning-reporting-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell
        title="Clean Ports Climate and Air Quality Planning Reporting"
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
export class CleanPortsClimatePlanningReportingFlowComponent {
  protected readonly steps = CLEAN_PORTS_CLIMATE_PLANNING_REPORTING_STEPS;
}
