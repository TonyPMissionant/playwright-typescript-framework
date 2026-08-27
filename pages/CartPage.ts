import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly backpackName: Locator;
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.backpackName = page.getByText('Sauce Labs Backpack', { exact: true });
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
    }
    getCartItem(productName: string): Locator{
        
        return this.cartItems.filter({ hasText: productName });
    }

    getCartItemPrice(productName: string): Locator{
        return this.cartItems.filter({ hasText: productName}).locator('.inventory_item_price');
    }

    getCartItemQuantity(productName: string): Locator {
        return this.cartItems.filter({ hasText: productName}).locator('[data-test="item-quantity"]');
    }

    removeCartItems(produceName: string): Promise<void> {
        const cartItem = this.getCartItem(produceName);

        return cartItem.getByRole('button', { name: 'Remove'}).click();
    }
}