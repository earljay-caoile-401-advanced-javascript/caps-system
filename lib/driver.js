'use strict';

const io = require('socket.io-client');
const port = 3000;
const cspsChannel = io.connect(`http://localhost:${port}/csps`);
cspsChannel.emit('join', 'driver');

console.log('driver is up on port', port, '\n');

/**
 * listens for pickup events and responds with in-transit and delivered events
 * @param {ArrayBuffer} payload - object containing order information
 */
cspsChannel.on('in-transit', (payload) => {
  let stringPayload = Buffer.from(payload).toString();
  const jsonPayload = JSON.parse(stringPayload);

  setTimeout(() => {
    console.log(`picked up order ${jsonPayload.content.orderID}\n`);
    cspsChannel.emit(
      'in-transit',
      JSON.stringify({
        event: 'in-transit',
        content: jsonPayload.content,
      }),
    );
  }, 1000);

  setTimeout(() => {
    console.log(`delivered order ${jsonPayload.content.orderID}\n`);
    cspsChannel.emit(
      'delivered',
      JSON.stringify({
        event: 'delivered',
        content: jsonPayload.content,
      }),
    );
  }, 3000);
});
