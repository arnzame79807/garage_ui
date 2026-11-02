import { User } from './user.model';

export interface Credentials {
  email: string;
  password: string;
}

/** Second-factor challenge issued after a successful username/password step. */
export interface LoginChallenge {
  challengeId: string;
  type: 'otp';
  /** Masked delivery target, e.g. "d•••@garage.dev". */
  destinationHint: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  /** Epoch milliseconds. */
  expiresAt: number;
}

export type AuthStatus = 'anonymous' | 'challenged' | 'authenticated';

export type AuthErrorCode =
  | 'invalid-credentials'
  | 'invalid-code'
  | 'no-challenge'
  | 'unknown';

export class AuthError extends Error {
  constructor(
    readonly code: AuthErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
