const { test, expect } = require('@playwright/test');

test("Popup Validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  /*await page.goto("https://google.com/");
  await page.goBack();
  await page.goForward();*/

  const displayedName = page.locator("#displayed-text");
  console.log(displayedName);
  await expect(displayedName).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(displayedName).toBeHidden();

  page.on('dialog', dialog => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framepage = page.frameLocator("#courses-iframe");
  await framepage.locator("li a[href*='lifetime-access']:visible").click();
  const textcheck = await framepage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);
});
