import { test as base } from '@playwright/test'
import { HomePage } from '../page-objects/HomePage'
import { FlightSearchPage } from '../page-objects/FlightSearchPage'
import { HotelsPage } from '../page-objects/HotelsPage'
import logger from '../logger'



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


