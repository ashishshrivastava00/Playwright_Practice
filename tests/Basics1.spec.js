const {test,expect}=require('@playwright/test')  //to initiate the playwright test framework


test('second test', async ({page}) =>   //async is a keyword for asynchronous functions
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');  //to navigate to the given URL
    // await page.waitForTimeout(5000);  //to wait for 5 seconds
    console.log(await page.title());  //to get the title of the page
    await expect(page).toHaveTitle('Let\'s Shop');  //to check if the title of the page is 'Google'
    await page.locator("#userEmail").fill("asgugma@gmail.com");
   const password = page.locator("[type='password']");
   await password.fill("Learn@1234");
   await page.locator("#login").click();
   const cardbody = page.locator(".card-body b");
   //console.log(await cardbody.first().textContent());
   //console.log(await cardbody.nth(0).textContent());
   await page.waitForLoadState('networkidle');
   const cardname = await cardbody.allTextContents();
  console.log(cardname);

});

test.only('Adding to cart', async ({page}) =>   //async is a keyword for asynchronous functions
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');  //to navigate to the given URL
     await page.waitForTimeout(5000);  //to wait for 5 seconds
    page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.type()).toBe('confirm'); // Types: alert, confirm, prompt, beforeunload
    
    // 2. You must accept or dismiss it
    await dialog.accept(); 
  });
    console.log(await page.title());  //to get the title of the page
    await expect(page).toHaveTitle('Let\'s Shop');  //to check if the title of the page is 'Google'
    await page.locator("#userEmail").fill("asgugma@gmail.com");
   const password = page.locator("[type='password']");
   await password.fill("Learn@1234");
   await page.locator("#login").click();
   const cardbody = page.locator(".card-body b");
   //console.log(await cardbody.first().textContent());
   //console.log(await cardbody.nth(0).textContent());
   await page.waitForLoadState('networkidle');
   const cardname = await cardbody.allTextContents();
  console.log(cardname);
  await page.locator(".card-body button:last-of-type").nth(1).click();
  await page.locator("[routerlink*='cart']").click();
  await expect(page.getByRole('heading', { name: 'My Cart' })).toBeVisible();
  console.log(await page.locator(".cartSection h3").textContent());
  //const bool = await page.locator(".cartSection h3").textContent().includes(cardname[1]);
  //expect(bool).toBeTruthy();
  console.log(await page.locator(".prodTotal p").textContent());
  await expect(page.locator(".prodTotal p")).toContainText('$ 11500');
  
 //code for buy now button
  await page.locator('button:has-text("Buy Now")').click();
 await page.locator("[placeholder*='Country']").type("ind",{delay:100});
  const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    await dropdown.locator("button").nth(1).click();
    await page.pause();
    await page.locator('.field').filter({ hasText: 'CVV Code ' }).locator('input').fill('123');
    await page.locator('.field').filter({ hasText: 'Apply Coupon' }).locator('input').fill('rahulshettyacademy');
    await page.locator('.field').filter({ hasText: 'Apply Coupon' }).locator('button').click();
    await expect(page.locator('.row p')).toContainText('* Coupon Applied');
   await expect(page.locator('.user__name input.text-validated').nth(0)).toHaveValue('asgugma@gmail.com');
   
  await page.locator(".action__submit").click();
   await expect(page.getByRole('heading', { name: /Thankyou for the order/i })).toBeVisible();
  const orderIdLocator = page.locator("label.ng-star-inserted");
  await expect(orderIdLocator).toBeVisible();
   const orderId = (await orderIdLocator.textContent())?.replace(/\|/g, '').trim();
   console.log(orderId);
    await page.pause();
  await page.getByText('Orders History Page').click();
  await expect(page.getByText(orderId)).toBeVisible();
   
});