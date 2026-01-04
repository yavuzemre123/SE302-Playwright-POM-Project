const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { MenuPage } = require('../pages/MenuPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');



test('Smoke 1 - Login page loads', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await expect(page).toHaveTitle('Swag Labs');
});

test('Smoke 2 - Successful login opens Products page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await loginPage.assertOnProductsPage();
    await expect(page).toHaveURL(/inventory\.html/);
});

test('Smoke 3 - Logout returns to Login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await loginPage.assertOnProductsPage();

    await menuPage.logout();

    await loginPage.assertOnLoginPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('Smoke 4 - Add one item shows cart badge', async ({ page }) => {
    const loginPage = new (require('../pages/LoginPage').LoginPage)(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.assertOnPage();

    await productsPage.addBackpackToCart();
    expect(await productsPage.getCartBadgeCount()).toBe(1);
});

test('Smoke 5 - Cart page opens and shows added item', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.assertOnPage();
    await productsPage.addBackpackToCart();
    await productsPage.openCart();

    await cartPage.assertOnPage();
    await expect(page).toHaveURL(/cart\.html/);

    const count = await cartPage.getItemCount();
    expect(count).toBeGreaterThan(0);
});
