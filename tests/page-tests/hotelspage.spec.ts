import { expect } from 'playwright/test'
import {test} from '../../fixtures/fixtures'

test('Hotels Tab', async ({hotelsPage})=>{
    await expect(await hotelsPage.goToPage()).toBeVisible()

})