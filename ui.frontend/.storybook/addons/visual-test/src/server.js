const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Ensure the directory for port.txt exists
const portFilePath = path.join(__dirname, 'port.txt');
const portFileDir = path.dirname(portFilePath);

try {
  if (!fs.existsSync(portFileDir)) {
    fs.mkdirSync(portFileDir, { recursive: true });
  }
  fs.writeFileSync(portFilePath, port.toString(), 'utf8');
  console.log(`Port ${port} written to ${portFilePath}`);
} catch (error) {
  console.error('Error writing port file:', error);
}

// Serve static files from the playwright-report directory
const reportPath = path.join(__dirname, '../../../../playwright-report');
if (fs.existsSync(reportPath)) {
  app.use('/playwright-report', express.static(reportPath));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Port endpoint
app.get('/port.txt', (req, res) => {
  try {
    const port = fs.readFileSync(portFilePath, 'utf8');
    res.setHeader('Content-Type', 'text/plain');
    res.send(port);
  } catch (error) {
    console.error('Error reading port file:', error);
    res.status(500).send('Error reading port');
  }
});

// Run visual test endpoint
app.post('/api/run-visual-test', async (req, res) => {
  const { command, component, story } = req.body;
  console.log('Received request:', { command, component, story });

  if (command !== 'test:visual:story') {
    return res.status(400).json({ error: 'Invalid command' });
  }

  if (!component || !story) {
    return res.status(400).json({ error: 'Missing component or story name' });
  }

  // Get the project root directory (4 levels up from server.js)
  const projectRoot = path.resolve(__dirname, '../../../../');
  console.log('Project root:', projectRoot);

  // Construct the command to run visual tests
  const testCommand = `npm run test:visual:story ${component}`;
  console.log('Executing command:', testCommand);
  console.log('In directory:', projectRoot);

  try {
    exec(testCommand, { 
      cwd: projectRoot,
      env: { 
        ...process.env, 
        FORCE_COLOR: true,
        // Ensure PATH is properly set on Windows
        PATH: process.env.PATH
      },
      shell: process.platform === 'win32' // Use shell on Windows
    }, (error, stdout, stderr) => {
      console.log('Command output:', stdout);
      if (stderr) console.log('Command errors:', stderr);

      if (error) {
        console.error('Command execution error:', error);
        return res.status(500).json({ 
          error: 'Command execution failed',
          details: error.message,
          output: stdout,
          stderr: stderr
        });
      }

      // Check if there's any error message in stderr
      if (stderr && stderr.toLowerCase().includes('error')) {
        return res.status(500).json({
          error: 'Command completed with errors',
          output: stdout,
          stderr: stderr
        });
      }

      res.json({ 
        success: true,
        output: stdout,
        stderr: stderr
      });
    });
  } catch (error) {
    console.error('Error executing command:', error);
    res.status(500).json({ 
      error: 'Failed to execute command',
      details: error.message
    });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Visual test server running on port ${port}`);
}).on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
}); 