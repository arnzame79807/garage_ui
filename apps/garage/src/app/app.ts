import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppHeaderComponent, AuthService, ButtonComponent } from '@garage/ui-lib';

@Component({
  selector: 'garage-root',
  imports: [RouterOutlet, RouterLink, AppHeaderComponent, ButtonComponent],
  template: `
    <garage-app-header>
      @if (auth.user(); as user) {
        <a routerLink="/dashboard">Dashboard</a>
        <span class="who">{{ user.displayName }}</span>
        <button garageButton variant="secondary" size="sm" (click)="signOut()">Sign out</button>
      } @else {
        <a garageButton size="sm" routerLink="/login">Sign in</a>
      }
    </garage-app-header>
    <router-outlet />
  `,
  styles: `
    .who {
      color: var(--garage-color-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected signOut(): void {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
