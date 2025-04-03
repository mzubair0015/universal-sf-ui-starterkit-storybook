const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Function to find an available port
const findAvailablePort = async (startPort) => {
  const net = require('net');
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
  });
};

// Start server with dynamic port
const startServer = async () => {
  try {
    const port = await findAvailablePort(3001);
    app.listen(port, () => {
      console.log(`Visual test server running on port ${port}`);
      // Write the port to a file so the client can read it
      const portFilePath = path.join(__dirname, 'port.txt');
      fs.writeFileSync(portFilePath, port.toString());
      console.log(`Port ${port} written to ${portFilePath}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Port endpoint
app.get('/port.txt', (req, res) => {
  const portFilePath = path.join(__dirname, 'port.txt');
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

  if (!command || command !== 'test:visual:story') {
    console.log('Invalid command:', command);
    return res.status(400).json({ error: 'Invalid command' });
  }

  if (!component) {
    console.log('Missing component:', { component });
    return res.status(400).json({ error: 'Missing component' });
  }

  try {
    // Get the project root directory (3 levels up from server.js)
    const projectRoot = path.resolve(__dirname, '../../../../');
    console.log('Running command in directory:', projectRoot);

    // Construct the command
    const cmd = `npm run ${command} ${component}`;
    console.log('Executing command:', cmd);

    exec(cmd, { cwd: projectRoot }, (error, stdout, stderr) => {
      if (error) {
        console.error('Command execution error:', error);
        return res.status(500).json({ 
          error: 'Command execution failed',
          output: error.message,
          stderr: stderr
        });
      }
      res.json({ output: stdout });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

startServer(); 