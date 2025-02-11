import { test, expect } from '@playwright/test';

test.describe('visual comparison', () => {
  test('toast position', async ({ page }) => {
    await page.goto('/');
  
    await page.getByRole('button', { name: /click/i }).click();
  
    await expect(page).toHaveScreenshot('toast-position.png', {
      maxDiffPixelRatio: 0.001,
      threshold: 0.1,
    });
  });

  test('multi-container', async ({ page }) => {
    await page.goto('/multi-container2');
  
    await page.getByRole('button', { name: /click/i }).click();
  
    await expect(page).toHaveScreenshot('multi-container.png', {
      maxDiffPixelRatio: 0.001,
      threshold: 0.1,
    });
  });
})
