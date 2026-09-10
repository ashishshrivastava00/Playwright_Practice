import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('chrome-error://chromewebdata/');
  await expect(page.locator('#main-content')).toBeVisible();
  await page.goto('http://icicibank.com/');
});