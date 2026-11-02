import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('dashboard', () => {
  test('redirects anonymous users to login and returns them after sign-in', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login\?returnUrl=%2Fdashboard$/);
  });

  test('keeps the session across a reload and signs out', async ({ page }) => {
    await signIn(page);
    await page.reload();
    await expect(page).toHaveURL(/\/dashboard$/);

    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('banner').getByRole('link', { name: 'Sign in' })).toBeVisible();

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });
});
