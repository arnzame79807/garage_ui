import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

const PROGRAMS = [
  { name: 'Clean Heavy-Duty Vehicles', path: '/chdv', forms: ['5900-682', '5900-683', '5900-685'] },
  {
    name: 'Clean Ports',
    path: '/clean-ports',
    forms: ['5900-684', '5900-718', '5900-719', '5900-720', '5900-721'],
  },
  {
    name: 'Diesel Emissions Reduction Act',
    path: '/dera',
    forms: ['5900-687', '5900-688', '5900-691'],
  },
  { name: 'Clean School Bus', path: '/csb', forms: ['5900-686', '5900-692', '5900-693'] },
];

test.describe('grant programs', () => {
  test('require sign-in', async ({ page }) => {
    await page.goto('/dera');
    await expect(page).toHaveURL(/\/login\?returnUrl=%2Fdera$/);
  });

  for (const program of PROGRAMS) {
    test(`${program.name} is reachable from the dashboard and lists its forms`, async ({
      page,
    }) => {
      await signIn(page);
      await page
        .getByRole('region', { name: 'Grant programs' })
        .getByRole('link', { name: program.name })
        .click();

      await expect(page).toHaveURL(new RegExp(`${program.path}$`));
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(program.name);
      for (const form of program.forms) {
        await expect(page.getByText(`EPA ${form}`)).toBeVisible();
      }
    });
  }
});
