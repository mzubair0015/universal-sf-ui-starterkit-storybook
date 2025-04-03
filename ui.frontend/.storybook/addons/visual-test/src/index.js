import { addons, types } from '@storybook/manager-api';
import React, { useState, useEffect } from 'react';

const ADDON_ID = 'visual-test';
const PANEL_ID = `${ADDON_ID}/panel`;

// Helper function to extract story name from URL
const getStoryInfo = () => {
  // Get the path from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const path = urlParams.get('path');
  console.log('Current path:', path);
  
  if (!path) {
    console.log('No path found in URL');
    return null;
  }

  // Extract story path from the full path
  const storyPath = path.replace('/story/', '');
  console.log('Story path:', storyPath);

  // Split into component and story name
  const [componentName, storyName] = storyPath.split('--');
  if (componentName && storyName) {
    console.log('Extracted component:', componentName, 'story:', storyName);
    return {
      component: componentName.split('-')[1],
      story: storyName
    };
  }

  console.log('Could not extract component and story from path:', storyPath);
  return null;
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Visual Test',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => {
      if (!active) {
        return null;
      }

      const VisualTestPanel = () => {
        const [output, setOutput] = useState('');
        const [isRunning, setIsRunning] = useState(false);
        const [serverStatus, setServerStatus] = useState('checking');
        const [currentStory, setCurrentStory] = useState(null);

        const checkServer = async () => {
          try {
            console.log('Checking server status...');
            // First try to get the port from the server
            const portResponse = await fetch('http://localhost:3001/port.txt');
            console.log('Port response status:', portResponse.status);
            if (!portResponse.ok) {
              throw new Error(`Failed to get port: ${portResponse.status}`);
            }
            const port = await portResponse.text();
            console.log('Server port:', port);

            // Then check the server health
            const healthUrl = `http://localhost:${port}/api/health`;
            console.log('Checking health at:', healthUrl);
            const healthResponse = await fetch(healthUrl);
            console.log('Health check response status:', healthResponse.status);
            
            if (healthResponse.ok) {
              const healthData = await healthResponse.json();
              console.log('Health check response:', healthData);
              setServerStatus('running');
              console.log('Server status set to running');
            } else {
              const errorText = await healthResponse.text();
              console.error('Health check failed:', errorText);
              setServerStatus('stopped');
              console.log('Server status set to stopped');
            }
          } catch (error) {
            console.error('Server check error:', error);
            setServerStatus('stopped');
          }
        };

        const handleCapture = async () => {
          const storyInfo = getStoryInfo();
          if (!storyInfo) {
            setOutput('Error: Could not determine current story\n');
            return;
          }

          setCurrentStory(storyInfo);
          setIsRunning(true);
          setOutput(`Running visual tests for component: ${storyInfo.component}, story: ${storyInfo.story}...\n`);
          
          try {
            // Get the port from the server
            const portResponse = await fetch('http://localhost:3001/port.txt');
            if (!portResponse.ok) {
              throw new Error(`Failed to get port: ${portResponse.status}`);
            }
            const port = await portResponse.text();

            const requestData = {
              command: 'test:visual:story',
              component: storyInfo.component,
              story: storyInfo.story
            };
            console.log('Sending request with data:', requestData);

            const response = await fetch(`http://localhost:${port}/api/run-visual-test`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData)
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || errorData.output || 'Unknown error'}`);
            }

            const data = await response.json();
            setOutput(prev => prev + data.output);
          } catch (error) {
            setOutput(prev => prev + `Error: ${error.message}\n`);
          } finally {
            setIsRunning(false);
          }
        };

        // Check server status when component mounts
        useEffect(() => {
          checkServer();
          // Check server status every 5 seconds
          const interval = setInterval(checkServer, 5000);
          return () => clearInterval(interval);
        }, []);

        // Update current story when URL changes
        useEffect(() => {
          const handleHashChange = () => {
            const storyInfo = getStoryInfo();
            console.log('Story info from URL:', storyInfo);
            if (storyInfo) {
              console.log('Setting current story:', storyInfo);
              setCurrentStory(storyInfo);
            } else {
              console.log('No story info found in URL');
              setCurrentStory(null);
            }
          };
          window.addEventListener('hashchange', handleHashChange);
          handleHashChange(); // Initial check
          return () => window.removeEventListener('hashchange', handleHashChange);
        }, []);

        // Log state changes
        useEffect(() => {
          console.log('State updated:', { 
            isRunning, 
            serverStatus, 
            currentStory,
            buttonDisabled: isRunning || serverStatus !== 'running' || !currentStory,
            disabledReasons: {
              isRunning,
              serverNotRunning: serverStatus !== 'running',
              noCurrentStory: !currentStory
            }
          });
        }, [isRunning, serverStatus, currentStory]);

        return (
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '10px', color: serverStatus === 'running' ? 'green' : 'orange' }}>
              Server Status: {serverStatus === 'running' ? 'Running' : 'Not Running'}
            </div>
            {currentStory && (
              <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                Current Story: {currentStory.component} / {currentStory.story}
              </div>
            )}
            {!currentStory && (
              <div style={{ marginBottom: '10px', fontSize: '14px', color: 'orange' }}>
                No story selected. Please select a story from the sidebar.
              </div>
            )}
            <button 
              onClick={handleCapture}
              disabled={isRunning || serverStatus !== 'running' || !currentStory}
              style={{
                padding: '8px 16px',
                backgroundColor: isRunning || serverStatus !== 'running' || !currentStory ? '#ccc' : '#1ea7fd',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isRunning || serverStatus !== 'running' || !currentStory ? 'not-allowed' : 'pointer'
              }}
            >
              {isRunning ? 'Running...' : 'Run Test'}
            </button>
            <div 
              style={{ 
                marginTop: '20px',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                maxHeight: '300px',
                overflowY: 'auto'
              }}
            >
              {output || 'No output yet'}
            </div>
          </div>
        );
      };

      return <VisualTestPanel />;
    },
  });
});

// Export the addon
export default {
  title: 'Visual Test',
  id: 'visual-test',
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div style="padding: 20px;">
        <h2>Visual Testing Panel</h2>
        <button id="capture-screenshot">Run Test</button>
        <div id="screenshot-preview" style="margin-top: 20px;"></div>
      </div>
    `;

    const captureButton = container.querySelector('#capture-screenshot');
    const previewDiv = container.querySelector('#screenshot-preview');

    captureButton.addEventListener('click', () => {
      // This is a placeholder for actual screenshot capture functionality
      previewDiv.innerHTML = '<p>Screenshot captured!</p>';
    });

    return container;
  },
}; 