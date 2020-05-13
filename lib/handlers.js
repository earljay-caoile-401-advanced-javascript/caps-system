'use strict';

/**
 * takes in a payload and converts it to a JSON object
 * @param {ArrayBuffer} payload - contains order information
 * @returns {object} JSON object converted from the payload
 */
const convertPayload = (payload) => {
  const stringPayload = Buffer.from(payload).toString();
  return JSON.parse(stringPayload);
};

/**
 * console logs an event using the payload and the eventName
 * @param {object} payload - object or string containing event information
 */
const logPayload = (payload) => {
  const content = payload.content;
  const event = payload.event;

  if (event === 'pickup') {
    console.log(event);
    Object.keys(content).forEach((key) => {
      console.log(`- ${key}: ${content[key]}`);
    });
    console.log();
  } else {
    console.log(event, 'order', content.orderID);
  }
};

module.exports = { logPayload, convertPayload };
