import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AuthService, DEMO_CREDENTIALS, DEMO_OTP } from '@garage/ui-lib';
import { provideTestAuth } from '@garage/ui-lib/testing';
import { firstValueFrom } from 'rxjs';
import { VerifyCodePageComponent } from './verify-code-page.component';

@Component({ template: 'stub' })
class StubComponent {}

describe('VerifyCodePageComponent', () => {
  let harness: RouterTestingHarness;
  let el: HTMLElement;

  async function setup(url: string) {
    TestBed.configureTestingModule({
      providers: [
        provideTestAuth(),
        provideRouter([
          { path: 'login', component: StubComponent },
          { path: 'login/verify', component: VerifyCodePageComponent },
          { path: 'dashboard', component: StubComponent },
          { path: 'reports', component: StubComponent },
        ]),
      ],
    });
    await firstValueFrom(TestBed.inject(AuthService).startLogin(DEMO_CREDENTIALS));
    harness = await RouterTestingHarness.create(url);
    el = harness.routeNativeElement as HTMLElement;
  }

  async function enter(code: string) {
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = code;
    input.dispatchEvent(new Event('input'));
    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    harness.detectChanges();
    await harness.fixture.whenStable();
  }

  it('rejects a wrong code', async () => {
    await setup('/login/verify');
    await enter('000000');
    expect(el.textContent).toContain('That code is not valid.');
    expect(TestBed.inject(AuthService).isAuthenticated()).toBe(false);
  });

  it('signs in and lands on the dashboard by default', async () => {
    await setup('/login/verify');
    await enter(DEMO_OTP);
    expect(TestBed.inject(AuthService).isAuthenticated()).toBe(true);
    expect(TestBed.inject(Router).url).toBe('/dashboard');
  });

  it('honours a same-app returnUrl', async () => {
    await setup('/login/verify?returnUrl=%2Freports');
    await enter(DEMO_OTP);
    expect(TestBed.inject(Router).url).toBe('/reports');
  });

  it('ignores an off-site returnUrl', async () => {
    await setup('/login/verify?returnUrl=%2F%2Fevil.example');
    await enter(DEMO_OTP);
    expect(TestBed.inject(Router).url).toBe('/dashboard');
  });
});
