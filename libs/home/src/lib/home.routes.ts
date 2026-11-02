import { Route } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const homeRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: HomePageComponent, title: 'Garage' },
];
