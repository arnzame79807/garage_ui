import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertComponent, ButtonComponent } from '@garage/ui-lib';
import { finalize } from 'rxjs';
import { CsbUtilityPartnershipData } from '../../csb-utility-partnership.model';
import { CsbUtilityPartnershipState } from '../../csb-utility-partnership.state';
import { CSB_UTILITY_PARTNERSHIP_STEPS } from '../../csb-utility-partnership.steps';

@Component({
  selector: 'garage-csb-utility-partnership-review-step',
  imports: [RouterLink, AlertComponent, ButtonComponent],
  template: `
    <h2>Review</h2>
    @if (submitted()) {
      <garage-alert tone="success">Submitted. Thank you!</garage-alert>
    } @else {
      <dl class="summary">
        @for (step of steps; track step.key) {
          <div class="row">
            <dt>{{ step.label }}</dt>
            <dd>
              @for (entry of valuesFor(step.key); track entry[0]) {
                <span>{{ entry[0] }}: {{ entry[1] }}</span>
              }
              <a [routerLink]="['..', step.path]">Edit</a>
            </dd>
          </div>
        }
      </dl>
      <div class="actions">
        <button garageButton type="button" [disabled]="submitting()" (click)="submit()">
          {{ submitting() ? 'Submitting…' : 'Submit' }}
        </button>
      </div>
    }
  `,
  styles: `
    .summary {
      display: grid;
      gap: var(--garage-space-3);
    }
    .row {
      display: grid;
      grid-template-columns: 10rem 1fr;
      gap: var(--garage-space-4);
    }
    dt {
      font-weight: 600;
    }
    dd {
      display: flex;
      flex-wrap: wrap;
      gap: var(--garage-space-3);
      margin: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewStepComponent {
  private readonly state = inject(CsbUtilityPartnershipState);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly steps = CSB_UTILITY_PARTNERSHIP_STEPS.filter((s) => s.key !== 'review');
  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);

  protected valuesFor(key: string): [string, unknown][] {
    const value = this.state.data()[key as keyof CsbUtilityPartnershipData];
    return value ? Object.entries(value) : [];
  }

  protected submit(): void {
    if (!this.state.isComplete()) {
      this.router.navigate(['..'], { relativeTo: this.route });
      return;
    }
    this.submitting.set(true);
    this.state
      .submit()
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe(() => {
        this.state.reset();
        this.submitted.set(true);
      });
  }
}
