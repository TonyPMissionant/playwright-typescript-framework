import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { checkoutUser } from '../data/checkoutData';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test.describe('Checkout Information', () => {

    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutInformationPage: CheckoutInformationPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutInformationPage = new CheckoutInformationPage(page);

        await page.goto('/inventory.html');

        await inventoryPage.addBackpackToCartButton.click();

        await inventoryPage.shoppingCartLink.click();

        await cartPage.checkoutButton.click();
    });

    test('@regression should display an error when checkout information is missing', async () => {

        await checkoutInformationPage.continueButton.click();

        await expect(checkoutInformationPage.errorMessage)
            .toHaveText('Error: First Name is required');
    });

    test('@regression should display an error when last name is missing', async () => {

        await checkoutInformationPage.firstNameInput.fill(checkoutUser.firstName);

        await checkoutInformationPage.continueButton.click();

        await expect(checkoutInformationPage.errorMessage).toHaveText('Error: Last Name is required');

    });

    test('@regression should display an error when postal code is missing', async () => {

        await checkoutInformationPage.firstNameInput.fill(checkoutUser.firstName);

        await checkoutInformationPage.lastNameInput.fill(checkoutUser.lastName);

        await checkoutInformationPage.continueButton.click();

        await expect(checkoutInformationPage.errorMessage).toHaveText('Error: Postal Code is required');
    });

    test('@regression user can enter valid checkout information and proceed to checkout overview', async ({ page }) => {

    const checkoutOverviewPage = new CheckoutOverviewPage(page);

    await checkoutInformationPage.firstNameInput.fill(checkoutUser.firstName);

    await checkoutInformationPage.lastNameInput.fill(checkoutUser.lastName);

    await checkoutInformationPage.postalCodeInput.fill(checkoutUser.postalCode);

    await checkoutInformationPage.continueButton.click();

    await expect(checkoutOverviewPage.pageHeading)
        .toHaveText('Checkout: Overview');
});

    test('@regression user can cancel checkout and return to the cart', async ({ page }) => {

        await checkoutInformationPage.cancelButton.click();

        await expect(page).toHaveURL(/cart\.html/);
    });
});