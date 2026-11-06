import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DeraEligibilityState } from '../../dera-eligibility.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), DeraEligibilityState],
    });
    const state = TestBed.inject(DeraEligibilityState);
    state.completeStep('applicant', { applicant: { example: 'Applicant' } });
    state.completeStep('fleet', { fleet: { example: 'Fleet' } });

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
