import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser, invalidUser, lockedOutUser } from '../data/loginData';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('@smoke @regression Standard user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    validUser.username,
    validUser.password
  );

  await expect(page).toHaveURL(/inventory.html/);
});

test('@smoke @regression User cannot log in with an invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    invalidUser.username,
    invalidUser.password
  );

  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service');
});

test('@smoke @regression Locked out user cannot log in', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.login(
    lockedOutUser.username,
    lockedOutUser.password

  )
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');

});