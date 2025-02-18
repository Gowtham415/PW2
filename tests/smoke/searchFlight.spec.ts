import { test } from '../../fixtures/fixtures'


test.beforeEach('Home page load', async ({ homePage }) => {
    await homePage.goToSite()
    await homePage.closeIcon()
})


test('Search for Flights', async ({ page }) => {

})

