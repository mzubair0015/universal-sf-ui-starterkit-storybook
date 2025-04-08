"use strict";

var _require = require('child_process'),
  spawn = _require.spawn;
var path = require('path');
var serverPath = path.join(__dirname, 'server.js');
console.log('Starting server from:', serverPath);
var server = spawn('node', [serverPath], {
  stdio: 'inherit',
  // This will pipe output directly to the console
  shell: process.platform === 'win32',
  // Only use shell on Windows
  windowsHide: true // Prevent opening a command window on Windows
});
server.on('error', function (error) {
  console.error('Failed to start server:', error);
});
server.on('close', function (code) {
  console.log("Server process exited with code ".concat(code));
});

// Handle process termination
var cleanup = function cleanup() {
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