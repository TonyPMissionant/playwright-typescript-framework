import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { checkoutUser } from '../data/checkoutData';

test.describe('Checkout Validation', () => {

    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);

        await page.goto('/inventory.html');
    });

    test('should display an error when checkout information is missing', async ({ page }) => {

        const cartPage = new CartPage(page);

        const checkoutInformationPage = new CheckoutInformationPage(page);

        await inventoryPage.addBackpackToCartButton.click();

        await inventoryPage.shoppingCartLink.click();

        await cartPage.checkoutButton.click();

        await checkoutInformationPage.continueButton.click();

        await expect(checkoutInformationPage.errorMessage)
            .toHaveText('Error: First Name is required');
    });

    test('should display an error when last name is missing', async ({ page }) => {

        const cartPage = new CartPage(page);

        const checkoutInformationPage = new CheckoutInformationPage(page);

        await inventoryPage.addBackpackToCartButton.click();

        await inventoryPage.shoppingCartLink.click();

        await cartPage.checkoutButton.click();

        await checkoutInformationPage.firstNameInput.fill(checkoutUser.firstName);

        await checkoutInformationPage.continueButton.click();

        await expect(checkoutInformationPage.errorMessage).toHaveText('Error: Last Name is required');

    });

    test('should display an error when postal code is missing', async ({ page }) => {

        const cartPage = new CartPage(page);

        const checkoutInformationPage = new CheckoutInformationPage(page);

        await inventoryPage.addBackpackToCartButton.click();

        await inventoryPage.shoppingCartLink.click();

        await cartPage.checkoutButton.click();

        await checkoutInformationPage.firstNameInput.fill(checkoutUser.firstName);

        await checkoutInformationPage.lastNameInput.fill(checkoutUser.lastName);

        await checkoutInformationPage.continueButton.click();

        await expect(checkoutInformationPage.errorMessage)
            .toHaveText('Error: Postal Code is required');
    });
});