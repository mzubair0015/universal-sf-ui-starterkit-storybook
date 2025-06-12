const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { VIEWPORTS } = require('../tests/config/viewports.js');
 
if(!VIEWPORTS)  {
  VIEWPORTS = [
    { width: 320, height: 568, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1024, height: 768, name: 'desktop' },
    { width: 1440, height: 900, name: 'large' }
  ];
}
 
// Function to extract story ID from the file path
function getStoryId(filePath) {
  const fileName = path.basename(filePath);
  const match = fileName.match(/^([^.]+)\.stories\.(js|jsx|ts|tsx)$/);
  if (!match) return null;
  return match[1];
}
 
// Function to extract variation from story content
function getStoryVariation(content, storyName) {
  const variationRegex = new RegExp(`export\\s+const\\s+${storyName}\\s*=\\s*Template\\.bind\\(\\{\\}\\s*;\\s*${storyName}\\.args\\s*=\\s*{[^}]*variation:\\s*['"]([^'"]+)['"]`, 's');
  const match = content.match(variationRegex);
  return match ? match[1] : null;
}
 
// Function to get component class name from template file
function getComponentClassName(templatePath) {
  const content = fs.readFileSync(templatePath, 'utf8');
  const classMatch = content.match(/class="([^"]+)"/);
if (!classMatch) return null;
  // Remove Handlebars template syntax and get the first class name
  const className = classMatch[1].split(/{{[^}]+}}/)
    .map(part => part.trim())
    .filter(Boolean)[0]
    .split(/\s+/)[0]; // Take only the first class name
  return className;
}
// Function to check if a component is in core-components
function isCoreComponent(filePath) {
  return filePath.includes(path.join('core-components'));
}
 
function findVisualStories(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const stories = [];
  // Look for stories with 'visual' tag in parameters
  const storyRegex = /export\s+const\s+(\w+)\s*=.*?tags:\s*\[\s*['"]visual['"]\s*\]/gs;
  let match;
  while ((match = storyRegex.exec(content)) !== null) {
    const storyName = match[1].toLowerCase();
    const capitalizedStoryName = match[1].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    let componentId = getStoryId(filePath);
    const variation = getStoryVariation(content, match[1]);
    if (componentId) {
      // Try to find the template file
      const componentDir = path.dirname(path.dirname(filePath));
      let templatePath = null;
      
      if (isCoreComponent(filePath)) {
        // For core components, look for specific template files
        const templateFile = path.join(componentDir, `${storyName}.hbs`);
        if (fs.existsSync(templateFile)) {
          templatePath = templateFile;
        }
      } else {
        // For regular components, look for default template
        const defaultTemplate = path.join(componentDir, `${componentId}.hbs`);
        if (fs.existsSync(defaultTemplate)) {
          templatePath = defaultTemplate;
        }
      }
      const className = templatePath ? getComponentClassName(templatePath) : componentId;
      stories.push({
        componentId,
        storyName,
        capitalizedStoryName,
        variation,
        filePath,
        className,
        isCoreComponent: isCoreComponent(filePath)
      });
    }
  }
  return stories;
}
 
function generateTestSpec(stories) {
  const imports = `import { test, expect } from '@playwright/test';\n\n`;
  const testContent = stories.map(story => {
    const variationSuffix = story.variation ? `-${story.variation}` : '';
    const testName = `${story.componentId} - ${story.storyName}${variationSuffix} visual test`;
    const screenshotName = `${story.componentId}-${story.storyName}${variationSuffix}.png`;
    // Determine if this is a page component
    const isPage = story.filePath.includes(path.join('pages'));
    
    // remove '-' from storyName for URL
   // story.storyName = story.storyName.replace(/([a-z])([A-Z])/g, '$1-$2');
    story.componentId = story.componentId.replace(/-/g, '');
    let storyUrl;
    if (isPage) {
      storyUrl = `/iframe.html?id=pages-${story.componentId}--${story.capitalizedStoryName}&viewMode=story`;
    } else if (story.isCoreComponent) {
      storyUrl = `/iframe.html?id=core-components-${story.componentId}--${story.capitalizedStoryName}&viewMode=story`;
    } else {
      storyUrl = `/iframe.html?id=components-${story.componentId}--${story.capitalizedStoryName}&viewMode=story`;
    }

    const location = {
      compID: story.componentId,
      storyName: story.storyName,
      url:`http://localhost:6006${storyUrl}`
    };
    console.log(location);
    // Set longer timeout for pages and components with child components
    const timeout = isPage ? 60000 : 30000;
 
    // Generate tests for each viewport
    const viewportTests = VIEWPORTS.map(viewport => {
      // Add extra delay for tablet viewport due to layout transitions
      const layoutStabilityDelay = viewport.name === 'tablet' ? 1000 : 500;
 
      // Determine if component has images to wait for
      const hasImages = story.componentId === 'profile';
      const imageWaitCode = hasImages ? `
    // Wait for images to load
    await Promise.all([
      page.waitForSelector('.${story.componentId}__image img', { timeout: ${timeout} }),
      page.waitForSelector('.${story.componentId}__social img', { timeout: ${timeout} })
    ]);
    // Small delay to ensure layout is stable${viewport.name === 'tablet' ? ' after breakpoint transition' : ''}
    await page.waitForTimeout(${layoutStabilityDelay});` : '';
 
      return `
  test('${testName} at ${viewport.name} viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: ${viewport.width}, height: ${viewport.height} });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    console.log('Navigating to story URL:', 'http://localhost:6006${storyUrl}');
    await page.goto('${storyUrl}');
    ${isPage ? `
 
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: ${timeout} }),
      page.waitForSelector('.footer', { timeout: ${timeout} })
    ]);` : ''}
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.${story.className}', { timeout: ${timeout} });
    ${imageWaitCode}
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for ${story.componentId}');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('${story.componentId}-${story.storyName}${variationSuffix}-${viewport.name}.png', {
      clip: box,
      timeout: ${timeout},
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > ${viewport.height}
    });
  });`;
    }).join('\n');
    return viewportTests;
  }).join('\n');
 
  return `${imports}test.describe('Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set default viewport size
    await page.setViewportSize({ width: 1280, height: 2000 });
  });
${testContent}\n});`;
}
 
async function generateVisualTests() {
  // Find all story files in components, core-components, and pages directories
  const globOptions = {
    windowsPathsNoEscape: true,
    absolute: false
  };
  const storyFiles = [
    ...glob.sync('src/main/webpack/components/**/docs/*.stories.{js,jsx,ts,tsx}', globOptions),
    ...glob.sync('src/main/webpack/core-components/**/docs/*.stories.{js,jsx,ts,tsx}', globOptions),
    ...glob.sync('src/main/webpack/pages/**/docs/*.stories.{js,jsx,ts,tsx}', globOptions)
  ];
  // console.log('Found story files:', storyFiles);
  // Find stories with 'visual' tag
  const visualStories = [];
  for (const file of storyFiles) {
    const stories = findVisualStories(file);
    visualStories.push(...stories);
  }
  console.log('Found visual stories:', visualStories.map(s => ({
    componentId: s.componentId,
    storyName: s.storyName,
    filePath: s.filePath,
    isCoreComponent: s.isCoreComponent
  })));
  if (visualStories.length === 0) {
    console.log('No stories found with visual tag');
    return;
  }
  // Generate test spec content
  const testSpec = generateTestSpec(visualStories);
  // Write to test file
  const testDir = 'tests';
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  fs.writeFileSync(path.join(testDir, 'visual.spec.ts'), testSpec);
  console.log(`Generated visual test spec for ${visualStories.length} stories`);
}
 
// Run the generator
generateVisualTests().catch(console.error);
