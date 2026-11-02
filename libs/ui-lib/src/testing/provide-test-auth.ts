import { Provider } from '@angular/core';
import { AUTH_STORAGE, AuthBackend, MockAuthBackend } from '../lib/auth';
import { AuthSession, User } from '../lib/models';
import { InMemoryStorage } from './in-memory-storage';

export const TEST_USER: User = {
  id: 'u-test',
  email: 'test@garage.dev',
  displayName: 'Test User',
  roles: ['user'],
};

/**
 * Providers for unit tests that need auth. Pass `signedIn: true` to start
 * with an authenticated session. Never persists to real browser storage.
 */
export function provideTestAuth(opts: { signedIn?: boolean; user?: User } = {}): Provider[] {
  const storage = new InMemoryStorage();
  if (opts.signedIn) {
    const session: AuthSession = {
      user: opts.user ?? TEST_USER,
      accessToken: 'test-token',
      expiresAt: Date.now() + 60_000,
    };
    storage.setItem('garage.session', JSON.stringify(session));
  }
  return [
    { provide: AuthBackend, useClass: MockAuthBackend },
    { provide: AUTH_STORAGE, useValue: storage },
  ];
}
