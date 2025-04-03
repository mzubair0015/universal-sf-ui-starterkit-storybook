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
        const [serverStatus, setServerStatus] = useState('checking');
        const [isRunning, setIsRunning] = useState(false);
        const [output, setOutput] = useState('');
        const [currentStory, setCurrentStory] = useState(null);
        const [hasRunTest, setHasRunTest] = useState(false);
        const [testSuccess, setTestSuccess] = useState(false);

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
          if (isRunning || !currentStory) return;

          setIsRunning(true);
          setOutput('Running visual tests...');
          setHasRunTest(true);
          setTestSuccess(false); // Reset success state when starting new test

          try {
            const response = await fetch('http://localhost:3001/api/run-visual-test', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                command: 'test:visual:story',
                component: currentStory.component,
                story: currentStory.story
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || 'Failed to run visual test');
            }

            setOutput(data.output || 'Test completed successfully');
            setTestSuccess(true); // Set success state only if test completes successfully
          } catch (error) {
            setOutput(`Error: ${error.message}`);
            setTestSuccess(false);
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
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px',
              marginBottom: '10px'
            }}>
              {currentStory && (
                <div style={{ fontSize: '14px' }}>
                  Current Story: {currentStory.component} / {currentStory.story}
                </div>
              )}
              {!currentStory && (
                <div style={{ fontSize: '14px', color: 'orange' }}>
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
                  cursor: isRunning || serverStatus !== 'running' || !currentStory ? 'not-allowed' : 'pointer',
                  marginLeft: 'auto'
                }}
              >
                {isRunning ? 'Running...' : 'Run Test'}
              </button>
            </div>
            <div style={{ marginTop: '20px' }}>
              <details open style={{ marginBottom: '20px' }}>
                <summary style={{ 
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>Log</summary>
                <div style={{ 
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  height: '300px',
                  overflowY: 'auto',
                  marginTop: '10px'
                }}>
                  {output || 'No output yet'}
                </div>
              </details>
              {hasRunTest && testSuccess && (
                <details open>
                  <summary style={{ 
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}>Report</summary>
                  <div style={{ 
                    marginTop: '10px',
                    height: 'calc(100vh - 400px)',
                    minHeight: '400px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <iframe
                      src="http://localhost:3001/playwright-report/index.html"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        flex: 1
                      }}
                      title="Playwright Report"
                    />
                  </div>
                </details>
              )}
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