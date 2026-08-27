# Playwright TypeScript Test Automation Framework

A UI test automation framework built with Playwright and TypeScript against the Sauce Demo application.

The project demonstrates a maintainable automation architecture using the Page Object Model, reusable test data, environment configuration, authenticated test setup, multi-browser execution, HTML reporting, and GitHub Actions continuous integration.

## Technologies

* Playwright
* TypeScript
* Node.js
* Git and GitHub
* GitHub Actions

## Key Features

* Page Object Model (POM)
* Reusable test data
* Environment variable validation
* Authenticated test setup using Playwright `storageState`
* Generic, reusable Page Object methods
* Login, inventory, cart, and checkout test coverage
* Cross-browser testing with Chromium, Firefox, and WebKit
* HTML test reports
* Screenshots and traces for failed tests
* GitHub Actions CI

## Project Structure

```text
playwright-typescript-framework/

├── .github/
│   └── workflows/
│       └── playwright.yml
├── data/
│   ├── checkoutData.ts
│   └── loginData.ts
├── docs/
│   └── troubleshooting.md
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutInformationPage.ts
│   ├── CheckoutOverviewPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── tests/
│   ├── auth.setup.ts
│   ├── cart.spec.ts
│   ├── checkout-information.spec.ts
│   ├── checkout.spec.ts
│   ├── inventory.spec.ts
│   └── login.spec.ts
├── utils/
│   └── env.ts
├── .env
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

### Folder Responsibilities

* **`pages/`** — Page Object classes containing locators and reusable page-specific behaviour.
* **`tests/`** — Playwright test specifications organised by application area.
* **`data/`** — Reusable test data used across the test suite.
* **`utils/`** — Shared utility functionality, including environment variable validation.
* **`docs/`** — Supporting project documentation and troubleshooting notes.
* **`.github/workflows/`** — GitHub Actions workflow configuration for automated test execution.
* **`auth.setup.ts`** — Creates and saves an authenticated browser state for tests that require a logged-in user.
* **`playwright.config.ts`** — Contains Playwright configuration, browser projects, authentication dependencies, reporting, and shared test settings.
* **`.env`** — Local environment configuration. Secrets and environment-specific values are excluded from version control.

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

### Environment Configuration

Create a `.env` file in the project root containing the required environment variables:

```text
BASE_URL=your-base-url
USERNAME=your-username
PASSWORD=your-password
```

The framework validates these values when the project starts and fails early if a required variable is missing.

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

For visual debugging, Playwright can also be run in headed mode with an optional delay between actions:

```bash
SLOW_MO=1500 npx playwright test tests/cart.spec.ts --headed --project=authenticated-chromium
```

## Authentication Setup

The framework uses a Playwright setup project to create an authenticated browser state before running tests that require a logged-in user.

The authentication flow is:

```text
auth.setup.ts
      ↓
Logs in using reusable test data
      ↓
Saves browser storage state
      ↓
Authenticated browser projects reuse the state
```

This avoids repeating the login process in every authenticated test and keeps the test suite faster and more maintainable.

## Test Architecture

The framework separates responsibilities between:

```text
Test
 ↓
Page Object
 ↓
Locator / Application Behaviour
```

Tests describe the behaviour being verified, while Page Objects contain the implementation details required to interact with the application.

Where possible, generic methods are used instead of product-specific locators. For example:

```ts
addProductToCart(productName: string)
```

allows the same method to be used for different products.

## Continuous Integration

GitHub Actions automatically runs the Playwright test suite when changes are pushed or submitted through a pull request targeting the configured branches.

The workflow:

1. Checks out the repository
2. Installs Node.js
3. Installs dependencies using `npm ci`
4. Installs Playwright browsers and required dependencies
5. Runs the Playwright test suite
6. Uploads the HTML Playwright report as a workflow artifact

The framework has been successfully executed in a clean Ubuntu CI environment.

## Test Coverage

The current automated coverage includes:

* Standard user login
* Invalid password validation
* Locked-out user validation
* Inventory page behaviour
* Product selection and price validation
* Adding products to the shopping cart
* Cart item and quantity validation
* Removing products from the cart
* Continue Shopping behaviour
* Adding a different product after returning to the inventory
* Checkout information validation
* Checkout cancellation
* Checkout overview validation
* Complete checkout journey
* Order confirmation validation

The current suite contains **85 automated tests** across the configured browser projects.

## Documentation

Additional troubleshooting notes and lessons learned during development are available in:

```text
docs/troubleshooting.md
```

This records the main implementation and debugging issues encountered while building the framework.

## Future Improvements

Possible future enhancements include:

* Additional negative and boundary scenarios
* Further reusable Playwright fixtures where they provide clear value
* Additional application behaviour and test coverage
* Expanded CI code-quality checks
* Visual testing
* API integration testing
* Performance testing integration

## Author

**Tony**

Built as part of a hands-on test automation learning project using Playwright and TypeScript.
