import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('Clean Ports Technology Deployment Evidence Statement form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/clean-ports/technology-deployment');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Clean Ports Technology Deployment Evidence Statement',
      }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Project' })).toBeVisible();
    await page.getByLabel('Example').fill('Project value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Technology' })).toBeVisible();
    await page.getByLabel('Example').fill('Technology value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(
      page.getByRole('heading', { level: 2, name: 'Deployment Evidence' }),
    ).toBeVisible();
    await page.getByLabel('Example').fill('Deployment Evidence value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
