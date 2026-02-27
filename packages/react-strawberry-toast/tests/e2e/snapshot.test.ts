import { test, expect } from '@playwright/test';

test.describe('toast visual test', () => {
  test.setTimeout(30000);
  test('position - all positions', async ({ page }) => {
    await page.goto('/playground/position');

    await page.getByRole('button', { name: /toast/i }).click();

    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('playground-position.png', {
      maxDiffPixelRatio: 0.01,
      threshold: 0.1,
    });
  });

  test('type - all types', async ({ page }) => {
    await page.goto('/playground/type');

    await page.getByRole('button', { name: /toast/i }).click();

    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('playground-type.png', {
      maxDiffPixelRatio: 0.01,
      threshold: 0.1,
    });
  });

  test('style - theme1', async ({ page }) => {
    await page.goto('/playground/style');

    await page.getByRole('button', { name: /theme1/i }).click();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('playground-style-theme1.png', {
      maxDiffPixelRatio: 0.01,
      threshold: 0.1,
    });
  });

  test('style - theme2', async ({ page }) => {
    await page.goto('/playground/style');

    await page.getByRole('button', { name: /theme2/i }).click();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('playground-style-theme2.png', {
      maxDiffPixelRatio: 0.01,
      threshold: 0.1,
    });
  });

  test('style - theme3', async ({ page }) => {
    await page.goto('/playground/style');

    await page.getByRole('button', { name: /theme3/i }).click();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('playground-style-theme3.png', {
      maxDiffPixelRatio: 0.01,
      threshold: 0.1,
    });
  });
});
