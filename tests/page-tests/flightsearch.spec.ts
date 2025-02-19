import { expect } from 'playwright/test'
import { test } from '../../fixtures/fixtures'

test('Flight Search', async ({ flightSearchPage, page }) => {
    await flightSearchPage.searchForFlights()
    page.waitForLoadState()
    expect(page.getByText('Book now')).toBeVisible()
})

