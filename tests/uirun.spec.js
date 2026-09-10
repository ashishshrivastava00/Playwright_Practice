import{test , expect} from '@playwright/test'; //to initiate the playwright test framework
test('Playwright special locators', async ({ page}) => {       //

await page.goto('https://rahulshettyacademy.com/angularpractice/');  //to navigate to the given URL
await page.getByLabel('Gender').selectOption('Female');
await page.getByLabel('Employed').check();  //to check the radio button
await page.getByLabel("Check me out if you Love IceCreams!").check();  //to check the checkbox
await page .getByPlaceholder("Password").fill("abc123");
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Success! The Form has been submitted successfully!.').waitFor();
//5 second timeout set for expect assertion to check if the text is visible on the page
await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout:10_000});
await page.getByRole('link', { name: 'Shop' }).click();

const nokiaCard = page.locator('app-card').filter({
hasText: 'Nokia Edge'
});
await nokiaCard.getByRole('button', { name: 'Add' }).click();

})


test.only('to validate timeout', async ({ page}) => {       //

  const slowexpect=  expect.configure({ timeout: 9000 }); // Set the timeout to 5 seconds for this test
  page.setDefaultTimeout(6000); // Set the default timeout for all actions to 5 seconds
await page.goto('https://rahulshettyacademy.com/angularpractice/');  //to navigate to the given URL
await page.getByLabel('Gender').selectOption('Female');
await page.getByLabel('Employed').check();  //to check the radio button
await page.getByLabel("Check me out if you Love IceCreams!").check();  //to check the checkbox
await page .getByPlaceholder("Password").fill("abc123");
//below code is following test level time out.
await page.getByRole('button', { name: 'Submit' }).click({timeout:10000});
await page.getByText('Success! The Form has been submitted successfully!.').waitFor();
//5 second timeout set for expect assertion to check if the text is visible on the page
await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout:100});
await page.getByRole('link', { name: 'Shop' }).click();
const firstSection = page.locator(".my-4").allTextContents();
console.log(firstSection)
await expect(firstSection).first().toHavetext("Shop");

const nokiaCard = page.locator('app-card').filter({
hasText: 'Nokia Edge'
});
await nokiaCard.getByRole('button', { name: 'Add' }).click();

})