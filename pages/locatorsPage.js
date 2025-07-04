import BasePage from "./basePage";
import { test, expect } from 'playwright/test';


class LocatorsPage extends BasePage {
    constructor(page){
        super(page);
        this.locators = {
            "header": "//div[@class='header']",
            "footer": "//div[@class='footer']",
        }
    }


    // Playwright Built-in Locators 
    async buitinLocators(){
        const advancedLocator = await this.page.getByRole('link', { name: 'Advanced' });
        const condition = await this.page.getByText('New', { exact: true });
        const nextPage = await this.page.getByRole('link', { name: '2', exact: true });
        const nextSearchPage = await this.page.getByRole('link', { name: 'Go to next search page' });
    }
}



import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.ebay.com/');
  await page.getByRole('link', { name: 'Advanced' }).click();
  await page.getByTestId('_nkw').click();
  await page.getByTestId('_nkw').press('CapsLock');
  await page.getByTestId('_nkw').fill('O');
  await page.getByTestId('_nkw').press('CapsLock');
  await page.getByTestId('_nkw').fill('Outdoor ');
  await page.getByTestId('_nkw').press('CapsLock');
  await page.getByTestId('_nkw').fill('Outdoor T');
  await page.getByTestId('_nkw').press('CapsLock');
  await page.getByTestId('_nkw').fill('Outdoor Toys');
  await page.getByTestId('s0-1-17-4[0]-7[1]-_in_kw').selectOption('2');
  await page.getByTestId('s0-1-17-4[0]-7[3]-_sacat').selectOption('220');
  await page.getByTestId('s0-1-17-5[1]-[0]-LH_TitleDesc').check();
  await page.getByText('New', { exact: true }).click();
  await page.getByTestId('s0-1-17-5[5]-[0]-LH_FR').check();
  await page.getByTestId('s0-1-17-5[5]-[1]-LH_RPA').check();
  await page.getByTestId('s0-1-17-6[7]-[3]-LH_PrefLoc').check();
  await page.getByTestId('s0-1-17-8[9]-1[0]-_sop').selectOption('15');
  await page.getByTestId('s0-1-17-8[9]-1[0]-_sop').selectOption('10');
  await page.getByTestId('s0-1-17-8[9]-1[2]-_ipg').selectOption('60');
  await page.locator('div').filter({ hasText: /^SearchClear options$/ }).getByRole('button').click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('#srp-river-results').click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent('popup');
  await page.locator('body').click();
  const page2 = await page2Promise;
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('listitem').filter({ hasText: 'New Deformabl Robot Beetle' }).click();
  const page3 = await page3Promise;
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'New Deformabl Robot Beetle' }).click();
  const page4 = await page4Promise;
  const page5Promise = page.waitForEvent('popup');
  await page.locator('#srp-river-results').click();
  const page5 = await page5Promise;
  await page.locator('#rtm_html_278').click();
  await page.getByRole('link', { name: '2', exact: true }).click();
  await page.getByRole('link', { name: 'Go to next search page' }).click();
});