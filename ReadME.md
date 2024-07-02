# Privilee UI Test Automation
This project is an UI automation framework for testing Privilee maps page. It uses Playwright, Javascript and follows the Page Object Model design pattern.

## Tools and Technologies

- JavaScript
- Playwright 1.45.0
- Node 18
- Playwright html Reports

## Design Pattern

This framework follows the Page Object Model (POM) design pattern, adapted for UI testing. In this context:

- Each pages(home and serach page) is represented by a separate class.
- These classes contain locators, methods for different UI operations and any necessary data manipulation.
- Test classes use these "UI objects" to perform tests, promoting code reusability and easier maintenance.

## Project Structure

- `tests`
  - `data/`: contains search data and search scenario
  - `e2e/`: contains test files Utility classes including TestReporter
  - `utils/testRunner`: configuration for test runner
- `pages/`: Test pages containg locators and methods
- `playwright.config.js`: configuration files for tests, reports, baseURL, screenshots
- `test-reports/html`: Generated test reports
- `package.json` : contains devDependencies

## Setup and Execution

1. Clone the repository
2. Install playwright: `npx playwright install`
3. Run tests: `npx playwright test`


## URL Covered

- `https://staging-website.privilee.ae/map`

## Test Scenarios

We cover the following scenarios:

#### Homepage (High priority, high severity)
1. Verify homepage images (img, alt, min/max height and width, image presence)
2. Verify homepage headers and description (content and count)

#### SearchPage (High priority, high severity)
1. Verify correct results for a valid search query (visibility, data correctness)
2. Verify "No results found" for an invalid search query (Exception message)
3. Verify correct number of results for differenet search query like Beach, Restraurant and Spa (No. of results)


## CI/CD (GitHub Actions)

This project is configured to run on GitHub Actions. The workflow is defined in `.github/workflows/playwright.yml`. It runs on every push request to the main branch.


## To view the GitHub Actions runs:

1. Go to your GitHub repository.
2. Click on the "Actions" tab.
3. You will see the list of workflow runs.

## Test Reports

After running the tests, TestNG generates an HTML report. To view the report:

1. Navigate to the `/test-reports/html/` directory.
2. Open `index.html` in a web browser.

For GitHub Actions runs, you can download the test reports as artifacts from the workflow run page.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.