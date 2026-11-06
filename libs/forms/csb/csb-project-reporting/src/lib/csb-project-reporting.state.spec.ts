import { CsbProjectReportingState } from './csb-project-reporting.state';

describe('CsbProjectReportingState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new CsbProjectReportingState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('buses', { buses: { example: 'Buses' } });
    state.completeStep('infrastructure', { infrastructure: { example: 'Infrastructure' } });

    expect(state.isComplete()).toBe(true);
  });
});
