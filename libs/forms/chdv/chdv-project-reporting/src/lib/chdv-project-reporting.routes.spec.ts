import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { chdvProjectReportingRoutes } from './chdv-project-reporting.routes';

describe('chdvProjectReportingRoutes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'flow', children: chdvProjectReportingRoutes }])],
    });
  });

  it('starts on the first step', async () => {
    await RouterTestingHarness.create('/flow');
    expect(TestBed.inject(Router).url).toBe('/flow/project');
  });

  it('does not allow skipping straight to review', async () => {
    await RouterTestingHarness.create('/flow/review');
    expect(TestBed.inject(Router).url).toBe('/flow/project');
  });
});
