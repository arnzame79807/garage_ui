import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { CleanPortsZeroEmissionReportingState } from '../../clean-ports-zero-emission-reporting.state';
import { TechnologyStepComponent } from './technology-step.component';

describe('TechnologyStepComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CleanPortsZeroEmissionReportingState],
    });
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(TechnologyStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const submit = () => {
      (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };
    return { el, navigate, submit, state: TestBed.inject(CleanPortsZeroEmissionReportingState) };
  }

  it('requires a value before continuing', async () => {
    const { el, navigate, submit } = await setup();
    submit();
    expect(navigate).not.toHaveBeenCalled();
    expect(el.textContent).toContain('This field is required.');
  });

  it('saves the step and moves to "emissions"', async () => {
    const { el, navigate, submit, state } = await setup();
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    submit();

    expect(state.data().technology).toEqual({ example: 'hello' });
    expect(state.isStepComplete('technology')).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['..', 'emissions'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
