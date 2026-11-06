import { DeraScrappageState } from './dera-scrappage.state';

describe('DeraScrappageState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new DeraScrappageState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('vehicles', { vehicles: { example: 'Vehicles' } });
    state.completeStep('scrappageEvidence', {
      scrappageEvidence: { example: 'Scrappage Evidence' },
    });

    expect(state.isComplete()).toBe(true);
  });
});
