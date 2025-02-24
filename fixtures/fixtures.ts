import { test as base, expect as baseExpect } from '@playwright/test';
import { Locator } from '@playwright/test';
import { FlightSearchPage } from '@pages/FlightSearchPage';
import { HomePage } from '@pages/HomePage';
import { HotelsPage } from '@pages/HotelsPage';
import logger from '@logger';

type Pages = {
    flightSearchPage: FlightSearchPage,
    homePage: HomePage,
    hotelsPage:HotelsPage
}

type ForEachWorker = {
    forEachTest: void
}

export const test = base.extend<Pages & ForEachWorker>({
    flightSearchPage: async ({ page }, use) => {
        const flightSearchPage = new FlightSearchPage(page);
        await use(flightSearchPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    hotelsPage:async({page},use)=>{
        const hotelsPage = new HotelsPage(page);
        await use(hotelsPage)
    },

    forEachTest: [async ({ page }, use) => {
        logger.info(`Starting test : ${test.info().title}`);
        const homePage = new HomePage(page);
        await homePage.goToSite()
        await homePage.closeDefaultTab()
        await use()
        logger.info(`Stopping test : ${test.info().title}`);
    }, { auto: true }],

})

export const expect = baseExpect.extend({
    
    async toHavePrice(locator: Locator, expected: number, options?: { timeout?: number }) {
        const assertionName = 'toHavePrice';
        let pass: boolean;
        let matcherResult: any;
    
        try {
          await baseExpect(locator).toHaveText(String(expected), options);
          pass = true;
        } catch (e: any) {
          matcherResult = e.matcherResult;
          pass = false;
        }
    
        return {
          pass,
          message: () => `expected ${locator} to have price ${expected}`,
        };
      },

      async searchButtonToBeVisible(locator: Locator, options?: { timeout: number }) {
        const assertionName = 'toBeSearchButtonVisible';
        let pass: boolean;
        let matcherResult: any;
      
        try {
          await baseExpect(locator).toBeVisible(options);
          pass = true;
        } catch (e: any) {
          matcherResult = e.matcherResult;
          pass = false;
        }
      
        return {
          pass,
          message: () => {
            if (pass) {
              return `Search button is visible`;
            } else {
              return `expected search button to be visible, but it was not`;
            }
          },
        };
      }
      
  });
  




