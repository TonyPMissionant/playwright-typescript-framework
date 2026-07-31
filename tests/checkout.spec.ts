import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { checkoutUser } from '../data/checkoutData';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('Checkout Flow', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);

        await page.goto('/inventory.html');
    });


    test('user can complete the checkout flow successfully', async ({ page }) => {

        const cartpage = new CartPage(page);

        const checkoutOverviewPage = new CheckoutOverviewPage(page);

        const checkoutInformationPage = new CheckoutInformationPage(page);

        const checkoutCompletePage = new CheckoutCompletePage(page);

        await inventoryPage.addBackpackToCartButton.click();

        await inventoryPage.shoppingCartLink.click();

        await cartpage.checkoutButton.click();

        await checkoutInformationPage.firstNameInput.fill(checkoutUser.firstName);

        await checkoutInformationPage.lastNameInput.fill(checkoutUser.lastName);

        await checkoutInformationPage.postalCodeInput.fill(checkoutUser.postalCode);

        await checkoutInformationPage.continueButton.click();

        await expect(checkoutOverviewPage.pageHeading).toHaveText('Checkout: Overview');

        await expect(checkoutOverviewPage.backpackName).toBeVisible();

        await expect(checkoutOverviewPage.backpackPrice).toHaveText('$29.99');

        await checkoutOverviewPage.finishButton.click();

        await expect(checkoutCompletePage.pageHeading).toHaveText('Checkout: Complete!');

        await expect(checkoutCompletePage.confirmationMessage).toHaveText('Thank you for your order!');
    });
});