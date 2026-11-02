import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideTestAuth } from '../../testing/provide-test-auth';
import { authGuard, guestGuard } from './auth.guards';

@Component({ template: '' })
class BlankComponent {}

function configure(signedIn: boolean) {
  TestBed.configureTestingModule({
    providers: [
      provideTestAuth({ signedIn }),
      provideRouter([
        { path: 'login', component: BlankComponent, canActivate: [guestGuard] },
        { path: 'dashboard', component: BlankComponent, canActivate: [authGuard] },
      ]),
    ],
  });
}

describe('auth guards', () => {
  it('authGuard redirects anonymous users to login with a returnUrl', async () => {
    configure(false);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/dashboard');
    expect(TestBed.inject(Router).url).toBe('/login?returnUrl=%2Fdashboard');
  });

  it('authGuard admits signed-in users', async () => {
    configure(true);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/dashboard');
    expect(TestBed.inject(Router).url).toBe('/dashboard');
  });

  it('guestGuard sends signed-in users to the post-login page', async () => {
    configure(true);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/login');
    expect(TestBed.inject(Router).url).toBe('/dashboard');
  });
});
