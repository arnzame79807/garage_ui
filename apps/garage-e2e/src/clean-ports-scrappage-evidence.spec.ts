import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('Clean Ports Scrappage Evidence Statement form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/clean-ports/scrappage-evidence');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Clean Ports Scrappage Evidence Statement' }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Equipment' })).toBeVisible();
    await page.getByLabel('Example').fill('Equipment value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Scrappage Evidence' })).toBeVisible();
    await page.getByLabel('Example').fill('Scrappage Evidence value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
