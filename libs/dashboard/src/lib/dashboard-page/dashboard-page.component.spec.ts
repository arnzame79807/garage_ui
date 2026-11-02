import { TestBed } from '@angular/core/testing';
import { TEST_USER, provideTestAuth } from '@garage/ui-lib/testing';
import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  it('greets the signed-in user by first name', async () => {
    TestBed.configureTestingModule({ providers: [provideTestAuth({ signedIn: true })] });
    const fixture = TestBed.createComponent(DashboardPageComponent);
    await fixture.whenStable();

    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain(TEST_USER.displayName.split(' ')[0]);
  });

  it('renders a card per summary stat', async () => {
    TestBed.configureTestingModule({ providers: [provideTestAuth({ signedIn: true })] });
    const fixture = TestBed.createComponent(DashboardPageComponent);
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).querySelectorAll('garage-card').length).toBe(3);
  });
});
