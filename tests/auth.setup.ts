import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser } from '../data/loginData';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');

    await loginPage.login(
        validUser.username, 
        validUser.password
    );

    await page.context().storageState({ path: authFile });
});