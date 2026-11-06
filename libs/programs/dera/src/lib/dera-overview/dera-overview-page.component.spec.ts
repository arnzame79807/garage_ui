import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { getProgram } from '@garage/ui-lib';
import { DERA_FORMS } from '../dera.forms';
import { DeraOverviewPageComponent } from './dera-overview-page.component';

describe('DeraOverviewPageComponent', () => {
  async function render() {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(DeraOverviewPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the program name and summary', async () => {
    const el = await render();
    expect(el.querySelector('h1')?.textContent).toBe(getProgram('dera').name);
    expect(el.textContent).toContain(getProgram('dera').summary);
  });

  it('lists every program form', async () => {
    const el = await render();
    expect(el.querySelectorAll('garage-form-catalog li.item').length).toBe(DERA_FORMS.length);
    for (const form of DERA_FORMS) {
      expect(el.textContent).toContain(form.formNumber);
    }
  });
});
