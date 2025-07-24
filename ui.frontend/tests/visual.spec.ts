import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set default viewport size
    await page.setViewportSize({ width: 1280, height: 2000 });
  });

  test('profile - primary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-profile--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.profile', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.profile');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for profile');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('profile-primary-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 568
    });
  });

  test('profile - primary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-profile--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.profile', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.profile');
    
    // Small delay to ensure layout is stable after breakpoint transition
    await page.waitForTimeout(1000);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for profile');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('profile-primary-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 1024
    });
  });

  test('profile - primary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-profile--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.profile', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.profile');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for profile');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('profile-primary-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 768
    });
  });

  test('profile - primary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-profile--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.profile', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.profile');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for profile');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('profile-primary-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 900
    });
  });

  test('header - default visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.header');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 568
    });
  });

  test('header - default visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.header');
    
    // Small delay to ensure layout is stable after breakpoint transition
    await page.waitForTimeout(1000);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 1024
    });
  });

  test('header - default visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.header');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 768
    });
  });

  test('header - default visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-header--default&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.header', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.header');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for header');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('header-default-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 900
    });
  });

  test('footer - primary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.footer');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 568
    });
  });

  test('footer - primary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.footer');
    
    // Small delay to ensure layout is stable after breakpoint transition
    await page.waitForTimeout(1000);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 1024
    });
  });

  test('footer - primary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.footer');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 768
    });
  });

  test('footer - primary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-footer--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.footer', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.footer');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for footer');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('footer-primary-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 900
    });
  });

  test('cardgroup - primary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.cardgroup');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 568
    });
  });

  test('cardgroup - primary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.cardgroup');
    
    // Small delay to ensure layout is stable after breakpoint transition
    await page.waitForTimeout(1000);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 1024
    });
  });

  test('cardgroup - primary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.cardgroup');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 768
    });
  });

  test('cardgroup - primary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--primary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.cardgroup');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-primary-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 900
    });
  });

  test('cardgroup - secondary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--secondary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.cardgroup');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-secondary-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 568
    });
  });

  test('cardgroup - secondary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--secondary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.cardgroup');
    
    // Small delay to ensure layout is stable after breakpoint transition
    await page.waitForTimeout(1000);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-secondary-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 1024
    });
  });

  test('cardgroup - secondary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--secondary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.cardgroup');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-secondary-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 768
    });
  });

  test('cardgroup - secondary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-cardgroup--secondary&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.cardgroup', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.cardgroup');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for cardgroup');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('cardgroup-secondary-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 900
    });
  });

  test('breadcrumb - breadcrumb visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.breadcrumb');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb-mobile.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 568
    });
  });

  test('breadcrumb - breadcrumb visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.breadcrumb');
    
    // Small delay to ensure layout is stable after breakpoint transition
    await page.waitForTimeout(1000);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb-tablet.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 1024
    });
  });

  test('breadcrumb - breadcrumb visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.breadcrumb');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb-desktop.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 768
    });
  });

  test('breadcrumb - breadcrumb visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=components-breadcrumb--breadcrumb&viewMode=story');
    
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.breadcrumb', { timeout: 30000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.breadcrumb');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for breadcrumb');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('breadcrumb-breadcrumb-large.png', {
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 900
    });
  });

  test('home - primary visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
 
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: 60000 }),
      page.waitForSelector('.footer', { timeout: 60000 })
    ]);
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.home', { timeout: 60000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.home');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for home');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('home-primary-mobile.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 568
    });
  });

  test('home - primary visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
 
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: 60000 }),
      page.waitForSelector('.footer', { timeout: 60000 })
    ]);
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.home', { timeout: 60000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.home');
    
    // Small delay to ensure layout is stable after breakpoint transition
    await page.waitForTimeout(1000);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for home');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('home-primary-tablet.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 1024
    });
  });

  test('home - primary visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
 
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: 60000 }),
      page.waitForSelector('.footer', { timeout: 60000 })
    ]);
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.home', { timeout: 60000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.home');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for home');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('home-primary-desktop.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 768
    });
  });

  test('home - primary visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    const boundingBox = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
 
      const width = Math.max(body.scrollWidth, body.clientWidth);
      const height = Math.max(body.scrollHeight, body.clientHeight);
 
      return { x: 0, y: 0, width, height };
    });
 
    // Navigate to the story
    await page.goto('/iframe.html?id=pages-home--primary&viewMode=story');
    
 
    // Wait for key child components to be rendered
    await Promise.all([
      page.waitForSelector('.header', { timeout: 60000 }),
      page.waitForSelector('.footer', { timeout: 60000 })
    ]);
    // Wait for the component to be fully rendered
    const component = await page.waitForSelector('.home', { timeout: 60000 });
    
    // Wait for all images, background images, and iframe content within the component to be loaded
    await page.evaluate(async (componentSelector) => {
      const component = document.querySelector(componentSelector);
      if (!component) return;
      
      // Wait for regular images
      const images = component.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout per image
          img.onload = () => {
            clearTimeout(timeout);
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            resolve(); // Continue even if some images fail to load
          };
        });
      });
      
      // Wait for background images
      const backgroundImagePromises = Array.from(component.querySelectorAll('*')).map(element => {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
          return new Promise((resolve) => {
            const timeout = setTimeout(() => resolve(), 3000); // 3 second timeout for background images
            
            // Create a temporary image to check if background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
            tempImg.onerror = () => {
              clearTimeout(timeout);
              resolve(); // Continue even if background image fails to load
            };
            
            // Extract URL from background-image CSS property
            const urlMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch) {
              tempImg.src = urlMatch[1];
            } else {
              resolve();
            }
          });
        }
        return Promise.resolve();
      });
      
      // Wait for iframe content to load (if any)
      const iframes = component.querySelectorAll('iframe');
      const iframePromises = Array.from(iframes).map(iframe => {
        return new Promise((resolve) => {
          const timeout = setTimeout(() => resolve(), 5000); // 5 second timeout for iframes
          
          if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            iframe.onload = () => {
              clearTimeout(timeout);
              resolve();
            };
          }
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundImagePromises, ...iframePromises]);
    }, '.home');
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(500);
 
    await component.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, component);
    // Get the bounding box of the component
    const box = await component.boundingBox();
    if (!box) throw new Error('Could not get bounding box for home');
    // Take a screenshot of only the component area
    await expect(page).toHaveScreenshot('home-primary-large.png', {
      clip: box,
      timeout: 60000,
      maxDiffPixels: 500,
      threshold: 0.4,
      animations: 'disabled',
      fullPage: box.height > 900
    });
  });
});