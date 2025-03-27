const fs = require('fs');
const path = require('path');

// Define viewport sizes to test
const VIEWPORTS = [
  { width: 320, height: 568, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1024, height: 768, name: 'desktop' },
  { width: 1440, height: 900, name: 'large' }
];

// Define components to test
const COMPONENTS = [
  {
    name: 'Header',
    selector: '.header',
    storyId: 'components-header--default',
    timeout: 30000
  },
  {
    name: 'Footer',
    selector: '.footer',
    storyId: 'components-footer--primary',
    timeout: 30000
  },
  {
    name: 'Cardgroup',
    selector: '.cardgroup',
    storyId: 'components-cardgroup--primary',
    timeout: 30000
  },
  {
    name: 'Breadcrumb',
    selector: '.breadcrumb',
    storyId: 'components-breadcrumb--breadcrumb',
    timeout: 30000
  }
];

// Define pages to test
const PAGES = [
  {
    name: 'Home',
    selector: '.home',
    storyId: 'pages-home--primary',
    timeout: 60000,
    childComponents: [
      { selector: '.header', timeout: 60000 },
      { selector: '.footer', timeout: 60000 }
    ]
  }
];

// Generate test code for a component
function generateComponentTest(component) {
  return `
  // ${component.name} tests
  test.describe('${component.name}', () => {
    for (const viewport of VIEWPORTS) {
      test(\`${component.name.toLowerCase()} - default visual test at \${viewport.name} viewport\`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto('/iframe.html?id=${component.storyId}&viewMode=story');
        
        const component = await page.waitForSelector('${component.selector}', { timeout: ${component.timeout} });
        const box = await component.boundingBox();
        if (!box) throw new Error('Could not get bounding box for ${component.name.toLowerCase()}');
        
        await expect(page).toHaveScreenshot(\`${component.name.toLowerCase()}-default-\${viewport.name}.png\`, {
          clip: box,
          timeout: ${component.timeout},
          maxDiffPixels: 500,
          threshold: 0.4,
          animations: 'disabled'
        });
      });
    }
  });`;
}

// Generate test code for a page
function generatePageTest(page) {
  const childComponentWaits = page.childComponents
    .map(child => `page.waitForSelector('${child.selector}', { timeout: ${child.timeout} })`)
    .join(',\n          ');

  return `
  // ${page.name} page tests
  test.describe('${page.name}', () => {
    for (const viewport of VIEWPORTS) {
      test(\`${page.name.toLowerCase()} - primary visual test at \${viewport.name} viewport\`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto('/iframe.html?id=${page.storyId}&viewMode=story');
        
        // Wait for key child components to be rendered
        await Promise.all([
          ${childComponentWaits}
        ]);
        
        const component = await page.waitForSelector('${page.selector}', { timeout: ${page.timeout} });
        const box = await component.boundingBox();
        if (!box) throw new Error('Could not get bounding box for ${page.name.toLowerCase()}');
        
        await expect(page).toHaveScreenshot(\`${page.name.toLowerCase()}-primary-\${viewport.name}.png\`, {
          clip: box,
          timeout: ${page.timeout},
          maxDiffPixels: 500,
          threshold: 0.4,
          animations: 'disabled'
        });
      });
    }
  });`;
}

// Generate the complete test file content
const testFileContent = `import { test, expect } from '@playwright/test';

// Define viewport sizes to test
const VIEWPORTS = ${JSON.stringify(VIEWPORTS, null, 2)};

test.describe('Visual Tests', () => {
${COMPONENTS.map(generateComponentTest).join('\n')}
${PAGES.map(generatePageTest).join('\n')}
});`;

// Write the generated test file
const outputPath = path.join(__dirname, 'visual.spec.ts');
fs.writeFileSync(outputPath, testFileContent);

console.log('Visual test file generated successfully at:', outputPath); 