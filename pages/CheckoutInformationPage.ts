import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }
}