import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthError, AuthSession, Credentials, LoginChallenge } from '../models';
import { AuthBackend } from './auth-backend';

export const DEMO_CREDENTIALS: Readonly<Credentials> = {
  email: 'demo@garage.dev',
  password: 'password',
};
export const DEMO_OTP = '123456';

const SESSION_TTL_MS = 30 * 60 * 1000;

/** In-memory backend for local development, the sandbox and e2e tests. */
@Injectable()
export class MockAuthBackend extends AuthBackend {
  private pendingEmail: string | null = null;

  startLogin({ email, password }: Credentials): Observable<LoginChallenge> {
    if (email.toLowerCase() !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
      return throwError(
        () => new AuthError('invalid-credentials', 'Email or password is incorrect.'),
      );
    }
    this.pendingEmail = email.toLowerCase();
    return of({
      challengeId: 'mock-challenge',
      type: 'otp',
      destinationHint: 'd•••@garage.dev',
    });
  }

  verifyChallenge(challengeId: string, code: string): Observable<AuthSession> {
    if (challengeId !== 'mock-challenge' || !this.pendingEmail) {
      return throwError(() => new AuthError('no-challenge', 'Your sign-in session expired.'));
    }
    if (code !== DEMO_OTP) {
      return throwError(() => new AuthError('invalid-code', 'That code is not valid.'));
    }
    const email = this.pendingEmail;
    this.pendingEmail = null;
    return of({
      user: { id: 'u-demo', email, displayName: 'Demo User', roles: ['user'] },
      accessToken: 'mock-access-token',
      expiresAt: Date.now() + SESSION_TTL_MS,
    });
  }

  requestPasswordReset(): Observable<void> {
    return of(undefined);
  }

  logout(): Observable<void> {
    return of(undefined);
  }
}
