import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { GUIDE_PAGES } from './app.routes';

describe('Sandbox App', () => {
  it('lists every guide page in the sidebar', async () => {
    TestBed.configureTestingModule({ imports: [App], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('nav.sidebar a');
    expect(links.length).toBe(GUIDE_PAGES.length + 1);
  });
});
