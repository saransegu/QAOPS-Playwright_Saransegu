const { test, expect } = require('@playwright/test');

test('Search watches on Amazon and select a Noise watch under 3000', async ({ page }) => {
  // 1. Navigate to Amazon India
  await page.goto('https://www.amazon.in');

  // 2. Search for "watches"
  const searchBox = page.locator('#twotabsearchtextbox');
  await searchBox.fill('watches');
  await searchBox.press('Enter');

  // 3. Wait for the search results grid to load completely
  await page.waitForSelector('div[data-component-type="s-search-result"]');

  // 4. Extract all watch product cards
  const watchCards = await page.locator('div[data-component-type="s-search-result"]').all();
  
  let targetWatchFound = false;

  // 5. Loop through each watch card to find a match
  for (const card of watchCards) {
    // Extract the product title text
    const titleText = await card.locator('h2 a').textContent().catch(() => '');
    
    // Extract the raw price text safely
    const priceText = await card.locator('.a-price .a-price-whole').textContent().catch(() => null);

    if (titleText && priceText) {
      // Clean up the price string (remove commas) and convert to an integer
      const price = parseInt(priceText.replace(/,/g, ''), 10);

      // Check if the watch is from 'Noise' and its price is less than 3000
      if (titleText.toLowerCase().includes('noise') && price < 3000) {
        console.log(`Found Match! Watch: ${titleText.trim()} | Price: ₹${price}`);
        
        // 6. Click on the matching watch link to select it
        const productLink = card.locator('h2 a');
        
        // Handling potential target="_blank" (Amazon often opens items in a new tab)
        const [newPage] = await Promise.all([
          page.context().waitForEvent('page'),
          productLink.click()
        ]);
        
        // Keep working with the newly opened product page details
        await newPage.waitForLoadState();
        console.log(`Successfully navigated to: ${await newPage.title()}`);
        
        targetWatchFound = true;
        break; // Stop evaluating further watches once a match is selected
      }
    }
  }

  expect(targetWatchFound).toBe(true);
});