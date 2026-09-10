const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('./utils/ApiUtils.js');

const loginPayload = { userEmail: 'asgugma@gmail.com', userPassword: 'Learn@1234' };
const orderPayload = { orders: [{ country: 'India', productOrderedId: '6960eac0c941646b7a8b3e68' }] };
let response = {};
let apiContext;

// login API call to get the token before running the tests
test.beforeAll(async () => {
  apiContext = await request.newContext();
  const apiUtils = new APIutils(apiContext, loginPayload);
  response = await apiUtils.createOrder(apiContext, orderPayload);
});

test.beforeEach(async ({ page }) => {});

test('client app login', async ({ page }) => {
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByRole('button', { name: /orders/i }).click();
  await page.locator('tbody').waitFor();
  const rows = page.locator('tbody tr');
  const count = await rows.count();
  for (let i = 0; i < count; i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (response.orderId && rowOrderId && response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderDetails = (await page.locator('.col-text').first().textContent())?.replace(/\|/g, '').trim();
  expect(response.orderId).toBeTruthy();
  if (response.orderId && orderDetails) {
    expect(orderDetails).toContain(response.orderId);
    console.log(orderDetails);
  }
});