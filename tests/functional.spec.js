const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutInfoPage } = require('../pages/CheckoutInfoPage');
const { CheckoutOverviewPage } = require('../pages/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');


test('Functional 1 - Invalid login shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'wrong_password');

    await loginPage.assertErrorVisible();

    const msg = await loginPage.getErrorText();
    expect(msg).toContain('Username and password do not match');
});

test('Functional 2 - Empty username shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.passwordInput.fill('secret_sauce'); // password var, username boş
    await loginPage.clickLogin();

    await loginPage.assertErrorVisible();

    const msg = await loginPage.getErrorText();
    expect(msg).toContain('Username is required');
});

test('Functional 3 - Empty password shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.usernameInput.fill('standard_user'); // username var
    await loginPage.clickLogin(); // password boş

    await loginPage.assertErrorVisible();

    const msg = await loginPage.getErrorText();
    expect(msg).toContain('Password is required');
});

test('Functional 4 - Locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.assertErrorVisible();

    const msg = await loginPage.getErrorText();
    expect(msg.toLowerCase()).toContain('locked out');
});

test('Functional 5 - Add item to cart updates badge to 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.assertOnPage();
    await productsPage.addBackpackToCart();

    const count = await productsPage.getCartBadgeCount();
    expect(count).toBe(1);
});

test('Functional 6 - Remove item clears cart badge', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.assertOnPage();
    await productsPage.addBackpackToCart();
    expect(await productsPage.getCartBadgeCount()).toBe(1);

    await productsPage.removeBackpackFromCart();
    expect(await productsPage.getCartBadgeCount()).toBe(0);
});

test('Functional 7 - Add two different items shows badge 2', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.assertOnPage();
    await productsPage.addBackpackToCart();
    await productsPage.addBikeLightToCart();

    expect(await productsPage.getCartBadgeCount()).toBe(2);
});

test('Functional 8 - Cart badge persists after refresh', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.assertOnPage();
    await productsPage.addBackpackToCart();
    expect(await productsPage.getCartBadgeCount()).toBe(1);

    await page.reload();
    await productsPage.assertOnPage();
    expect(await productsPage.getCartBadgeCount()).toBe(1);
});

test('Functional 9 - Checkout info validation shows error when fields missing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfo = new CheckoutInfoPage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.assertOnPage();
    await productsPage.addBackpackToCart();
    await productsPage.openCart();

    await cartPage.assertOnPage();
    await cartPage.goToCheckout();

    await checkoutInfo.assertOnPage();
    await checkoutInfo.fillInfo('Emre', 'Celik', ''); // zip boş
    await checkoutInfo.continue();

    await checkoutInfo.assertErrorVisible();
    expect((await checkoutInfo.getErrorText()).toLowerCase()).toContain('postal code');
});

test('Functional 10 - Successful checkout completes order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfo = new CheckoutInfoPage(page);
    const overview = new CheckoutOverviewPage(page);
    const complete = new CheckoutCompletePage(page);

    await loginPage.goTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.assertOnPage();
    await productsPage.addBackpackToCart();
    await productsPage.openCart();

    await cartPage.assertOnPage();
    await cartPage.goToCheckout();

    await checkoutInfo.assertOnPage();
    await checkoutInfo.fillInfo('Emre', 'Celik', '71000');
    await checkoutInfo.continue();

    await overview.assertOnPage();
    await overview.finish();

    await complete.assertOnPage();
    const header = await complete.getHeaderText();
    expect(header.toLowerCase()).toContain('thank you');
});


