import { computed, signal } from '@angular/core';

/**
 * Signal-backed state for a multi-step form flow. Each generated flow extends
 * this with its own data shape and provides it on the flow's parent route, so
 * every step shares one instance. Route-level providers outlive navigation, so
 * a half-finished flow survives leaving and coming back; call reset() after
 * submitting.
 */
export abstract class FormFlowState<T extends object> {
  private readonly _data = signal<Partial<T>>({});
  private readonly _completed = signal<ReadonlySet<string>>(new Set());

  readonly data = this._data.asReadonly();
  readonly completedSteps = this._completed.asReadonly();

  /** Step keys in order; used to decide whether the flow can be submitted. */
  protected abstract readonly stepKeys: readonly string[];

  readonly isComplete = computed(() => this.stepKeys.every((key) => this._completed().has(key)));

  /** Merge a step's values into the flow and mark the step done. */
  completeStep(stepKey: string, values: Partial<T>): void {
    this._data.update((d) => ({ ...d, ...values }));
    this._completed.update((s) => new Set([...s, stepKey]));
  }

  isStepComplete(stepKey: string): boolean {
    return this._completed().has(stepKey);
  }

  reset(): void {
    this._data.set({});
    this._completed.set(new Set());
  }
}
