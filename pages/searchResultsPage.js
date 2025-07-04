const fs = require('fs');
const path = require('path');
const BasePage = require('../pages/basePage');
const{test, expect} = require('@playwright/test');


class SearchResultsPage extends BasePage {
  constructor(page) {
    super(page);
    // this.cardSelector = this.page.locator("//li[contains(@class, 's-item')]");
    this.cardSelector = this.page.locator("//li[@class='s-item s-item__pl-on-bottom']");
    // this.cardSelector = page.locator("//ul[@class= 'srp-results srp-grid clearfix']/li[@class = 's-card s-card--vertical']");
    // this.cardSelector = page.locator("//ul[contains(@class, 'srp-results')]/li[contains(@class, 's-card') and contains(@class, 's-card--vertical')]")

    this.titleSpans = this.page.locator("//a[@class='s-item__link']/div[@class='s-item__title']/span");
    this.anchortag = this.page.locator("//a[@class='s-item__link']");
    this.priceElements = this.page.locator("//div[@class = 's-item__detail s-item__detail--primary']/span[@class = 's-item__price']");
    this.nextButton = this.page.locator("//a[contains(@aria-label, 'Go to next search page')]");
    this.data = [];
  }

  async waitForResults() {
    try {
      // await this.page.waitForLoadState('networkidle');
      await this.cardSelector.first().waitFor({ timeout: 15000 });
      return true;
    } catch (err) {
      console.warn("Search results not found: " , err.message);
      return false;
    }
  }

  // // Get only Title of the Items
  // async getItemTitles() {
  //   const items = await this.titleSpans.all();
  //   const titles = [];
    
  //   for (const [i, item] of items.entries()) {
  //     if (this.page.isClosed()) {
  //       console.warn("Page closed during item scraping. Exiting loop.");
  //       break;
  //     }

  //     try {
  //       const handle = await item.elementHandle();
  //       if (!handle) throw new Error("Element handle not found");
  //       const text = await handle.innerText();
  //       const title = text.trim();
  //       titles.push(title);
  //     } catch (err) {
  //       console.warn("Could not get text for item ", i + 1, " : " ,err.message);
  //     }
  //   }
    
  //   return titles;
  // }

  // Get Item Details including Description, link, price
  async getItemDetails() {
    const items = await this.titleSpans.all();
    const prices = await this.priceElements.all();
    const anchors = await this.anchortag.all();
    const itemDetails = [];
    
    for (let i = 0; i < items.length; i++) {
      if (this.page.isClosed()) {
        console.warn("Page closed during item scraping. Exiting loop.");
        break;
      }

      try {
        // Get title
        const titleHandle = await items[i].elementHandle();
        const title = titleHandle ? (await titleHandle.innerText()).trim() : 'No title';
        
        // Get price
        const priceHandle = prices[i] ? await prices[i].elementHandle() : null;
        const price = priceHandle ? (await priceHandle.innerText()).trim() : 'No price';
        
        // Get link
        const linkHandle = anchors[i] ? await anchors[i].elementHandle() : null;
        const link = linkHandle ? await linkHandle.getAttribute('href') : 'No link';
        
        itemDetails.push({ title, price, link });
      } catch (err) {
        console.warn(`Could not get details for item ${i + 1}: ${err.message}`);
        itemDetails.push({ title: 'Error', price: 'Error', link: 'Error' });
      }
    }
    
    return itemDetails;
  }

  async isNextButtonAvailable() {
    try {
      const isVisible = await this.nextButton.isVisible();
      const isDisabled = isVisible ? await this.nextButton.isDisabled() : true;
      return isVisible && !isDisabled;
    } catch (err) {
      console.warn('Error checking next button status:', err.message);
      return false;
    }
  }

  async goToNextPage() {
    try {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
        this.nextButton.click()
      ]);
      return true;
    } catch (err) {
      console.error("Error during navigation to next page: " ,err.message);
      return false;
    }
  }

  async saveDataToFile(data, filename = 'results.json') {
    try {
      const outputPath = path.resolve(__dirname, `../data/${filename}`);
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      console.log(`Data saved to ${outputPath}`);
      return true;
    } catch (err) {
      console.error(`Failed to save data: ${err.message}`);
      return false;
    }
  }

  async scrapeAllPages(maxPages = null) {
    let pageNum = 1;
    const allData = [];

    while (true) {
      if (this.page.isClosed()) {
        console.warn('Page is already closed. Exiting...');
        break;
      }

      if (maxPages && pageNum > maxPages) {
        console.log(`Reached maximum pages limit: ${maxPages}`);
        break;
      }

      console.log(`\nScraping Page ${pageNum}...`);
      
      const hasResults = await this.waitForResults();
      console.log(hasResults);
      if (!hasResults) {
        console.warn(`No results found on page ${pageNum}`);
        break;
      }

      // const titles = await this.getItemTitles();
      // console.log(`Found ${titles.length} items on page ${pageNum}`);
      
      // // Add titles to data with page information
      // titles.forEach(title => {
      //   allData.push({ title, page: pageNum });
      //   console.log(`Title: ${title}`);
      // });

      const itemDetails = await this.getItemDetails();
      console.log(itemDetails);
      console.log(`Found ${itemDetails.length} items on page ${pageNum}`);
      
      // Add item details to data with page information
      itemDetails.forEach(item => {
        allData.push({ ...item, page: pageNum });
        console.log(`Title: ${item.title} | Price: ${item.price}`);
      });

      // Save progress after each page
      await this.saveDataToFile(allData);

      // Check if next page is available
      const hasNextPage = await this.isNextButtonAvailable();
      if (!hasNextPage) {
        console.log("Reached last page or next button is disabled.");
        break;
      }

      // Go to next page
      const navigated = await this.goToNextPage();
      if (!navigated) {
        console.log("Failed to navigate to next page. Stopping scraping.");
        break;
      }
      
      pageNum++;
    }

    console.log(`Scraping complete. Total items scraped: ${allData.length}`);
    return allData;
  }


  async pagination() {
    return await this.scrapeAllPages();
  }
}

module.exports = SearchResultsPage;