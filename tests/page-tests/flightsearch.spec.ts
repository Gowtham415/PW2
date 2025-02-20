import { expect } from 'playwright/test'
import { test } from '../../fixtures/fixtures'
import { DateUtils } from '../helpers/dateHelper'

test('Flight Search', { tag: ['@smoke'] }, async ({ flightSearchPage, page }) => {
    const flightsToBook = await flightSearchPage.searchForRoundTripFlights()
    await expect(flightsToBook).toBeVisible()
})

test('One way Flight Search', { tag: ['@regression'] }, async ({ flightSearchPage, page }) => {
    await flightSearchPage.setSourceCity('Hyderabad')
    await flightSearchPage.setDestinationCity('Chennai')
    await flightSearchPage.selectDepartureDate(DateUtils.futureDate)
    const flightsToBook = await flightSearchPage.clickSearchFights()
    await expect(flightsToBook).toBeVisible();
})

