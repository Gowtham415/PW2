import { Page, expect } from '@playwright/test'

export class FlightSearchPage {

    constructor(public readonly page: Page) { }

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

    async setSourceCity(sourceCity: string) {
        await this.page.getByPlaceholder('Where from?').fill(sourceCity)
        await this.page.locator('.field-1').getByRole('listitem').getByText(sourceCity).click()
    }

    async setDestinationCity(destinationCity: string) {
        await this.page.getByPlaceholder('Where to?').fill(destinationCity)
        await this.page.locator('.field-2').getByRole('listitem').getByText(destinationCity).click()
    }

    async clickSearchFights() {
        await this.page.getByRole('button', { name: 'Search flights' }).click()
        await this.page.waitForLoadState('networkidle')
        return this.page.locator('button:has-text("Book")').first()
    }

    async selectDepartureDate(departureDate: Date) {
        const { datePanelTobeSelected, dateToAssert, expectedDate } = this.getDatesForValidation(departureDate);
        console.log(`Date panel for departure: ${datePanelTobeSelected}`);
        console.log(dateToAssert);

        const departureDateLocator = this.page.locator('[class="flex flex-middle p-relative homeCalender"]')
            .locator('[class="c-inherit flex flex-1 flex-nowrap fs-16 fw-500 card-price"]');

        await departureDateLocator.screenshot({ path: 'screenshots/destination.png' });
        await departureDateLocator.click();

        while (!(await this.page.locator('[class="DayPicker-Caption"]').allTextContents()).includes(datePanelTobeSelected)) {
            await this.page.locator('[data-testid="rightArrow"]').scrollIntoViewIfNeeded();
            await this.page.locator('[data-testid="rightArrow"]').click();
        }

        await this.page.locator('[class="DayPicker-Month"]', { hasText: `${datePanelTobeSelected}` })
            .getByText(expectedDate, { exact: true })
            .click({ delay: 200 });

        await expect(departureDateLocator).toHaveText(dateToAssert);
    }

    async selectReturnDate(returnDate: Date) {
        const { datePanelTobeSelected, dateToAssert, expectedDate } = this.getDatesForValidation(returnDate);
        console.log(`Date panel for return: ${datePanelTobeSelected}`);
        console.log(dateToAssert);

        const returnDateLocator = this.page.locator('[class=" c-neutral-400 flex flex-nowrap fs-16 fw-500"]').getByText('Return');
        await returnDateLocator.click();

        while (!(await this.page.locator('[class="DayPicker-Caption"]').allTextContents()).includes(datePanelTobeSelected)) {
            await this.page.locator('[data-testid="rightArrow"]').click();
        }

        await this.page.locator('[class="DayPicker-Month"]', { hasText: `${datePanelTobeSelected}` })
            .getByText(expectedDate, { exact: true }).click({ delay: 300 });

        await expect(this.page.locator('[class="c-inherit flex flex-1 flex-nowrap fs-16 fw-500 card-price"]').last())
            .toHaveText(dateToAssert);
    }

    private getDatesForValidation(dateOfSelection: Date) {
        const expectedDate = dateOfSelection.getDate().toString();
        const expectedMonthLong = dateOfSelection.toLocaleString('En-US', { month: 'long' });
        const expectedMonthShort = dateOfSelection.toLocaleString('En-US', { month: 'short' });
        const expectedDayInWeek = dateOfSelection.toLocaleString('En-US', { weekday: 'short' });
        const expectedYear = dateOfSelection.getFullYear();
        const datePanelTobeSelected = `${expectedMonthLong} ${expectedYear}`;
        const dateToAssert = `${expectedDayInWeek}, ${expectedMonthShort} ${expectedDate}`;
        return { datePanelTobeSelected, dateToAssert, expectedDate };
    }
}
