import { Route } from '@angular/router';
import { getProgram } from '@garage/ui-lib';
import { CsbOverviewPageComponent } from './csb-overview/csb-overview-page.component';

/** Mounted at /csb behind authGuard in the app shell. */
export const csbRoutes: Route[] = [
  {
    path: '',
    component: CsbOverviewPageComponent,
    title: `${getProgram('csb').shortName} · Garage`,
  },
];
