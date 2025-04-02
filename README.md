# UI Starter Storybook

### Installation / Startup
1. Clone this repo into your machine and navigate to `ui.frontend` folder.
2. Run `npm install` - Installs all dependencies. 
3. Run `npm run storybook` - Starts the webpack dev server. Once started it should open a browser (localhost:6006 or the next available port).
4. You can now modify CSS, JS, SCSS, and TS files and see the changes immediately reflected in the webpack dev server.

### Build
* Run `npm run build:htl` - Convert Handlebar files to HTL.
* Run `npm run plop` - Generate any new component.
* Run `npm run eslint` - Runs the ESLint script to analyze and identify issues in JavaScript code.
* Run `npm run stylelint` - Runs the Stylelint script to analyze and identify issues in CSS or SCSS code.
* Run `npm run prettier` - Runs the prettier script to beautify all the project JavaScript and SCSS files.

### Visual Testing
* Run `npm run test:visual` - Runs visual regression tests using Playwright.
* Run `npm run test:visual:update` - Updates visual test snapshots to match current component states.
* Run `npm run test:visual:report` - Opens the latest visual test report in your browser.
* Run `npm run test:visual:ui` - Opens Playwright's UI mode for interactive test debugging.
* Run `npm run test:visual:generate` - Generates visual test files for all stories.
* Run `npm run test:visual:story "ComponentName"` - Runs visual tests for a specific story (use with -g flag).
* Run `npm run test:visual:story:update  "ComponentName"` - Updates snapshots for a specific story (use with -g flag).

Examples for story-specific testing:
```bash
# Test a specific component
npm run test:visual:story "header"

# Update snapshots for a component variation
npm run test:visual:story:update "header"
```

To include a story in visual testing, add the `visual-test` tag to your story's parameters:
```javascript
export default {
  title: 'Components/MyComponent',
  parameters: {
    tags: ['visual-test']
  }
};
```

The project includes a pre-commit hook that automatically runs visual tests before each commit:
* The hook will attempt to run the tests up to 2 times if they fail
* If tests fail after both attempts, the commit will be blocked
* A 2-second delay is added between retry attempts
* The hook runs in the `ui.frontend` directory automatically

## FAQ
1. Server not starting with some error.
* Make sure you are inside  `ui.frontend` folder.
* Check if you are using [NodeJS](https://nodejs.org/en/download/) version [v18](https://nodejs.org/download/release/v18.16.1/).
* Navigate to `ui.frontend` and run the below commands:
   - `rm -R node_modules` - Remove old removing dependencies, it allows for a clean installation.
   - `rm package-lock.json` - By removing it, you ensure that a fresh package-lock.json file will be generated during the dependency installation process.
   - `npm install` - This command installs project dependencies. 
   - `npm run storybook`  -  This command starts the Storybook development environment. 
   - Open browser and navigate to `http://localhost:6006/`

2. `npm audit` throws vulnerabilities issues.
* Open package.json and add `"trim-newlines": "4.0.2"` under `overrides`.
* Reinstall the node packages (Note this may stop stylelint actions).
