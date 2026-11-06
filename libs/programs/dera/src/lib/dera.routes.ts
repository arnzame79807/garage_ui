import { Route } from '@angular/router';
import { getProgram } from '@garage/ui-lib';
import { DeraOverviewPageComponent } from './dera-overview/dera-overview-page.component';

/** Mounted at /dera behind authGuard in the app shell. */
export const deraRoutes: Route[] = [
  {
    path: '',
    component: DeraOverviewPageComponent,
    title: `${getProgram('dera').shortName} · Garage`,
  },
];
