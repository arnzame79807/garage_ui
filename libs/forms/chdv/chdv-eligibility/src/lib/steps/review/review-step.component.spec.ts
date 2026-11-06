import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChdvEligibilityState } from '../../chdv-eligibility.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), ChdvEligibilityState],
    });
    const state = TestBed.inject(ChdvEligibilityState);
    state.completeStep('applicant', { applicant: { example: 'Applicant' } });
    state.completeStep('vehicles', { vehicles: { example: 'Vehicles' } });
    state.completeStep('scrappage', { scrappage: { example: 'Scrappage' } });

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
