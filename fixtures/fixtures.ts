import { test as base } from '@playwright/test'
import { HomePage } from '../page-objects/HomePage'
import { FlightSearchPage } from '../page-objects/FlightSearchPage'
import { HotelsPage } from '../page-objects/HotelsPage'


type Pages = {
    flightSearchPage: FlightSearchPage,
    homePage: HomePage,
    hotelsPage:HotelsPage
}

type ForEachWorker = {
    forEachWorker: void,
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
        console.log(`Starting test : ${test.info().title}`);
        const homePage = new HomePage(page);
        await homePage.goToSite()
        await homePage.closeIcon()
        await use()
        console.log(`Stopping test : ${test.info().title}`);
    }, { auto: true }]
})


