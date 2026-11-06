import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CHDV_UTILITY_PARTNERSHIP_STEPS } from './chdv-utility-partnership.steps';

@Component({
  selector: 'garage-chdv-utility-partnership-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="CHDV Utility Partnership Agreement" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChdvUtilityPartnershipFlowComponent {
  protected readonly steps = CHDV_UTILITY_PARTNERSHIP_STEPS;
}
