class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.productsTitle = page.locator('.title');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goTo() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertOnProductsPage() {
        await this.productsTitle.waitFor();
    }

    async assertOnLoginPage() {
        await this.loginButton.waitFor();
    }
    
    async assertErrorVisible() {
        await this.errorMessage.waitFor();
    }

    async getErrorText() {
        return await this.errorMessage.innerText();
    }

    async clickLogin() {
        await this.loginButton.click();
    }



}

module.exports = { LoginPage };
