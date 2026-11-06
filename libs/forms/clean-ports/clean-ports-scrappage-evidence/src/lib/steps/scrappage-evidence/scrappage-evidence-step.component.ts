import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonComponent, TextFieldComponent } from '@garage/ui-lib';
import { CleanPortsScrappageEvidenceState } from '../../clean-ports-scrappage-evidence.state';

@Component({
  selector: 'garage-clean-ports-scrappage-evidence-scrappage-evidence-step',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, TextFieldComponent],
  template: `
    <h2>Scrappage Evidence</h2>
    <form class="garage-stack" [formGroup]="form" (ngSubmit)="next()" novalidate>
      <!-- TODO: replace the example field with this step's real fields -->
      <garage-text-field label="Example" formControlName="example" />
      <div class="actions">
        <a garageButton variant="secondary" [routerLink]="['..', 'equipment']">Back</a>
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
export class ScrappageEvidenceStepComponent {
  private readonly state = inject(CleanPortsScrappageEvidenceState);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = inject(NonNullableFormBuilder).group({
    example: [this.state.data().scrappageEvidence?.example ?? '', Validators.required],
  });

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.state.completeStep('scrappageEvidence', { scrappageEvidence: this.form.getRawValue() });
    this.router.navigate(['..', 'review'], { relativeTo: this.route });
  }
}
