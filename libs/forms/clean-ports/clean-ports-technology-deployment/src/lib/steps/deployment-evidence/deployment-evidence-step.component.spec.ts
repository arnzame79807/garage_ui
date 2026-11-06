import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { CleanPortsTechnologyDeploymentState } from '../../clean-ports-technology-deployment.state';
import { DeploymentEvidenceStepComponent } from './deployment-evidence-step.component';

describe('DeploymentEvidenceStepComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CleanPortsTechnologyDeploymentState],
    });
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(DeploymentEvidenceStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const submit = () => {
      (el.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
      fixture.detectChanges();
    };
    return { el, navigate, submit, state: TestBed.inject(CleanPortsTechnologyDeploymentState) };
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

    expect(state.data().deploymentEvidence).toEqual({ example: 'hello' });
    expect(state.isStepComplete('deploymentEvidence')).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['..', 'review'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });
});
