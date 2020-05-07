const globalEmitter = require('./lib/events.js');

const logPayload = (payload) => {
  console.log(payload);
};

globalEmitter.on('pickup', logPayload);

require('./lib/vendor.js');
