'use strict';

const globalEmitter = require('./lib/events.js');
const logPayload = require('./lib/logPayload.js');

globalEmitter.on('pickup', (payload) => logPayload(payload, 'pickup'));
globalEmitter.on('in-transit', (payload) => logPayload(payload, 'in-transit'));
globalEmitter.on('confirmation', (payload) => logPayload(payload, 'delivered'));

require('./lib/vendor.js');
require('./lib/driver.js');
