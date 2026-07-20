# Project Guidelines

## Framework Structure

The project uses a three-layer architecture under `src/`:

```
src/
├── core/                         # Technical kernel — knows nothing about business
│   ├── browser/BrowserFactory.ts # Browser / BrowserContext / Page factory
│   ├── fixtures/base.fixture.ts  # Base Playwright test with extended fixtures
│   ├── http/HttpClient.ts        # REST wrapper over APIRequestContext
│   ├── utils/
│   │   ├── WaitHelper.ts         # poll / retry / waitForCondition
│   │   ├── RetryHelper.ts        # Retry with back-off for flaky operations
│   │   └── RandomHelper.ts       # Random data generation (uuid, email, phone)
│   └── config/EnvironmentConfig.ts  # .env, base URLs, timeouts
│
├── business/                     # Describes system behavior in business language
│   ├── pages/
│   │   ├── base/BasePage.ts      # Abstract base class: locators + shared actions
│   │   └── {feature}/            # Feature page objects (LoginPage, InventoryPage …)
│   ├── api/{domain}Api.ts        # Domain-level API service clients
│   ├── models/{Entity}.ts        # TypeScript interfaces and DTOs
│   ├── builders/{Entity}Builder.ts  # Builder pattern for test data creation
│   └── workflows/{flow}.workflow.ts # Reusable multi-step business flows
│
└── tests/                        # Test scenarios and assertions
    ├── {feature}/{feature}.spec.ts  # Specs grouped by feature
    ├── fixtures/test.fixture.ts  # Fixture composition (DI for tests)
    └── data/{feature}.data.ts    # Static test data, enums, constants
```

## Dependency Direction

Dependencies flow **strictly one way**: `tests` → `business` → `core`. Never reverse.

- `core` must not import from `business` or `tests`
- `business` must not import from `tests`
- Use path aliases in imports: `@core/`, `@business/`, `@tests/`

## Where to Put New Code

| What you are creating                 | Where it goes                          |
| ------------------------------------- | -------------------------------------- |
| Browser/context/page setup            | `src/core/browser/`                    |
| Wait, retry, random utilities         | `src/core/utils/`                      |
| Environment variables, URLs, timeouts | `src/core/config/EnvironmentConfig.ts` |
| Base Playwright fixture               | `src/core/fixtures/base.fixture.ts`    |
| Page Object for a UI page             | `src/business/pages/{feature}/`        |
| Base page class                       | `src/business/pages/base/BasePage.ts`  |
| API service client                    | `src/business/api/`                    |
| TypeScript interface or DTO           | `src/business/models/`                 |
| Test data builder                     | `src/business/builders/`               |
| Multi-step reusable scenario          | `src/business/workflows/`              |
| Test spec file                        | `src/tests/{feature}/`                 |
| Fixture composition for tests         | `src/tests/fixtures/test.fixture.ts`   |
| Static test data / enums / constants  | `src/tests/data/`                      |

## Architecture Rules

- **Locators** — private `readonly` properties on the page class; tests never call `page.locator()` directly
- **Assertions** — only in `src/tests/`; page classes and workflows must not contain `expect`
- **Pages** describe _how_ to interact; workflows describe _what_ to do; tests describe _why_ and _what result_ is expected
- **Builder pattern** for test data: sensible defaults, `.withXxx()` overrides, `.build()` returns the final object
- **Fixtures** for dependency injection into tests; prefer fixtures over `beforeEach` where applicable
- **Configuration** is read only in `src/core/config`; passed via parameters or fixtures everywhere else
- One page class per page, one spec file per feature

## SOLID Principles

- **S** — one page class per page, one spec file per feature
- **O** — extend `BasePage`, don't modify it
- **L** — page classes are interchangeable where the base type is expected
- **I** — keep page interfaces focused; don't add unrelated methods
- **D** — tests depend on page class abstractions, not raw `page.locator()` calls

## Conventions

- Base page: `src/business/pages/base/BasePage.ts`
- Locators as `private readonly` properties
- Page actions as `public` methods returning `void` or `this`
- `playwright.config.ts` uses `testDir: './src/tests'`
- `tsconfig.json` path aliases: `@core/*`, `@business/*`, `@tests/*`
