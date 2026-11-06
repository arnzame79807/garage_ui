import { ChdvEligibilityState } from './chdv-eligibility.state';

describe('ChdvEligibilityState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new ChdvEligibilityState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('applicant', { applicant: { example: 'Applicant' } });
    state.completeStep('vehicles', { vehicles: { example: 'Vehicles' } });
    state.completeStep('scrappage', { scrappage: { example: 'Scrappage' } });

    expect(state.isComplete()).toBe(true);
  });
});
