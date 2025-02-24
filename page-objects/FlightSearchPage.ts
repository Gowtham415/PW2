import { Page, expect, Locator } from '@playwright/test'
import { DateUtils } from '../helpers/dateUtils';
import { BasePage } from './BasePage';
import {calendarLocators} from '../test-data/locators.json'
import logger from '../logger';
import {flightsearchpage} from '../test-data/locators.json'

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
        await this.page.getByPlaceholder(flightsearchpage.sourceCity.placeholderText).fill(sourceCity)
        await this.page.locator(flightsearchpage.sourceCity.citySuggestionListClass).getByRole('listitem').getByText(sourceCity).click()
    }

    async setDestinationCity(destinationCity: string):Promise<void> {
        await this.page.getByPlaceholder(flightsearchpage.destinationCity.placeholderText).fill(destinationCity)
        await this.page.locator(flightsearchpage.destinationCity.citySuggestionListClass).getByRole('listitem').getByText(destinationCity).click()
    }

    async clickSearchFights():Promise<Locator> {
        await this.page.getByRole('button', { name: `${flightsearchpage.searchFlightsSubmitBtnText}` }).click()
        await this.page.waitForLoadState('networkidle')
        return this.page.locator(`${flightsearchpage.searchResultsPage.bookBtn}`).first()
    }

    async selectDepartureDate(departureDate: Date): Promise<void> {
        const { datePanelTobeSelected, dateToAssert, dateToBeSet } = DateUtils.getDatesForValidation(departureDate);
        logger.info(`Date panel for departure: ${datePanelTobeSelected}`);
        logger.info(`Date to assert: ${dateToAssert}`);

        const departureDateLocator = this.page.locator(calendarLocators.departureDateLocator.calenderInputField)
            .locator(calendarLocators.departureDateLocator.calendarCard);

        await departureDateLocator.click();
        this.setDateOfDepartureOrReturn(datePanelTobeSelected,dateToBeSet)
        await expect(departureDateLocator).toHaveText(dateToAssert);
    }

    async selectReturnDate(returnDate: Date): Promise<void> {
        const { datePanelTobeSelected, dateToAssert, dateToBeSet } = DateUtils.getDatesForValidation(returnDate);
        logger.info(`Date panel for return: ${datePanelTobeSelected}`);
        logger.info(dateToAssert);
        const returnDateLocator = this.page.locator(calendarLocators.returnDateLocator.returnDate).getByText(calendarLocators.returnDateLocator.visibleText);
        await returnDateLocator.click();
        this.setDateOfDepartureOrReturn(datePanelTobeSelected,dateToBeSet);
        await expect(this.page.locator(calendarLocators.returnDateLocator.returnDateValueAfterSelection).last())
            .toHaveText(dateToAssert);
    }

    
}
