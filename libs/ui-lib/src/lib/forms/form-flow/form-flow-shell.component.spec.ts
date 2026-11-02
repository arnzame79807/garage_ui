import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { FormFlowStep } from '../../models';
import { FormFlowShellComponent } from './form-flow-shell.component';

const STEPS: FormFlowStep[] = [
  { key: 'one', label: 'First', path: 'one' },
  { key: 'two', label: 'Second', path: 'two' },
  { key: 'three', label: 'Third', path: 'three' },
];

@Component({
  imports: [FormFlowShellComponent],
  template: `<garage-form-flow-shell title="Test flow" [steps]="steps" />`,
})
class FlowHostComponent {
  readonly steps = STEPS;
}

@Component({ template: 'step body' })
class StepComponent {}

describe('FormFlowShellComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'flow',
            component: FlowHostComponent,
            children: STEPS.map((s) => ({ path: s.path, component: StepComponent })),
          },
        ]),
      ],
    });
  });

  it('marks the routed step as current and earlier steps as done', async () => {
    const harness = await RouterTestingHarness.create('/flow/two');
    const el: HTMLElement = harness.routeNativeElement as HTMLElement;
    const items = el.querySelectorAll('li');

    expect(el.querySelector('.progress')?.textContent).toContain('Step 2 of 3');
    expect(items[1].getAttribute('aria-current')).toBe('step');
    expect(items[0].classList).toContain('step--done');
    expect(items[0].querySelector('a')).not.toBeNull();
    expect(items[2].querySelector('a')).toBeNull();
  });
});
