import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CsbProjectReportingState } from '../../csb-project-reporting.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CsbProjectReportingState],
    });
    const state = TestBed.inject(CsbProjectReportingState);
    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('buses', { buses: { example: 'Buses' } });
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
