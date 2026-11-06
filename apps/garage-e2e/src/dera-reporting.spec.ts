import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('DERA Reporting form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/dera/reporting');
    await expect(page.getByRole('heading', { level: 1, name: 'DERA Reporting' })).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Project' })).toBeVisible();
    await page.getByLabel('Example').fill('Project value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Vehicles' })).toBeVisible();
    await page.getByLabel('Example').fill('Vehicles value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Costs' })).toBeVisible();
    await page.getByLabel('Example').fill('Costs value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
