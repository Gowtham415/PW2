import { Page } from '@playwright/test'

export class HomePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async goToSite() {
        await this.page.goto('/')
    }

    async closeIcon() {
        await this.page.locator('[data-testid=closeIcon]').click()
    }


}