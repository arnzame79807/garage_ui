import { CsbUtilityPartnershipState } from './csb-utility-partnership.state';

describe('CsbUtilityPartnershipState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new CsbUtilityPartnershipState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('applicant', { applicant: { example: 'Applicant' } });
    state.completeStep('utility', { utility: { example: 'Utility' } });
    state.completeStep('commitments', { commitments: { example: 'Commitments' } });

    expect(state.isComplete()).toBe(true);
  });
});
