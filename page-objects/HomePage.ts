import { Page } from '@playwright/test'
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    
    async goToSite() {
        await this.page.goto('/', { waitUntil: 'networkidle' })
    }

    async closeIcon() {
        const closeIconLocator = this.page.locator('[data-testid="closeIcon"]');
        await closeIconLocator.waitFor({ state: 'visible' });
        await closeIconLocator.click();
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