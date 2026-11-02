import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideTestAuth } from '@garage/ui-lib/testing';
import { App } from './app';

async function render(signedIn: boolean) {
  TestBed.configureTestingModule({
    imports: [App],
    providers: [provideRouter([]), provideTestAuth({ signedIn })],
  });
  const fixture = TestBed.createComponent(App);
  await fixture.whenStable();
  return fixture;
}

describe('App', () => {
  it('offers sign in to anonymous visitors', async () => {
    const fixture = await render(false);
    expect(fixture.nativeElement.textContent).toContain('Sign in');
  });

  it('shows the user and signs them out', async () => {
    const fixture = await render(true);
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Test User');

    const navigate = jest.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    (el.querySelector('button') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(el.textContent).toContain('Sign in');
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
