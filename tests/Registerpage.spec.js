const {test} = require('@playwright/test');

test('@Web Client App Register', async ({page}) => {
    await page.waitForLoadState('networkidle');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    await page.getByPlaceholder('First Name').fill("s1");
    await page.getByPlaceholder('Last Name').fill("s2");
    await page.getByPlaceholder('Email').fill("s1s2@gmail.com");
    await page.getByPlaceholder('enter your number').fill("1234567890");
    // Find the dropdown by its role, then select the option
    await page.getByRole('combobox').selectOption({ label: 'Student' });
    try{
    await page.locator('input[type="password"]').fill('YourSecurePassword123');
    }catch(error){
        console.log("Error filling confirm password: ", error);
    }
    await page.getByPlaceholder('Confirm Passsword').fill('YourSecurePassword123');
   await page.locator('input[value="Male"]').check();
  await page.locator('input[formcontrolname="required"]').check();
    await page.getByRole('button', { name: 'Register' }).click();
    await page.waitForLoadState('networkidle');
});