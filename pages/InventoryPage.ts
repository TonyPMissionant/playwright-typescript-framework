import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly productsHeading: Locator;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.productsHeading = page.locator('[data-test="title"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }
    async addProductToCart(productName: string): Promise<void> {
        const product = this.inventoryItems.filter({ hasText: productName});

        await product.getByRole('button', { name: 'Add to cart'}).click();

    }

    async removeProductFromCart(productName: string): Promise<void> {

        const product = this.inventoryItems.filter({ hasText: productName });

        await product.getByRole("button", { name: 'Remove'}).click();

    }
    // non async as its a retrieval method rather than action
    getProductByName(productName: string): Locator{
        return this.inventoryItems.filter({ hasText: productName });
    }

    getProductPrice(productName: string): Locator {
        return this.getProductByName(productName).locator('.inventory_item_price');
    }
}