const{test,expect}=require('@playwright/test');
const context =await browser.newcontext();
const page=await context.newpage();


test("Petsstore", async ({ page }) => {
await page.goto("https://petstore.octoperf.com/")    
expect(page).toHaveTitle("JPetStore Demo");
await page.locator(hasText("Enter the Store")).click();



});