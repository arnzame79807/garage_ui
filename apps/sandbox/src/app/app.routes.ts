import { Route } from '@angular/router';

export interface GuidePage {
  path: string;
  label: string;
}

/** Drives both the router and the sidebar nav. Add a page here to publish it. */
export const GUIDE_PAGES: GuidePage[] = [
  { path: 'tokens', label: 'Design tokens' },
  { path: 'buttons', label: 'Buttons' },
  { path: 'forms', label: 'Form fields' },
  { path: 'feedback', label: 'Cards & alerts' },
  { path: 'form-flow', label: 'Form flow' },
];

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/overview.page').then((m) => m.OverviewPage),
    title: 'Garage design guide',
  },
  {
    path: 'tokens',
    loadComponent: () => import('./pages/tokens.page').then((m) => m.TokensPage),
    title: 'Design tokens',
  },
  {
    path: 'buttons',
    loadComponent: () => import('./pages/buttons.page').then((m) => m.ButtonsPage),
    title: 'Buttons',
  },
  {
    path: 'forms',
    loadComponent: () => import('./pages/forms.page').then((m) => m.FormsPage),
    title: 'Form fields',
  },
  {
    path: 'feedback',
    loadComponent: () => import('./pages/feedback.page').then((m) => m.FeedbackPage),
    title: 'Cards & alerts',
  },
  {
    path: 'form-flow',
    loadChildren: () =>
      import('./pages/form-flow-demo/form-flow-demo.routes').then((m) => m.formFlowDemoRoutes),
    title: 'Form flow',
  },
  { path: '**', redirectTo: '' },
];
