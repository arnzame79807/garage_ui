import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  AlertComponent,
  AuthBackend,
  AuthService,
  ButtonComponent,
  DEMO_CREDENTIALS,
  DEMO_OTP,
  MockAuthBackend,
  TextFieldComponent,
} from '@garage/ui-lib';
import { finalize } from 'rxjs';
import { toMessage } from '../login-error';

@Component({
  selector: 'garage-sign-in-page',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent, ButtonComponent, TextFieldComponent],
  templateUrl: './sign-in-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  protected readonly submitting = signal(false);
  protected readonly error = signal<string | null>(null);

  /** Only shown while the in-memory mock backend is wired up. */
  protected readonly demo =
    inject(AuthBackend) instanceof MockAuthBackend ? { ...DEMO_CREDENTIALS, otp: DEMO_OTP } : null;

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error.set(null);
    this.submitting.set(true);
    this.auth
      .startLogin(this.form.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () =>
          this.router.navigate(['verify'], {
            relativeTo: this.route,
            queryParamsHandling: 'preserve',
          }),
        error: (err: unknown) => this.error.set(toMessage(err)),
      });
  }
}
