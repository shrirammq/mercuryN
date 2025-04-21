import test, { expect } from "@playwright/test"

test.describe('Alerts', () => {
  test('How to handle Simple Alert', async ({ page }) => {
    test.slow()
    await page.goto('http://secure.smartbearsoftware.com/samples/testcomplete14/dialogs/#')
    await page.waitForTimeout(5000)
    page.on('dialog', dialog => {
      console.log(dialog.message())
      expect(dialog.message()).toBe('Alert button is pressed.')
      console.log(dialog.type())
      expect(dialog.type()).toBe('alert')
      dialog.accept()
    });

    await page.getByText('Show Alert').click()
    await page.waitForTimeout(5000)
    await page.close()

  })


  test('How to handle Confirm Alert', async ({ page }) => {
    await page.goto('http://secure.smartbearsoftware.com/samples/testcomplete14/dialogs/#')
    await page.waitForTimeout(5000)
    page.on('dialog', (dialog) => {
      console.log(dialog.message())
      expect(dialog.message()).toBe('Press a button')
      console.log(dialog.type())
      expect(dialog.type()).toBe('confirm')
      dialog.accept()
    })
    await page.getByText('Show Confirm').click()
    await page.waitForTimeout(5000)
    await page.close()
  })

  test.fixme('How to handle Prompt Alert', async ({ page }) => {
    await page.goto('http://secure.smartbearsoftware.com/samples/testcomplete14/dialogs/#')
    await page.waitForTimeout(5000)
    page.on('dialog', dialog => {
      console.log(dialog.message())
      console.log(dialog.type())
      expect(dialog.message()).toBe('Please enter your name')
      expect(dialog.type()).toBe('prompt')
      dialog.accept('SRIKRISHNA')
    });
    await page.getByText('Show Prompt').click()
    await page.waitForTimeout(5000)
    await page.close()
  })


test.fail('Fail Test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await expect(page).toHaveTitle('Swag Labs')
  await page.waitForTimeout(5000)
  await page.close()

})


})