import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { checkoutUser } from '../data/checkoutData';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);

    await page.goto('/inventory.html');
});

test('inventory page displays the Products heading', async () => {

    await expect(inventoryPage.productsHeading).toBeVisible();
});

test('inventory page displays the correct number of products', async () => {

    await expect(inventoryPage.inventoryItems).toHaveCount(6);
});

test('Sauce Labs Backpack is displayed on the inventory page', async () => {

    await expect(inventoryPage.backpackName).toBeVisible();
});

test('user can add and remove Sauce Labs Backpack from cart', async () => {

    await inventoryPage.addBackpackToCartButton.click();

    await expect(inventoryPage.removeBackpackFromCartButton).toBeVisible();
    
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    await inventoryPage.removeBackpackFromCartButton.click();

    await expect(inventoryPage.addBackpackToCartButton).toBeVisible();

    await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();

});

test('user can view and remove Sauce Labs Backpack from the cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCartButton.click();

    await inventoryPage.shoppingCartLink.click();

    await expect(cartPage.backpackName).toBeVisible();

    await expect(cartPage.backpackQuantity).toHaveText('1');

    await cartPage.removeBackpackButton.click();
    
    await expect(cartPage.backpackName).not.toBeVisible();
});