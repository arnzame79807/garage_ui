import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('CHDV Utility Partnership Agreement form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/chdv/utility-partnership');
    await expect(
      page.getByRole('heading', { level: 1, name: 'CHDV Utility Partnership Agreement' }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Applicant' })).toBeVisible();
    await page.getByLabel('Example').fill('Applicant value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Utility' })).toBeVisible();
    await page.getByLabel('Example').fill('Utility value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Commitments' })).toBeVisible();
    await page.getByLabel('Example').fill('Commitments value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
