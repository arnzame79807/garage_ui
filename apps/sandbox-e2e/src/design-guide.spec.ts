import { expect, test } from '@playwright/test';

test.describe('design guide', () => {
  test('navigates every guide page from the sidebar', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Design guide' });

    for (const label of [
      'Design tokens',
      'Buttons',
      'Form fields',
      'Cards, alerts & catalog',
      'Form flow',
    ]) {
      await nav.getByRole('link', { name: label }).click();
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    }
  });

  test('form fields validate on submit', async ({ page }) => {
    await page.goto('/forms');
    await page.getByRole('button', { name: 'Validate' }).click();
    await expect(page.getByText('This field is required.').first()).toBeVisible();

    await page.getByLabel('Full name').fill('Ada Lovelace');
    await page.getByLabel('Email').fill('ada@garage.dev');
    await page.getByLabel('VIN').fill('1HGCM82633A004352');
    await page.getByRole('button', { name: 'Validate' }).click();
    await expect(page.getByRole('status')).toContainText('Valid!');
  });

  test('form flow demo walks through to review', async ({ page }) => {
    await page.goto('/form-flow');
    await expect(page).toHaveURL(/\/form-flow\/owner$/);
    await page.getByLabel('Owner name').fill('Ada');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('VIN').fill('1HGCM82633A004352');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('status')).toContainText('Ada · 1HGCM82633A004352');
  });
});
