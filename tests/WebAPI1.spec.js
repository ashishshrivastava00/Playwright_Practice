const { test, expect, request } = require('@playwright/test');

const loginPayload = {userEmail: "asgugma@gmail.com", userPassword: "Learn@1234"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let token;
let orderId;

//login API call to get the token before running the tests
test.beforeAll(async () => {
  const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
  const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: loginPayload,
  });

  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson?.token;
  expect(token).toBeTruthy();

  const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    data: orderPayload,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  expect(orderResponse.ok()).toBeTruthy();

  const orderResponseJson = await orderResponse.json();
  //console.log('Order Response JSON:', orderResponseJson);
  orderId = orderResponseJson?.orders?.[0];
  expect(orderId).toBeTruthy();
  console.log('Captured order ID:', orderId);
  //const nestedOrders = orderResponseJson?.orders ?? orderResponseJson?.order ?? [];
  //const firstOrder = Array.isArray(nestedOrders) ? nestedOrders[0] : nestedOrders;

  /*if (!firstOrder) {
    orderId = null;
  } else if (typeof firstOrder === 'string') {
    orderId = firstOrder;
  } else {
    orderId = firstOrder._id || firstOrder.orderId || firstOrder.id || firstOrder.productOrderedId || JSON.stringify(firstOrder);
  }*/

  
});

test.beforeEach(async ({ page }) => {


});

test('client app login', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);

  //const email = 'asgugma@gmail.com';
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  //await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: /orders/i }).click();
  await page.locator('tbody').waitFor();
  const rows = page.locator('tbody tr');
  for(let i=0;i<=await rows.count();i++)
  {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if(orderId.includes(rowOrderId))
    {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderDetails = (await page.locator('.col-text').first().textContent())?.replace(/\|/g, '').trim();
  expect(orderId).toBeTruthy();

  if (orderId && orderDetails) {
    expect(orderDetails).toContain(orderId);
    console.log(orderDetails);
  }

  //await expect(page.getByText(email)).toBeVisible();
});