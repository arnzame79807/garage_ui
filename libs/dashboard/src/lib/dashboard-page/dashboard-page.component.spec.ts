import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GRANT_PROGRAMS } from '@garage/ui-lib';
import { TEST_USER, provideTestAuth } from '@garage/ui-lib/testing';
import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  it('greets the signed-in user by first name', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideTestAuth({ signedIn: true })],
    });
    const fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain(TEST_USER.displayName.split(' ')[0]);
  });

  it('renders a card per summary stat', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideTestAuth({ signedIn: true })],
    });
    const fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.stats garage-card').length,
    ).toBe(3);
  });

  it('links to every grant program', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideTestAuth({ signedIn: true })],
    });
    const fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.programs a'),
    ).map((a) => a.getAttribute('href'));
    expect(links).toEqual(GRANT_PROGRAMS.map((p) => p.path));
  });
});
