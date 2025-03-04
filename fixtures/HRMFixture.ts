import {test as basePage}  from '@playwright/test';
import { HRMHomePage } from '@pages/HRMHomePage';


type HRMPages={
    hrmHomepage : HRMHomePage; 
}

export const test = basePage.extend<HRMPages>({
    hrmHomepage: async ({page}, use) => {
        await use(new HRMHomePage(page));
    }
})