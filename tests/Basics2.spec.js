const {test,expect}=require('@playwright/test');  //to initiate the playwright test framework
const constants = require('node:constants');

test('client app login', async ({page}) =>   //async is a keyword for asynchronous functions
{
    const productname = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const email = "asgugma@gmail.com";
     await page.goto('https://rahulshettyacademy.com/client/#/auth/login');  //to navigate to the given URL
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Learn@1234");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const cardname = await products.allTextContents();
    console.log(cardname);
    const count= await products.count();
    for(let i=0;i<count;i++)
    { const title = await products.nth(i).locator("b").textContent();
        if(await title.trim() === productname)
      { //Add to cart button is inside the card-body class, so we need to locate the card-body first and then locate the button inside it
        await products.nth(i).locator("text=Add To Cart").click();
        break;
      }
    }
    await page.locator("[routerlink*='cart']").click();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;i++)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(await page.locator(".user__name input.text-validated").nth(0)).toHaveValue(email);
    await page.locator(".action__submit").click();
    expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i=0;i<await rows.count();i++)
    {
       const roworderid= await rows.nth(i).locator("th").textContent();
       if(orderId.includes(roworderid))
       {
        await rows.nth(i).locator("button").first().click();
        break;
       }
       const orderiddetails = await page.locator(".col-text").textContent();
       expect(orderId.includes(orderiddetails)).toBeTruthy();
    }
    await page.pause();
});