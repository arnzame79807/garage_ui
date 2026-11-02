import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTestAuth } from '@garage/ui-lib/testing';
import { HomePageComponent } from './home-page.component';

async function render(signedIn: boolean) {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), provideTestAuth({ signedIn })],
  });
  const fixture = TestBed.createComponent(HomePageComponent);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('HomePageComponent', () => {
  it('invites anonymous visitors to sign in', async () => {
    const el = await render(false);
    const cta = el.querySelector('.hero a') as HTMLAnchorElement;
    expect(cta.textContent?.trim()).toBe('Sign in');
    expect(cta.getAttribute('href')).toBe('/login');
  });

  it('sends signed-in users to the dashboard', async () => {
    const el = await render(true);
    expect(el.querySelector('.hero a')?.getAttribute('href')).toBe('/dashboard');
  });

  it('renders the highlight cards', async () => {
    const el = await render(false);
    expect(el.querySelectorAll('garage-card').length).toBe(3);
  });
});
