import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { ChdvProjectReportingState } from '../../chdv-project-reporting.state';
import { VehiclesStepComponent } from './vehicles-step.component';

describe('VehiclesStepComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), ChdvProjectReportingState],
    });
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(VehiclesStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const submit = () => {
      (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };
    return { el, navigate, submit, state: TestBed.inject(ChdvProjectReportingState) };
  }

  it('requires a value before continuing', async () => {
    const { el, navigate, submit } = await setup();
    submit();
    expect(navigate).not.toHaveBeenCalled();
    expect(el.textContent).toContain('This field is required.');
  });

  it('saves the step and moves to "infrastructure"', async () => {
    const { el, navigate, submit, state } = await setup();
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    submit();

    expect(state.data().vehicles).toEqual({ example: 'hello' });
    expect(state.isStepComplete('vehicles')).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['..', 'infrastructure'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
