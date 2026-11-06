import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CleanPortsClimatePlanningReportingState } from '../../clean-ports-climate-planning-reporting.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CleanPortsClimatePlanningReportingState],
    });
    const state = TestBed.inject(CleanPortsClimatePlanningReportingState);
    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('planningActivities', {
      planningActivities: { example: 'Planning Activities' },
    });

    const fixture = TestBed.createComponent(ReviewStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('example: Project');

    (el.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(el.textContent).toContain('Submitted');
    expect(state.isComplete()).toBe(false);
  });
});
