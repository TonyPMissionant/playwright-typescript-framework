import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly pageHeading: Locator;
    readonly backpackName: Locator;
    readonly backpackPrice: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.pageHeading = page.locator('[data-test="title"]');
        this.backpackName = page.getByText('Sauce Labs Backpack', { exact: true });
        this.backpackPrice = page.locator('[data-test="inventory-item-price"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }
}