/**
 * console logs an event using the payload and the eventName
 * @param {object|string} payload - object or string containing event information
 * @param {object} eventName - name of event associated with payload
 */
module.exports = (payload) => {
  console.log(payload.event);
  const content = payload.content;
  if (payload.event === 'pickup') {
    // console.log(`EVENT`, eventName);
    Object.keys(content).forEach((key) => {
      console.log(`- ${key}: ${content[key]}`);
    });
    console.log();
  } else {
    console.log('EVENT', payload, '\n');
  }
};
