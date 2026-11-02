import { Page, expect } from '@playwright/test';

/** Matches MockAuthBackend in @garage/ui-lib. Replace when a real IdP is wired in. */
export const DEMO_USER = { email: 'demo@garage.dev', password: 'password', otp: '123456' };

/** Completes the full two-step login flow and waits for the dashboard. */
export async function signIn(page: Page): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Email').fill(DEMO_USER.email);
  await page.getByLabel('Password').fill(DEMO_USER.password);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Verification code').fill(DEMO_USER.otp);
  await page.getByRole('button', { name: 'Verify and sign in' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}
