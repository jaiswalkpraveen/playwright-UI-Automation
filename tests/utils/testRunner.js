const base = require('@playwright/test');
const SearchPage = require('../../pages/searchPage');
const HomePage = require('../../pages/homePage');

exports.test = base.test.extend({
  searchPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    await context.grantPermissions(['geolocation']);
    const page = await context.newPage();
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await use(searchPage);
    await page.close();
  },
  homePage: async ({ browser }, use) => {
    const context = await browser.newContext();
    await context.grantPermissions(['geolocation']);
    const page = await context.newPage();
    const homePage = new HomePage(page);
    await homePage.navigate();
    await use(homePage);
    await page.close();
  },
  signUpPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    await context.grantPermissions(['geolocation']);
    const page = await context.newPage();
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
    await use(signUpPage);
    await page.close();
  },
});

exports.expect = base.expect;