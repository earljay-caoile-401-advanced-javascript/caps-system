'use strict';

const net = require('net');
const server = net.createServer();
const logPayload = require('./logPayload.js');
const socketPool = [];
const port = 3000;

server.listen(port, () => {
  console.log('Server is running on port', port);
});

server.on('connection', (socket) => {
  console.log('Got a connection to server');
  socketPool.push(socket);
  let vendor = socketPool[0];
  let driver = socketPool[1];

  if (vendor) {
    vendor.on('data', (payload) => {
      const stringPayload = Buffer.from(payload).toString();
      const jsonPayload = JSON.parse(stringPayload);
      logPayload(jsonPayload);
      if (jsonPayload.event === 'pickup' && driver) {
        driver.write(payload);
      }
    });
  }

  if (driver) {
    driver.on('data', (payload) => {
      const stringPayload = Buffer.from(payload).toString();
      const jsonPayload = JSON.parse(stringPayload);
      logPayload(jsonPayload);

      if (jsonPayload.event === 'delivered' && vendor) {
        vendor.write(
          JSON.stringify({ event: 'delivered', content: jsonPayload.content }),
        );
      }
    });
  }
});
