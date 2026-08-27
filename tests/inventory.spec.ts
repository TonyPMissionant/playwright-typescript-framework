import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);

    await page.goto('/inventory.html');
});

test('@smoke @regression Inventory page displays the Products heading', async () => {

    await expect(inventoryPage.productsHeading).toBeVisible();
});

test('@regression Inventory page displays the correct number of products', async () => {

    await expect(inventoryPage.inventoryItems).toHaveCount(6);
});

test('@regression Sauce Labs Backpack is displayed on the inventory page', async () => {

    await expect(inventoryPage.getProductByName('Sauce Labs Backpack')).toBeVisible();
});

test('@smoke @regression User can add and remove Sauce Labs Backpack from cart', async () => {

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
});

test('@regression Sauce Labs Backpack displays the correct price', async () => {

    await expect(inventoryPage.getProductPrice('Sauce Labs Backpack')).toHaveText('$29.99');
});

test('@regression User can add multiple products to cart', async () => {

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
});

