import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'garage-alert',
  template: `<ng-content />`,
  styles: `
    :host {
      display: block;
      padding: var(--garage-space-3) var(--garage-space-4);
      border-left: 4px solid var(--tone);
      border-radius: var(--garage-radius-sm);
      background: color-mix(in srgb, var(--tone) 10%, var(--garage-color-surface));
    }
    :host(.garage-alert--info) { --tone: var(--garage-color-info); }
    :host(.garage-alert--success) { --tone: var(--garage-color-success); }
    :host(.garage-alert--warning) { --tone: var(--garage-color-warning); }
    :host(.garage-alert--error) { --tone: var(--garage-color-danger); }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"garage-alert--" + tone()',
    '[attr.role]': 'role()',
  },
})
export class AlertComponent {
  readonly tone = input<AlertTone>('info');
  /** Errors interrupt assistive tech; everything else is announced politely. */
  protected readonly role = computed(() => (this.tone() === 'error' ? 'alert' : 'status'));
}
