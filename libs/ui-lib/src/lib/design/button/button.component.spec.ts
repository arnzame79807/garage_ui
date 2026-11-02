import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

@Component({
  imports: [ButtonComponent],
  template: `
    <button garageButton>Save</button>
    <a garageButton variant="ghost" size="sm" href="#">Link</a>
  `,
})
class HostComponent {}

describe('ButtonComponent', () => {
  it('applies variant and size classes to the native element', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const [button, link] = fixture.nativeElement.querySelectorAll('.garage-button');

    expect(button.tagName).toBe('BUTTON');
    expect(button.classList).toContain('garage-button--primary');
    expect(link.tagName).toBe('A');
    expect(link.classList).toContain('garage-button--ghost');
    expect(link.classList).toContain('garage-button--sm');
  });
});
