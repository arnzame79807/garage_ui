import { CleanPortsScrappageEligibilityState } from './clean-ports-scrappage-eligibility.state';

describe('CleanPortsScrappageEligibilityState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new CleanPortsScrappageEligibilityState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('applicant', { applicant: { example: 'Applicant' } });
    state.completeStep('equipment', { equipment: { example: 'Equipment' } });

    expect(state.isComplete()).toBe(true);
  });
});
