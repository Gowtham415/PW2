import { expect } from 'playwright/test'
import { test } from '../../fixtures/fixtures'

test('Flight Search', async ({ flightSearchPage, page }) => {
    await flightSearchPage.searchForFlights()
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('button', { name: 'Book now' })).toBeVisible()
})

