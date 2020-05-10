/**
 * console logs an event using the payload and the eventName
 * @param {object} payload - object or string containing event information
 */
module.exports = (payload) => {
  const content = payload.content;
  if (payload.event === 'pickup') {
    console.log(payload.event);
    Object.keys(content).forEach((key) => {
      console.log(`- ${key}: ${content[key]}`);
    });
    console.log();
  } else {
    console.log(payload.event, 'order', payload.content.orderID, '\n');
  }
};
