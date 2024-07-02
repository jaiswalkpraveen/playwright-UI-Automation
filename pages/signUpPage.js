class SignUpPage {
  constructor(page) {
      this.page = page;
      this.adultMembershipCounter = page.locator('text=Adults (18+)');
      this.childrenBundleToggle = page.locator('text=Children bundle');
      this.paymentToggle = page.locator('text=Pay upfront');
      this.planOptions = page.locator('[data-index]');
      this.continueButton = page.locator('text=Continue');
  }

  async navigate() {
    await this.page.goto('https://staging-website.privilee.ae/map');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectPlan(months) {
      await this.planOptions.filter({ hasText: `${months} months` }).click();
  }

  async getPlanPrice(months) {
      const priceElement = await this.planOptions.filter({ hasText: `${months} months` }).locator('.price');
      return await priceElement.innerText();
  }

  async clickContinue() {
      await this.continueButton.click();
  }
}

module.exports = SignUpPage;