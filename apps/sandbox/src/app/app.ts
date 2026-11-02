import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '@garage/ui-lib';
import { GUIDE_PAGES } from './app.routes';

@Component({
  selector: 'garage-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AppHeaderComponent],
  template: `
    <garage-app-header product="Garage Sandbox">
      <span class="badge">Design guide</span>
    </garage-app-header>
    <div class="layout">
      <nav class="sidebar" aria-label="Design guide">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          Overview
        </a>
        @for (page of pages; track page.path) {
          <a [routerLink]="page.path" routerLinkActive="active">{{ page.label }}</a>
        }
      </nav>
      <main class="content"><router-outlet /></main>
    </div>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: 14rem 1fr;
      min-height: calc(100vh - 3.5rem);
    }
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: var(--garage-space-1);
      padding: var(--garage-space-4);
      border-right: 1px solid var(--garage-color-border);
      background: var(--garage-color-surface);
    }
    .sidebar a {
      padding: var(--garage-space-2) var(--garage-space-3);
      border-radius: var(--garage-radius-md);
      color: var(--garage-color-text);
      text-decoration: none;
    }
    .sidebar a.active {
      background: var(--garage-color-surface-sunken);
      font-weight: 600;
    }
    .content {
      padding: var(--garage-space-8);
      max-width: 60rem;
    }
    .badge {
      font-size: var(--garage-font-size-sm);
      color: var(--garage-color-text-muted);
    }
    @media (max-width: 40rem) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly pages = GUIDE_PAGES;
}
