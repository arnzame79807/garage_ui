import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '@garage/ui-lib';

@Component({
  selector: 'garage-login-layout',
  imports: [RouterOutlet, CardComponent],
  template: `
    <main class="layout">
      <garage-card class="panel"><router-outlet /></garage-card>
    </main>
  `,
  styles: `
    .layout {
      display: grid;
      place-items: start center;
      padding: var(--garage-space-12) var(--garage-space-4);
    }
    .panel {
      width: min(100%, 26rem);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent {}
