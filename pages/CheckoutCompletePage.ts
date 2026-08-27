import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly pageHeading: Locator;
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        this.pageHeading = page.locator('[data-test="title"]');
        this.confirmationMessage = page.locator('[data-test="complete-header"]');
    }
}