import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormCatalogComponent, getProgram } from '@garage/ui-lib';
import { CSB_FORMS } from '../csb.forms';

@Component({
  selector: 'garage-csb-overview-page',
  imports: [FormCatalogComponent],
  template: `
    <div class="garage-container page">
      <header>
        <p class="eyebrow">{{ program.shortName }} · EPA grant program</p>
        <h1>{{ program.name }}</h1>
        <p class="lede">{{ program.summary }}</p>
      </header>
      <section aria-labelledby="csb-forms-heading">
        <h2 id="csb-forms-heading">Forms</h2>
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
export class CsbOverviewPageComponent {
  protected readonly program = getProgram('csb');
  protected readonly forms = CSB_FORMS;
}
