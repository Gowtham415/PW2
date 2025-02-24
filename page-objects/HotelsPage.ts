import {expect, Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage'
import {hotelspage} from '@locators'

export class HotelsPage extends BasePage{

    async goToPage():Promise<Locator>{
        await this.page.getByRole('link',{name:`${hotelspage.hotelsTabName}`,exact:true}).click()
        return this.page.getByText(`${hotelspage.hotelsTabText}`)
    }

    async setLocality(locality:string){
        this.page.getByLabel('Enter locality, landmark, city or hotel').fill(locality)
        this.page.locator(`${hotelspage.localityInput.popularDestinationsSuggestionsList}`).getByRole('list',{name:locality,exact:true}).click()
        const inputLocality = await this.page.getByLabel(`${hotelspage.localityInput.labelText}`).inputValue()
        expect(inputLocality).toContainEqual(locality)
    }

    get getHotelsSearchBtn(){
        return this.page.getByRole('button',{name:hotelspage.searchHotelsBtnText});
    }

}