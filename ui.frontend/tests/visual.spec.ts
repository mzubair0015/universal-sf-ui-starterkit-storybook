import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test('profile - primary visual test', async ({ page }) => {
    // Navigate to the story
    await page.goto('/iframe.html?id=components-profile--primary&viewMode=story');
    
    // For pages, wait for all child components to be ready
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.profile', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for profile');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('profile-primary.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('header - default visual test', async ({ page }) => {
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    // For pages, wait for all child components to be ready
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('footer - primary visual test', async ({ page }) => {
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    // For pages, wait for all child components to be ready
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('cardgroup - primary visual test', async ({ page }) => {
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    // For pages, wait for all child components to be ready
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('breadcrumb - breadcrumb visual test', async ({ page }) => {
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    // For pages, wait for all child components to be ready
    
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });

  test('home - primary visual test', async ({ page }) => {
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
    // For pages, wait for all child components to be ready
    
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
    await expect(page).toHaveScreenshot('home-primary.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled'
    });
  });
});