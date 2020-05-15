'use strict';

const globalEmitter = require('./events.js');

/**
 * listens for pickup events and responds with in-transit and delivered events
 * @param {object} payload - object containing order information
 * @param {object} eventName - name of event associated with payload
 */
globalEmitter.on('pickup', (payload) => {
  console.log(`DRIVER picked up order ${payload.orderID}\n`);
  globalEmitter.emit('in-transit', `order ${payload.orderID}`);

  setTimeout(() => {
    console.log(`DRIVER delivered ${payload.orderID}\n`);
    globalEmitter.emit('delivered', payload);
  }, 3000);
});
