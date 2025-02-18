import { test as base } from '@playwright/test'
import { HomePage } from '../page-objects/HomePage'
import { FlightSearchPage } from '../page-objects/FlightSearchPage'


export type Pages = {
    flightSearch: FlightSearchPage,
    homePage: HomePage
}

export const test = base.extend<Pages>({
    flightSearch: async ({ page }, use) => {
        const flightSearch = new FlightSearchPage(page);
        await use(flightSearch);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }
})


