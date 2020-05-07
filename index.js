'use strict';

const globalEmitter = require('./lib/events.js');

const logPayload = (payload) => {
  if (typeof payload === 'object') {
    console.log('EVENT', 'pickup', payload, '\n');
  } else {
    console.log('EVENT', payload, '\n');
  }
};

globalEmitter.on('pickup', logPayload);
globalEmitter.on('in-transit', logPayload);
globalEmitter.on('confirmation', logPayload);

require('./lib/vendor.js');
require('./lib/driver.js');
