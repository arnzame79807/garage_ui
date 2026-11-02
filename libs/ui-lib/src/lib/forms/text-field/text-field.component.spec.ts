import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextFieldComponent } from './text-field.component';

@Component({
  imports: [ReactiveFormsModule, TextFieldComponent],
  template: `<garage-text-field label="Email" type="email" hint="Work email" [formControl]="email" />`,
})
class HostComponent {
  readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
}

describe('TextFieldComponent', () => {
  async function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('input') as HTMLInputElement;
    return { fixture, el, input, host: fixture.componentInstance };
  }

  it('associates the label and hint with the input', async () => {
    const { el, input } = await setup();
    const label = el.querySelector('label') as HTMLLabelElement;
    expect(label.htmlFor).toBe(input.id);
    expect(input.getAttribute('aria-describedby')).toContain(`${input.id}-hint`);
  });

  it('propagates typed values to the form control', async () => {
    const { input, host } = await setup();
    input.value = 'demo@garage.dev';
    input.dispatchEvent(new Event('input'));
    expect(host.email.value).toBe('demo@garage.dev');
  });

  it('writes form control values into the input', async () => {
    const { fixture, input, host } = await setup();
    host.email.setValue('a@b.co');
    fixture.detectChanges();
    expect(input.value).toBe('a@b.co');
  });

  it('shows the validation message only after the field is touched', async () => {
    const { fixture, el, input } = await setup();
    expect(el.querySelector('.error')?.textContent?.trim()).toBe('');

    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(el.querySelector('.error')?.textContent?.trim()).toBe('This field is required.');
  });
});
