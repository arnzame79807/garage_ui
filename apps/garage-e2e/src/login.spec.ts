import { expect, test } from '@playwright/test';
import { DEMO_USER, signIn } from './support/auth';

test.describe('login flow', () => {
  test('signs in with password + one-time code and lands on the dashboard', async ({ page }) => {
    await signIn(page);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome back, Demo');
    await expect(page.getByText('Demo User')).toBeVisible();
  });

  test('rejects bad credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(DEMO_USER.email);
    await page.getByLabel('Password').fill('not-the-password');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert')).toHaveText('Email or password is incorrect.');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('rejects a bad one-time code', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(DEMO_USER.email);
    await page.getByLabel('Password').fill(DEMO_USER.password);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Verification code').fill('000000');
    await page.getByRole('button', { name: 'Verify and sign in' }).click();
    await expect(page.getByRole('alert')).toHaveText('That code is not valid.');
  });

  test('cannot jump straight to the code step', async ({ page }) => {
    await page.goto('/login/verify');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('offers a password reset', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'Forgot your password?' }).click();
    await page.getByLabel('Email').fill(DEMO_USER.email);
    await page.getByRole('button', { name: 'Send reset link' }).click();
    await expect(page.getByRole('status')).toContainText('reset instructions');
  });
});
