const BasePage = require('../pages/basePage');
const{test, expect} = require('@playwright/test');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.advancedSearchLink = page.locator("//a[@class = 'gh-search-button__advanced-link']");
  }

  async navigateToEbay() {
    await this.goto("https://ebay.com");
  }

  async isAdvancedSearchVisible() {
    return await this.advancedSearchLink.isVisible();
  }

  async isAdvancedSearchEnabled() {
    return await this.advancedSearchLink.isEnabled();
  }

  async getAdvancedSearchText() {
    return await this.advancedSearchLink.textContent();
  }

  async verifyAdvancedSearchButton() {
    await expect(this.advancedSearchLink).toBeVisible();
    await expect(this.advancedSearchLink).toBeEnabled();
    await expect(this.advancedSearchLink).toHaveText('Advanced');
  }

  async clickAdvancedSearch() {
    await this.advancedSearchLink.click();
  }
}

module.exports = HomePage;