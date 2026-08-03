import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly productsHeading: Locator;
    readonly inventoryItems: Locator;
    readonly backpackName: Locator;
    readonly addBackpackToCartButton: Locator;
    readonly removeBackpackFromCartButton: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.productsHeading = page.locator('[data-test="title"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.backpackName = page.getByText('Sauce Labs Backpack', { exact: true });
        this.addBackpackToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.removeBackpackFromCartButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }
}