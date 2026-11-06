import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('CHDV Eligibility and Scrappage Statement form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/chdv/eligibility');
    await expect(
      page.getByRole('heading', { level: 1, name: 'CHDV Eligibility and Scrappage Statement' }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Applicant' })).toBeVisible();
    await page.getByLabel('Example').fill('Applicant value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Vehicles' })).toBeVisible();
    await page.getByLabel('Example').fill('Vehicles value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Scrappage' })).toBeVisible();
    await page.getByLabel('Example').fill('Scrappage value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
