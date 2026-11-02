import {
  EnvironmentProviders,
  InjectionToken,
  Type,
  makeEnvironmentProviders,
} from '@angular/core';
import { AuthBackend } from './auth-backend';
import { MockAuthBackend } from './mock-auth-backend';

export interface GarageAuthConfig {
  /** Where unauthenticated users are sent. */
  loginUrl: string;
  /** Where users land after completing the login flow. */
  postLoginUrl: string;
}

export const DEFAULT_AUTH_CONFIG: GarageAuthConfig = {
  loginUrl: '/login',
  postLoginUrl: '/dashboard',
};

export const GARAGE_AUTH_CONFIG = new InjectionToken<GarageAuthConfig>('GARAGE_AUTH_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_AUTH_CONFIG,
});

/** Storage used to persist the session across reloads (null = memory only). */
export const AUTH_STORAGE = new InjectionToken<Storage | null>('AUTH_STORAGE', {
  providedIn: 'root',
  factory: () => (typeof sessionStorage === 'undefined' ? null : sessionStorage),
});

export interface ProvideGarageAuthOptions extends Partial<GarageAuthConfig> {
  backend?: Type<AuthBackend>;
}

export function provideGarageAuth(options: ProvideGarageAuthOptions = {}): EnvironmentProviders {
  const { backend = MockAuthBackend, ...config } = options;
  return makeEnvironmentProviders([
    { provide: AuthBackend, useClass: backend },
    { provide: GARAGE_AUTH_CONFIG, useValue: { ...DEFAULT_AUTH_CONFIG, ...config } },
  ]);
}
