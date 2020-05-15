'use strict';

const EventEmitter = require('events');

/**
 * exports an instance of the EventEmitter class to be used through the whole app
 */
module.exports = new EventEmitter();
