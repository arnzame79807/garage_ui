import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent, AuthService, CardComponent, GRANT_PROGRAMS } from '@garage/ui-lib';

export interface DashboardStat {
  label: string;
  value: number;
}

@Component({
  selector: 'garage-dashboard-page',
  imports: [RouterLink, AlertComponent, CardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly auth = inject(AuthService);

  protected readonly firstName = computed(
    () => this.auth.user()?.displayName.split(' ')[0] ?? 'there',
  );

  protected readonly programs = GRANT_PROGRAMS;

  // Placeholder data until a dashboard API exists.
  protected readonly stats: DashboardStat[] = [
    { label: 'Vehicles', value: 12 },
    { label: 'Open applications', value: 3 },
    { label: 'Reports due', value: 1 },
  ];
}
