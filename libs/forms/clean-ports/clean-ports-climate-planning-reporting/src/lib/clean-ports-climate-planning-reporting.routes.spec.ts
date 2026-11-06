import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { cleanPortsClimatePlanningReportingRoutes } from './clean-ports-climate-planning-reporting.routes';

describe('cleanPortsClimatePlanningReportingRoutes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'flow', children: cleanPortsClimatePlanningReportingRoutes }]),
      ],
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
