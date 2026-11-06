import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { CleanPortsClimatePlanningReportingState } from '../../clean-ports-climate-planning-reporting.state';
import { PlanningActivitiesStepComponent } from './planning-activities-step.component';

describe('PlanningActivitiesStepComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CleanPortsClimatePlanningReportingState],
    });
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(PlanningActivitiesStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const submit = () => {
      (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };
    return { el, navigate, submit, state: TestBed.inject(CleanPortsClimatePlanningReportingState) };
  }

  it('requires a value before continuing', async () => {
    const { el, navigate, submit } = await setup();
    submit();
    expect(navigate).not.toHaveBeenCalled();
    expect(el.textContent).toContain('This field is required.');
  });

  it('saves the step and moves to "review"', async () => {
    const { el, navigate, submit, state } = await setup();
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    submit();

    expect(state.data().planningActivities).toEqual({ example: 'hello' });
    expect(state.isStepComplete('planningActivities')).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['..', 'review'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
