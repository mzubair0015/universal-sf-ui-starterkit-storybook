import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set default viewport size
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('header - default visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('header - default visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('header - default visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('header - default visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('footer - primary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('footer - primary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('footer - primary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('footer - primary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - primary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - primary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - primary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - primary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - secondary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--secondary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-secondary-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - secondary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--secondary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-secondary-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - secondary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--secondary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-secondary-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - secondary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--secondary&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-secondary-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('breadcrumb - breadcrumb visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('breadcrumb - breadcrumb visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('breadcrumb - breadcrumb visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('breadcrumb - breadcrumb visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('home - primary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: 60000 }),
      page.waitForSelector('.footer', { timeout: 60000 })
    ]);
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.home', { timeout: 60000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for home');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('home-primary-mobile.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('home - primary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: 60000 }),
      page.waitForSelector('.footer', { timeout: 60000 })
    ]);
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.home', { timeout: 60000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for home');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('home-primary-tablet.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('home - primary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: 60000 }),
      page.waitForSelector('.footer', { timeout: 60000 })
    ]);
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.home', { timeout: 60000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for home');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('home-primary-desktop.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('home - primary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: 60000 }),
      page.waitForSelector('.footer', { timeout: 60000 })
    ]);
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.home', { timeout: 60000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for home');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('home-primary-large.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });
});