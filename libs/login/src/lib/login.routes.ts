import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService, guestGuard } from '@garage/ui-lib';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { SignInPageComponent } from './sign-in/sign-in-page.component';
import { VerifyCodePageComponent } from './verify-code/verify-code-page.component';

/** The code step is only reachable after a successful password step. */
export const challengeGuard: CanActivateFn = (route) => {
  if (inject(AuthService).status() === 'challenged') return true;
  return inject(Router).createUrlTree(['/login'], { queryParams: route.queryParams });
};

/**
 * Login flow:  /login  ->  /login/verify  ->  postLoginUrl (default /dashboard)
 *                  \->  /login/forgot-password
 */
export const loginRoutes: Route[] = [
  {
    path: '',
    component: LoginLayoutComponent,
    canActivate: [guestGuard],
    children: [
      { path: '', component: SignInPageComponent, title: 'Sign in · Garage' },
      {
        path: 'verify',
        component: VerifyCodePageComponent,
        canActivate: [challengeGuard],
        title: 'Verify your identity · Garage',
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent,
        title: 'Reset your password · Garage',
      },
    ],
  },
];
