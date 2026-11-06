import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChdvProjectReportingState } from '../../chdv-project-reporting.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), ChdvProjectReportingState],
    });
    const state = TestBed.inject(ChdvProjectReportingState);
    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('vehicles', { vehicles: { example: 'Vehicles' } });
    state.completeStep('infrastructure', { infrastructure: { example: 'Infrastructure' } });

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
