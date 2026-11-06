import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { CsbUtilityPartnershipState } from '../../csb-utility-partnership.state';
import { CommitmentsStepComponent } from './commitments-step.component';

describe('CommitmentsStepComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CsbUtilityPartnershipState],
    });
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(CommitmentsStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const submit = () => {
      (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };
    return { el, navigate, submit, state: TestBed.inject(CsbUtilityPartnershipState) };
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

    expect(state.data().commitments).toEqual({ example: 'hello' });
    expect(state.isStepComplete('commitments')).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['..', 'review'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
