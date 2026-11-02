import { ChangeDetectionStrategy, Component } from '@angular/core';

const COLORS = [
  'primary', 'primary-strong', 'text', 'text-muted', 'bg', 'surface', 'surface-sunken',
  'border', 'border-strong', 'focus', 'info', 'success', 'warning', 'danger',
];
const SPACE = ['1', '2', '3', '4', '6', '8', '12'];
const TYPE = ['sm', 'md', 'lg', 'xl', '2xl'];

@Component({
  selector: 'garage-tokens-page',
  template: `
    <h1>Design tokens</h1>
    <section class="guide-section">
      <h2>Color</h2>
      <div class="swatches">
        @for (c of colors; track c) {
          <figure class="swatch">
            <div class="chip" [style.background]="'var(--garage-color-' + c + ')'"></div>
            <figcaption><code>--garage-color-{{ c }}</code></figcaption>
          </figure>
        }
      </div>
    </section>
    <section class="guide-section">
      <h2>Type scale</h2>
      @for (t of type; track t) {
        <p [style.font-size]="'var(--garage-font-size-' + t + ')'" [style.margin]="0">
          {{ t }} — The quick brown fox
        </p>
      }
    </section>
    <section class="guide-section">
      <h2>Spacing</h2>
      @for (s of space; track s) {
        <div class="guide-row">
          <code class="label">space-{{ s }}</code>
          <div class="bar" [style.width]="'var(--garage-space-' + s + ')'"></div>
        </div>
      }
    </section>
  `,
  styles: `
    .swatches {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
      gap: var(--garage-space-4);
    }
    .swatch {
      margin: 0;
    }
    .chip {
      height: 3rem;
      border: 1px solid var(--garage-color-border);
      border-radius: var(--garage-radius-md);
    }
    figcaption {
      font-size: var(--garage-font-size-sm);
    }
    .label {
      width: 6rem;
    }
    .bar {
      height: 1rem;
      background: var(--garage-color-primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokensPage {
  protected readonly colors = COLORS;
  protected readonly space = SPACE;
  protected readonly type = TYPE;
}
