import { Page, expect, Locator } from '@playwright/test'
import { DateUtils } from '../tests/helpers/dateHelper';
import { BasePage } from './BasePage';

export class FlightSearchPage extends BasePage{

    async searchForRoundTripFlights() {
        let departureDate = new Date();
        departureDate.setDate(departureDate.getDate() + 10);

        let returnDate = new Date(departureDate);
        returnDate.setDate(departureDate.getDate() + 2);

        await this.setSourceCity('Bangalore')
        await this.setDestinationCity('Mumbai')
        await this.selectDepartureDate(departureDate);
        await this.selectReturnDate(returnDate);
        return await this.clickSearchFights()
    }

    async setSourceCity(sourceCity: string):Promise<void> {
        await this.page.getByPlaceholder('Where from?').fill(sourceCity)
        await this.page.locator('.field-1').getByRole('listitem').getByText(sourceCity).click()
    }

    async setDestinationCity(destinationCity: string):Promise<void> {
        await this.page.getByPlaceholder('Where to?').fill(destinationCity)
        await this.page.locator('.field-2').getByRole('listitem').getByText(destinationCity).click()
    }

    async clickSearchFights():Promise<Locator> {
        await this.page.getByRole('button', { name: 'Search flights' }).click()
        await this.page.waitForLoadState('networkidle')
        return this.page.locator('button:has-text("Book")').first()
    }

    async selectDepartureDate(departureDate: Date): Promise<void> {
        const { datePanelTobeSelected, dateToAssert, dateToBeSet } = DateUtils.getDatesForValidation(departureDate);
        console.log(`Date panel for departure: ${datePanelTobeSelected}`);
        console.log(dateToAssert);

        const departureDateLocator = this.page.locator('[class="flex flex-middle p-relative homeCalender"]')
            .locator('[class="c-inherit flex flex-1 flex-nowrap fs-16 fw-500 card-price"]');

        await departureDateLocator.click();
        this.setDateOfDepartureOrReturn(datePanelTobeSelected,dateToBeSet)
        await expect(departureDateLocator).toHaveText(dateToAssert);
    }

    async selectReturnDate(returnDate: Date): Promise<void> {
        const { datePanelTobeSelected, dateToAssert, dateToBeSet } = DateUtils.getDatesForValidation(returnDate);
        console.log(`Date panel for return: ${datePanelTobeSelected}`);
        console.log(dateToAssert);
        const returnDateLocator = this.page.locator('[class=" c-neutral-400 flex flex-nowrap fs-16 fw-500"]').getByText('Return');
        await returnDateLocator.click();
        this.setDateOfDepartureOrReturn(datePanelTobeSelected,dateToBeSet);
        await expect(this.page.locator('[class="c-inherit flex flex-1 flex-nowrap fs-16 fw-500 card-price"]').last())
            .toHaveText(dateToAssert);
    }

    
}
