import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('DERA Scrappage Statement form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/dera/scrappage');
    await expect(
      page.getByRole('heading', { level: 1, name: 'DERA Scrappage Statement' }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Vehicles' })).toBeVisible();
    await page.getByLabel('Example').fill('Vehicles value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Scrappage Evidence' })).toBeVisible();
    await page.getByLabel('Example').fill('Scrappage Evidence value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
