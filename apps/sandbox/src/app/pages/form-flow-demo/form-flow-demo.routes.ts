import { ChangeDetectionStrategy, Component, Injectable, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import {
  AlertComponent,
  ButtonComponent,
  FormFlowShellComponent,
  FormFlowState,
  FormFlowStep,
  TextFieldComponent,
} from '@garage/ui-lib';

/**
 * A compact, hand-written version of what `nx g @garage/plugin:form-flow`
 * generates, so the flow primitives can be exercised in isolation.
 */

interface DemoData {
  owner: { name: string };
  vehicle: { vin: string };
}

const STEPS: FormFlowStep[] = [
  { key: 'owner', label: 'Owner', path: 'owner' },
  { key: 'vehicle', label: 'Vehicle', path: 'vehicle' },
  { key: 'review', label: 'Review', path: 'review' },
];

@Injectable()
class DemoFlowState extends FormFlowState<DemoData> {
  protected readonly stepKeys = ['owner', 'vehicle'];
}

@Component({
  selector: 'garage-demo-flow',
  imports: [FormFlowShellComponent],
  template: `<garage-form-flow-shell title="Vehicle registration (demo)" [steps]="steps" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DemoFlowComponent {
  protected readonly steps = STEPS;
}

@Component({
  selector: 'garage-demo-owner-step',
  imports: [ReactiveFormsModule, ButtonComponent, TextFieldComponent],
  template: `
    <form class="garage-stack" [formGroup]="form" (ngSubmit)="next()" novalidate>
      <garage-text-field label="Owner name" formControlName="name" />
      <div><button garageButton type="submit">Continue</button></div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OwnerStepComponent {
  private readonly state = inject(DemoFlowState);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly form = inject(NonNullableFormBuilder).group({
    name: [this.state.data().owner?.name ?? '', Validators.required],
  });

  protected next(): void {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.state.completeStep('owner', { owner: this.form.getRawValue() });
    this.router.navigate(['..', 'vehicle'], { relativeTo: this.route });
  }
}

@Component({
  selector: 'garage-demo-vehicle-step',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, TextFieldComponent],
  template: `
    <form class="garage-stack" [formGroup]="form" (ngSubmit)="next()" novalidate>
      <garage-text-field
        label="VIN"
        formControlName="vin"
        [messages]="{ pattern: 'Enter a valid 17-character VIN.' }"
      />
      <div class="guide-row">
        <a garageButton variant="secondary" [routerLink]="['..', 'owner']">Back</a>
        <button garageButton type="submit">Continue</button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class VehicleStepComponent {
  private readonly state = inject(DemoFlowState);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly form = inject(NonNullableFormBuilder).group({
    vin: [
      this.state.data().vehicle?.vin ?? '',
      [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/i)],
    ],
  });

  protected next(): void {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.state.completeStep('vehicle', { vehicle: this.form.getRawValue() });
    this.router.navigate(['..', 'review'], { relativeTo: this.route });
  }
}

@Component({
  selector: 'garage-demo-review-step',
  imports: [RouterLink, AlertComponent, ButtonComponent],
  template: `
    @if (state.isComplete()) {
      <garage-alert tone="success">
        {{ state.data().owner?.name }} · {{ state.data().vehicle?.vin }}
      </garage-alert>
      <p><button garageButton variant="secondary" (click)="restart()">Start over</button></p>
    } @else {
      <garage-alert tone="warning">Finish the earlier steps first.</garage-alert>
      <a [routerLink]="['..', 'owner']">Go to the first step</a>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReviewStepComponent {
  protected readonly state = inject(DemoFlowState);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected restart(): void {
    this.state.reset();
    this.router.navigate(['..', 'owner'], { relativeTo: this.route });
  }
}

export const formFlowDemoRoutes: Route[] = [
  {
    path: '',
    component: DemoFlowComponent,
    providers: [DemoFlowState],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'owner' },
      { path: 'owner', component: OwnerStepComponent },
      { path: 'vehicle', component: VehicleStepComponent },
      { path: 'review', component: ReviewStepComponent },
    ],
  },
];
