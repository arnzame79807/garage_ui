import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertComponent, AlertTone, CardComponent } from '@garage/ui-lib';

@Component({
  selector: 'garage-feedback-page',
  imports: [AlertComponent, CardComponent],
  template: `
    <h1>Cards &amp; alerts</h1>
    <section class="guide-section">
      <h2>Alerts</h2>
      @for (tone of tones; track tone) {
        <garage-alert [tone]="tone">This is a <strong>{{ tone }}</strong> alert.</garage-alert>
      }
    </section>
    <section class="guide-section">
      <h2>Card</h2>
      <garage-card heading="Card heading">
        <p>Cards group related content on a raised surface.</p>
      </garage-card>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackPage {
  protected readonly tones: AlertTone[] = ['info', 'success', 'warning', 'error'];
}
