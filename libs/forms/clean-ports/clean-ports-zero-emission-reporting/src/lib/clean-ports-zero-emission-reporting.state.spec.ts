import { CleanPortsZeroEmissionReportingState } from './clean-ports-zero-emission-reporting.state';

describe('CleanPortsZeroEmissionReportingState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new CleanPortsZeroEmissionReportingState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('technology', { technology: { example: 'Technology' } });
    state.completeStep('emissions', { emissions: { example: 'Emissions' } });

    expect(state.isComplete()).toBe(true);
  });
});
