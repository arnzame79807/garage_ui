import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideTestAuth } from '@garage/ui-lib/testing';
import { appRoutes } from './app.routes';

describe('appRoutes', () => {
  function setup(signedIn: boolean) {
    TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes), provideTestAuth({ signedIn })],
    });
  }

  it('protects the dashboard', async () => {
    setup(false);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/dashboard');
    expect(TestBed.inject(Router).url).toBe('/login?returnUrl=%2Fdashboard');
  });

  it('lets signed-in users reach the dashboard', async () => {
    setup(true);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/dashboard');
    expect(TestBed.inject(Router).url).toBe('/dashboard');
  });

  it('redirects unknown paths home', async () => {
    setup(false);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/nope');
    expect(TestBed.inject(Router).url).toBe('/');
  });
});
