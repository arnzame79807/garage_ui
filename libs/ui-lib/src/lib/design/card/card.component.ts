import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'garage-card',
  template: `
    @if (heading()) {
      <h2 class="garage-card__heading">{{ heading() }}</h2>
    }
    <ng-content />
  `,
  styles: `
    :host {
      display: block;
      padding: var(--garage-space-6);
      background: var(--garage-color-surface);
      border: 1px solid var(--garage-color-border);
      border-radius: var(--garage-radius-lg);
      box-shadow: var(--garage-shadow-sm);
    }
    .garage-card__heading {
      margin: 0 0 var(--garage-space-4);
      font-size: var(--garage-font-size-lg);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly heading = input<string>();
}
