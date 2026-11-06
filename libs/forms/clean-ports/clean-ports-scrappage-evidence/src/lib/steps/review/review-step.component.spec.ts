import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CleanPortsScrappageEvidenceState } from '../../clean-ports-scrappage-evidence.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CleanPortsScrappageEvidenceState],
    });
    const state = TestBed.inject(CleanPortsScrappageEvidenceState);
    state.completeStep('equipment', { equipment: { example: 'Equipment' } });
    state.completeStep('scrappageEvidence', {
      scrappageEvidence: { example: 'Scrappage Evidence' },
    });

    const fixture = TestBed.createComponent(ReviewStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('example: Equipment');

    (el.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(el.textContent).toContain('Submitted');
    expect(state.isComplete()).toBe(false);
  });
});
