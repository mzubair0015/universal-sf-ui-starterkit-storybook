import React, { useEffect, useState, useCallback } from 'react';
import { addons, types } from '@storybook/manager-api';

const OverlayIcon = () => {
  const [isActive, setIsActive] = useState(false);
  const [opacity, setOpacity] = useState(0.5);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(99999);
  const [isLoading, setIsLoading] = useState(false);
  const [showHandle, setShowHandle] = useState(true);

  const getStoryInfo = useCallback(() => {
    try {
      // Get the path from the URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      console.log('Full URL:', window.location.href);
      console.log('Search params:', window.location.search);
      const path = urlParams.get('path');
      console.log('Current path:', path);
      
      if (!path) {
        console.log('No path found in URL');
        return null;
      }

      // Extract story path from the full path
      const storyPath = path.replace('/story/', '');
      console.log('Story path after replace:', storyPath);

      // Split into component and story name
      const [componentPath, storyName] = storyPath.split('--');
      console.log('Split results - componentPath:', componentPath, 'storyName:', storyName);
      
      if (componentPath && storyName) {
        // Get viewport from URL params
        let viewportParam = urlParams.get('viewport') || 'desktop';
        console.log('Raw viewport param:', viewportParam);
        
        // If viewport is in the format "viewport:large", extract just "large"
        if (viewportParam.includes(':')) {
          viewportParam = viewportParam.split(':')[1];
        }
        console.log('Processed viewport:', viewportParam);

        // Remove 'components-' prefix if it exists
        const componentName = componentPath.replace('components-', '');
        console.log('Component name after removing prefix:', componentName);
        
        const result = {
          component: componentName,
          story: storyName,
          viewport: viewportParam
        };
        console.log('Final extracted story info:', result);
        return result;
      }

      console.log('Could not extract component and story from path:', storyPath);
      return null;
    } catch (error) {
      console.error('Error parsing story info:', error);
      console.error('Error stack:', error.stack);
      return null;
    }
  }, []);

  const removeOverlay = useCallback(() => {
    const overlayContainer = document.getElementById('visual-overlay-container');
    if (overlayContainer) {
      overlayContainer.remove();
    }
    setError(null);
    setPosition({ x: 0, y: 0 });
    setIsLoading(false);
  }, []);

  const updateOverlayOpacity = useCallback((newOpacity) => {
    const storyIframe = document.getElementById('storybook-preview-iframe');
    if (storyIframe) {
      const overlayDiv = storyIframe.contentDocument.getElementById('visual-overlay');
      if (overlayDiv) {
        overlayDiv.style.opacity = newOpacity;
      }
    }
  }, []);

  const updateOverlayPosition = useCallback((x, y) => {
    const storyIframe = document.getElementById('storybook-preview-iframe');
    if (storyIframe) {
      const overlayDiv = storyIframe.contentDocument.getElementById('visual-overlay');
      if (overlayDiv) {
        overlayDiv.style.transform = `translate(${x}px, ${y}px)`;
        setPosition({ x, y });
      }
    }
  }, []);

  const createKeyboardHints = () => {
    const hints = document.createElement('div');
    hints.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      z-index: 10000;
      pointer-events: none;
      background: rgba(255, 255, 255, 0.9);
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      color: #333;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    `;
    hints.innerHTML = `
      <div style="margin-bottom: 4px"><b>Keyboard Shortcuts:</b></div>
      <div>O - Toggle overlay</div>
      <div>+/- - Adjust opacity</div>
      <div>↑/↓/←/→ - Move 1px</div>
      <div>Shift + Arrows - Move 10px</div>
      <div>R - Reset position</div>
      <div>L - Toggle layer</div>
      <div>H - Toggle handle</div>
    `;
    return hints;
  };

  const toggleOverlay = useCallback(async () => {
    try {
      const storyInfo = getStoryInfo();
      console.log('Story info:', storyInfo);
      
      if (!storyInfo) {
        console.log('No story info available - removing overlay if active');
        if (isActive) {
          removeOverlay();
          setIsActive(false);
        }
        setError('Please navigate to a story first');
        return;
      }

      // Check if overlay already exists
      const storyIframe = document.getElementById('storybook-preview-iframe');
      if (!storyIframe) {
        console.error('Story iframe not found');
        return;
      }

      // Get or create elements
      let overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
      let controls = storyIframe.contentDocument.getElementById('visual-overlay-controls');
      let overlayDiv = storyIframe.contentDocument.getElementById('visual-overlay');

      if (!overlayContainer) {
        // First time activation - create and show elements
        setIsLoading(true);
        
        try {
          // Make storybook-root relatively positioned
          const storybookRoot = storyIframe.contentDocument.getElementById('storybook-root');
          if (!storybookRoot) {
            console.error('Storybook root element not found');
            return;
          }

          storybookRoot.style.cssText = `
            position: relative;
            min-height: 100%;
            width: 100%;
            display: block;
          `;

          // Create container
          overlayContainer = document.createElement('div');
          overlayContainer.id = 'visual-overlay-container';
          overlayContainer.className = 'visual-overlay-container';
          overlayContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: ${zIndex};
            pointer-events: none;
          `;
          storybookRoot.appendChild(overlayContainer);

          // Create overlay
          overlayDiv = document.createElement('div');
          overlayDiv.id = 'visual-overlay';
          overlayDiv.className = 'visual-overlay';
          overlayDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: ${opacity};
            transform: translate(${position.x}px, ${position.y}px);
            pointer-events: auto;
            mix-blend-mode: difference;
            background-color: transparent;
            cursor: move;
            z-index: ${zIndex};
          `;

          // Create picture element with media queries
          const picture = document.createElement('picture');
          picture.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: auto;
            height: 100%;
            pointer-events: none;
          `;

          // Add source elements for each viewport
          const viewports = [
            { name: 'mobile', width: 320 },
            { name: 'tablet', width: 768 },
            { name: 'desktop', width: 1024 },
            { name: 'large', width: 1440 }
          ];

          // Sort viewports by width in descending order
          viewports.sort((a, b) => b.width - a.width);

          // Add source elements for each viewport
          viewports.forEach((viewport, index) => {
            const source = document.createElement('source');
            const imageName = `${storyInfo.component}-${storyInfo.story}-${viewport.name}-chromium-darwin.png`;
            const imagePath = `/visual.spec.ts-snapshots/${imageName}`;
            
            if (index === 0) {
              // First viewport (largest) - no min-width
              source.media = `(min-width: ${viewport.width}px)`;
            } else {
              // Other viewports - min-width from previous viewport
              source.media = `(min-width: ${viewport.width}px) and (max-width: ${viewports[index - 1].width - 1}px)`;
            }
            
            source.srcset = imagePath;
            picture.appendChild(source);
          });

          // Add fallback img element
          const img = document.createElement('img');
          const fallbackImageName = `${storyInfo.component}-${storyInfo.story}-mobile-chromium-darwin.png`;
          const fallbackImagePath = `/visual.spec.ts-snapshots/${fallbackImageName}`;
          img.src = fallbackImagePath;
          img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: top;
          `;
          picture.appendChild(img);

          overlayDiv.appendChild(picture);
          overlayContainer.appendChild(overlayDiv);

          // Create controls
          controls = document.createElement('div');
          controls.id = 'visual-overlay-controls';
          controls.className = 'visual-overlay-controls';
          controls.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: ${zIndex + 1};
            pointer-events: auto;
            display: flex;
            gap: 8px;
            align-items: center;
            background: white;
            padding: 8px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            width: max-content;
          `;
          storyIframe.contentDocument.body.appendChild(controls);

          // Add grab icon
          const grabIcon = document.createElement('div');
          grabIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="5" r="1"></circle>
              <circle cx="9" cy="12" r="1"></circle>
              <circle cx="9" cy="19" r="1"></circle>
              <circle cx="15" cy="5" r="1"></circle>
              <circle cx="15" cy="12" r="1"></circle>
              <circle cx="15" cy="19" r="1"></circle>
            </svg>
          `;
          grabIcon.style.cssText = `
            cursor: grab;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
          `;
          controls.insertBefore(grabIcon, controls.firstChild);

          // Add drag functionality to grab icon
          let isDragging = false;
          let dragStartX = 0;
          let dragStartY = 0;
          let controlsStartX = 0;
          let controlsStartY = 0;

          grabIcon.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            const rect = controls.getBoundingClientRect();
            controlsStartX = rect.left;
            controlsStartY = rect.top;
            grabIcon.style.cursor = 'grabbing';
            e.preventDefault();
            e.stopPropagation();
          });

          const handleMouseMove = (e) => {
            if (isDragging) {
              const dx = e.clientX - dragStartX;
              const dy = e.clientY - dragStartY;
              const newLeft = controlsStartX + dx;
              const newTop = controlsStartY + dy;
              
              // Keep controls within viewport bounds
              const maxX = window.innerWidth - controls.offsetWidth;
              const maxY = window.innerHeight - controls.offsetHeight;
              
              controls.style.left = `${Math.max(0, Math.min(newLeft, maxX))}px`;
              controls.style.top = `${Math.max(0, Math.min(newTop, maxY))}px`;
            }
          };

          const handleMouseUp = () => {
            if (isDragging) {
              isDragging = false;
              grabIcon.style.cursor = 'grab';
            }
          };

          // Add event listeners to iframe's document
          const iframeDoc = storyIframe.contentDocument;
          iframeDoc.addEventListener('mousemove', handleMouseMove);
          iframeDoc.addEventListener('mouseup', handleMouseUp);
          iframeDoc.addEventListener('mouseleave', handleMouseUp);

          // Add cleanup for drag event listeners
          const cleanup = () => {
            iframeDoc.removeEventListener('mousemove', handleMouseMove);
            iframeDoc.removeEventListener('mouseup', handleMouseUp);
            iframeDoc.removeEventListener('mouseleave', handleMouseUp);
          };

          // Add cleanup to existing cleanup function
          const existingCleanup = storyIframe.contentDocument.body.removeChild;
          storyIframe.contentDocument.body.removeChild = function(node) {
            if (node === controls) {
              cleanup();
            }
            return existingCleanup.call(this, node);
          };

          // Add opacity slider
          const sliderContainer = document.createElement('div');
          sliderContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 4px;
          `;
          const sliderLabel = document.createElement('span');
          sliderLabel.textContent = 'Opacity:';
          sliderLabel.style.fontSize = '12px';

          const slider = document.createElement('input');
          slider.type = 'range';
          slider.min = '0';
          slider.max = '1';
          slider.step = '0.01';
          slider.value = opacity;
          slider.style.cssText = `
            width: 100px;
            cursor: pointer;
            -webkit-appearance: none;
            background: transparent;
            margin: 0;
            padding: 0;
          `;

          // Add custom slider styles
          const sliderStyle = document.createElement('style');
          sliderStyle.textContent = `
            input[type="range"] {
              -webkit-appearance: none;
              width: 100%;
              margin: 0;
              padding: 0;
            }
            input[type="range"]:focus {
              outline: none;
            }
            input[type="range"]::-webkit-slider-runnable-track {
              width: 100%;
              height: 6px;
              cursor: pointer;
              background: #ddd;
              border-radius: 3px;
            }
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 16px;
              height: 16px;
              background: #666;
              border-radius: 50%;
              cursor: pointer;
              margin-top: -5px;
              transition: background 0.1s;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              background: #333;
            }
            input[type="range"]::-webkit-slider-thumb:active {
              background: #000;
            }
          `;
          storyIframe.contentDocument.head.appendChild(sliderStyle);

          // Update opacity on input
          slider.addEventListener('input', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const newOpacity = parseFloat(e.target.value);
            setOpacity(newOpacity);
            updateOverlayOpacity(newOpacity);
          });

          // Prevent toggleOverlay when interacting with slider
          slider.addEventListener('mousedown', (e) => {
            e.stopPropagation();
          });

          // Add touch event handling for mobile
          slider.addEventListener('touchstart', (e) => {
            e.stopPropagation();
          });

          sliderContainer.appendChild(sliderLabel);
          sliderContainer.appendChild(slider);

          // Add buttons container
          const buttonsContainer = document.createElement('div');
          buttonsContainer.style.cssText = `
            display: flex;
            gap: 4px;
            align-items: center;
          `;

          // Add visibility toggle button
          const visibilityBtn = document.createElement('button');
          visibilityBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill="currentColor"/>
            </svg>
          `;
          visibilityBtn.title = 'Toggle Overlay Visibility';
          visibilityBtn.style.cssText = `
            padding: 4px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
          `;
          visibilityBtn.addEventListener('click', () => {
            const isVisible = !overlayDiv.classList.contains('hidden');
            if (isVisible) {
              overlayDiv.classList.add('hidden');
              visibilityBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z" fill="currentColor"/>
                </svg>
              `;
              visibilityBtn.style.color = '#666';
            } else {
              overlayDiv.classList.remove('hidden');
              visibilityBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill="currentColor"/>
                </svg>
              `;
              visibilityBtn.style.color = '#333';
            }
          });

          buttonsContainer.appendChild(visibilityBtn);
          controls.appendChild(sliderContainer);
          controls.appendChild(buttonsContainer);

          // Add CSS for visibility management
          const style = document.createElement('style');
          style.textContent = `
            .visual-overlay-container.hidden,
            .visual-overlay-controls.hidden,
            .visual-overlay.hidden {
              display: none !important;
            }
          `;
          storyIframe.contentDocument.head.appendChild(style);

          setIsActive(true);
          setIsLoading(false);
        } catch (error) {
          console.error('Error setting up overlay:', error);
          setError('Failed to setup overlay');
          setIsLoading(false);
        }
      } else {
        // Subsequent clicks - toggle visibility
        const isVisible = !overlayContainer.classList.contains('hidden');
        if (isVisible) {
          overlayContainer.classList.add('hidden');
          if (controls) {
            controls.remove();
          }
        } else {
          overlayContainer.classList.remove('hidden');
          // Recreate controls
          controls = document.createElement('div');
          controls.id = 'visual-overlay-controls';
          controls.className = 'visual-overlay-controls';
          controls.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: ${zIndex + 1};
            pointer-events: auto;
            display: flex;
            gap: 8px;
            align-items: center;
            background: white;
            padding: 8px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            width: max-content;
          `;
          storyIframe.contentDocument.body.appendChild(controls);

          // Add grab icon
          const grabIcon = document.createElement('div');
          grabIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="5" r="1"></circle>
              <circle cx="9" cy="12" r="1"></circle>
              <circle cx="9" cy="19" r="1"></circle>
              <circle cx="15" cy="5" r="1"></circle>
              <circle cx="15" cy="12" r="1"></circle>
              <circle cx="15" cy="19" r="1"></circle>
            </svg>
          `;
          grabIcon.style.cssText = `
            cursor: grab;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
          `;
          controls.insertBefore(grabIcon, controls.firstChild);

          // Add drag functionality to grab icon
          let isDragging = false;
          let dragStartX = 0;
          let dragStartY = 0;
          let controlsStartX = 0;
          let controlsStartY = 0;

          grabIcon.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            const rect = controls.getBoundingClientRect();
            controlsStartX = rect.left;
            controlsStartY = rect.top;
            grabIcon.style.cursor = 'grabbing';
            e.preventDefault();
            e.stopPropagation();
          });

          const handleMouseMove = (e) => {
            if (isDragging) {
              const dx = e.clientX - dragStartX;
              const dy = e.clientY - dragStartY;
              const newLeft = controlsStartX + dx;
              const newTop = controlsStartY + dy;
              
              // Keep controls within viewport bounds
              const maxX = window.innerWidth - controls.offsetWidth;
              const maxY = window.innerHeight - controls.offsetHeight;
              
              controls.style.left = `${Math.max(0, Math.min(newLeft, maxX))}px`;
              controls.style.top = `${Math.max(0, Math.min(newTop, maxY))}px`;
            }
          };

          const handleMouseUp = () => {
            if (isDragging) {
              isDragging = false;
              grabIcon.style.cursor = 'grab';
            }
          };

          // Add event listeners to iframe's document
          const iframeDoc = storyIframe.contentDocument;
          iframeDoc.addEventListener('mousemove', handleMouseMove);
          iframeDoc.addEventListener('mouseup', handleMouseUp);
          iframeDoc.addEventListener('mouseleave', handleMouseUp);

          // Add cleanup for drag event listeners
          const cleanup = () => {
            iframeDoc.removeEventListener('mousemove', handleMouseMove);
            iframeDoc.removeEventListener('mouseup', handleMouseUp);
            iframeDoc.removeEventListener('mouseleave', handleMouseUp);
          };

          // Add cleanup to existing cleanup function
          const existingCleanup = storyIframe.contentDocument.body.removeChild;
          storyIframe.contentDocument.body.removeChild = function(node) {
            if (node === controls) {
              cleanup();
            }
            return existingCleanup.call(this, node);
          };

          // Add opacity slider
          const sliderContainer = document.createElement('div');
          sliderContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 4px;
          `;
          const sliderLabel = document.createElement('span');
          sliderLabel.textContent = 'Opacity:';
          sliderLabel.style.fontSize = '12px';

          const slider = document.createElement('input');
          slider.type = 'range';
          slider.min = '0';
          slider.max = '1';
          slider.step = '0.01';
          slider.value = opacity;
          slider.style.cssText = `
            width: 100px;
            cursor: pointer;
            -webkit-appearance: none;
            background: transparent;
            margin: 0;
            padding: 0;
          `;

          // Add custom slider styles
          const sliderStyle = document.createElement('style');
          sliderStyle.textContent = `
            input[type="range"] {
              -webkit-appearance: none;
              width: 100%;
              margin: 0;
              padding: 0;
            }
            input[type="range"]:focus {
              outline: none;
            }
            input[type="range"]::-webkit-slider-runnable-track {
              width: 100%;
              height: 6px;
              cursor: pointer;
              background: #ddd;
              border-radius: 3px;
            }
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 16px;
              height: 16px;
              background: #666;
              border-radius: 50%;
              cursor: pointer;
              margin-top: -5px;
              transition: background 0.1s;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              background: #333;
            }
            input[type="range"]::-webkit-slider-thumb:active {
              background: #000;
            }
          `;
          storyIframe.contentDocument.head.appendChild(sliderStyle);

          // Update opacity on input
          slider.addEventListener('input', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const newOpacity = parseFloat(e.target.value);
            setOpacity(newOpacity);
            updateOverlayOpacity(newOpacity);
          });

          // Prevent toggleOverlay when interacting with slider
          slider.addEventListener('mousedown', (e) => {
            e.stopPropagation();
          });

          // Add touch event handling for mobile
          slider.addEventListener('touchstart', (e) => {
            e.stopPropagation();
          });

          sliderContainer.appendChild(sliderLabel);
          sliderContainer.appendChild(slider);

          // Add buttons container
          const buttonsContainer = document.createElement('div');
          buttonsContainer.style.cssText = `
            display: flex;
            gap: 4px;
            align-items: center;
          `;

          // Add visibility toggle button
          const visibilityBtn = document.createElement('button');
          visibilityBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill="currentColor"/>
            </svg>
          `;
          visibilityBtn.title = 'Toggle Overlay Visibility';
          visibilityBtn.style.cssText = `
            padding: 4px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
          `;
          visibilityBtn.addEventListener('click', () => {
            const isVisible = !overlayDiv.classList.contains('hidden');
            if (isVisible) {
              overlayDiv.classList.add('hidden');
              visibilityBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z" fill="currentColor"/>
                </svg>
              `;
              visibilityBtn.style.color = '#666';
            } else {
              overlayDiv.classList.remove('hidden');
              visibilityBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill="currentColor"/>
                </svg>
              `;
              visibilityBtn.style.color = '#333';
            }
          });

          buttonsContainer.appendChild(visibilityBtn);
          controls.appendChild(sliderContainer);
          controls.appendChild(buttonsContainer);
        }
      }
    } catch (error) {
      console.error('Error in toggleOverlay:', error);
      setError('An error occurred');
      setIsLoading(false);
    }
  }, [isActive, getStoryInfo, removeOverlay]);

  // Listen for URL changes and view mode changes
  useEffect(() => {
    const handleUrlChange = () => {
      const storyInfo = getStoryInfo();
      console.log('Story info from URL:', storyInfo);
      
      // Get current view mode
      const viewMode = window.location.pathname.includes('/docs/') ? 'docs' : 'story';
      console.log('Current view mode:', viewMode);
      
      if (storyInfo && viewMode === 'story') {
        console.log('Setting current story:', storyInfo);
        // Hide both container and controls
        const storyIframe = document.getElementById('storybook-preview-iframe');
        if (storyIframe) {
          const overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
          const controls = storyIframe.contentDocument.getElementById('visual-overlay-controls');
          const overlayDiv = storyIframe.contentDocument.getElementById('visual-overlay');
          
          if (overlayContainer) {
            overlayContainer.classList.add('hidden');
          }
          if (controls) {
            controls.remove(); // Remove controls completely instead of just hiding
          }
        }
        
        // Update overlay image if needed
        if (isActive) {
          setTimeout(() => {
            toggleOverlay();
          }, 100);
        }
      } else {
        console.log('No story info found in URL or in docs view');
        // Remove overlay and controls when switching to docs or when no story info
        const storyIframe = document.getElementById('storybook-preview-iframe');
        if (storyIframe) {
          const overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
          const controls = storyIframe.contentDocument.getElementById('visual-overlay-controls');
          if (overlayContainer) {
            overlayContainer.remove();
          }
          if (controls) {
            controls.remove();
          }
        }
        if (isActive) {
          setIsActive(false);
        }
      }
    };

    // Listen for Storybook navigation events
    const channel = addons.getChannel();
    const handleStoryChange = (storyId) => {
      const isDocs = storyId?.endsWith('--docs');
      console.log('Story changed:', storyId, 'Is docs:', isDocs);
      
      if (isDocs) {
        // Remove overlay and controls when switching to docs
        const storyIframe = document.getElementById('storybook-preview-iframe');
        if (storyIframe) {
          const overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
          const controls = storyIframe.contentDocument.getElementById('visual-overlay-controls');
          if (overlayContainer) {
            overlayContainer.remove();
          }
          if (controls) {
            controls.remove();
          }
        }
        if (isActive) {
          setIsActive(false);
        }
      } else {
        handleUrlChange();
      }
    };

    // Listen for story rendered event
    channel.on('storyRendered', handleStoryChange);
    
    // Initial check
    handleUrlChange();

    return () => {
      channel.off('storyRendered', handleStoryChange);
    };
  }, [isActive, removeOverlay, toggleOverlay, getStoryInfo]);

  // Update keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isActive) {
        switch(e.key) {
          case 'o':
            toggleOverlay();
            break;
          case '+':
            const newOpacityUp = Math.min(opacity + 0.1, 1);
            setOpacity(newOpacityUp);
            updateOverlayOpacity(newOpacityUp);
            break;
          case '-':
            const newOpacityDown = Math.max(opacity - 0.1, 0);
            setOpacity(newOpacityDown);
            updateOverlayOpacity(newOpacityDown);
            break;
          case 'ArrowUp':
            if (e.shiftKey) {
              updateOverlayPosition(position.x, position.y - 10);
            } else {
              updateOverlayPosition(position.x, position.y - 1);
            }
            break;
          case 'ArrowDown':
            if (e.shiftKey) {
              updateOverlayPosition(position.x, position.y + 10);
            } else {
              updateOverlayPosition(position.x, position.y + 1);
            }
            break;
          case 'ArrowLeft':
            if (e.shiftKey) {
              updateOverlayPosition(position.x - 10, position.y);
            } else {
              updateOverlayPosition(position.x - 1, position.y);
            }
            break;
          case 'ArrowRight':
            if (e.shiftKey) {
              updateOverlayPosition(position.x + 10, position.y);
            } else {
              updateOverlayPosition(position.x + 1, position.y);
            }
            break;
          case 'r':
            updateOverlayPosition(0, 0);
            break;
          case 'l':
            const newZIndex = zIndex === 99999 ? -1 : 99999;
            setZIndex(newZIndex);
            const storyIframe = document.getElementById('storybook-preview-iframe');
            if (storyIframe) {
              const overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
              const controls = storyIframe.contentDocument.getElementById('visual-overlay-controls');
              if (overlayContainer) {
                overlayContainer.style.zIndex = newZIndex;
              }
              if (controls) {
                controls.style.zIndex = newZIndex === -1 ? -1 : newZIndex + 1;
              }
            }
            break;
          case 'h':
            setShowHandle(!showHandle);
            const handle = document.querySelector('#visual-overlay-handle');
            if (handle) {
              handle.style.display = showHandle ? 'none' : 'flex';
            }
            break;
        }
      } else if (e.key === 'o') {
        toggleOverlay();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isActive, opacity, position, zIndex, showHandle, toggleOverlay, updateOverlayOpacity, updateOverlayPosition]);

  useEffect(() => {
    // Cleanup function to remove event listeners and overlay
    return () => {
      const storyIframe = document.getElementById('storybook-preview-iframe');
      if (storyIframe) {
        storyIframe.contentDocument.removeEventListener('keydown', handleKeyDown);
        storyIframe.contentDocument.removeEventListener('mousemove', handleMouseMove);
        storyIframe.contentDocument.removeEventListener('mouseup', handleMouseUp);
      }
      removeOverlay();
      setIsActive(false);
      setError(null);
      setPosition({ x: 0, y: 0 });
      setIsLoading(false);
    };
  }, [removeOverlay, handleKeyDown, handleMouseMove, handleMouseUp]);

  // Add event handler functions
  const handleKeyDown = useCallback((e) => {
    if (isActive) {
      switch(e.key) {
        case 'o':
          toggleOverlay();
          break;
        case '+':
          const newOpacityUp = Math.min(opacity + 0.1, 1);
          setOpacity(newOpacityUp);
          updateOverlayOpacity(newOpacityUp);
          break;
        case '-':
          const newOpacityDown = Math.max(opacity - 0.1, 0);
          setOpacity(newOpacityDown);
          updateOverlayOpacity(newOpacityDown);
          break;
        case 'ArrowUp':
          if (e.shiftKey) {
            updateOverlayPosition(position.x, position.y - 10);
          } else {
            updateOverlayPosition(position.x, position.y - 1);
          }
          break;
        case 'ArrowDown':
          if (e.shiftKey) {
            updateOverlayPosition(position.x, position.y + 10);
          } else {
            updateOverlayPosition(position.x, position.y + 1);
          }
          break;
        case 'ArrowLeft':
          if (e.shiftKey) {
            updateOverlayPosition(position.x - 10, position.y);
          } else {
            updateOverlayPosition(position.x - 1, position.y);
          }
          break;
        case 'ArrowRight':
          if (e.shiftKey) {
            updateOverlayPosition(position.x + 10, position.y);
          } else {
            updateOverlayPosition(position.x + 1, position.y);
          }
          break;
        case 'r':
          updateOverlayPosition(0, 0);
          break;
        case 'l':
          const newZIndex = zIndex === 99999 ? -1 : 99999;
          setZIndex(newZIndex);
          const storyIframe = document.getElementById('storybook-preview-iframe');
          if (storyIframe) {
            const overlayContainer = storyIframe.contentDocument.getElementById('visual-overlay-container');
            const controls = storyIframe.contentDocument.getElementById('visual-overlay-controls');
            if (overlayContainer) {
              overlayContainer.style.zIndex = newZIndex;
            }
            if (controls) {
              controls.style.zIndex = newZIndex === -1 ? -1 : newZIndex + 1;
            }
          }
          break;
        case 'h':
          setShowHandle(!showHandle);
          break;
      }
    }
  }, [isActive, opacity, position, zIndex, showHandle, toggleOverlay, updateOverlayOpacity, updateOverlayPosition]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const x = e.clientX - dragStart.x;
      const y = e.clientY - dragStart.y;
      updateOverlayPosition(x, y);
    }
  }, [isDragging, dragStart, updateOverlayPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Helper function to create overlay
  function createOverlay() {
    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'visual-overlay';
    overlayDiv.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: ${opacity};
      transform: translate(${position.x}px, ${position.y}px);
      pointer-events: auto;
      mix-blend-mode: difference;
      background-color: transparent;
      cursor: move;
      z-index: ${zIndex};
    `;
    
    // Add drag functionality
    overlayDiv.addEventListener('mousedown', handleMouseDown);
    return overlayDiv;
  }

  return (
    <button
      onClick={toggleOverlay}
      style={{
        margin: '0',
        padding: '8px',
        border: 'none',
        backgroundColor: isActive ? 'rgba(255, 165, 0, 0.07)' : 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        transition: 'background-color 150ms ease-out, color 150ms ease-out',
        color: error ? '#FF4785' : isLoading ? '#FFA500' : isActive ? '#FFA500' : 'inherit'
      }}
      onMouseEnter={(e) => {
        if (!isActive && !isLoading) {
          e.currentTarget.style.backgroundColor = 'rgba(30, 167, 253, 0.07)';
          e.currentTarget.style.color = '#1EA7FD';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive && !isLoading) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = error ? '#FF4785' : 'inherit';
        }
      }}
      title={error || (isLoading ? 'Loading overlay...' : 'Visual Overlay (Press "o" to toggle)')}
      disabled={isLoading}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 202.83 202.83"
        style={{ 
          color: 'inherit',
          animation: isLoading ? 'spin 1s linear infinite' : 'none'
        }}
      >
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <path
          d="M198.933 66.346h-62.345V4.001c0-2.152-1.743-3.897-3.897-3.897H4.105C1.951.105.208 1.85.208 4.001v37.958a3.9 3.9 0 000 2.502v88.126c0 2.152 1.743 3.897 3.897 3.897H66.45v62.345c0 2.152 1.743 3.897 3.897 3.897h128.586c2.154 0 3.897-1.745 3.897-3.897V70.243c-.001-2.152-1.744-3.897-3.897-3.897zm-70.138-17.2l-17.2 17.2h-35.74l52.939-52.938v35.738zm-6.18 17.2l6.18-6.18v6.18h-6.18zm6.18 7.793v54.552H74.243V74.139h54.552zM8.002 7.898h25.66L8.002 33.56V7.898zm0 36.682L43.927 8.653c.223-.223.344-.497.502-.755h32.096L8.002 76.42V44.58zm58.448 84.111h-6.18l6.18-6.18v6.18zm0-17.199l-17.2 17.2H13.51l52.94-52.939v35.739zM8.002 123.179V87.18c.265-.16.547-.286.776-.516L86.762 8.68c.231-.231.358-.515.519-.782h36.003L8.002 123.179zm187.034 71.753H74.243v-58.448h58.448c2.154 0 3.897-1.745 3.897-3.897V74.139h58.448v120.793z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

// Register the addon
addons.register('visual-overlay', () => {
  console.log('Visual Overlay Addon registered');

  // Add a toolbar item
  addons.add('visual-overlay/button', {
    type: types.TOOL,
    title: 'Visual Overlay',
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <OverlayIcon />
  });
});