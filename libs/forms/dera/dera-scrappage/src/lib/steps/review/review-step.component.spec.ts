import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DeraScrappageState } from '../../dera-scrappage.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), DeraScrappageState],
    });
    const state = TestBed.inject(DeraScrappageState);
    state.completeStep('vehicles', { vehicles: { example: 'Vehicles' } });
    state.completeStep('scrappageEvidence', {
      scrappageEvidence: { example: 'Scrappage Evidence' },
    });

    const fixture = TestBed.createComponent(ReviewStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('example: Vehicles');

    (el.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(el.textContent).toContain('Submitted');
    expect(state.isComplete()).toBe(false);
  });
});
