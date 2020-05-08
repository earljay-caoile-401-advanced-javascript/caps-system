/**
 * console logs an event using the payload and the eventName
 * @param {object|string} payload - object or string containing event information
 * @param {object} eventName - name of event associated with payload
 */
module.exports = (payload, eventName) => {
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
