import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertComponent, AuthService, ButtonComponent, TextFieldComponent } from '@garage/ui-lib';

@Component({
  selector: 'garage-forgot-password-page',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, ButtonComponent, TextFieldComponent],
  template: `
    <h1>Reset your password</h1>
    @if (sent()) {
      <garage-alert tone="success">
        If an account exists for {{ form.getRawValue().email }}, you'll receive reset instructions shortly.
      </garage-alert>
    } @else {
      <form class="garage-stack" [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <garage-text-field label="Email" type="email" autocomplete="username" formControlName="email" />
        <button garageButton type="submit" [block]="true">Send reset link</button>
      </form>
    }
    <p><a routerLink="..">Back to sign in</a></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPageComponent {
  private readonly auth = inject(AuthService);

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
  });
  protected readonly sent = signal(false);

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Always show the same confirmation so the page can't be used to probe accounts.
    this.auth.requestPasswordReset(this.form.getRawValue().email).subscribe({
      complete: () => this.sent.set(true),
      error: () => this.sent.set(true),
    });
  }
}
