import {Page} from '@playwright/test'

export class BasePage{

    constructor(protected readonly page:Page){}

    protected async setDateOfDepartureOrReturn(datePanelTobeSelected:string,dateToBeSet:string){
        this.selectDatePanel(datePanelTobeSelected);
         await this.page.locator('[class="DayPicker-Month"]', { hasText: `${datePanelTobeSelected}` })
             .getByText(dateToBeSet, { exact: true }).click({ delay: 300 });
 
     }
 
     protected async selectDatePanel(datePanelTobeSelected:string){
         while (!(await this.page.locator('[class="DayPicker-Caption"]').allTextContents()).includes(datePanelTobeSelected)) {
             await this.page.locator('[data-testid="rightArrow"]').scrollIntoViewIfNeeded();
             await this.page.locator('[data-testid="rightArrow"]').click();
         }
     }
}