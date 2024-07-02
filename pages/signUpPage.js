class SignUpPage {
    constructor(page) {
      this.page = page;
    }
  
  
    async navigate() {
      await this.page.goto('https://staging-website.privilee.ae/map');
    }
  
  }
  
  module.exports = SignUpPage;