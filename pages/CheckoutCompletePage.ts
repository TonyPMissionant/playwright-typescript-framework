import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageHeading = page.locator('[data-test="title"]');
        this.confirmationMessage = page.locator('[data-test="complete-header"]');
    }
}