import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('CSB Eligibility and Scrap, Sell, Donate Statement form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/csb/eligibility');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'CSB Eligibility and Scrap, Sell, Donate Statement',
      }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Applicant' })).toBeVisible();
    await page.getByLabel('Example').fill('Applicant value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Buses' })).toBeVisible();
    await page.getByLabel('Example').fill('Buses value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Disposition' })).toBeVisible();
    await page.getByLabel('Example').fill('Disposition value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
