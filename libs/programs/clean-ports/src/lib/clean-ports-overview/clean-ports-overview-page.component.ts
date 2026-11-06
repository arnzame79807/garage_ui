import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormCatalogComponent, getProgram } from '@garage/ui-lib';
import { CLEAN_PORTS_FORMS } from '../clean-ports.forms';

@Component({
  selector: 'garage-clean-ports-overview-page',
  imports: [FormCatalogComponent],
  template: `
    <div class="garage-container page">
      <header>
        <p class="eyebrow">{{ program.shortName }} · EPA grant program</p>
        <h1>{{ program.name }}</h1>
        <p class="lede">{{ program.summary }}</p>
      </header>
      <section aria-labelledby="clean-ports-forms-heading">
        <h2 id="clean-ports-forms-heading">Forms</h2>
        <garage-form-catalog [forms]="forms" />
      </section>
    </div>
  `,
  styles: `
    .page {
      display: grid;
      gap: var(--garage-space-6);
      padding: var(--garage-space-8) 0;
    }
    h1 {
      margin: 0;
    }
    .eyebrow {
      margin: 0 0 var(--garage-space-1);
      color: var(--garage-color-text-muted);
      font-size: var(--garage-font-size-sm);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .lede {
      margin: var(--garage-space-2) 0 0;
      color: var(--garage-color-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CleanPortsOverviewPageComponent {
  protected readonly program = getProgram('clean-ports');
  protected readonly forms = CLEAN_PORTS_FORMS;
}
