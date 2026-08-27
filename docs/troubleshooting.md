# Troubleshooting & Lessons Learned

A short record of the main issues encountered while building the framework and the lessons learned from resolving them.

---

## Environment Variables

### Problem

Playwright failed with an invalid URL when using relative paths such as:

```ts
await page.goto('/inventory.html');
```

### Cause

`BASE_URL` was missing or incorrectly configured.

### Solution

Environment variables were loaded and validated centrally through `utils/env.ts` and used by `playwright.config.ts`.

### Lesson

Validate environment configuration early so failures are clear and easy to diagnose.

---

## Authentication & `storageState`

### Problem

Authenticated tests would otherwise need to perform the login process repeatedly.

### Solution

A dedicated `auth.setup.ts` performs the login and saves the browser state to:

```text
playwright/.auth/user.json
```

Authenticated projects reuse this state.

### Lesson

Playwright project dependencies and `storageState` provide a clean way to separate authentication setup from authenticated tests.

---

## Locator Targeting

### Problem

An assertion expecting a price failed because the locator represented the entire product card rather than the price element.

### Solution

Generic methods were introduced to locate the product first and then target the required child element, for example:

```ts
getProductPrice(productName: string): Locator {
    return this.getProductByName(productName)
        .locator('.inventory_item_price');
}
```

### Lesson

A locator can find the correct component while still being too broad for the assertion. Always target the specific element being verified.

---

## Generic Page Object Methods

### Problem

The initial framework contained product-specific locators such as Backpack-specific properties.

### Solution

These were replaced with reusable methods such as:

```ts
getProductByName(productName: string): Locator
```

and:

```ts
getCartItem(productName: string): Locator
```

### Lesson

Page Objects should model reusable behaviour rather than individual test cases.

---

## TypeScript Catching Refactoring Issues

### Problem

Removing old Page Object properties caused TypeScript errors in tests that still referenced them.

### Solution

The affected tests were updated or obsolete assertions removed.

The project was checked using:

```bash
npx tsc --noEmit
```

### Lesson

TypeScript compilation provides a useful safety net when refactoring Page Objects and tests.

---

## Debugging Focused Tests

### Problem

Individual failing tests needed to be run in isolation during debugging.

### Solution

`test.only` was used temporarily and removed before committing.

The Playwright configuration also uses:

```ts
forbidOnly: !!process.env.CI
```

### Lesson

Focused tests are useful during development, but should never accidentally reach CI.

---

## DOM Inspection

### Problem

A locator initially failed because the expected `data-test` attribute used an underscore rather than the application's actual hyphenated attribute.

### Solution

The DOM was inspected and the locator corrected.

### Lesson

When a locator fails, inspect the actual DOM rather than relying on assumptions about the element's attributes.

---

## Final Validation

Before committing significant changes, the framework was validated with:

```bash
npx tsc --noEmit
npx playwright test
git diff --check
```

This provided confidence that:

* TypeScript compiled successfully
* the Playwright suite passed
* changed files contained no obvious whitespace errors
