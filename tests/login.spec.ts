import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser, invalidUser } from '../data/loginData';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('@smoke @regressoion Test standard user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    validUser.username,
    validUser.password
  );

  await expect(page).toHaveURL(/inventory.html/);
});
test('@regression user cannot log in with an invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    invalidUser.username,
    invalidUser.password
);

  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});