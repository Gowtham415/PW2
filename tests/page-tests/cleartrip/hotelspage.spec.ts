import { expect,test } from '@fixtures'

test('Hotels Tab', async ({hotelsPage})=>{
    await expect(await hotelsPage.goToPage()).toBeVisible()

})

test(' Search button is visible',async ({hotelsPage})=>{
    await hotelsPage.goToPage()
    await expect(hotelsPage.getHotelsSearchBtn).searchButtonToBeVisible();
})