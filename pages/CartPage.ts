import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly backpackName: Locator;
    readonly backpackQuantity: Locator;
    readonly removeBackpackButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backpackName = page.getByText('Sauce Labs Backpack', { exact: true });
        this.backpackQuantity = page.locator('[data-test="item-quantity"]');
        this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }
}