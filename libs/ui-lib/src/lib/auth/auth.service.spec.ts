import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { InMemoryStorage } from '../../testing/in-memory-storage';
import { AUTH_STORAGE } from './auth.config';
import { AuthService } from './auth.service';
import { AuthBackend } from './auth-backend';
import { DEMO_CREDENTIALS, DEMO_OTP, MockAuthBackend } from './mock-auth-backend';

describe('AuthService', () => {
  let storage: InMemoryStorage;

  function createService(): AuthService {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthBackend, useClass: MockAuthBackend },
        { provide: AUTH_STORAGE, useValue: storage },
      ],
    });
    return TestBed.inject(AuthService);
  }

  beforeEach(() => {
    storage = new InMemoryStorage();
  });

  it('starts anonymous', () => {
    const auth = createService();
    expect(auth.status()).toBe('anonymous');
    expect(auth.user()).toBeNull();
  });

  it('completes the two-step login flow', async () => {
    const auth = createService();

    const challenge = await firstValueFrom(auth.startLogin(DEMO_CREDENTIALS));
    expect(challenge.type).toBe('otp');
    expect(auth.status()).toBe('challenged');

    await firstValueFrom(auth.verify(DEMO_OTP));
    expect(auth.status()).toBe('authenticated');
    expect(auth.user()?.email).toBe(DEMO_CREDENTIALS.email);
    expect(storage.getItem('garage.session')).not.toBeNull();
  });

  it('rejects bad credentials with a typed error', async () => {
    const auth = createService();
    await expect(
      firstValueFrom(auth.startLogin({ email: 'x@y.z', password: 'nope' })),
    ).rejects.toMatchObject({ code: 'invalid-credentials' });
    expect(auth.status()).toBe('anonymous');
  });

  it('refuses to verify without a challenge', async () => {
    const auth = createService();
    await expect(firstValueFrom(auth.verify(DEMO_OTP))).rejects.toMatchObject({
      code: 'no-challenge',
    });
  });

  it('restores an unexpired session from storage', () => {
    storage.setItem(
      'garage.session',
      JSON.stringify({
        user: { id: '1', email: 'a@b.co', displayName: 'A', roles: [] },
        accessToken: 't',
        expiresAt: Date.now() + 10_000,
      }),
    );
    expect(createService().isAuthenticated()).toBe(true);
  });

  it('ignores an expired session', () => {
    storage.setItem(
      'garage.session',
      JSON.stringify({ user: {}, accessToken: 't', expiresAt: Date.now() - 1 }),
    );
    expect(createService().isAuthenticated()).toBe(false);
  });

  it('clears the session on logout', async () => {
    const auth = createService();
    await firstValueFrom(auth.startLogin(DEMO_CREDENTIALS));
    await firstValueFrom(auth.verify(DEMO_OTP));

    await firstValueFrom(auth.logout());
    expect(auth.isAuthenticated()).toBe(false);
    expect(storage.getItem('garage.session')).toBeNull();
  });
});
