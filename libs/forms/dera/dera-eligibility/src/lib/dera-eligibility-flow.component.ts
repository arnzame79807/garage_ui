import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { DERA_ELIGIBILITY_STEPS } from './dera-eligibility.steps';

@Component({
  selector: 'garage-dera-eligibility-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="DERA Eligibility Statement" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeraEligibilityFlowComponent {
  protected readonly steps = DERA_ELIGIBILITY_STEPS;
}
