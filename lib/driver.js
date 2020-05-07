'use strict';

const globalEmitter = require('./events.js');

globalEmitter.on('pickup', (payload) => {
  console.log(`DRIVER picked up order ${payload.orderID}\n`);
  globalEmitter.emit('in-transit', `in-transit order ${payload.orderID}`);

  setTimeout(() => {
    console.log(`DRIVER delivered ${payload.orderID}\n`);
    globalEmitter.emit('delivered', payload);
  }, 3000);
});
