import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';
import { AuthError, AuthSession, AuthStatus, Credentials, LoginChallenge } from '../models';
import { AuthBackend } from './auth-backend';
import { AUTH_STORAGE } from './auth.config';

const STORAGE_KEY = 'garage.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly backend = inject(AuthBackend);
  private readonly storage = inject(AUTH_STORAGE);

  private readonly _session = signal<AuthSession | null>(this.restore());
  private readonly _challenge = signal<LoginChallenge | null>(null);

  readonly session = this._session.asReadonly();
  readonly challenge = this._challenge.asReadonly();
  readonly user = computed(() => this._session()?.user ?? null);
  readonly status = computed<AuthStatus>(() => {
    if (this._session()) return 'authenticated';
    return this._challenge() ? 'challenged' : 'anonymous';
  });
  readonly isAuthenticated = computed(() => this.status() === 'authenticated');

  /** Step 1: username + password. Resolves with a second-factor challenge. */
  startLogin(credentials: Credentials): Observable<LoginChallenge> {
    return this.backend
      .startLogin(credentials)
      .pipe(tap((challenge) => this._challenge.set(challenge)));
  }

  /** Step 2: one-time code. Resolves with an authenticated session. */
  verify(code: string): Observable<AuthSession> {
    const challenge = this._challenge();
    if (!challenge) {
      return throwError(() => new AuthError('no-challenge', 'Start sign-in again.'));
    }
    return this.backend.verifyChallenge(challenge.challengeId, code).pipe(
      tap((session) => {
        this._challenge.set(null);
        this.setSession(session);
      }),
    );
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.backend.requestPasswordReset(email);
  }

  /** Abandons an in-progress login (e.g. "use a different account"). */
  cancelLogin(): void {
    this._challenge.set(null);
  }

  logout(): Observable<void> {
    const session = this._session();
    this._challenge.set(null);
    this.setSession(null);
    return session ? this.backend.logout(session) : of(undefined);
  }

  private setSession(session: AuthSession | null): void {
    this._session.set(session);
    try {
      if (session) this.storage?.setItem(STORAGE_KEY, JSON.stringify(session));
      else this.storage?.removeItem(STORAGE_KEY);
    } catch {
      // Storage can be unavailable (private mode, quota); the in-memory session still works.
    }
  }

  private restore(): AuthSession | null {
    try {
      const raw = this.storage?.getItem(STORAGE_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw) as AuthSession;
      return session.expiresAt > Date.now() ? session : null;
    } catch {
      return null;
    }
  }
}
