import { Locator, Page } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');  
}
async login(user: string, passs: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(passs);
    await this.loginButton.click();
}
}
