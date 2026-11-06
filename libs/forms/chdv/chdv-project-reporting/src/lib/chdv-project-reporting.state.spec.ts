import { ChdvProjectReportingState } from './chdv-project-reporting.state';

describe('ChdvProjectReportingState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new ChdvProjectReportingState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('vehicles', { vehicles: { example: 'Vehicles' } });
    state.completeStep('infrastructure', { infrastructure: { example: 'Infrastructure' } });

    expect(state.isComplete()).toBe(true);
  });
});
