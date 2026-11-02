import { Route } from '@angular/router';
import { authGuard } from '@garage/ui-lib';

/**
 * Every feature is a lazily loaded library, so the app ships as one
 * deployable while each feature builds into its own chunk.
 */
export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('@garage/login').then((m) => m.loginRoutes),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('@garage/dashboard').then((m) => m.dashboardRoutes),
  },
  // <form-flow-routes> Routes added by `nx g @garage/plugin:form-flow` are inserted above this line.
  {
    path: '',
    loadChildren: () => import('@garage/home').then((m) => m.homeRoutes),
  },
  { path: '**', redirectTo: '' },
];
