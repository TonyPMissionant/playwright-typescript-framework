import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);

        await page.goto('/inventory.html');
    });

    test('@regression User can view and remove product from the cart', async ({ page }) => {
        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');

        await inventoryPage.shoppingCartLink.click();

        await expect(cartPage.getCartItem('Sauce Labs Backpack')).toBeVisible();

        await cartPage.removeCartItems('Sauce Labs Backpack');

        await expect(cartPage.getCartItem('Sauce Labs Backpack')).not.toBeVisible();
    });

    test('@smoke @regression User can proceed to checkout from the cart', async ({ page }) => {
        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');

        await inventoryPage.shoppingCartLink.click();

        await cartPage.checkoutButton.click();

        await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    test('@regression Cart displays the correct price for a Bike Light ', async ({ page }) => {

        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await inventoryPage.shoppingCartLink.click();

        await expect(cartPage.getCartItemPrice('Sauce Labs Bike Light')).toHaveText('$9.99');
    });

    test('@regression Cart displays the correct price for a Bolt T-Shirt', async ({ page }) => {

        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');

        await inventoryPage.shoppingCartLink.click();

        await expect(cartPage.getCartItemPrice('Sauce Labs Bolt T-Shirt')).toHaveText('$15.99');

        await expect(cartPage.getCartItemQuantity('Sauce Labs Bolt T-Shirt')).toHaveText('1');

    });

    test('@regression @mobile Cart displays multiple different products', async ({ page }) => {

        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await inventoryPage.shoppingCartBadge.click();

        await expect(cartPage.getCartItem('Sauce Labs Backpack')).toBeVisible();
        await expect(cartPage.getCartItem('Sauce Labs Bike Light')).toBeVisible();
        await expect(cartPage.getCartItem('Sauce Labs Bolt T-Shirt')).toBeVisible();
        await expect(cartPage.cartItems).toHaveCount(3);

    });

    test('@regression Cart displays the correct quantity for a product', async ({ page }) => {

        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await inventoryPage.shoppingCartLink.click();

        await expect(cartPage.getCartItemQuantity('Sauce Labs Bike Light')).toHaveText('1');

    });

    test('@regression User can remove Sauce Labs Bike Light from cart', async ({ page }) => {

        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await inventoryPage.shoppingCartLink.click();

        await cartPage.removeCartItems('Sauce Labs Bike Light');

        await expect(cartPage.getCartItem('Sauce Labs Bike Light')).not.toBeVisible();

    })

    test('@regression User can remove Sauce Labs Backpack from cart', async ({ page }) => {

        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');

        await inventoryPage.shoppingCartLink.click();

        await cartPage.removeCartItems('Sauce Labs Backpack');

        await expect(cartPage.getCartItem('Sauce Labs Backpack')).not.toBeVisible();

    })

    test('@regression @mobile User can add two products to cart', async ({ page }) => {

        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await inventoryPage.shoppingCartLink.click();

        await expect(cartPage.getCartItem('Sauce Labs Bike Light')).toBeVisible();
        await expect(cartPage.getCartItem('Sauce Labs Backpack')).toBeVisible();
        await expect(cartPage.cartItems).toHaveCount(2);

    })

    test('@regression @mobile User can add product after removing a product and clicking continue shopping', async ({ page }) => {

        const cartPage = new CartPage(page);

        await inventoryPage.addProductToCart('Sauce Labs Backpack');

        await inventoryPage.shoppingCartLink.click();

        await cartPage.removeCartItems('Sauce Labs Backpack');

        await cartPage.continueShopping.click();

        await expect(page).toHaveURL(/inventory\.html/);

        await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');

        await inventoryPage.shoppingCartLink.click();

        await expect(cartPage.getCartItem('Sauce Labs Bolt T-Shirt')).toBeVisible();

    })
});
