'use strict';

const net = require('net');
const socket = net.Socket();

socket.connect({ port: 3000, host: 'localhost' }, () => {
  console.log('Connected to TCP socker server!');
});

/**
 * listens for pickup events and responds with in-transit and delivered events
 * @param {object} payload - object containing order information
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
