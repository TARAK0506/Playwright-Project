const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const AdvancedSearchPage = require('../pages/advancedSearchPage');
const SearchResultsPage = require('../pages/searchResultsPage');

test.describe('eBay Advanced Search Tests', () => {


  let homePage, advancedSearchPage, searchResultsPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects once per test
    homePage = new HomePage(page);
    advancedSearchPage = new AdvancedSearchPage(page);
    searchResultsPage = new SearchResultsPage(page);
  });


  test('Perform advanced search for outdoor toys', async ({ page }) => {
    // Initializing all the page objects
    // const homePage = new HomePage(page);
    // const advancedSearchPage = new AdvancedSearchPage(page);
    // const searchResultsPage = new SearchResultsPage(page);

    // Navigate to eBay website homepage
    await homePage.navigateToEbay();

    // Verify and click advanced search button
    await homePage.verifyAdvancedSearchButton();
    await homePage.clickAdvancedSearch();

    // Defining search criteria
    const searchCriteria = {
      keywords: "Outdoor Toys",
      keywordOption: "Any words, any order",
      category: "Toys & Hobbies",
      titleAndDescription: true,
      condition: true,
      freeReturns: true,
      returnsAccepted: true,
      itemLocation: true
    };

    // Perform advanced search
    await advancedSearchPage.performAdvancedSearch(searchCriteria);

    // Get current URL after search
    const currentUrl = await page.url();
    console.log("Current page URL:", currentUrl);

    // Scrape search results (limit to n number of pages for testing)
    const results = await searchResultsPage.scrapeAllPages(50);
    
    // Verify scarping or pagination is done or not
    expect(results.length).toBeGreaterThan(0);
    
    console.log("Successfully Completed!");
  });

  test('Verify homepage elements', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigateToEbay();
    
    // Test individual Assertions methods
    expect(await homePage.isAdvancedSearchVisible()).toBe(true);
    expect(await homePage.isAdvancedSearchEnabled()).toBe(true);
    expect(await homePage.getAdvancedSearchText()).toBe('Advanced');
  });

  // test('Test search results pagination', async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   const advancedSearchPage = new AdvancedSearchPage(page);
  //   const searchResultsPage = new SearchResultsPage(page);

  //   await homePage.navigateToEbay();
  //   await homePage.clickAdvancedSearch();

  //   // Simple search criteria
  //   const searchCriteria = {
  //     keywords: "Outdoor toys",
  //     category: "Toys & Hobbies"
  //   };

  //   await advancedSearchPage.performAdvancedSearch(searchCriteria);

  //   // Test pagination methods
  //   const hasResults = await searchResultsPage.waitForResults();
  //   expect(hasResults).toBe(true);

  //   const titles = await searchResultsPage.getItemTitles();
  //   expect(titles.length).toBeGreaterThan(0);

  //   // Check if next page is available
  //   const hasNextPage = await searchResultsPage.isNextButtonAvailable();
  //   console.log(`Next page available: ${hasNextPage}`);
  // });
});