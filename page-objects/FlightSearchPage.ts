import { Page } from '@playwright/test'

export class FlightSearchPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }


}