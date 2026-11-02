import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GARAGE_AUTH_CONFIG } from './auth.config';
import { AuthService } from './auth.service';

/** Allows authenticated users; otherwise redirects to login with a returnUrl. */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  if (auth.isAuthenticated()) return true;
  const { loginUrl } = inject(GARAGE_AUTH_CONFIG);
  return inject(Router).createUrlTree([loginUrl], { queryParams: { returnUrl: state.url } });
};

/** Keeps signed-in users out of the login flow. */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (!auth.isAuthenticated()) return true;
  return inject(Router).parseUrl(inject(GARAGE_AUTH_CONFIG).postLoginUrl);
};
