'use strict';

const globalEmitter = require('./lib/events.js');

const logPayload = (payload, eventName) => {
  if (typeof payload === 'object') {
    console.log(`EVENT`, eventName);
    Object.keys(payload).forEach((key) => {
      console.log(`- ${key}: ${payload[key]}`);
    });
    console.log();
  } else {
    console.log('EVENT', eventName, payload, '\n');
  }
};

globalEmitter.on('pickup', (payload) => logPayload(payload, 'pickup'));
globalEmitter.on('in-transit', (payload) => logPayload(payload, 'in-transit'));
globalEmitter.on('confirmation', (payload) => logPayload(payload, 'delivered'));

require('./lib/vendor.js');
require('./lib/driver.js');
