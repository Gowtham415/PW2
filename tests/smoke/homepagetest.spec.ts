import { expect } from 'playwright/test'
import { test } from '../../fixtures/fixtures'

const pageTitle = 'Cleartrip: #1 Site for Booking Flights Tickets & Hotels Online - Get Best Travel Deals'

test('Title Test', async ({ homePage }) => {
    expect(await homePage.getTitle()).toEqual(pageTitle)
})

test('Verify if Search Flights Tab is displayed', async ({ page, homePage }) => {
    expect(await homePage.getDefaultTab().textContent()).toEqual('Enjoy hassle free flight ticket bookings at lowest airfare')
})

test('Verify if Login/Sign up btn is displayed in home page', async ({ homePage }) => {
    expect(homePage.getLoginSignUpBtn()).toBeVisible()
})

