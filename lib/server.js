'use strict';

require('dotenv');
const net = require('net');
const server = net.createServer();
const logPayload = require('./logPayload.js');
const socketPool = [];
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server is running on port', port);
});

server.on('connection', (socket) => {
  console.log('we got a connection');
  socketPool.push(socket);
  socket.on('data', (payload) => {
    let stringPayload = Buffer.from(payload).toString();
    const jsonPayload = JSON.parse(stringPayload);
    logPayload(jsonPayload);
  });
});
