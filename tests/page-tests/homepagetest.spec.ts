import { expect } from 'playwright/test'
import { test } from '@fixtures'
import { homepage } from '@locators'

const pageTitle = `${homepage.title}`

test('Title Test', async ({ homePage }) => {
    expect(await homePage.getTitle()).toEqual(pageTitle)
})

test('Verify if Search Flights Tab is displayed', async ({ homePage }) => {
    expect(await homePage.getHomePageDefaultTabText().textContent()).toEqual(`${homepage.defaultTabText}`)
})

test('Verify if Login/Sign up btn is displayed in home page', async ({ homePage }) => {
    await expect(homePage.getLoginSignUpBtn()).toBeVisible()
})

