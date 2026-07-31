# Playwright TypeScript Test Automation Framework

A UI test automation framework built with Playwright and TypeScript against the Sauce Demo application.

The project demonstrates a maintainable automation architecture using the Page Object Model, reusable test data, authenticated test setup, multi-browser execution, and GitHub Actions continuous integration.

## Technologies

* Playwright
* TypeScript
* Node.js
* Git and GitHub
* GitHub Actions

## Key Features

* Page Object Model (POM)
* Reusable test data
* Authentication state setup
* Login, inventory, cart, and checkout test coverage
* Cross-browser testing with Chromium, Firefox, and WebKit
* HTML test reports
* Automated test execution with GitHub Actions

## Project Structure

```text
playwright-typescript-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── data/
│   ├── checkoutData.ts
│   └── loginData.ts
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutInformationPage.ts
│   ├── CheckoutOverviewPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── tests/
│   ├── auth.setup.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── inventory.spec.ts
│   └── login.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

### Folder Responsibilities

* **`pages/`** — Page Object classes containing locators and page-specific behaviour.
* **`tests/`** — Playwright test specifications organised by application area.
* **`data/`** — Reusable test data used across the test suite.
* **`.github/workflows/`** — GitHub Actions workflow configuration for automated test execution.
* **`auth.setup.ts`** — Creates and saves an authenticated browser state for tests that require a logged-in user.
* **`playwright.config.ts`** — Contains Playwright configuration, browser projects, authentication dependencies, reporting, and shared test settings.

## Installation

### Prerequisites

* Node.js
* npm

### Clone the Repository

```bash
git clone https://github.com/TonyPMissionant/playwright-typescript-framework.git
```

Navigate into the project:

```bash
cd playwright-typescript-framework
```

Install the project dependencies:

```bash
npm ci
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests in Chromium:

```bash
npx playwright test --project=chromium
```

Run the authenticated Chromium test suite:

```bash
npx playwright test --project=authenticated-chromium
```

Run a specific test file:

```bash
npx playwright test tests/checkout.spec.ts --project=authenticated-chromium
```

Open the latest HTML test report:

```bash
npx playwright show-report
```

## Authentication Setup

The framework uses a Playwright setup project to create an authenticated browser state before running tests that require a logged-in user.

The authentication flow is:

```text
auth.setup.ts
      ↓
Logs in with reusable test data
      ↓
Saves the browser storage state
      ↓
Authenticated browser projects use the saved state
```

This avoids repeating the login steps in every authenticated test and keeps the test suite faster and more maintainable.

## Continuous Integration

GitHub Actions automatically runs the Playwright test suite when changes are:

* Pushed to the `main` or `master` branch
* Submitted through a pull request targeting `main` or `master`

The workflow:

1. Checks out the repository
2. Installs the current Node.js LTS version
3. Installs dependencies using `npm ci`
4. Installs Playwright browsers and required Linux dependencies
5. Runs the complete Playwright test suite
6. Uploads the HTML Playwright report as a workflow artifact

The first GitHub Actions run completed successfully, confirming that the framework runs in a clean Ubuntu CI environment.

## Test Coverage

The current automated test coverage includes:

* User login and login validation
* Inventory page behaviour
* Adding products to the shopping cart
* Cart item validation
* Removing products from the cart
* Checkout information entry
* Checkout overview validation
* Product name and price validation during checkout

## Future Improvements

Potential enhancements for the framework include:

* Complete the checkout journey and validate the order confirmation page
* Add additional negative and boundary test scenarios
* Introduce Playwright fixtures for shared test setup
* Add reusable utility methods where they provide clear value
* Expand test coverage to additional application behaviour
* Add test tags or annotations for selective execution
* Improve reporting with screenshots and traces for failed tests
* Add code quality checks to the CI pipeline

## Author

**Tony**

Built as part of a hands-on test automation learning project using Playwright and TypeScript.
