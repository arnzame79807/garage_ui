import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { getProgram } from '@garage/ui-lib';
import { CHDV_FORMS } from '../chdv.forms';
import { ChdvOverviewPageComponent } from './chdv-overview-page.component';

describe('ChdvOverviewPageComponent', () => {
  async function render() {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(ChdvOverviewPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the program name and summary', async () => {
    const el = await render();
    expect(el.querySelector('h1')?.textContent).toBe(getProgram('chdv').name);
    expect(el.textContent).toContain(getProgram('chdv').summary);
  });

  it('lists every program form', async () => {
    const el = await render();
    expect(el.querySelectorAll('garage-form-catalog li.item').length).toBe(CHDV_FORMS.length);
    for (const form of CHDV_FORMS) {
      expect(el.textContent).toContain(form.formNumber);
    }
  });
});
