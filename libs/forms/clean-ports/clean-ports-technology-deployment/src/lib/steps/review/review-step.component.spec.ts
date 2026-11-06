import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CleanPortsTechnologyDeploymentState } from '../../clean-ports-technology-deployment.state';
import { ReviewStepComponent } from './review-step.component';

describe('ReviewStepComponent', () => {
  it('submits a complete flow and resets the state', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), CleanPortsTechnologyDeploymentState],
    });
    const state = TestBed.inject(CleanPortsTechnologyDeploymentState);
    state.completeStep('project', { project: { example: 'Project' } });
    state.completeStep('technology', { technology: { example: 'Technology' } });
    state.completeStep('deploymentEvidence', {
      deploymentEvidence: { example: 'Deployment Evidence' },
    });

    const fixture = TestBed.createComponent(ReviewStepComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('example: Project');

    (el.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(el.textContent).toContain('Submitted');
    expect(state.isComplete()).toBe(false);
  });
});
