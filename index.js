const globalEmitter = require('./lib/events.js');

const logPayload = (payload) => {
  console.log('EVENT', payload, '\n');
};

globalEmitter.on('pickup', logPayload);
globalEmitter.on('in-transit', logPayload);
globalEmitter.on('confirmation', logPayload);

require('./lib/vendor.js');
require('./lib/driver.js');
