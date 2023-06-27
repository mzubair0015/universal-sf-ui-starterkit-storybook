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
* Run `npm run stylelint`- Runs the Stylelint script to analyze and identify issues in CSS or SCSS code.
 

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
