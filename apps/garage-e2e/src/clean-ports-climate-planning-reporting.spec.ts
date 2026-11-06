import { expect, test } from '@playwright/test';
import { signIn } from './support/auth';

test.describe('Clean Ports Climate and Air Quality Planning Reporting form flow', () => {
  test('walks every step and submits', async ({ page }) => {
    await signIn(page);
    await page.goto('/clean-ports/climate-planning-reporting');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Clean Ports Climate and Air Quality Planning Reporting',
      }),
    ).toBeVisible();

    await expect(page.getByRole('heading', { level: 2, name: 'Project' })).toBeVisible();
    await page.getByLabel('Example').fill('Project value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(
      page.getByRole('heading', { level: 2, name: 'Planning Activities' }),
    ).toBeVisible();
    await page.getByLabel('Example').fill('Planning Activities value');
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { level: 2, name: 'Review' })).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Submitted. Thank you!')).toBeVisible();
  });
});
