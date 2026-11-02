import { Observable } from 'rxjs';
import { AuthSession, Credentials, LoginChallenge } from '../models';

/**
 * Transport-agnostic contract the AuthService talks to. Swap the default
 * MockAuthBackend for a real implementation (OIDC, Login.gov, an API gateway)
 * via `provideGarageAuth({ backend: MyBackend })`.
 */
export abstract class AuthBackend {
  abstract startLogin(credentials: Credentials): Observable<LoginChallenge>;
  abstract verifyChallenge(challengeId: string, code: string): Observable<AuthSession>;
  abstract requestPasswordReset(email: string): Observable<void>;
  abstract logout(session: AuthSession): Observable<void>;
}
