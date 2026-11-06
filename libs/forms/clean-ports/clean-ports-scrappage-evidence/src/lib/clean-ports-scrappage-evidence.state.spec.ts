import { CleanPortsScrappageEvidenceState } from './clean-ports-scrappage-evidence.state';

describe('CleanPortsScrappageEvidenceState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new CleanPortsScrappageEvidenceState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('equipment', { equipment: { example: 'Equipment' } });
    state.completeStep('scrappageEvidence', {
      scrappageEvidence: { example: 'Scrappage Evidence' },
    });

    expect(state.isComplete()).toBe(true);
  });
});
