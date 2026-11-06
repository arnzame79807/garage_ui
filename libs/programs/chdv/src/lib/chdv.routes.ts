import { Route } from '@angular/router';
import { getProgram } from '@garage/ui-lib';
import { ChdvOverviewPageComponent } from './chdv-overview/chdv-overview-page.component';

/** Mounted at /chdv behind authGuard in the app shell. */
export const chdvRoutes: Route[] = [
  {
    path: '',
    component: ChdvOverviewPageComponent,
    title: `${getProgram('chdv').shortName} · Garage`,
  },
];
