
import logger from '@logger';
import {test} from 'fixtures/HRMFixture';
import {expect} from 'fixtures/fixtures';
import {hrmlocators} from '@hrmlocators'

test('HRM Home Page Test - Title Test',async ({hrmHomepage})=>{
    await hrmHomepage.launch();
    logger.info(`Navigated to OrangeHRM homepage with title : ${await hrmHomepage.pageTitle()}`);
    expect(await hrmHomepage.pageTitle()).toEqual(hrmlocators.homePageTitle);
})


test('Webtable Test',async ({hrmHomepage,page})=>{
   await page.goto('https://cosmocode.io/automation-practice-webtable/')
  const rows=await page.getByRole('row').all()
  for (const row of rows) {
    // Get the second column value (index 2 in 1-based counting, so index 1 in 0-based)
    const secondColumnValue = await row.locator('td:nth-of-type(2)').textContent();
    if (secondColumnValue) {
        logger.info(secondColumnValue.trim());
    }
}
})

test('Second Web Table Test',async({page})=>{
  await page.goto('https://cosmocode.io/automation-practice-webtable/')
  const data = page.getByRole('row').filter({hasText: 'Belgium'}).locator('td:nth-of-type(5)').textContent()
  logger.info(`Data is : ${await data}`)
  expect(await data).toEqual('Dutch; French; German')
})


const countriesList = ['Belgium','Germany','France','India']

countriesList.forEach((country)=>{
  test(`Web Table with for Each - ${country}`, async({page})=>{
    await page.goto('https://cosmocode.io/automation-practice-webtable/')
    const data = page.getByRole('row').filter({hasText: country}).locator('td:nth-of-type(5)').textContent()
    logger.info(`Data is : ${await data}`)
    expect(await data).not.toBe(null)
  })
})