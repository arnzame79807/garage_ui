import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CsbEligibilityState } from '../../csb-eligibility.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CsbEligibilityState],
    });
    const state = TestBed.inject(CsbEligibilityState);
    state.completeStep('applicant', { applicant: { example: 'Applicant' } });
    state.completeStep('buses', { buses: { example: 'Buses' } });
    state.completeStep('disposition', { disposition: { example: 'Disposition' } });

    const fixture = TestBed.createComponent(ReviewStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('example: Applicant');

    (el.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(el.textContent).toContain('Submitted');
    expect(state.isComplete()).toBe(false);
  });
});
