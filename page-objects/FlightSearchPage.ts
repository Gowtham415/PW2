import { Page } from '@playwright/test'

export class FlightSearchPage {

    constructor(public readonly page: Page) {
        this.page = page;
    }


}