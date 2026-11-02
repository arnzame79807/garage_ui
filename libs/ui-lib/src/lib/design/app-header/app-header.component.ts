import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Top bar with the Garage wordmark; project nav/actions into it. */
@Component({
  selector: 'garage-app-header',
  imports: [RouterLink],
  template: `
    <header class="bar">
      <a class="brand" [routerLink]="homeLink()">
        <span class="mark" aria-hidden="true">G</span>
        <span>{{ product() }}</span>
      </a>
      <nav class="actions"><ng-content /></nav>
    </header>
  `,
  styles: `
    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--garage-space-4);
      padding: var(--garage-space-3) var(--garage-space-6);
      background: var(--garage-color-surface);
      border-bottom: 1px solid var(--garage-color-border);
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: var(--garage-space-2);
      color: var(--garage-color-text);
      font-weight: 700;
      font-size: var(--garage-font-size-lg);
      text-decoration: none;
    }
    .mark {
      display: grid;
      place-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: var(--garage-radius-md);
      background: var(--garage-color-primary);
      color: var(--garage-color-on-primary);
    }
    .actions {
      display: flex;
      align-items: center;
      gap: var(--garage-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  readonly product = input('Garage');
  readonly homeLink = input('/');
}
