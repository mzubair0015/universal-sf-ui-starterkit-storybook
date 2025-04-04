"use strict";

var _require = require('child_process'),
  spawn = _require.spawn;
var path = require('path');
var serverPath = path.join(__dirname, 'server.js');
var server = spawn('node', [serverPath], {
  stdio: 'pipe',
  shell: true
});
server.stdout.on('data', function (data) {
  console.log("Server stdout: ".concat(data));
});
server.stderr.on('data', function (data) {
  console.error("Server stderr: ".concat(data));
});
server.on('close', function (code) {
  console.log("Server process exited with code ".concat(code));
});

// Handle process termination
process.on('SIGTERM', function () {
  server.kill();
  process.exit(0);
});
process.on('SIGINT', function () {
  server.kill();
  process.exit(0);
});