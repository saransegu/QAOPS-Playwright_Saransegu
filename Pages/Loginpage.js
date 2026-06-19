class LoginPage {
    constructor(page) {  
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("[value='Login']");
    }

    async navigate() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    // Fixed: Destructure the email object to match how you call it in the test
    async ValidLogin( email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle'); // Helpful to ensure login completes
    }
}

// Fixed: Export using CommonJS to match your require statement
module.exports = { LoginPage };