class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url, options = { waitUntil: 'domcontentloaded' }) {
    await this.page.goto(url, options);
  }

  async waitForTimeout(timeout) {
    await this.page.waitForTimeout(timeout);
  }

  async getCurrentUrl() {
    return await this.page.url();
  }

  async isElementVisible(locator, timeout = 5000) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = BasePage;