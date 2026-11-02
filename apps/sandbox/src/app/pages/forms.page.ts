import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent, ButtonComponent, TextFieldComponent } from '@garage/ui-lib';

@Component({
  selector: 'garage-forms-page',
  imports: [ReactiveFormsModule, JsonPipe, AlertComponent, ButtonComponent, TextFieldComponent],
  template: `
    <h1>Form fields</h1>
    <p>
      <code>garage-text-field</code> is a ControlValueAccessor: it owns its label, hint, error
      message and aria wiring. Errors appear once a field is touched.
    </p>
    <form class="guide-section" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <garage-text-field label="Full name" formControlName="name" autocomplete="name" />
      <garage-text-field
        label="Email"
        type="email"
        hint="We'll only use this for account notices."
        formControlName="email"
      />
      <garage-text-field
        label="VIN"
        hint="17 characters, no I, O or Q."
        formControlName="vin"
        [messages]="{ pattern: 'Enter a valid 17-character VIN.' }"
      />
      <garage-text-field label="Disabled" formControlName="disabled" />
      <div class="guide-row">
        <button garageButton type="submit">Validate</button>
        <button garageButton type="button" variant="secondary" (click)="reset()">Reset</button>
      </div>
    </form>
    @if (submitted(); as value) {
      <garage-alert tone="success">Valid! <code>{{ value | json }}</code></garage-alert>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPage {
  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    vin: ['', [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/i)]],
    disabled: [{ value: 'Read only value', disabled: true }],
  });
  protected readonly submitted = signal<object | null>(null);

  protected submit(): void {
    this.form.markAllAsTouched();
    this.submitted.set(this.form.valid ? this.form.getRawValue() : null);
  }

  protected reset(): void {
    this.form.reset();
    this.submitted.set(null);
  }
}
