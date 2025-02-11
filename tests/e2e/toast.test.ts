import { test, expect } from '@playwright/test';

test('toast position', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /click/i });
});
