import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent, TextFieldComponent } from '@garage/ui-lib';
import { CsbEligibilityState } from '../../csb-eligibility.state';

@Component({
  selector: 'garage-csb-eligibility-applicant-step',
  imports: [ReactiveFormsModule, ButtonComponent, TextFieldComponent],
  template: `
    <h2>Applicant</h2>
    <form class="garage-stack" [formGroup]="form" (ngSubmit)="next()" novalidate>
      <!-- TODO: replace the example field with this step's real fields -->
      <garage-text-field label="Example" formControlName="example" />
      <div class="actions">
        <button garageButton type="submit">Continue</button>
      </div>
    </form>
  `,
  styles: `
    .actions {
      display: flex;
      gap: var(--garage-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantStepComponent {
  private readonly state = inject(CsbEligibilityState);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = inject(NonNullableFormBuilder).group({
    example: [this.state.data().applicant?.example ?? '', Validators.required],
  });

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.state.completeStep('applicant', { applicant: this.form.getRawValue() });
    this.router.navigate(['..', 'buses'], { relativeTo: this.route });
  }
}
