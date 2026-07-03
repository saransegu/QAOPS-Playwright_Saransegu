const { test: PlaywrightTest, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/Loginpage.js');

const loginpagetest = PlaywrightTest.extend({
    
    // 2. Define your fixture name
    login: async ({ context, page }, use) => {
        // 3. Clear cookies FIRST before starting the login sequence
        await context.clearCookies(); 
        
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        
        // 4. FIX: Put "saran" in quotes so it is read as a string text
        await loginPage.ValidLogin("saran", "Saran23@");
        
        // 5. Hand over the logged-in browser tab to the main test
        await use(page);
    } // 6. FIX: Added missing closing curly brace for the object
});

// 7. Export your brand new runner for your main page
module.exports = { loginpagetest };