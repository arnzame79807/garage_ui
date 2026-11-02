import { FormFlowState } from './form-flow-state';

interface Data {
  name: string;
  vin: string;
}

class TestFlowState extends FormFlowState<Data> {
  protected readonly stepKeys = ['owner', 'vehicle'] as const;
}

describe('FormFlowState', () => {
  it('merges step values and tracks completion', () => {
    const state = new TestFlowState();
    state.completeStep('owner', { name: 'Ada' });

    expect(state.data()).toEqual({ name: 'Ada' });
    expect(state.isStepComplete('owner')).toBe(true);
    expect(state.isComplete()).toBe(false);

    state.completeStep('vehicle', { vin: '1HGCM' });
    expect(state.isComplete()).toBe(true);
  });

  it('resets', () => {
    const state = new TestFlowState();
    state.completeStep('owner', { name: 'Ada' });
    state.reset();
    expect(state.data()).toEqual({});
    expect(state.completedSteps().size).toBe(0);
  });
});
