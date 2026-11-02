import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AuthService, DEMO_CREDENTIALS } from '@garage/ui-lib';
import { provideTestAuth } from '@garage/ui-lib/testing';
import { SignInPageComponent } from './sign-in-page.component';

@Component({ template: 'verify' })
class VerifyStubComponent {}

describe('SignInPageComponent', () => {
  let harness: RouterTestingHarness;
  let el: HTMLElement;

  function fill(label: string, value: string) {
    const field = [...el.querySelectorAll('garage-text-field')].find(
      (f) => f.querySelector('label')?.textContent?.trim() === label,
    );
    const input = field?.querySelector('input') as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  function submit() {
    (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    harness.detectChanges();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideTestAuth(),
        provideRouter([
          { path: 'login', component: SignInPageComponent },
          { path: 'login/verify', component: VerifyStubComponent },
        ]),
      ],
    });
    harness = await RouterTestingHarness.create('/login?returnUrl=%2Fdashboard');
    el = harness.routeNativeElement as HTMLElement;
  });

  it('shows field errors instead of submitting an empty form', () => {
    const startLogin = jest.spyOn(TestBed.inject(AuthService), 'startLogin');
    submit();
    expect(startLogin).not.toHaveBeenCalled();
    expect(el.textContent).toContain('This field is required.');
  });

  it('shows an error for bad credentials', () => {
    fill('Email', 'someone@garage.dev');
    fill('Password', 'wrong');
    submit();
    expect(el.querySelector('garage-alert[role="alert"]')?.textContent).toContain(
      'Email or password is incorrect.',
    );
  });

  it('advances to the verify step and keeps the returnUrl', async () => {
    fill('Email', DEMO_CREDENTIALS.email);
    fill('Password', DEMO_CREDENTIALS.password);
    submit();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/login/verify?returnUrl=%2Fdashboard');
  });
});
