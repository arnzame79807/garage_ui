import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/** Attaches the bearer token to outgoing API calls when a session exists. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).session()?.accessToken;
  if (!token || req.headers.has('Authorization')) return next(req);
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
