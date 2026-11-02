import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Styles a native <button> or <a> so it keeps its own semantics:
 *   <button garageButton variant="secondary">Cancel</button>
 */
@Component({
  // Attribute selector keeps native <button>/<a> semantics; camelCase matches directive style.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[garageButton], a[garageButton]',
  template: `<ng-content />`,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'garage-button',
    '[class.garage-button--primary]': 'variant() === "primary"',
    '[class.garage-button--secondary]': 'variant() === "secondary"',
    '[class.garage-button--ghost]': 'variant() === "ghost"',
    '[class.garage-button--danger]': 'variant() === "danger"',
    '[class.garage-button--sm]': 'size() === "sm"',
    '[class.garage-button--lg]': 'size() === "lg"',
    '[class.garage-button--block]': 'block()',
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly block = input(false);
}
