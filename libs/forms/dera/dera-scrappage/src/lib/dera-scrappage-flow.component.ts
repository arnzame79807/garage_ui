import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { DERA_SCRAPPAGE_STEPS } from './dera-scrappage.steps';

@Component({
  selector: 'garage-dera-scrappage-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="DERA Scrappage Statement" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeraScrappageFlowComponent {
  protected readonly steps = DERA_SCRAPPAGE_STEPS;
}
