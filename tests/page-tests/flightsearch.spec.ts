import { expect } from 'playwright/test'
import { test } from '../../fixtures/fixtures'
import { DateUtils } from '../../helpers/dateUtils'

const DAYS_AFTER_DEPARTURE_DATE = 2;

test('Flight Search', { tag: ['@smoke'] }, async ({ flightSearchPage }) => {
    const flightsToBook = await flightSearchPage.searchForRoundTripFlights()
    await expect(flightsToBook).toBeVisible()
})

test('One way Flight Search', { tag: ['@regression'] }, async ({ flightSearchPage }) => {
    await flightSearchPage.setSourceCity('Hyderabad')
    await flightSearchPage.setDestinationCity('Chennai')
    await flightSearchPage.selectDepartureDate(DateUtils.futureDate)
    const flightsToBook = await flightSearchPage.clickSearchFights()
    await expect(flightsToBook).toBeVisible();
})

test('Flight Search - Round Trip', { tag: ['@regression'] }, async ({ flightSearchPage }) => {
    await flightSearchPage.setSourceCity('Mumbai')
    await flightSearchPage.setDestinationCity('Pune')
    await flightSearchPage.selectDepartureDate(DateUtils.futureDate)
    let returnDate :Date= new Date(DateUtils.futureDate);
    returnDate.setDate(DateUtils.futureDate.getDate() + DAYS_AFTER_DEPARTURE_DATE);
    await flightSearchPage.selectReturnDate(returnDate)
    await expect(await flightSearchPage.clickSearchFights()).toBeVisible()
})

