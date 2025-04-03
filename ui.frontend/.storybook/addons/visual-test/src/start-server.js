const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
const server = spawn('node', [serverPath], {
  stdio: 'pipe',
  shell: true
});

server.stdout.on('data', (data) => {
  console.log(`Server stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Server stderr: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle process termination
process.on('SIGTERM', () => {
  server.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
}); 