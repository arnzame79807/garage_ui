import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('Clean Ports Zero Emission Technology Project Reporting form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/clean-ports/zero-emission-reporting');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Clean Ports Zero Emission Technology Project Reporting',
      }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Project' })).toBeVisible();
    await page.getByLabel('Example').fill('Project value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Technology' })).toBeVisible();
    await page.getByLabel('Example').fill('Technology value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Emissions' })).toBeVisible();
    await page.getByLabel('Example').fill('Emissions value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
