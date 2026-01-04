class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title'); 
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    async assertOnPage() {
        await this.title.waitFor();
    }

    async finish() {
        await this.finishBtn.click();
    }
}

module.exports = { CheckoutOverviewPage };
