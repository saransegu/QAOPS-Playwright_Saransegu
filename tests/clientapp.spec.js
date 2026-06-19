const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/Loginpage.js');
const { Dashboard }=require('../Pages/Dashboard.js');
 
test('@Web Client App login', async ({ page }) => {
   const email = "samsinghroy@gmail.com";
   const productName = 'ZARA COAT 3';
  
   const Login=new LoginPage(page);
   await Login.navigate();
   await Login.ValidLogin(email,"Saran23@");
   
   // Wait for the elements to load completely
   const Dashboard=new Dashboard(page);
   await Dashboard.searchProductAddCart(productName);
   await Dashboard.navigateToOrders();
   await Dashboard.navigateToCart()
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   const titlecount = titles.length;
   console.log("Available Products:", titles); 


  // FIX: Replace networkidle with an explicit locator wait
  const countryInput = page.getByPlaceholder('Select Country');
  await countryInput.waitFor({ state: 'visible' });

  // Automate the dynamic country dropdown (e.g., searching for India)
  await countryInput.pressSequentially('ind', { delay: 100 });
  
  // Wait for the dropdown results group to appear and click the desired option
  const dropdownOptions = page.locator('.ta-results');
  await dropdownOptions.waitFor({ state: 'visible' });
  
  // Click the specific matching option (using ' India' with a leading space if needed based on application markup)
  await dropdownOptions.getByRole('button', { name: 'India', exact: false }).click();

  // Click the Submit/Place Order button
  await page.getByText('PLACE ORDER').click();

  // Verify successful order placement confirmation text
  await expect(page.locator('.hero-primary')).toContainText('Thankyou for the order.');
});
