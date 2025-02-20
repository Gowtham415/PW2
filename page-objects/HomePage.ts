import { Page } from '@playwright/test'

export class HomePage {

    constructor(public readonly page: Page) {
        this.page = page;
    }

    async goToSite() {
        await this.page.goto('/', { waitUntil: 'networkidle' })
    }

    async closeIcon() {
        await this.page.locator('[data-testid="closeIcon"]').click({ delay: 200 })
    }

    async getTitle() {
        return await this.page.title();
    }

    getDefaultTab() {
        return this.page.getByText('Enjoy hassle free flight ticket bookings at lowest airfare')
    }

    getLoginSignUpBtn() {
        return this.page.getByRole('button', { name: 'Log in / Sign up' })
    }

}