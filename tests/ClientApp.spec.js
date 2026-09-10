const { test, expect } = require('@playwright/test');

test('client app login', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    const email = "asgugma@gmail.com";

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder('enter your passsword').fill("Learn@1234");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    /*const count = await products.count();
    for (let i = 0; i < count; i++) {
        const title = await products.nth(i).locator('b').textContent();
        if (title && title.trim() === productName) {
            await products.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }*/
    const productCard = page.locator(".card-body").filter({hasText: productName});
    await productCard.getByRole("button", { name: /Add To Cart/i }).click();
    await page.getByRole("listitem").getByRole('button', { name: /Cart/i }).click();
    //await page.locator("[routerlink*='cart']").click();
    //await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    //await page.locator('text=Checkout').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    //await page.locator("[placeholder*='Country']").pressSequentially('ind', { delay: 100 });
    await page.getByPlaceholder("Select Country").pressSequentially('ind');
    await page.getByRole("button", { name: 'India' }).nth(1).click();
    /*const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const countryButtons = dropdown.locator('button');
    const optionsCount = await countryButtons.count();

    for (let i = 0; i < optionsCount; i++) {
        const text = await countryButtons.nth(i).textContent();
        if (text && text.trim() === 'India') {
            await countryButtons.nth(i).click();
            break;
        }
    }*/

    await expect(page.locator('.user__name input.text-validated').nth(0)).toHaveValue(email);
    //await page.locator('.action__submit').click();
    await page.getByText("Place Order ").click();
    //await expect(page.locator('.hero-primary')).toHaveText(/Thankyou for the order\./);
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();

    const orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted').first();
    await orderIdLocator.waitFor();
    const orderId = (await orderIdLocator.textContent())?.replace(/\|/g, '').trim();
    console.log(orderId);

    //await page.locator("button[routerlink*='myorders']").first().click();
    await page.getByRole('button', { name: /orders/i }).click();
    await page.locator('tbody').waitFor();
    await page.getByRole('row', { name: new RegExp(orderId) })
    .getByRole('button', { name: 'View' }).click();
    
    /*const rows = page.locator('tbody tr');
    let orderFound = false;
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = (await rows.nth(i).locator('th').textContent())?.trim();
        if (rowOrderId && orderId && orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            orderFound = true;
            break;
        }
    }*/

    //expect(orderFound).toBeTruthy();

    const orderDetails = (await page.locator('.col-text').textContent())?.trim();
    if (orderId && orderDetails) {
        expect(orderId).toContain(orderDetails);
        console.log(orderDetails);
    }
    await page.pause()
});