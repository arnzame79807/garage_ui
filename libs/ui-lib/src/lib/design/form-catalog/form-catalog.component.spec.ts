import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProgramForm } from '../../models';
import { FormCatalogComponent } from './form-catalog.component';

const FORMS: ProgramForm[] = [
  {
    formNumber: '5900-001',
    title: 'Eligibility Statement',
    kind: 'eligibility',
    route: '/x/eligibility',
  },
  { formNumber: '5900-002', title: 'Reporting Template', kind: 'reporting' },
];

async function render(forms: readonly ProgramForm[]) {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(FormCatalogComponent);
  fixture.componentRef.setInput('forms', forms);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('FormCatalogComponent', () => {
  it('lists each form with its EPA number and type', async () => {
    const el = await render(FORMS);
    const items = el.querySelectorAll('li.item');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('EPA 5900-001');
    expect(items[1].querySelector('.kind')?.textContent?.trim()).toBe('Reporting');
  });

  it('links forms that have an online flow and marks the rest as coming soon', async () => {
    const el = await render(FORMS);
    const [available, pending] = Array.from(el.querySelectorAll('li.item'));
    expect(available.querySelector('a')?.getAttribute('href')).toBe('/x/eligibility');
    expect(pending.querySelector('a')).toBeNull();
    expect(pending.querySelector('.status')?.textContent?.trim()).toBe('Coming soon');
  });

  it('shows an empty state', async () => {
    const el = await render([]);
    expect(el.textContent).toContain('No forms yet.');
  });
});
