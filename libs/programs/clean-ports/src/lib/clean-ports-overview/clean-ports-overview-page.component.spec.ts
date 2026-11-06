import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { getProgram } from '@garage/ui-lib';
import { CLEAN_PORTS_FORMS } from '../clean-ports.forms';
import { CleanPortsOverviewPageComponent } from './clean-ports-overview-page.component';

describe('CleanPortsOverviewPageComponent', () => {
  async function render() {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(CleanPortsOverviewPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the program name and summary', async () => {
    const el = await render();
    expect(el.querySelector('h1')?.textContent).toBe(getProgram('clean-ports').name);
    expect(el.textContent).toContain(getProgram('clean-ports').summary);
  });

  it('lists every program form', async () => {
    const el = await render();
    expect(el.querySelectorAll('garage-form-catalog li.item').length).toBe(
      CLEAN_PORTS_FORMS.length,
    );
    for (const form of CLEAN_PORTS_FORMS) {
      expect(el.textContent).toContain(form.formNumber);
    }
  });
});
