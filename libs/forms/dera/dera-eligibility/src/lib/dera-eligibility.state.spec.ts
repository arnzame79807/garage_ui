import { DeraEligibilityState } from './dera-eligibility.state';

describe('DeraEligibilityState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new DeraEligibilityState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('applicant', { applicant: { example: 'Applicant' } });
    state.completeStep('fleet', { fleet: { example: 'Fleet' } });

    expect(state.isComplete()).toBe(true);
  });
});
