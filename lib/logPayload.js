/**
 * console logs an event using the payload and the eventName
 * @param {object} payload - object or string containing event information
 */
module.exports = (payload) => {
  const content = payload.content;
  const event = payload.event;

  if (event === 'pickup') {
    console.log(event);
    Object.keys(content).forEach((key) => {
      console.log(`- ${key}: ${content[key]}`);
    });
    console.log();
  } else {
    console.log(event, 'order', content.orderID, '\n');
  }
};
