import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CHDV_ELIGIBILITY_STEPS } from './chdv-eligibility.steps';

@Component({
  selector: 'garage-chdv-eligibility-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="CHDV Eligibility and Scrappage Statement" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChdvEligibilityFlowComponent {
  protected readonly steps = CHDV_ELIGIBILITY_STEPS;
}
