import test, { expect } from "@playwright/test"
import exp from "constants";

test('Text Field Actions', async ({ page }) => {
    await page.goto('https://www.thepancard.com/');
    await page.getByRole('link', { name: 'Apply New PAN Card', exact: true }).click();
    await page.waitForTimeout(5000);
    const txtDOB = page.getByRole('textbox', { name: 'DD/MM/YYYY' })
    console.log(await txtDOB.isVisible())
    console.log(await txtDOB.isEnabled())
    await txtDOB.fill('01/01/1991')
    await page.waitForTimeout(5000);
    await txtDOB.clear()
    await page.waitForTimeout(5000);
    await page.close();
})

test('How to intract with Radio Buttons', async ({ page }) => {
    await page.goto('https://www.thepancard.com/');
    await page.click("//b[text()='Apply New PAN Card']");
    const rbMale = page.locator('#rblGender_0')
    await rbMale.click()
    console.log(await rbMale.isChecked())
    await page.waitForTimeout(3000);
    await page.click('#rblGender_1');
    await page.waitForTimeout(5000);
    await page.close();

})


test('How to intract with Checkboxes', async ({ page }) => {
    await page.goto('https://www.thepancard.com/')
    await page.locator("//b[text()='Apply New PAN Card']").click()
    const cbTC = page.locator('#agreeproof')
    let status = await cbTC.isChecked()
    expect(status).toBeFalsy()
    await page.waitForTimeout(3000);
    await cbTC.uncheck()
    status = await cbTC.isChecked()
    expect(status).toBeFalsy()
    await page.waitForTimeout(3000);
    await cbTC.check()
    status = await cbTC.isChecked()
    expect(status).toBeTruthy()
    await page.waitForTimeout(5000);
    await page.close()


})


test('How to intract with DropDowns', async ({ page }) => {
    await page.goto('https://www.thepancard.com/')
    await page.locator("text='Apply New PAN Card'").click()
    const lstPDOB = page.locator('#proof_dob')
    expect(lstPDOB).toBeVisible()
    expect(lstPDOB).toBeEnabled()
    await lstPDOB.selectOption({ index: 1 })
    let optionText = await lstPDOB.locator('option:checked').textContent()
    expect(optionText?.trim()).toBe('AADHAAR Card issued by UIDAI')
    await page.waitForTimeout(3000)
    await lstPDOB.selectOption({ label: 'Passport' })
    optionText = await lstPDOB.locator('option:checked').textContent();
    expect(optionText?.trim()).toBe('Passport')
    await page.waitForTimeout(3000)
    await lstPDOB.selectOption({ value: '12' })
    optionText = await lstPDOB.locator('option:checked').textContent()
    expect(optionText?.trim()).toBe('Voters ID Card')
    await page.waitForTimeout(5000)
    await page.close()

})

test('How to select multiple options from List box', async ({ page }) => {
    test.setTimeout(60000)
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select_multiple')
    const frame = page.frameLocator('#iframeResult')
    const lstCars = frame.locator('#cars')
    lstCars.selectOption([
        { index: 0 },
        { index: 1 }
    ])
    expect((await lstCars.locator('option:checked').allTextContents()).length).toBe(2)
    console.log(await lstCars.locator('option').count())
    expect(await lstCars.locator('option').count()).toBe(4)
    await page.waitForTimeout(5000)
    await page.close()

})



test('How to handle Simple Alert', async ({ page }) => {
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


test('How to handle Prompt Alert', async ({ page }) => {

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


test('How to handle multiple Alerts', async ({ page }) => {

    page.on('dialog', (dialog) => {
        console.log(dialog.message())
        console.log(dialog.type())

        switch (dialog.type()) {
            case 'alert':
                dialog.accept()
                break;
            case 'confirm':
                dialog.dismiss()
                break;
            case 'prompt':
                dialog.accept("SRIKRISHNA")
                break;
        }

    })
    await page.goto('http://secure.smartbearsoftware.com/samples/testcomplete14/dialogs/#')
    await page.waitForTimeout(5000)
    await page.getByText('Show Alert').click()
    await page.waitForTimeout(5000)
    await page.getByText('Show Confirm').click()
    await page.waitForTimeout(5000)
    await page.getByText('Show Prompt').click()
    await page.waitForTimeout(5000)
    await page.close()
})


test('How to handle Frames', async ({ page }) => {
    await page.goto('https://hamcrest.org/JavaHamcrest/javadoc/2.2/')
    await page.waitForTimeout(5000)
    console.log(await page.locator('//iframe|//frame').count())
    expect(await page.locator('//iframe|//frame').count()).toBe(3)
    let frame = page.frameLocator("(//iframe|//frame)[1]")
    frame?.locator("//a[text()='org.hamcrest']").first().click()
    await page.waitForTimeout(5000)
    frame = page.frameLocator("(//iframe|//frame)[2]")
    await frame?.locator("//span[text()='Matcher']").click()
    frame = page.frameLocator("(//iframe|//frame)[3]")
    await page.waitForTimeout(5000)
    await frame?.locator("//a[text()='AllOf']").click()
    await page.waitForTimeout(5000)
    await page.close()

})


test('How to use kwyboard actions', async ({ page }) => {
    test.setTimeout(60000)
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select_multiple')
    const frame = page.frame({ name: 'iframeResult' })
    await page.keyboard.down('Control')
    await frame?.locator("//option[@value='volvo']").click()
    await page.waitForTimeout(3000)
    await frame?.locator("//option[@value='opel']").click()
    await page.waitForTimeout(3000)
    await frame?.locator("//option[@value='audi']").click()
    await page.waitForTimeout(3000)
    await page.keyboard.up('Control')
    await page.close()

})


test('How to find number of Tables', async ({ page }) => {
    await page.goto('https://datatables.net/examples/basic_init/data_rendering.html')
    await page.waitForTimeout(5000)
    expect(await page.locator('//table').count()).toBe(6)
    expect(await page.locator("//table[@id='example']//tr").count()).toBe(12)
    expect(await page.locator("//table[@id='example']//tbody//tr").count()).toBe(10)
    expect(await page.locator("//table[@id='example']//thead//th").count()).toBe(6)
    let content = await page.locator("((//table[@id='example']//tbody//tr)[2]//td)[6]").innerText()
    console.log(content)
    await page.waitForTimeout(5000)
    await page.close()
    
})


test('How to take screenshot', async ({ page }) => {
    await page.goto('https://datatables.net/examples/basic_init/data_rendering.html')
    await page.waitForTimeout(5000)
    await page.screenshot({path:'Image3.png',fullPage:true})
    await page.waitForTimeout(5000)
    await page.close()
    
})


test('How to upload file', async ({ page }) => {
    await page.goto('https://tax2win.in/efile-income-tax-return/upload-form16')
    await page.waitForTimeout(5000)
    await page.locator('#file-1').setInputFiles(['E:\\Resume.pdf'])
    
    await page.waitForTimeout(15000)
    await page.close()
    
})

test('How to use JavaScript', async ({ page }) => {
    await page.goto("https://www.getpancard.com/apply-new-pan-card-online")
    await page.waitForTimeout(5000)
    await page.evaluate("document.getElementById('txtDOB').style.background='red'")
    await page.waitForTimeout(5000)
    await page.close()
})

