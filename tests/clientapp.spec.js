const { test, expect } = require('@playwright/test');
 
test('@Web Client App login', async ({ page }) => {
   const email = "samsinghroy@gmail.com";
   const productName = 'ZARA COAT 3';
   
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Saran23@"); // Note: .fill() is preferred over .type()
   await page.locator("[value='Login']").click();
   
   // Wait for the elements to load completely
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   const titlecount = titles.length;
   console.log("Available Products:", titles); 

   // ADD SPECIFIC PRODUCT TO CART
   for (let i = 0; i < titlecount; i++) {
       if (titles[i] === productName) {
           // Target the specific index card, then find its "Add To Cart" button
           await page.locator(".card-body").nth(i).getByRole('button', { name: 'Add To Cart' }).click();
           break;
       }
   }

   // Verify the product name is added to cart
   await page.locator("[routerlink*='cart']").click();
   
   // Wait for the cart items list to render
   await page.locator("div li").first().waitFor(); 
   
   // Assert that the first item in the cart matches our product name
   const rawId = await page.locator("div li p").first().textContent();
   console.log("Raw Product ID Text:", rawId); // Debugging output
   const productId = rawId.trim();
   await expect(page.locator("div li h3").first()).toHaveText(productName);
   
   // Dynamic check if you want to ensure it exists anywhere in the list:
   const cartList = page.locator("div li h3");
   await expect(cartList).toContainText([productName]);


//proceed for the payment
});