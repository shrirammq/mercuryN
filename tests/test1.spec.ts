import { test, expect, chromium, firefox, webkit,Browser, Page } from "@playwright/test";
import fs from 'fs'

test('Add To Cart', async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com/')
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const logoutPage = new LogoutPage(page)
    const testdata =    JSON.parse(fs.readFileSync('E:\\Testdata.json','utf8'))
    for(const data of testdata){
    await loginPage.login(data.username,data.password)
    await homePage.addRemove()
    await logoutPage.logout()
    }
    await page.close()
  
})

export class LoginPage{
    private page:Page
    private txtUserName:string = '#user-name'
    private txtPassword:string = '#password'
    private btnLogin:string = '#login-button'
    constructor(page:Page){
        this.page = page
    }

    async login(username:string,password:string){
        await this.page.locator(this.txtUserName).fill(username)
        await this.page.locator(this.txtPassword).fill(password)
        await this.page.locator(this.btnLogin).click()

    }


}

export class HomePage{
private page:Page
    private btnAdd:string = '#add-to-cart-sauce-labs-backpack'
    private btnRemove:string = '#remove-sauce-labs-backpack'
    constructor(page:Page){
        this.page = page
    }

    async addRemove(){
        await this.page.locator(this.btnAdd).click()
        await this.page.locator(this.btnRemove).click()
    }

}

export class LogoutPage{
    private page:Page
    private btnIcon:string = '#react-burger-menu-btn'
    private btnLogout:string = '#logout_sidebar_link'
    constructor(page:Page){
        this.page = page
    }

    async logout(){
        await this.page.locator(this.btnIcon).click()
        await this.page.locator(this.btnLogout).click()
    }

}


