import { Page } from "playwright";
import { BasePage } from "./BasePage";

export class HRMHomePage extends BasePage{
    async launch(){
        await this.page.goto('https://www.orangehrm.com/');
    }
}