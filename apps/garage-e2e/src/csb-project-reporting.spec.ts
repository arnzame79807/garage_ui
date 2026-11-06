import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('CSB Project Reporting form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/csb/project-reporting');
    await expect(
      page.getByRole('heading', { level: 1, name: 'CSB Project Reporting' }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Project' })).toBeVisible();
    await page.getByLabel('Example').fill('Project value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Buses' })).toBeVisible();
    await page.getByLabel('Example').fill('Buses value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Infrastructure' })).toBeVisible();
    await page.getByLabel('Example').fill('Infrastructure value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
