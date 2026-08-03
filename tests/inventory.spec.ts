import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

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
    await expect(inventoryPage.backpackName).toBeVisible();
});

test('@smoke @regression User can add and remove Sauce Labs Backpack from cart', async () => {
    await inventoryPage.addBackpackToCartButton.click();
    await expect(inventoryPage.removeBackpackFromCartButton).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    await inventoryPage.removeBackpackFromCartButton.click();
    await expect(inventoryPage.addBackpackToCartButton).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
});