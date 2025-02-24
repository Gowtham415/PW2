import { Page } from '@playwright/test'
import { BasePage } from './BasePage';
import {homepage} from '../test-data/locators.json'

export class HomePage extends BasePage {
    
    async goToSite() {
        await this.page.goto('/', { waitUntil: 'networkidle' })
    }

    async closeDefaultTab() {
        const closeIconLocator = this.page.locator(homepage.closeDialogIcon);
        await closeIconLocator.waitFor({ state: 'visible' });
        await closeIconLocator.click();
    }

    async getTitle() {
        return await this.page.title();
    }

    getHomePageDefaultTabText() {
        return this.page.getByText(`${homepage.defaultTabText}`)
    }

    getLoginSignUpBtn() {
        return this.page.getByRole("button",{name:`${homepage.loginSignUpBtn.buttonText}`});
    }

}