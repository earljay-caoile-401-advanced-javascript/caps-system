'use strict';

const io = require('socket.io-client');
const cspsChannel = io.connect(`http://localhost:3000/csps`);

/**
 * listens for pickup events and responds with in-transit and delivered events
 * @param {object} payload - object containing order information
 */
cspsChannel.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`picked up order ${payload.orderID}\n`);
    cspsChannel.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`delivered order ${payload.orderID}\n`);
    cspsChannel.emit('delivered', payload);
  }, 3000);
});
