'use strict';

/**
 * console logs an event using the payload and the eventName
 * @param {object} payload - object or string containing event information
 */
const logPayload = (payload, event) => {
  if (event === 'pickup') {
    console.log(event);
    Object.keys(payload).forEach((key) => {
      console.log(`- ${key}: ${payload[key]}`);
    });
    console.log();
  } else {
    console.log(event, 'order', payload.orderID);
  }
};

module.exports = logPayload;
