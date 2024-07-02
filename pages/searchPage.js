class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[placeholder="Search for venue"]');
    this.searchResults = page.locator('li[data-index="0"]');
  }



  async navigate() {
    await this.page.goto('https://staging-website.privilee.ae/map');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performSearch(query) {
    await this.searchInput.fill(query);
  }

  async getSearchResultItem(venueName, location) {
    return this.page.locator(`li:has-text("${venueName}"):has-text("${location}")`);
  }

  async getVenueName(resultItem) {
    return resultItem.locator('span').first().innerText();
  }

  async getVenueLocation(resultItem) {
    return resultItem.locator('span').last().innerText();
  }

  async getNoResultsMessage() {
    return this.page.getByText('No Results found', { exact: true });
  }


  async getSearchResultCount(timeout = 5000) {
    // Wait for the results to load with a specific timeout
    await this.page.waitForSelector('li[data-index]', { timeout });
    // Count the number of li elements with data-index attribute
    const resultCount = await this.page.evaluate(() => {
      return document.querySelectorAll('li[data-index]').length;
    });
    return resultCount;
  }

}

module.exports = SearchPage;