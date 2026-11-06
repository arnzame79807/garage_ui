import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CSB_UTILITY_PARTNERSHIP_STEPS } from './csb-utility-partnership.steps';

@Component({
  selector: 'garage-csb-utility-partnership-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="CSB Electric Utility Partnership Agreement" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsbUtilityPartnershipFlowComponent {
  protected readonly steps = CSB_UTILITY_PARTNERSHIP_STEPS;
}
