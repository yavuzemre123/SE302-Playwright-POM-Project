class CheckoutInfoPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title'); 
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async assertOnPage() {
        await this.title.waitFor();
    }

    async fillInfo(first, last, zip) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
    }

    async continue() {
        await this.continueBtn.click();
    }

    async assertErrorVisible() {
        await this.errorMessage.waitFor();
    }

    async getErrorText() {
        return await this.errorMessage.innerText();
    }
}

module.exports = { CheckoutInfoPage };
