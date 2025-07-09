# Playwright Mini Project

A robust end-to-end (E2E) testing and web scraping framework for web applications using Playwright and JavaScript. This project demonstrates browser automation, advanced search, and data extraction (scraping) from eBay, following the Page Object Model (POM) design pattern.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Design Principles](#design-principles)
- [Installation](#installation)
- [Configuration](#configuration)
- [How to Write and Organize Tests](#how-to-write-and-organize-tests)
- [Running Tests](#running-tests)
- [Key Methods](#key-methods)
- [Web Scraping & Data Output](#web-scraping--data-output)
- [Viewing Reports](#viewing-reports)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Project Overview

This repository provides a complete setup for E2E testing and web scraping using Playwright with JavaScript. It includes:

- Automated browser tests for [eBay](#https://www.ebay.com/) web applications.
- Page Object Model (POM) for maintainable and reusable code.
- Data extraction and saving results to JSON.
- HTML and JSON reporting for test results.

---

## Directory Structure

```
.
├── package.json
├── playwright.config.js
├── data/
│   └── results.json
├── pages/
│   ├── advancedSearchPage.js
│   ├── basePage.js
│   ├── homePage.js
│   ├── locatorsPage.js
│   └── SearchResultsPage.js
├── playwright-report/
│   └── index.html
├── test-results/
├── tests/
│   ├── ebay.spec.js
│   └── example.spec.js
├── tests-examples/
│   └── demo-todo-app.spec.js
├── utils/
│   └── csvWriter.js
```

- **pages/**: Page Object Model classes for each web page.
- **tests/**: Main test suites.
- **data/**: Output data from scraping.
- **playwright-report/**: HTML reports generated after test runs.
- **utils/**: Utility scripts (e.g., CSV writer).

---

## Design Principles

- **Playwright**: For fast, reliable browser automation.
- **Page Object Model (POM)**: Each page (e.g., eBay search, advanced search) is encapsulated in a class with methods for actions and data extraction.
- **Test Suites**: Written in JavaScript, using Playwright's test runner.
- **Data Extraction**: Scraping logic is implemented in `SearchResultsPage.js`, saving results to JSON.
- **Reporting**: Playwright's built-in HTML and JSON reports.

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/TARAK0506/Playwright-Project.git
   cd Playwright-Project
   ```
2. **Install Node.js**  
   Make sure you have Node.js (version 16 or higher recommended) installed. You can check with:
   ```sh
   node -v
   ```
   If not, download and install from [nodejs.org](https://nodejs.org/).

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

---

## Configuration

- **playwright.config.js**: Configure test settings, timeouts, browser options, and reporters.
- **Environment Variables**: Set any required environment variables in a `.env` file or directly in your shell.

---

## How to Write and Organize Tests

- Place new test files in the `tests/` directory.
- Use the Page Object Model classes from `pages/` for actions and assertions.
- Example test file: `tests/example.spec.js`

---

## Running Tests

- **Run all tests:**
  ```sh
  npx playwright test
  ```

- **Run a specific test file:**
  ```sh
  npx playwright test tests/main.spec.js
  ```

- **Run a specific test using chromium and in headed mode**
  ```sh
  npx playwright test tests/main.spec.js --project=chromium --headed
  ```

- **View HTML report:**
  ```sh
  npx playwright show-report
  ```

---

## Key Methods

**HomePage Methods:**
- `navigateToEbay()`: Navigate to eBay homepage
- `verifyAdvancedSearchButton()`: Verify advanced search link
- `clickAdvancedSearch()`: Click advanced search link

**AdvancedSearchPage Methods:**
- `performAdvancedSearch(criteria)`: Execute search with given criteria
- `enterSearchKeywords(keywords)`: Enter search terms
- `selectCategory(category)`: Select product category
- Various checkbox methods for filters

**SearchResultsPage Methods:**
- `getItemDetails()`: Extract product information
- `scrapeAllPages(maxPages)`: Scrape multiple pages
- `goToNextPage()`: Navigate to next page
- `saveDataToFile(data, filename)`: Save results to file

---

## Web Scraping & Data Output

- The `SearchResultsPage.js` class contains methods to scrape titles, prices, and links from eBay search results.
- Scraped data is saved

## Web Scraping & Data Output

- The `SearchResultsPage.js` class contains methods to scrape titles, prices, and links from eBay search results.
- Scraped data is saved to `data/outputresults.json`.
- To run scraping as part of a test, ensure your test calls the relevant methods from the page object.

---

## Viewing Reports

- **HTML Report:** After running tests, open `playwright-report/index.html` for a detailed report.
- **JSON Data:** Scraped data is available in `data/outputresults.json`.

---

## Troubleshooting

- **Selectors not found:** Inspect the target website and update selectors in the page object classes.
- **Timeouts:** Adjust timeouts in `playwright.config.js` or in your page object methods.
- **No results scraped:** Ensure the selectors match the current website structure.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of your changes.

---
