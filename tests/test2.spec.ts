import test, { expect } from "@playwright/test"
test('Assertions', async ({ page }) => {
    await page.goto('https://www.getpancard.com/apply-new-pan-card-online')
    const rbIndividual = page.locator('#rblCategory_0')
    await expect(rbIndividual).toBeChecked()
    const rbMale =page.locator('#rblGender_0')
    await expect(rbMale).not.toBeChecked()
    const cbTC = page.locator('#agreeproof')
    await expect.soft(cbTC).not.toBeChecked()
    await expect(cbTC).not.toBeInViewport()
    await page.waitForTimeout(3000)
    await page.close()
    
})

