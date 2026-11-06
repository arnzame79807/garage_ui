import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { DeraReportingState } from '../../dera-reporting.state';
import { ProjectStepComponent } from './project-step.component';

describe('ProjectStepComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), DeraReportingState],
    });
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(ProjectStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const submit = () => {
      (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };
    return { el, navigate, submit, state: TestBed.inject(DeraReportingState) };
  }

  it('requires a value before continuing', async () => {
    const { el, navigate, submit } = await setup();
    submit();
    expect(navigate).not.toHaveBeenCalled();
    expect(el.textContent).toContain('This field is required.');
  });

  it('saves the step and moves to "vehicles"', async () => {
    const { el, navigate, submit, state } = await setup();
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    submit();

    expect(state.data().project).toEqual({ example: 'hello' });
    expect(state.isStepComplete('project')).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['..', 'vehicles'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
