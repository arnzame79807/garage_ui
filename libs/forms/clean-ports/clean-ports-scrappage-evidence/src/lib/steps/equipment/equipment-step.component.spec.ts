import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { CleanPortsScrappageEvidenceState } from '../../clean-ports-scrappage-evidence.state';
import { EquipmentStepComponent } from './equipment-step.component';

describe('EquipmentStepComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CleanPortsScrappageEvidenceState],
    });
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(EquipmentStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const submit = () => {
      (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };
    return { el, navigate, submit, state: TestBed.inject(CleanPortsScrappageEvidenceState) };
  }

  it('requires a value before continuing', async () => {
    const { el, navigate, submit } = await setup();
    submit();
    expect(navigate).not.toHaveBeenCalled();
    expect(el.textContent).toContain('This field is required.');
  });

  it('saves the step and moves to "scrappage-evidence"', async () => {
    const { el, navigate, submit, state } = await setup();
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    submit();

    expect(state.data().equipment).toEqual({ example: 'hello' });
    expect(state.isStepComplete('equipment')).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['..', 'scrappage-evidence'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
