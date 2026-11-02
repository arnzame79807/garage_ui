import { Route } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

/** Mount behind `authGuard` in the app shell. */
export const dashboardRoutes: Route[] = [
  { path: '', component: DashboardPageComponent, title: 'Dashboard · Garage' },
];
