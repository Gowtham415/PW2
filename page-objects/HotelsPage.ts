import {expect, Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage'

export class HotelsPage extends BasePage{

    async goToPage():Promise<Locator>{
        await this.page.getByRole('link',{name:'Hotels',exact:true}).click()
        return this.page.getByText('Enjoy hassle free bookings with Cleartrip')
    }

    async setLocality(locality:string){
        this.page.getByLabel('Enter locality, landmark, city or hotel').fill(locality)
        this.page.locator('#modify_search_list_container_id').getByRole('list',{name:'Goa',exact:true}).click()
        const inputLocality = await this.page.getByLabel('Enter locality, landmark, city or hotel').inputValue()
        expect(inputLocality).toContainEqual(locality)
    }

}