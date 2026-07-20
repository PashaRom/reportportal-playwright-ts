# ReportPortal Playwright TypeScript

Automated test suite for [ReportPortal](https://reportportal.epam.com) built with Playwright and TypeScript. Covers UI smoke tests, REST API tests, and cross-layer integration tests. Results are reported directly to a ReportPortal launch.

## Table of Contents

- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Test Categories](#test-categories)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Code Quality](#code-quality)
- [Dependency Direction](#dependency-direction)

---

## Architecture

The framework follows a strict three-layer architecture:

```
tests  →  business  →  core
```

- **`core`** — technology-level building blocks with no knowledge of the application under test.
- **`business`** — describes the application in business language: pages, API clients, models.
- **`tests`** — test specs, fixture composition, and static test data.

Dependencies only flow downward. `core` never imports from `business` or `tests`; `business` never imports from `tests`.

---

## Project Structure

```
src/
├── core/
│   ├── config/
│   │   └── EnvironmentConfig.ts      # Central config: URLs, credentials, RP settings
│   ├── fixtures/
│   │   └── base.fixture.ts           # Base Playwright fixture (httpClient, baseUrl)
│   ├── http/
│   │   └── HttpClient.ts             # Thin REST wrapper over APIRequestContext
│   └── utils/
│       ├── LocalStorageHelper.ts     # Read/write browser localStorage in tests
│       ├── RandomHelper.ts           # Random test data: strings, emails
│       ├── StorageAuth.ts            # Inject API key into localStorage for UI auth
│       └── WaitHelper.ts             # waitForNetworkIdle, waitForCondition, poll
│
├── business/
│   ├── api/
│   │   ├── DashboardApi.ts           # CRUD for /api/v1/{project}/dashboard
│   │   └── ProjectApi.ts             # GET /api/v1/project/{projectName}
│   ├── models/
│   │   ├── Dashboard.ts              # CreateDashboardRequest/Response, DashboardResource
│   │   └── Project.ts                # Project, ProjectConfiguration, ProjectUser
│   └── pages/
│       ├── base/
│       │   └── BasePage.ts           # Abstract base: navigate, waitForPageLoad
│       ├── dashboard/
│       │   └── DashboardPage.ts      # Dashboard list: create, verify visibility
│       └── login/
│           └── LoginPage.ts          # Login page: goto, element visibility checks
│
└── tests/
    ├── api/
    │   └── project.spec.ts           # REST API tests for GET /project/{name}
    ├── data/
    │   ├── dashboard.data.ts         # Static dashboard test data
    │   └── project.data.ts           # Static project test data
    ├── fixtures/
    │   └── test.fixture.ts           # Fixture composition: pages, API clients, auth
    ├── integration/
    │   └── dashboard.integration.spec.ts  # Cross-layer: API↔UI dashboard tests
    └── ui/
        ├── auth/
        │   └── storage.spec.ts       # localStorage auth smoke tests
        ├── dashboard/
        │   └── dashboard.spec.ts     # UI dashboard creation tests
        └── login/
            └── login.spec.ts         # Login page smoke tests
```

---

## Key Components

### `EnvironmentConfig`

Single source of truth for all configuration. Reads from `.env` at startup and exposes typed constants. All other code receives config via parameters or fixtures — never reads `process.env` directly.

### `HttpClient`

Thin wrapper around Playwright's `APIRequestContext`. Provides `get`, `post`, `put`, `delete` methods with optional query params and headers. Used by all API service clients.

### `StorageAuth`

Sets the ReportPortal API key into `localStorage` in the format the SPA expects (`{"type":"bearer","value":"<API_KEY>"}`), then reloads the page. This avoids the short-lived JWT lifecycle and works reliably across test runs.

### Page Objects

All page classes extend `BasePage`. Locators are `private readonly` properties — tests never call `page.locator()` directly. Public methods encapsulate interactions and return `void` or a typed value. Assertions live only in test specs.

### `WaitHelper`

Utility class with three static methods:
- `waitForNetworkIdle(page)` — waits for the network to go quiet (used after navigation).
- `waitForCondition(fn, timeout, interval)` — polls a boolean predicate.
- `poll(fn, predicate, timeout, interval)` — polls an async function until its result satisfies a predicate.

### Fixtures

Two fixture layers:
- **`base.fixture.ts`** — provides `httpClient` and `baseUrl`; no application knowledge.
- **`test.fixture.ts`** — composes business fixtures on top: `loginPage`, `dashboardPage`, `dashboardApi`, `storageAuth`, `localStorageHelper`. The `storageAuth` fixture runs auth setup as a side effect; pages that need an authenticated session declare it as a dependency.

---

## Test Categories

| Category | Location | Description |
|----------|----------|-------------|
| **API** | `src/tests/api/` | Pure REST tests against `/api/v1/project/{name}`: 200 happy path, 401 no auth, 403/404 unknown project |
| **UI** | `src/tests/ui/` | Smoke tests for the login page and dashboard creation via the browser |
| **Integration** | `src/tests/integration/` | Cross-layer: create a dashboard via API and verify it appears in the UI; create via UI and retrieve via API. `afterEach` deletes test data via API. |

---

## Setup

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env` and fill in the required values (see [Environment Variables](#environment-variables)).

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BASE_URL` | Yes | ReportPortal base URL (e.g. `https://reportportal.epam.com`) |
| `API_BASE_URL` | No | API base URL. Defaults to `{BASE_URL}/api/v1` |
| `USER_NAME` | No | ReportPortal username |
| `PROJECT_NAME` | No | Project name for test runs |
| `API_KEY` | No | API key for authentication (used for both UI localStorage auth and REST calls) |
| `RP_ENDPOINT` | No | ReportPortal reporting endpoint. Defaults to `{BASE_URL}/api/v2` |
| `RP_LAUNCH_NAME` | No | Base name for RP launches. Defaults to `Playwright Tests` |

---

## Running Tests

```bash
npm test               # Run all tests (headless)
npm run test:headed    # Run with browser UI visible
npm run test:ui        # Open Playwright UI mode
npm run test:debug     # Debug mode
npm run report         # Open HTML report
```

Test results are also sent to ReportPortal automatically. Each run creates a new launch named `<RP_LAUNCH_NAME> <timestamp>`.

---

## Code Quality

```bash
npm run lint           # Check for lint errors
npm run lint:fix       # Auto-fix lint errors
npm run format         # Format code with Prettier
npm run format:check   # Check formatting without changes
```
