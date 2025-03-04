import { expect } from 'playwright/test'
import { test } from '@fixtures'
import { DateUtils } from '@utils/dateUtils'
import { cityPairs } from '@data/citypairs'
import {getCitiesArrayData} from '@utils/fileUtils'

const DAYS_AFTER_DEPARTURE_DATE = 2;

test('Flight Search', { tag: ['@smoke'] }, async ({ flightSearchPage }) => {
    const flightsToBook = await flightSearchPage.searchForRoundTripFlights()
    await expect(flightsToBook).toBeVisible()
})

test('One way Flight Search', { tag: ['@regression'] }, async ({ flightSearchPage }) => {
    const sourceCity = 'Hyderabad';
    const destinationCity = 'Chennai';
    await flightSearchPage.setSourceCity(sourceCity)
    await flightSearchPage.setDestinationCity(destinationCity)
    await flightSearchPage.selectDepartureDate(DateUtils.futureDate)
    const flightsToBook = await flightSearchPage.clickSearchFights()
    await expect(flightsToBook).toBeVisible();
})


for (const cities of cityPairs) {
    test(`One way Flight Search from ${cities.source} to ${cities.destination}`, { tag: ['@regression'] }, async ({ flightSearchPage }) => {
        await flightSearchPage.setSourceCity(cities.source);
        await flightSearchPage.setDestinationCity(cities.destination);
        await flightSearchPage.selectDepartureDate(DateUtils.futureDate);
        const flightsToBook = await flightSearchPage.clickSearchFights();
        await expect(flightsToBook).toBeVisible();
    });
}


for(const {source, destination} of cityPairs){
    test(`Flight Search - Round Trip from ${source} to ${destination}`, { tag: ['@regression'] }, async ({ flightSearchPage }) => {
        await flightSearchPage.setSourceCity('Mumbai')
        await flightSearchPage.setDestinationCity('Pune')
        await flightSearchPage.selectDepartureDate(DateUtils.futureDate)
        let returnDate :Date= new Date(DateUtils.futureDate);
        returnDate.setDate(DateUtils.futureDate.getDate() + DAYS_AFTER_DEPARTURE_DATE);
        await flightSearchPage.selectReturnDate(returnDate)
        await expect(await flightSearchPage.clickSearchFights()).toBeVisible()
    })
}

for (const cities of getCitiesArrayData()) {
    test(`One way Flight Search using CSV data from ${cities.sourceCity} to ${cities.destinationCity}`, { tag: ['@regression'] }, async ({ flightSearchPage }) => {
        await flightSearchPage.setSourceCity(cities.sourceCity);
        await flightSearchPage.setDestinationCity(cities.destinationCity);
        await flightSearchPage.selectDepartureDate(DateUtils.futureDate);
        const flightsToBook = await flightSearchPage.clickSearchFights();
        await expect(flightsToBook).toBeVisible();
    });
}


