import { test as base } from '@playwright/test'
import { HomePage } from '../page-objects/HomePage'
import { FlightSearchPage } from '../page-objects/FlightSearchPage'
import { Console } from 'console'


type Pages = {
    flightSearch: FlightSearchPage,
    homePage: HomePage
}

type ForEachWorker = {
    forEachWorker: void,
    forEachTest: void
}

export const test = base.extend<Pages & ForEachWorker>({
    flightSearch: async ({ page }, use) => {
        const flightSearch = new FlightSearchPage(page);
        await use(flightSearch);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    forEachTest: [async ({ page }, use) => {
        console.log(`Starting test : ${test.info().title}`);
        const homePage = new HomePage(page);
        await homePage.goToSite()
        await homePage.closeIcon()
        await use()
        console.log(`Stopping test : ${test.info().title}`);
    }, { auto: true }]
})


