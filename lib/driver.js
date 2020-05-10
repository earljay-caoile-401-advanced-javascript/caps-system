'use strict';

require('dotenv');
const net = require('net');
const socket = net.Socket();
// const globalEmitter = require('./events.js');

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
socket.on('data', (payload) => {
  let stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);

  setTimeout(() => {
    console.log(`picked up order ${jsonPayload.content.orderID}\n`);
    socket.write(
      JSON.stringify({
        event: 'in-transit',
        content: jsonPayload.content,
      }),
    );
  }, 1000);

  setTimeout(() => {
    console.log(`delivered order ${jsonPayload.content.orderID}\n`);
    socket.write(
      JSON.stringify({
        event: 'delivered',
        content: jsonPayload.content,
      }),
    );
  }, 3000);
});
