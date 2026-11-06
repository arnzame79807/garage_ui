import { Component, computed, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';

let nextId = 0;

/** Default copy for common validator keys. Override per-field via `messages`. */
export const DEFAULT_ERROR_MESSAGES: Record<string, (e: unknown) => string> = {
  required: () => 'This field is required.',
  email: () => 'Enter a valid email address.',
  minlength: (e) =>
    `Enter at least ${(e as { requiredLength: number }).requiredLength} characters.`,
  maxlength: (e) =>
    `Enter no more than ${(e as { requiredLength: number }).requiredLength} characters.`,
  pattern: () => 'The format is not valid.',
};

/**
 * Labelled text input that plugs into reactive forms and renders its own
 * hint and validation message with correct aria wiring.
 *
 *   <garage-text-field label="Email" type="email" formControlName="email" />
 *
 * Uses default change detection on purpose: validity/touched state lives on
 * the parent FormControl, which doesn't notify OnPush children.
 */
@Component({
  selector: 'garage-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, { self: true, optional: true });

  readonly label = input.required<string>();
  readonly type = input<'text' | 'email' | 'password' | 'tel' | 'number'>('text');
  readonly hint = input<string>();
  readonly autocomplete = input<string>('off');
  readonly inputmode = input<string>();
  readonly messages = input<Record<string, string>>({});

  protected readonly id = `garage-text-field-${nextId++}`;
  protected readonly value = signal('');
  protected readonly disabled = signal(false);
  protected readonly describedBy = computed(() =>
    [this.hint() ? `${this.id}-hint` : null, `${this.id}-error`].filter(Boolean).join(' '),
  );

  private onChange: (value: string) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  protected get invalid(): boolean {
    const c = this.ngControl?.control;
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  protected get errorMessage(): string | null {
    const errors: ValidationErrors | null | undefined = this.ngControl?.control?.errors;
    if (!this.invalid || !errors) return null;
    const [key, detail] = Object.entries(errors)[0];
    return (
      this.messages()[key] ?? DEFAULT_ERROR_MESSAGES[key]?.(detail) ?? 'This value is not valid.'
    );
  }

  protected handleInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value.set(next);
    this.onChange(next);
  }

  writeValue(value: unknown): void {
    this.value.set(value == null ? '' : String(value));
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
