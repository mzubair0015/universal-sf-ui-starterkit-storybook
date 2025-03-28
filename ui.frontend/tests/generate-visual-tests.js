const fs = require('fs');
const path = require('path');
const { VIEWPORTS } = require('./config/viewports');
const glob = require('glob');

// Function to extract story ID from the file path
function getStoryId(filePath) {
  const match = filePath.match(/([^/]+)\.stories\.(js|jsx|ts|tsx)$/);
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
  return filePath.includes('/core-components/');
}

function findVisualStories(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const stories = [];
  
  // Look for stories with 'visual' tag in parameters
  const storyRegex = /export\s+const\s+(\w+)\s*=.*?tags:\s*\[\s*['"]visual['"]\s*\]/gs;
  let match;
  
  while ((match = storyRegex.exec(content)) !== null) {
    const storyName = match[1].toLowerCase();
    const componentId = getStoryId(filePath);
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
    const isPage = story.filePath.includes('/pages/');
    
    // Adjust the story URL based on component type
    let storyUrl;
    if (isPage) {
      storyUrl = `/iframe.html?id=pages-${story.componentId}--${story.storyName}&viewMode=story`;
    } else if (story.isCoreComponent) {
      storyUrl = `/iframe.html?id=core-components-${story.componentId}--${story.storyName}&viewMode=story`;
    } else {
      storyUrl = `/iframe.html?id=components-${story.componentId}--${story.storyName}&viewMode=story`;
    }
    
    // Set longer timeout for pages and components with child components
    const timeout = isPage ? 60000 : 30000;
    
    return `
  test('${testName}', async ({ page }) => {
    // Navigate to the story
    await page.goto('${storyUrl}');
    
    // For pages, wait for all child components to be ready
    ${isPage ? `
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: ${timeout} }),
      page.waitForSelector('.footer', { timeout: ${timeout} })
    ]);` : ''}
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.${story.className}', { timeout: ${timeout} });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for ${story.componentId}');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('${screenshotName}', {
      clip: box,
      timeout: ${timeout},
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });`;
  }).join('\n');

  return `${imports}test.describe('Visual Tests', () => {${testContent}\n});`;
}

async function generateVisualTests() {
  // Find all story files in components, core-components, and pages directories
  const storyFiles = [
    ...glob.sync('src/main/webpack/components/**/doc/*.stories.{js,jsx,ts,tsx}'),
    ...glob.sync('src/main/webpack/core-components/**/doc/*.stories.{js,jsx,ts,tsx}'),
    ...glob.sync('src/main/webpack/pages/**/doc/*.stories.{js,jsx,ts,tsx}')
  ];
  
  console.log('Found story files:', storyFiles);
  
  // Find stories with 'visual' tag
  const visualStories = [];
  for (const file of storyFiles) {
    const stories = findVisualStories(file);
    visualStories.push(...stories);
  }
  
  if (visualStories.length === 0) {
    console.log('No stories found with visual tag');
    return;
  }
  
  console.log('Found visual stories:', visualStories);
  
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