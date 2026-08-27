import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;
    readonly continueShopping: Locator;

    constructor(page: Page) {
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
        this.continueShopping = page.locator('[data-test="continue-shopping"]');
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