class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
    }

    async assertOnPage() {
        await this.title.waitFor();
    }

    async getHeaderText() {
        return await this.completeHeader.innerText();
    }
}

module.exports = { CheckoutCompletePage };
