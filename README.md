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

To skip visual tests during commits, create a `.env` file in the `ui.frontend` directory with:
```
VISUAL_TEST=false
```

## React Component Development Guidelines

### Component Structure
1. React components are located in `ui.frontend/src/main/webpack/components/`
2. Each component should have the following structure:
   ```
   component-name/
   ├── component-name.jsx      # Main React component
   ├── component-name.js       # Component initialization and mounting
   ├── component-name.hbs      # Handlebar template
   ├── component-name.scss     # Component styles (if needed)
   └── component-name.stories.jsx  # Storybook stories
   ```

### Component Implementation
1. **React Component (JSX)**
   - Create functional components using JSX
   - Use props for data passing
   - Keep components focused and single-responsibility
   ```jsx
   import React from "react";

   export default function MyComponent({ prop1, prop2 }) {
     return (
       <div className="my-component">
         {/* Component content */}
       </div>
     );
   }
   ```

2. **Component Initialization (JS)**
   - Handle component mounting and initialization
   - Parse data attributes from the DOM
   - Use React 18's createRoot for rendering
   ```js
   import React from "react";
   import { createRoot } from "react-dom/client";
   import MyComponent from "./MyComponent.jsx";

   export default class {
     static init(el) {
       const props = JSON.parse(JSON.stringify(el.dataset));
       createRoot(el).render(<MyComponent {...props} />);
     }
   }
   ```

3. **Handlebar Template (HBS)**
   - Define the component's HTML structure
   - Use data attributes for props
   ```handlebars
   <div data-component="my-component" data-prop1="value1" data-prop2="value2"></div>
   ```

### Best Practices
1. **Props and Data**
   - Use data attributes in HBS templates for props
   - Keep prop names consistent between JSX and HBS
   - Document required and optional props
   - Use TypeScript interfaces for prop types when possible

2. **Styling**
   - Use SCSS for component styles
   - Follow BEM naming convention
   - Keep styles scoped to the component
   - Use CSS variables for theming

3. **Accessibility**
   - Include proper ARIA attributes
   - Ensure keyboard navigation
   - Use semantic HTML elements
   - Test with screen readers

4. **Performance**
   - Use React.memo for pure components
   - Implement proper useEffect cleanup
   - Avoid unnecessary re-renders
   - Use useCallback and useMemo appropriately

### Storybook Integration
1. Create stories for each component
2. Document component usage and props
3. Show different variants and states
4. Include accessibility information
```jsx
import MyComponent from './MyComponent.jsx';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
};

const Template = (args) => <MyComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  prop1: 'value1',
  prop2: 'value2'
};
```

### Testing
1. Write unit tests for components
2. Test component initialization
3. Test prop handling
4. Include accessibility tests
5. Use visual regression testing (as configured in the project)

### Component Generation
Use the plop generator to create new components:
```bash
npm run plop
```
This will create the necessary files with the correct structure and boilerplate code.

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
