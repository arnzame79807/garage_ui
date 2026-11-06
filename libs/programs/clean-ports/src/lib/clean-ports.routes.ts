import { Route } from '@angular/router';
import { getProgram } from '@garage/ui-lib';
import { CleanPortsOverviewPageComponent } from './clean-ports-overview/clean-ports-overview-page.component';

/** Mounted at /clean-ports behind authGuard in the app shell. */
export const cleanPortsRoutes: Route[] = [
  {
    path: '',
    component: CleanPortsOverviewPageComponent,
    title: `${getProgram('clean-ports').shortName} · Garage`,
  },
];
