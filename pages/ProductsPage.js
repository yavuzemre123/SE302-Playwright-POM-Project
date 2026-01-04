class ProductsPage {
    constructor(page) {
        this.page = page;
        
        this.title = page.locator('.title');

        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');

        this.addBackpackBtn = page.locator('#add-to-cart-sauce-labs-backpack');
        this.removeBackpackBtn = page.locator('#remove-sauce-labs-backpack');

        this.addBikeLightBtn = page.locator('#add-to-cart-sauce-labs-bike-light');
        this.removeBikeLightBtn = page.locator('#remove-sauce-labs-bike-light');

        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    }

    async assertOnPage() {
        await this.title.waitFor();
    }

    async addBackpackToCart() {
        await this.addBackpackBtn.click();
    }

    async removeBackpackFromCart() {
        await this.removeBackpackBtn.click();
    }

    async openCart() {
        await this.cartLink.click();
    }

    async getCartBadgeCount() {
        if (await this.cartBadge.count() === 0) return 0;
        const text = await this.cartBadge.innerText();
        return Number(text);
    }

    async sortBy(value) {
        await this.sortDropdown.selectOption(value);
    }
    async addBikeLightToCart() {
        await this.addBikeLightBtn.click();
    }

    async removeBikeLightFromCart() {
        await this.removeBikeLightBtn.click();
    }

}

module.exports = { ProductsPage };
