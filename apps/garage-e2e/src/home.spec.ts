import { expect, test } from '@playwright/test';

test.describe('home', () => {
  test('shows the landing page with a sign-in call to action', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Garage');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to Garage');

    await page.locator('.hero').getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/\/login$/);
  });
});
