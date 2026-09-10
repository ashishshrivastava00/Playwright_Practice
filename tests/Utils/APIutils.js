const { expect } = require('@playwright/test');
class APIutils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken(loginPayload) {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: this.loginPayload
        });
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson?.token;
    }
   /* constructor() {
        this.token = null;
    }

  async login(apiContext, loginPayload) {
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      data: loginPayload,
    });

    const loginResponseJson = await loginResponse.json();
    this.token = loginResponseJson?.token;
  }*/

  async createOrder(apiContext, orderPayload) {
    let respone= {};
    respone.token= await this.getToken();
    const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
      data: orderPayload,
      headers: {
        Authorization: respone.token,
        'Content-Type': 'application/json',
      },
    });

    const orderResponseJson = await orderResponse.json();
    //return orderResponseJson?.orders?.[0];
    respone.orderId = orderResponseJson.orders[0];
    return respone;

  }
}
module.exports = {APIutils};