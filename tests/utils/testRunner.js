const base = require('@playwright/test');
const HomePage = require('../../pages/homePage');
const SignUpPage = require('../../pages/signUpPage');
const PaymentPage = require('../../pages/paymentPage');
const SearchPage = require('../../pages/searchPage');

exports.test = base.test.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await context.grantPermissions(['geolocation']);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },
  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
});

exports.expect = base.expect;