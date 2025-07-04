const BasePage = require('../pages/basePage');
const{test, expect} = require('@playwright/test');

class AdvancedSearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.getByLabel("Enter keywords or item number");
    this.keywordOption = page.locator("//select[@id='s0-1-17-4[0]-7[1]-_in_kw']");
    this.categorySelect = page.locator("//select[@id='s0-1-17-4[0]-7[3]-_sacat']");
    this.titleDescriptionCheckbox = page.locator("//label[contains(text(), 'Title and description')]/preceding-sibling::span/input");
    this.conditionCheckbox = page.locator("//input[@id='s0-1-17-6[4]-[0]-LH_ItemCondition']");
    this.freeReturnsCheckbox = page.locator("//input[@id='s0-1-17-5[5]-[0]-LH_FR']");
    this.returnsAcceptedCheckbox = page.locator("//input[@id='s0-1-17-5[5]-[1]-LH_RPA']");
    this.itemLocationCheckbox = page.locator("//input[@id='s0-1-17-6[7]-[3]-LH_PrefLoc']");
    this.searchButton = page.locator("//div[@class = 'adv-form__actions'] /button[ text() = 'Search' and contains(@class, 'btn btn--primary') ]");
  }

  async waitForPageLoad() {
    await this.searchInput.waitFor({ state: 'visible', timeout: 150000 });
  }

  async enterSearchKeywords(keywords) {
    await this.searchInput.fill(keywords);
    await this.waitForTimeout(1000);
  }

  async selectKeywordOption(optionLabel) {
    await this.keywordOption.selectOption({ label: optionLabel });
  }

  async selectCategory(categoryLabel) {
    await this.categorySelect.selectOption({ label: categoryLabel });
  }

  async checkTitleAndDescription() {
    await expect(this.titleDescriptionCheckbox).toBeVisible();
    await this.titleDescriptionCheckbox.check();
    await expect(this.titleDescriptionCheckbox).toBeChecked();
  }

  async checkCondition() {
    await this.conditionCheckbox.click();
  }

  async checkFreeReturns() {
    await this.freeReturnsCheckbox.click();
  }

  async checkReturnsAccepted() {
    await this.returnsAcceptedCheckbox.click();
  }

  async checkItemLocation() {
    await this.itemLocationCheckbox.click();
  }

  async clickSearch() {
    await this.searchButton.click();
    await this.waitForTimeout(3000);
  }

  async performAdvancedSearch(searchCriteria) {
    await this.waitForPageLoad();
    
    if (searchCriteria.keywords) {
      await this.enterSearchKeywords(searchCriteria.keywords);
    }
    
    if (searchCriteria.keywordOption) {
      await this.selectKeywordOption(searchCriteria.keywordOption);
    }
    
    if (searchCriteria.category) {
      await this.selectCategory(searchCriteria.category);
    }
    
    if (searchCriteria.titleAndDescription) {
      await this.checkTitleAndDescription();
    }
    
    if (searchCriteria.condition) {
      await this.checkCondition();
    }
    
    if (searchCriteria.freeReturns) {
      await this.checkFreeReturns();
    }
    
    if (searchCriteria.returnsAccepted) {
      await this.checkReturnsAccepted();
    }
    
    if (searchCriteria.itemLocation) {
      await this.checkItemLocation();
    }
    
    await this.clickSearch();
  }
}

module.exports = AdvancedSearchPage;