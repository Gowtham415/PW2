import {test} from '@playwright/test'

test('Go to page', async ({page})=>{
    await page.goto('https://www.cleartrip.com/')
})