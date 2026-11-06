import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { GRANT_PROGRAMS } from '@garage/ui-lib';
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

  it.each(GRANT_PROGRAMS.map((p) => p.path))('protects the %s program', async (path) => {
    setup(false);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(path);
    expect(TestBed.inject(Router).url).toBe(`/login?returnUrl=${encodeURIComponent(path)}`);
  });

  it.each(GRANT_PROGRAMS)('loads the $shortName program for signed-in users', async (program) => {
    setup(true);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(program.path);
    expect(TestBed.inject(Router).url).toBe(program.path);
    expect((harness.routeNativeElement as HTMLElement).querySelector('h1')?.textContent).toBe(
      program.name,
    );
  });

  it('routes every EPA form in the program catalogs to its form flow', async () => {
    // Dynamic imports: the program libraries are lazy-loaded, so static imports are forbidden
    // by @nx/enforce-module-boundaries (even in specs).
    const forms = (
      await Promise.all([
        import('@garage/chdv').then((m) => m.CHDV_FORMS),
        import('@garage/clean-ports').then((m) => m.CLEAN_PORTS_FORMS),
        import('@garage/dera').then((m) => m.DERA_FORMS),
        import('@garage/csb').then((m) => m.CSB_FORMS),
      ])
    ).flat();
    expect(forms.length).toBe(14);

    setup(true);
    const harness = await RouterTestingHarness.create();
    for (const form of forms) {
      await harness.navigateByUrl(form.route ?? '/missing');
      // The redirect to a first step lives inside the flow library, so landing on
      // one proves the lazy route resolved to the right flow (not the program page).
      expect(TestBed.inject(Router).url).toMatch(new RegExp(`^${form.route}/[a-z-]+$`));
      expect(harness.routeNativeElement?.querySelector('garage-form-flow-shell')).not.toBeNull();
    }
  });

  it('redirects unknown paths home', async () => {
    setup(false);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/nope');
    expect(TestBed.inject(Router).url).toBe('/');
  });
});
