class CartPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title'); 
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.removeButtons = page.locator('button[id^="remove-"]');

    }

    async assertOnPage() {
        await this.title.waitFor();
    }

    async getItemCount() {
        return await this.cartItems.count();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async removeFirstItem() {
        if (await this.removeButtons.count() > 0) {
            await this.removeButtons.first().click();
        }
    }

}

module.exports = { CartPage };
