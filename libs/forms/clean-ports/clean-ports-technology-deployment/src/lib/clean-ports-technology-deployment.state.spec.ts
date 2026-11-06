import { CleanPortsTechnologyDeploymentState } from './clean-ports-technology-deployment.state';

describe('CleanPortsTechnologyDeploymentState', () => {
  it('is complete once every data-entry step is complete', () => {
    const state = new CleanPortsTechnologyDeploymentState();
    expect(state.isComplete()).toBe(false);

    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('technology', { technology: { example: 'Technology' } });
    state.completeStep('deploymentEvidence', {
      deploymentEvidence: { example: 'Deployment Evidence' },
    });

    expect(state.isComplete()).toBe(true);
  });
});
