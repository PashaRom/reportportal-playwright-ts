# ReportPortal Playwright TypeScript

Automated test suite for ReportPortal built with Playwright and TypeScript.

## Project Structure

```
src/
├── core/          # Technical kernel: browser, http, utils, config
├── business/      # Business layer: pages, api, models, builders, workflows
└── tests/         # Test specs, fixtures, data
```

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npm test               # Run all tests (headless)
npm run test:headed    # Run with browser UI visible
npm run test:ui        # Open Playwright UI mode
npm run test:debug     # Debug mode
npm run report         # Open HTML report
```

## Code Quality

```bash
npm run lint           # Check for lint errors
npm run lint:fix       # Auto-fix lint errors
npm run format         # Format code
npm run format:check   # Check formatting
```

## Environment

Copy `.env.example` to `.env` and configure:

```
BASE_URL=https://your-reportportal-instance.com
```
