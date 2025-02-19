import { Page, expect } from '@playwright/test'

export class FlightSearchPage {

    constructor(public readonly page: Page) { }

    async searchForFlights() {
        let departureDate = new Date();
        departureDate.setDate(departureDate.getDate() + 10);

        let returnDate = new Date(departureDate);
        returnDate.setDate(departureDate.getDate() + 2);

        await this.selectDepartureDate(departureDate);
        await this.selectReturnDate(returnDate);
    }

    private async selectDepartureDate(departureDate: Date) {
        const { datePanelTobeSelected, dateToAssert, expectedDate } = this.getDatesForValidation(departureDate);
        console.log(`Date panel for departure: ${datePanelTobeSelected}`);
        console.log(dateToAssert);

        const departureDateLocator = this.page.locator('[class="flex flex-middle p-relative homeCalender"]')
            .locator('[class="c-inherit flex flex-1 flex-nowrap fs-16 fw-500 card-price"]');

        await departureDateLocator.screenshot({ path: 'screenshots/destination.png' });
        await departureDateLocator.click();

        while (!(await this.page.locator('[class="DayPicker-Caption"]').allTextContents()).includes(datePanelTobeSelected)) {
            await this.page.locator('[data-testid="rightArrow"]').click();
        }

        await this.page.locator('[class="DayPicker-Month"]', { hasText: `${datePanelTobeSelected}` })
            .getByText(expectedDate, { exact: true })
            .click();

        await expect(departureDateLocator).toHaveText(dateToAssert);
    }

    private async selectReturnDate(returnDate: Date) {
        const { datePanelTobeSelected, dateToAssert, expectedDate } = this.getDatesForValidation(returnDate);
        console.log(`Date panel for return: ${datePanelTobeSelected}`);
        console.log(dateToAssert);

        const returnDateLocator = this.page.locator('[class=" c-neutral-400 flex flex-nowrap fs-16 fw-500"]').getByText('Return');
        await returnDateLocator.click();

        while (!(await this.page.locator('[class="DayPicker-Caption"]').allTextContents()).includes(datePanelTobeSelected)) {
            await this.page.locator('[data-testid="rightArrow"]').click();
        }

        await this.page.locator('[class="DayPicker-Month"]', { hasText: `${datePanelTobeSelected}` })
            .getByText(expectedDate, { exact: true }).scrollIntoViewIfNeeded()
        await this.page.locator('[class="DayPicker-Month"]', { hasText: `${datePanelTobeSelected}` })
            .getByText(expectedDate, { exact: true }).click();

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
