import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, ButtonSize, ButtonVariant } from '@garage/ui-lib';

@Component({
  selector: 'garage-buttons-page',
  imports: [ButtonComponent],
  template: `
    <h1>Buttons</h1>
    <p>
      Apply <code>garageButton</code> to a native <code>&lt;button&gt;</code> or
      <code>&lt;a&gt;</code>.
    </p>
    <section class="guide-section">
      <h2>Variants</h2>
      <div class="guide-row">
        @for (v of variants; track v) {
          <button garageButton [variant]="v">{{ v }}</button>
        }
        <button garageButton disabled>disabled</button>
      </div>
    </section>
    <section class="guide-section">
      <h2>Sizes</h2>
      <div class="guide-row">
        @for (s of sizes; track s) {
          <button garageButton [size]="s">Size {{ s }}</button>
        }
      </div>
    </section>
    <section class="guide-section">
      <h2>Usage</h2>
      <div class="guide-code">{{ usage }}</div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsPage {
  protected readonly variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
  protected readonly sizes: ButtonSize[] = ['sm', 'md', 'lg'];
  protected readonly usage = `<button garageButton variant="secondary" size="sm">Cancel</button>
<a garageButton routerLink="/dashboard">Go</a>`;
}
