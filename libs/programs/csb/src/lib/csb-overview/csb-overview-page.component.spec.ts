import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { getProgram } from '@garage/ui-lib';
import { CSB_FORMS } from '../csb.forms';
import { CsbOverviewPageComponent } from './csb-overview-page.component';

describe('CsbOverviewPageComponent', () => {
  async function render() {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(CsbOverviewPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the program name and summary', async () => {
    const el = await render();
    expect(el.querySelector('h1')?.textContent).toBe(getProgram('csb').name);
    expect(el.textContent).toContain(getProgram('csb').summary);
  });

  it('lists every program form', async () => {
    const el = await render();
    expect(el.querySelectorAll('garage-form-catalog li.item').length).toBe(CSB_FORMS.length);
    for (const form of CSB_FORMS) {
      expect(el.textContent).toContain(form.formNumber);
    }
  });
});
