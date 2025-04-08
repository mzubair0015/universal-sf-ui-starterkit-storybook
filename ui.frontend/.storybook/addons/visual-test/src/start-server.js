const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
console.log('Starting server from:', serverPath);

const server = spawn('node', [serverPath], {
  stdio: 'inherit', // This will pipe output directly to the console
  shell: process.platform === 'win32', // Only use shell on Windows
  windowsHide: true // Prevent opening a command window on Windows
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle process termination
const cleanup = () => {
  try {
    server.kill();
  } catch (err) {
    console.error('Error while shutting down server:', err);
  }
  process.exit(0);
};

process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);
process.on('exit', cleanup); 