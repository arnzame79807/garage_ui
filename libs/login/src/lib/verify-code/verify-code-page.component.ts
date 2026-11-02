import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertComponent,
  AuthService,
  ButtonComponent,
  GARAGE_AUTH_CONFIG,
  TextFieldComponent,
} from '@garage/ui-lib';
import { finalize } from 'rxjs';
import { toMessage } from '../login-error';

@Component({
  selector: 'garage-verify-code-page',
  imports: [ReactiveFormsModule, AlertComponent, ButtonComponent, TextFieldComponent],
  templateUrl: './verify-code-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyCodePageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly config = inject(GARAGE_AUTH_CONFIG);

  protected readonly destination = this.auth.challenge()?.destinationHint ?? 'your device';
  protected readonly form = inject(NonNullableFormBuilder).group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  protected readonly messages = { pattern: 'Enter the 6-digit code.' };
  protected readonly submitting = signal(false);
  protected readonly error = signal<string | null>(null);

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error.set(null);
    this.submitting.set(true);
    this.auth
      .verify(this.form.getRawValue().code)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => this.router.navigateByUrl(this.safeReturnUrl()),
        error: (err: unknown) => this.error.set(toMessage(err)),
      });
  }

  protected startOver(): void {
    this.auth.cancelLogin();
    this.router.navigate(['..'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  /** Only follow same-app relative paths to avoid open redirects. */
  private safeReturnUrl(): string {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    return returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//')
      ? returnUrl
      : this.config.postLoginUrl;
  }
}
