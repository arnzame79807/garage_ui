import { DeraReportingState } from './dera-reporting.state';

describe('DeraReportingState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new DeraReportingState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('vehicles', { vehicles: { example: 'Vehicles' } });
    state.completeStep('costs', { costs: { example: 'Costs' } });

    expect(state.isComplete()).toBe(true);
  });
});
