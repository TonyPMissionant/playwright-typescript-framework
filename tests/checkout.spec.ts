import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { checkoutUser } from '../data/checkoutData';

test.describe('Checkout Flow', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);

        await page.goto('/inventory.html');
    });


    test('user can enter the checkout information and view the checkout overview', async ({ page }) => {

        const cartpage = new CartPage(page);

        const checkoutOverviewPage = new CheckoutOverviewPage(page);

        const checkoutInformationPage = new CheckoutInformationPage(page);

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
    });
});