import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { ChdvUtilityPartnershipState } from '../../chdv-utility-partnership.state';
import { UtilityStepComponent } from './utility-step.component';

describe('UtilityStepComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), ChdvUtilityPartnershipState],
    });
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(UtilityStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const submit = () => {
      (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };
    return { el, navigate, submit, state: TestBed.inject(ChdvUtilityPartnershipState) };
  }

  it('requires a value before continuing', async () => {
    const { el, navigate, submit } = await setup();
    submit();
    expect(navigate).not.toHaveBeenCalled();
    expect(el.textContent).toContain('This field is required.');
  });

  it('saves the step and moves to "commitments"', async () => {
    const { el, navigate, submit, state } = await setup();
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    submit();

    expect(state.data().utility).toEqual({ example: 'hello' });
    expect(state.isStepComplete('utility')).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['..', 'commitments'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
