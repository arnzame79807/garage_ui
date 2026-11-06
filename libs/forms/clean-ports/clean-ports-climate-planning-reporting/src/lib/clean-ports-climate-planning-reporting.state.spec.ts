import { CleanPortsClimatePlanningReportingState } from './clean-ports-climate-planning-reporting.state';

describe('CleanPortsClimatePlanningReportingState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new CleanPortsClimatePlanningReportingState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('planningActivities', {
      planningActivities: { example: 'Planning Activities' },
    });

    expect(state.isComplete()).toBe(true);
  });
});
