import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly backpackName: Locator;
    readonly backpackPrice: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageHeading = page.locator('[data-test="title"]');
        this.backpackName = page.getByText('Sauce Labs Backpack',{ exact: true });
        this.backpackPrice = page.locator('[data-test="inventory-item-price"]');
    }
}