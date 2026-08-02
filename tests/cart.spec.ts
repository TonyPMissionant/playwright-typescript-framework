import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);

        await page.goto('/inventory.html');
    });

    test('@regression user can view and remove Sauce Labs Backpack from the cart', async ({ page }) => {
        const cartPage = new CartPage(page);

        await inventoryPage.addBackpackToCartButton.click();

        await inventoryPage.shoppingCartLink.click();

        await expect(cartPage.backpackName).toBeVisible();

        await expect(cartPage.backpackQuantity).toHaveText('1');

        await cartPage.removeBackpackButton.click();

        await expect(cartPage.backpackName).not.toBeVisible();
    });
});