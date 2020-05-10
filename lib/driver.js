'use strict';

require('dotenv');
const net = require('net');
const socket = net.Socket();
const globalEmitter = require('./events.js');

socket.connect(
  { port: process.env.PORT || 3000, host: process.env.HOST || 'localhost' },
  () => {
    console.log('Connected to TCP socker server!');
  },
);

/**
 * listens for pickup events and responds with in-transit and delivered events
 * @param {object} payload - object containing order information
 * @param {object} eventName - name of event associated with payload
 */
socket.on('pickup', (payload) => {
  let stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);

  console.log(`DRIVER picked up order ${jsonPayload.orderID}\n`);
  //globalEmitter.emit('in-transit', `order ${payload.orderID}`);
  socket.write(
    JSON.stringify({
      event: 'in-transit',
      content: `order $${jsonPayload.orderID}`,
    }),
  );

  setTimeout(() => {
    console.log(`DRIVER delivered ${jsonPayload.orderID}\n`);
    socket.write('delivered', jsonPayload);
  }, 3000);
});
