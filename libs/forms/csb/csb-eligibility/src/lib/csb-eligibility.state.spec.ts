import { CsbEligibilityState } from './csb-eligibility.state';

describe('CsbEligibilityState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new CsbEligibilityState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('applicant', { applicant: { example: 'Applicant' } });
    state.completeStep('buses', { buses: { example: 'Buses' } });
    state.completeStep('disposition', { disposition: { example: 'Disposition' } });

    expect(state.isComplete()).toBe(true);
  });
});
