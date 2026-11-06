import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonComponent, TextFieldComponent } from '@garage/ui-lib';
import { CsbUtilityPartnershipState } from '../../csb-utility-partnership.state';

@Component({
  selector: 'garage-csb-utility-partnership-utility-step',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, TextFieldComponent],
  template: `
    <h2>Utility</h2>
    <form class="garage-stack" [formGroup]="form" (ngSubmit)="next()" novalidate>
      <!-- TODO: replace the example field with this step's real fields -->
      <garage-text-field label="Example" formControlName="example" />
      <div class="actions">
        <a garageButton variant="secondary" [routerLink]="['..', 'applicant']">Back</a>
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
export class UtilityStepComponent {
  private readonly state = inject(CsbUtilityPartnershipState);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = inject(NonNullableFormBuilder).group({
    example: [this.state.data().utility?.example ?? '', Validators.required],
  });

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.state.completeStep('utility', { utility: this.form.getRawValue() });
    this.router.navigate(['..', 'commitments'], { relativeTo: this.route });
  }
}
