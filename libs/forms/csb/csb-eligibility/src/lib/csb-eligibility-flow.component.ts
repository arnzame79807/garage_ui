import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CSB_ELIGIBILITY_STEPS } from './csb-eligibility.steps';

@Component({
  selector: 'garage-csb-eligibility-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell
        title="CSB Eligibility and Scrap, Sell, Donate Statement"
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
export class CsbEligibilityFlowComponent {
  protected readonly steps = CSB_ELIGIBILITY_STEPS;
}
