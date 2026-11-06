import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFlowShellComponent } from '@garage/ui-lib';
import { CLEAN_PORTS_SCRAPPAGE_EVIDENCE_STEPS } from './clean-ports-scrappage-evidence.steps';

@Component({
  selector: 'garage-clean-ports-scrappage-evidence-flow',
  imports: [FormFlowShellComponent],
  template: `
    <div class="garage-container page">
      <garage-form-flow-shell title="Clean Ports Scrappage Evidence Statement" [steps]="steps" />
    </div>
  `,
  styles: `
    .page {
      padding: var(--garage-space-8) 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CleanPortsScrappageEvidenceFlowComponent {
  protected readonly steps = CLEAN_PORTS_SCRAPPAGE_EVIDENCE_STEPS;
}
