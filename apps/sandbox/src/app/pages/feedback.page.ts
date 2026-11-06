import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AlertComponent,
  AlertTone,
  CardComponent,
  FormCatalogComponent,
  ProgramForm,
} from '@garage/ui-lib';

@Component({
  selector: 'garage-feedback-page',
  imports: [AlertComponent, CardComponent, FormCatalogComponent],
  template: `
    <h1>Cards &amp; alerts</h1>
    <section class="guide-section">
      <h2>Alerts</h2>
      @for (tone of tones; track tone) {
        <garage-alert [tone]="tone"
          >This is a <strong>{{ tone }}</strong> alert.</garage-alert
        >
      }
    </section>
    <section class="guide-section">
      <h2>Card</h2>
      <garage-card heading="Card heading">
        <p>Cards group related content on a raised surface.</p>
      </garage-card>
    </section>
    <section class="guide-section">
      <h2>Form catalog</h2>
      <p>Used on each program page. Forms with a <code>route</code> render as links.</p>
      <garage-form-catalog [forms]="sampleForms" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackPage {
  protected readonly sampleForms: ProgramForm[] = [
    {
      formNumber: '5900-000',
      title: 'Sample Eligibility Statement',
      kind: 'eligibility',
      route: '/forms',
    },
    { formNumber: '5900-001', title: 'Sample Evidence Statement', kind: 'evidence' },
    { formNumber: '5900-002', title: 'Sample Partnership Agreement', kind: 'agreement' },
    { formNumber: '5900-003', title: 'Sample Reporting Template', kind: 'reporting' },
  ];
  protected readonly tones: AlertTone[] = ['info', 'success', 'warning', 'error'];
}
