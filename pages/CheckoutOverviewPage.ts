import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly pageHeading: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.pageHeading = page.locator('[data-test="title"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }
}